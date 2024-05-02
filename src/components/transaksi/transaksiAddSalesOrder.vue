<template  v-if="fields.length > 0">
  <form>
    <div class="row my-1">
      <div class="col-8 d-flex align-items-center">
        <ul class="breadcrumb m-0">
          <li>
            <router-link to="/dashboard">
              <a href="#"><i class="bi-house-door"></i></a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: posts.transRouting.replace('-add', '') }">
              <a href="#">{{ posts.transTitle }}</a>
            </router-link>
          </li>
          <li>Buat</li>
        </ul>
      </div>
      <template v-for="(field, index) in dummyItems" :class="[field.componentClass]" v-if="field.componentName === 'routingButton'">
        <div class="col-4 d-flex justify-content-end align-items-center">
          <template v-for="(micro, index) in field.componentMicro">          
            <router-link v-if="micro.key === 'back'" :to="{ name: posts.transRouting.replace('-add', '') }"><button class="btn btn-outline-secondary btn-xs py-1 me-2"
              type="button"><i class="bi-chevron-left"></i>Kembali</button></router-link>
          <button v-else-if="micro.key === 'submit'" class="btn btn-primary btn-xs py-1" @click.prevent="add(micro.microRouting)">Tambah</button>
          </template>

        </div>
      </template>
    </div>
    <div class="row scale-9" style="width: 114%;">
      <div v-for="(field, index) in dummyItems" :class="[field.componentClass]" v-if="field.componentName === 'fieldHeader'" :key="index">
        <div class="card h-100">
          <div class="row px-3">
          <div v-for="micro in field.componentMicro" :class="['', micro.microClass]">
            <div class="row" v-if="micro.microType === 'select'">
            <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
              content-cols-lg="9">
                <b-form-select v-model="micro.value" :options="micro.microOptions" size="sm" class="mt-1 form-control-sm py-0 form-control"></b-form-select>
            </b-form-group>
            </div>
            <template v-else>
            <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
              content-cols-lg="9">
              <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                :placeholder="micro.microText" required></b-form-input>
            </b-form-group>
            </template>
          </div>
        </div>
        </div>

      </div>
    </div>
    <div class="row mb-3">
      <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTable'">
        <div class=" row">
          <div class="hot-container col-md-12" style="overflow-x: auto">
            <hot-table :settings="hotSettings" :data="excelData" :rowHeaders="true" :colHeaders="true"
              :colWidths="widthTable"></hot-table>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6 scale-9">
        <div v-for="field in component" :class="['h-100', field.componentClass]"
          v-if="field.componentName === 'fieldNote'">
          <div class="card h-100">
            <div class="card-header bg-light py-1">{{ field.componentTitle }}</div>
            <template v-for="micro in field.componentMicro">
              <textarea class="form-control form-control-sm py-1 h-100" style="resize: none"
                :placeholder="micro.microText" v-model="micro.microValue"></textarea>
            </template>
          </div>
        </div>

      </div>
      <div class="col-md-6 row p-0 scale-9" style="transform-origin: right top">
        <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTotal'">
          <template v-if="field.componentMicro.length > 0">
            <div class="row d-flex justify-content-end" v-for="micro in field.componentMicro">
              <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{
                micro.microName
              }} :</div>
              <div :class="['p-0 border border-light', micro.microClass]">
                <input :disabled="!micro.editableTotal" @input="refreshMethods()" :type="micro.microType" v-model="micro.value"
                  class="form-control form-control-sm py-1" style="text-align: right">
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

import axios from "axios";
import {API} from '@/API';

