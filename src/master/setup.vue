<template>
  <main id="content" role="main" class="main">
    <!-- Content -->
    <ul class="breadcrumb m-1 mt-0">
      <li>
        <router-link to="/dashboard">
          <a href="#"><i class="bi-house-door"></i></a>
        </router-link>
      </li>
      <li>Setup</li>
    </ul>
    <div class="content container-fluid">
      <!-- Page Header -->
      <div class="row">
        <div class="col-12 mb-4 d-flex justify-content-between align-items-center">
          <span></span>
          <span class="display-6">{{ title }}</span>
          <button v-if="!isEditing" type="button" class="btn btn-xs btn-success" @click="toggleEditForAll">Edit
          </button>
          <div v-else>
            <button type="button" class="btn-xs me-2 btn btn-secondary" @click="cancelEditForAll">Batal
            </button>
            <button type="button" class="btn-xs me-2 btn btn-success me-2" @click="saveChangesForAll">Simpan
            </button>
          </div>
        </div>

        <b-card>
          <template #header>
            <h4 cass="m-0">User Mode</h4>
          </template>
          <div class="col-8">
            <!-- dataJson: {{ dataJson.neracaSetup }}
            <br>
            <br>
            originalData: {{ originalData.neracaSetup }}
            <br>
            <br>
            editedData: {{ editedData.neracaSetup }} -->

            <div v-for="(value, key) in dataJson" :key="key" class="row">
              <!-- OBJECT -->
              <template v-if="isObject(value)">
                <div class="d-flex justify-content-between align-items-center my-2">
                  <b>{{ key }}</b>
                  <button class="btn btn-outline-secondary btn-xs" @click="toggleSection(key)">
                    <i class="pe-1" :class="showSections[key] ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                    {{ showSections[key] ? 'Hide' : 'Show' }}
                  </button>
                </div>
                <hr class="m-0">
                <div v-if="showSections[key]">
                  <div v-for="(innerValue, innerKey) in value" :key="innerKey" class="row p-2">
                    <template v-if="isObject(innerValue)">
                      <div class="d-flex justify-content-between align-items-center my-2">
                        <b>{{ innerKey }}</b>
                        <button class="btn btn-outline-secondary btn-xs" @click="toggleSection(key + innerKey)">
                          <i class="pe-1" :class="showSections[key + innerKey] ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                          {{ showSections[key + innerKey] ? 'Hide' : 'Show' }}
                        </button>
                      </div>
                      <div v-if="showSections[key + innerKey]">
                        <div v-for="(nestedValue, nestedKey) in innerValue" :key="nestedKey" class="row p-2">
                          <label class="col-4 d-flex justify-content-between align-items-center my-2 pe-0">{{ nestedKey }}
                            <span>:</span></label>
                          <div class="col-6 my-2">
                            <template v-if="isEditable(key + innerKey + nestedKey)">
                              <b-form-input type="text" v-model="editedData[key + innerKey + nestedKey]"></b-form-input>
                            </template>
                            <template v-else>
                              <b-form-input :disabled="!isEditing" type="text"
                                v-model="value[innerKey][nestedKey]"></b-form-input>
                            </template>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <label class="col-4 d-flex justify-content-between align-items-center my-2 pe-0">- {{ innerKey }}
                        <span>:</span></label>
                      <div class="col-6 my-2">
                        <template v-if="isEditable(key + innerKey)">
                          <b-form-input type="text" v-model="editedData[key + innerKey]"></b-form-input>
                        </template>
                        <template v-else>
                          <b-form-input :disabled="!isEditing" type="text" v-model="value[innerKey]"></b-form-input>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
              <!-- ARRAY -->
              <template v-else-if="Array.isArray(value)">
                <div class="d-flex justify-content-between align-items-center my-2">
                  <b>{{ key }}</b>
                  <button class="btn btn-outline-secondary btn-xs" @click="toggleArray(key)">
                    <i class="pe-1" :class="showArrays[key] ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                    {{ showArrays[key] ? 'Hide' : 'Show' }}
                  </button>
                </div>
                <hr class="m-0">
                <div v-if="showArrays[key]">
                  <div v-for="(item, index) in value" :key="index" class="m-2">
                    <template v-if="isObject(item)">
                      <div class="d-flex justify-content-between align-items-center my-2">
                        <b>Data {{ index + 1 }}</b>
                        <button class="btn btn-outline-secondary btn-xs" @click="toggleArrayItem(key, index)">
                          <i class="pe-0"
                            :class="showArrayItems[key] && showArrayItems[key][index] ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                        </button>
                      </div>
                      <div v-if="showArrayItems[key] && showArrayItems[key][index]">
                        <div v-for="(nestedValue, nestedKey) in item" :key="nestedKey" class="row p-2">
                          <label class="col-4 d-flex justify-content-between align-items-center my-2 pe-0">{{ nestedKey }}
                            <span>:</span></label>
                          <div class="col-6 my-2">
                            <template v-if="isEditable(key + index + nestedKey)">
                              <b-form-input type="text" v-model="editedData[key + index + nestedKey]"></b-form-input>
                            </template>
                            <template v-else>
                              <b-form-input :disabled="!isEditing" type="text" v-model="value[index][nestedKey]"></b-form-input>
                            </template>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="col-12">
                        <template v-if="isEditable(key + index)">
                          <b-form-input type="text" v-model="editedData[key + index]"></b-form-input>
                        </template>
                        <template v-else>
                          {{ editedData[key[index]] }}
                          <b-form-input :disabled="!isEditing" class="my-1" v-model="value[index]"></b-form-input>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
              <template v-else>
                <label class="col-4 d-flex justify-content-between pe-0">{{ key }}<span>:</span></label>
                <div class="col-6 my-2">
                  <template v-if="isEditable(key)">
                    <b-form-input type="text" v-model="editedData[key]"></b-form-input>
                  </template>
                  <template v-else>
                    <b-form-input :disabled="!isEditing" type="text" :value="value"></b-form-input>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </b-card>
      </div>

      <JsonEditorVue v-if="detailMode" :readOnly="!isEdit" v-model="dataJson" mode="text" style="height:335px">
      </JsonEditorVue>
    </div>
    <!-- modal -->
    <b-modal id="modal-add" size="lg" title="Tambah Function" @ok="handleAdd" @hidden="resetJson" ok-title="Tambah"
      cancel-title="Kembali">
      <JsonEditorVue v-model="dataJson" mode="text" style="height:350px"></JsonEditorVue>
    </b-modal>
  </main>
