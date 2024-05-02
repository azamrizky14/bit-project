<template>
  <main id="content" role="main" class="main">
            <!-- Content -->
    <div class="content container-fluid">
      <!-- Page Header -->
      <div class="row" v-if="detailMode">
        <div class="col-12 mb-4 d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-outline-secondary" @click="returnFungsi"> 
                <i class="bi-chevron-left"></i> Kembali
            </button>
            <span class="display-6">{{ title }}</span>
            <button v-if="!isEdit" type="button" class="btn btn-success" @click="doEdit">Edit
            </button>
            <div v-else>
            <button type="button" class="btn btn-success me-2" @click="handleEdit">Simpan
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelEdit">Batal
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-md-11">
        <b-input-group size="sm">
          <b-form-input type="text" v-model="searchQuery" placeholder="Cari Fungsi" />
          </b-input-group>
        </div>
        <div class="col-md-1">
          <b-button v-b-modal.modal-add size="sm" variant="primary"><i class="bi-plus-circle"></i></b-button>
        </div>
        </div>
          <hr />
          <div class="row">
              <div class="col-12 mb-4" v-for="(item, index) in filteredFungsi" :key="item">                
                  <div class="card" @click="selectfungsi(item)" style="cursor: pointer">
                      <div class="card-body p-3 d-flex justify-content-between align-items-center">
                        <div class="display-6">{{ index+1 }} | {{ item }}</div>
                        <div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <JsonEditorVue v-if="detailMode"
        :readOnly="!isEdit"
        v-model="dataJson"
        mode="text"
        style="height:335px"
      ></JsonEditorVue>
    </div>  
    <!-- modal -->
    <b-modal id="modal-add" size="lg" title="Tambah Function" @ok="handleAdd" @hidden="resetJson"
    ok-title="Tambah" cancel-title="Kembali">
      <JsonEditorVue
        v-model="dataJson"
        mode="text"
        style="height:350px"
      ></JsonEditorVue>
  </b-modal>
  </main>
</template>

<script>

import { getFunction, addFunction, detailFunction, editFunction } from "./services/function";
export default {
data() {
  return {
    fungsi: [],
    dataJson: {},
    backupJson: {},
    isEdit: false,
    detailMode: false,
    searchQuery: '',
    title:'',
  };
},
methods: {
  async selectfungsi(item) {
    this.dataJson = await detailFunction(item);
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
    this.isEdit = false;
    this.dataJson = await detailFunction(this.title);
  },
  resetJson() {
    this.dataJson = {}
  },
  handleAdd(bvModalEvent) {
    bvModalEvent.preventDefault()
      try {
        const tes = this.dataJson.trim().replace('{','').replace('}','').replace(' ','')
        if(tes.length !== 0) {
          this.alertSwal('add')
        } else {
          this.alertError()
        }
      } catch (error) {
        this.alertError()
      }
  },
  handleEdit() {
        if(this.dataJson !== this.backupJson) {
      try {
        const tes = this.dataJson.trim().replace('{','').replace('}','').replace(' ','')
          if(tes.length !== 0) {
            this.alertSwal('edit')
          } else {
            this.alertError()
          }
      } catch (error) {
        this.alertError()
      }
    } else {
        this.$swal('Error','Tidak ada data yang diubah', 'error')
    }
  },
alertError() {
        this.$swal('Error','data kosong atau tidak valid', 'error')
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
          text: 'Tekan OK jika anda sudah yakin!',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: btnColor,
          cancelButtonText: 'Kembali',
          confirmButtonText: 'OK',
      }).then(async (result) => {
      if (result.isConfirmed) {
          this.alertLoading()
          if (typeData === 'add') {
              try {
                const data = JSON.parse(this.dataJson)
                await addFunction(data)
                this.$bvModal.hide('modal-add')
                this.$swal('Berhasil','Fungsi Ditambahkan', 'success')
              } catch (error) {
                  alert(error)
              }
          } else if (typeData === 'edit') {
              try {
                const link = this.title
                const data = JSON.parse(this.dataJson)
                await editFunction(data,link)
                this.isEdit = false
                this.$swal('Berhasil','Fungsi Diedit', 'success')
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
this.fungsi = await getFunction();
this.$store.commit('setTopbarTitle', "List fungsi");
}
};
</script>

<style>
</style>