// register Handsontable's modules
registerAllModules();
import { dynamicJS } from '../services/dynamic';
import { addTransaksi } from '../services/components'
export default {
  components: {
    HotTable
  },
  props: {
    refreshMethods: {
      type: Function,
      required: true,
    },
    posts: {
      type: Object,
      required: true,
    },
    component: {
      type: Array,
      required: true,
    },
    hotSettings: {
      type: Object,
      required: true,
    },
    contentDivWidth: {
      type: Number,
      required: true,
    },
    widthTable: {
      type: Number,
      required: true,
    },
    excelData: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      dynamicFunction: dynamicJS,   
      filter: '',
      filterFields: '',
      filterSort: '',
      filterList: [{ filter: '' }],
      checkedFields: [],
      sortBy: '',
      sortDesc: false,
      currentPage: 1,
      perPage: 8,
    };
  },
  computed: {
    dummyItems() {
      const dummy = {}
      for (const key in this.component) {
        dummy[key] = { ...this.component[key] }
      }
      return dummy
    },
    dataRange() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.data.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.data.length / this.perPage)
    },
    dataRangeText() {
      const startIndex = (this.currentPage - 1) * this.perPage + 1;
      const endIndex = Math.min(startIndex + this.perPage - 1, this.data.length);
      return `${startIndex} - ${endIndex} data dari total ${this.data.length} data`
    }
  },
  created() {
    this.initializeCheckedFields();
  },
  mounted() {
  },
  methods: {
        successAdd() {
            this.$swal(
                'Berhasil!',
                'Data berhasil ditambahkan',
                'success'
            )
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
        alertAdd(data, finalData) {
            this.$swal({
                title: 'Anda Yakin?',
                text: "Tekan Tambah jika anda sudah yakin!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Tambah'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.alertLoading()
                    
                        try {
                            await addTransaksi(data, finalData)
                            this.addList()
                            this.successAdd()
                        } catch (error) {
                            alert(error)
                        }

                }
            });
        },
    async add(data) {
      // header Data      
      const finalHeader = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldHeader' && Array.isArray(item.componentMicro)) {
          item.componentMicro.forEach((microItem) => {
            if (microItem.microValue !== undefined) {
              result[microItem.key] = microItem.microValue;
            } else {
              result[microItem.key] = '';
            }
          })
        }
        return result
      }, {})
      // table Data
      const fieldsTable = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      const finalTable = this.excelData
        .filter(item => {
          return fieldsTable.some(obj => {
            const value = item[obj.key]
            return value !== '' && value !== undefined && value !== null;
          })
        })
        .map(item => item)
      // final Note
      const finalNote = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldNote' && Array.isArray(item.componentMicro)) {
          item.componentMicro.forEach((microItem) => {
            result[microItem.key] = microItem.microValue;
          })
        }
        return result
      }, {})
      // final Total
      const finalTotal = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldTotal' && Array.isArray(item.componentMicro)) {
          item.componentMicro.filter(tes => tes.editableTotal === true).forEach((microItem) => {
            if (isNaN(microItem.value)) {
              result[microItem.key] = 0;
            } else {
              result[microItem.key] = microItem.value;
            }
          })
        }
        return result
      }, {})
      // final Footer
      const finalFooter = {
        note: finalNote, total: finalTotal
      }

      let finalData = []
      if (data === 'add') {
      // final Data
      finalData = {
        header: finalHeader,
        table: finalTable,
        footer: finalFooter
      }
      return finalData
      } else if (data === 'domains/periodEdit/') {
        // API 
        // finalData = {
        //   finalHeader, finalFooter, table: finalTable,
        // }
    const response = await axios.post(API+'/user/register', data)
    console.log(response.data, 'tes');
    
        const userEntry = localStorage.getItem('_id')
        finalData = [userEntry]
      } else {
        console.log('kosong')
      }
        console.log('ini routing mu :', data)
        console.log('ini datamu', finalData)
        
    
        // this.alertAdd(data, finalData)
    },
    addList() {
      this.$router.push({name: this.posts.transRouting.replace('-add', '')})
    },
    resetFilter() {
      this.filter = ''
      this.filterFields = ''
      this.filterSort = ''
      this.filterList = [{ filter: '' }]
    },
    addFilter() {
      if (this.filter !== '') {
        this.filterList.push({ filter: '' })
      }
    },
    removeFilter() {
      if (this.filterList.length > 1) {
        this.filterList.splice(-1)
      }
    },
    serviceDetail(item) {
      const data = item._id
      this.$store.commit('setDataProses', item)
      this.$router.push({ name: 'transaksi-detail', params: { data } })
    },
    initializeCheckedFields() {
      if (this.fields !== undefined) {
        this.checkedFields = [];
        this.fields.forEach(field => {
          this.checkedFields.push(field.key);
        });
      }
    },
    handleButtonClick(item) {
      // Perform action when the button is clicked
      console.log('Button clicked:', item);
    },
    handleRowClick(item) {
      // Handle row click event
      console.log('Row clicked:', item);
    },
  }
};
</script>