</template>
  
<script>

import { getFunction, addFunction, detailFunction, editFunction } from "./services/function";
import { getSetup, updateSetup } from '../components/services/components'
import jsonData from '../API/data.json'
export default {
  data() {
    return {
      fungsi: [],
      dataJson: {},
      backupJson: {},
      isEdit: false,
      detailMode: false,
      searchQuery: '',
      title: '',
      showSections: {},
      showArrays: {},
      showArrayItems: {},
      originalData: {}, // Store the original data
      isEditing: false,
      editedData: {},
    };
  },
  methods: {
    async getData() {
      this.dataJson = await getSetup();
      // this.fungsi = await getFunction();
      this.editedData = { ...this.dataJson };
      this.originalData = { ...this.dataJson };
    },
    isObject(val) {
      return val !== null && typeof val === 'object' && !Array.isArray(val);
    },
    toggleSection(key) {
      this.$set(this.showSections, key, !this.showSections[key]);
    },
    toggleArray(key) {
      this.$set(this.showArrays, key, !this.showArrays[key]);
    },
    toggleArrayItem(key, index) {
      if (!this.showArrayItems[key]) {
        this.$set(this.showArrayItems, key, {});
      }
      this.$set(this.showArrayItems[key], index, !this.showArrayItems[key][index]);
    },
    editField(fieldKey) {
      this.$set(this.editedData, fieldKey, this.dataJson[fieldKey]);
    },
    cancelEdit(fieldKey) {
      this.$set(this.editedData, fieldKey, undefined);
    },
    saveChanges(fieldKey) {
      if (this.editedData[fieldKey] !== undefined) {
        this.$set(this.dataJson, fieldKey, this.editedData[fieldKey]);
        this.cancelEdit(fieldKey);
      }
    },


    toggleEditForAll() {
      if (!this.isEditing) {
        // Start editing mode
        this.isEditing = true;
        // Make a copy of the original data for future cancel operations
        this.originalData = JSON.parse(JSON.stringify(this.dataJson));
      } else {
        // Cancel editing mode and revert editedData to originalData
        this.isEditing = false;
        this.editedData = JSON.parse(JSON.stringify(this.originalData));
      }
    },

    saveChangesForAll() {
      // Update the original data (dataJson) with editedData for all fields
      this.alertSwal('edit')
      // Exit editing mode
    },

    cancelEditForAll() {
      // Revert editedData to match the original data (originalData)
      this.editedData = { ...this.originalData };
      this.dataJson = { ...this.originalData };
      // Exit editing mode
      this.isEditing = false;
    },
    // startEditing() {
    //   this.isEditing = true;
    //   this.originalData = { ...this.dataJson }
    //   console.log(this.originalData)
    // },

    // saveChangesForAll() {
    //   // Update the original data with editedData
    //   this.isEditing = false;
    // },

    // cancelEditForAll() {
    //   // Revert editedData to match the original data
    //   // this.editedData = { ...this.originalData };
    //   this.dataJson = {}
    //   Object.keys(this.originalData).forEach(key => {
    //     this.dataJson[key] = this.originalData[key];
    //   });
    //   this.isEditing = false;
    // },

    isEditable(fieldKey) {
      return this.editedData.hasOwnProperty(fieldKey);
    },
    async selectfungsi(item) {
      this.dataJson = jsonData;
      this.title = item;
      this.detailMode = true;
    },
    doEdit() {
      this.isEdit = true;
      this.backupJson = this.dataJson;
    },
    returnFungsi() {
      this.isEdit = false;
      this.resetJson();
      this.title = '';
      this.detailMode = false;
    },
    async cancelEdit() {
      this.dataJson = await getSetup();
      this.isEdit = false;
    },
    resetJson() {
      this.dataJson = {}
    },
    handleAdd(bvModalEvent) {
      bvModalEvent.preventDefault()
      try {
        const tes = this.dataJson.trim().replace('{', '').replace('}', '').replace(' ', '')
        if (tes.length !== 0) {
          this.alertSwal('add')
        } else {
          this.alertError()
        }
      } catch (error) {
        this.alertError()
      }
    },
    handleEdit() {
      if (this.dataJson !== this.backupJson) {
        try {
          const tes = this.dataJson.trim().replace('{', '').replace('}', '').replace(' ', '')
          if (tes.length !== 0) {
            this.alertSwal('edit')
          } else {
            this.alertError()
          }
        } catch (error) {
          this.alertError()
        }
      } else {
        this.$swal('Error', 'Tidak ada data yang diubah', 'error')
      }
    },
    alertError() {
      this.$swal('Error', 'data kosong atau tidak valid', 'error')
    },
    alertLoading() {
      this.$swal({
        title: 'Loading...',
        text: 'Mohon Ditunggu ya.',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        willOpen: () => {
          this.$swal.showLoading();
        },
      });
    },
    alertSwal(typeData) {
      let btnColor = '';

      switch (typeData) {
        case 'add':
          btnColor = '#3085d6';
          break;
        case 'edit':
          btnColor = '#00AB8E';
          break;
        default:
          btnColor = '#3085d6';
      }
      this.$swal({
        title: 'Anda Yakin?',
        text: 'Tekan Simpan jika anda sudah yakin!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: btnColor,
        cancelButtonText: 'Kembali',
        confirmButtonText: 'Simpan',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.alertLoading()
          if (typeData === 'add') {
            try {
              const data = JSON.parse(this.dataJson)
              await addFunction(data)
              this.$bvModal.hide('modal-add')
              this.$swal('Berhasil', 'Fungsi Ditambahkan', 'success')
            } catch (error) {
              alert(error)
            }
          } else if (typeData === 'edit') {
            try {
              // console.log(data)
              await updateSetup(this.dataJson)
              await this.getData()
              this.isEditing = false;
              this.$swal('Berhasil', 'Fungsi Diedit', 'success')
            } catch (error) {
              alert(error)
            }
          }

        }
      });
    }
  },
  computed: {
    filteredFungsi() {
      if (this.searchQuery) {
        const lowercaseQuery = this.searchQuery.toLowerCase();
        return this.fungsi.filter(item => {
          const lowercaseTitle = item.toLowerCase();
          return lowercaseTitle.includes(lowercaseQuery);
        });
      }
      return this.fungsi;
    },
  },
  async mounted() {
    this.title = 'Master Setup';
    this.getData()

  }
};
</script>
  
<style></style>