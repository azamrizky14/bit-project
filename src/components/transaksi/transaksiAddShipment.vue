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
      <div class="col-4 d-flex justify-content-end align-items-center">
        <router-link :to="{ name: posts.transRouting.replace('-add', '') }"><button
            class="btn btn-outline-secondary btn-xs py-1 me-2" type="button"><i
              class="bi-chevron-left"></i>Kembali</button></router-link>
        <button class="btn btn-primary btn-xs py-1" @click.prevent="sendData">Tambah</button>
      </div>
    </div>
    <div class="row scale-9 position-relative" style="width: 114%; z-index: 1;">
      <div v-for="(field, index) in dummyItems" :class="[field.componentClass]"
        v-if="field.componentName === 'fieldHeader'" :key="index">
        <div class="card h-100">
          <div class="row px-3">
            <div v-for="micro in field.componentMicro" :class="['', micro.microClass]">
              <div class="row" v-if="micro.microType === 'select'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-select v-model="micro.value" :options="micro.microOptions" size="sm"
                    class="mt-1 form-control-sm py-0 form-control" :disabled="micro.isDisabled"></b-form-select>
                </b-form-group>
              </div>
              <template v-else-if="micro.microType === 'multiselect'">
                <template v-if="micro.key === 'customer'">
                  <b-form-group :label="micro.microName + ' :'" :label-for="micro.microName" label-cols-sm="4"
                    label-cols-lg="3" content-cols-sm="8" content-cols-lg="9" invalid-feedback="Condition Harus Diisi!">
                    <multiselect class="my-1" @input="selectCustomer(micro.value)" :id="micro.microName"
                      v-model="micro.value" :options="micro.microOptions" placeholder="Select one" :multiple="false"
                      :show-labels="false" :allow-empty="required" label="userName">
                    </multiselect>
                  </b-form-group>
                </template>
                <template v-else-if="micro.key === 'shipTo'">
                  <b-form-group :label="micro.microName + ' :'" :label-for="micro.microName" label-cols-sm="4"
                    label-cols-lg="3" content-cols-sm="8" content-cols-lg="9" invalid-feedback="Condition Harus Diisi!">
                    <multiselect class="my-1" :id="micro.microName" v-model="micro.value" :options="optionsShipTo"
                      placeholder="Select one" :multiple="false" :show-labels="false" :allow-empty="required"
                      :custom-label="customLabel1">
                    </multiselect>
                  </b-form-group>
                </template>
                <template v-else>
                  <b-form-group :label="micro.microName + ' :'" :label-for="micro.microName" label-cols-sm="4"
                    label-cols-lg="3" content-cols-sm="8" content-cols-lg="9" invalid-feedback="Condition Harus Diisi!">
                    <multiselect class="my-1" :id="micro.microName" v-model="micro.value" :options="micro.microOptions"
                      placeholder="Select one" :multiple="false" :show-labels="false" :allow-empty="required"
                      :custom-label="customLabel">
                    </multiselect>
                  </b-form-group>
                </template>
              </template>
              <template v-else>
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" required :disabled="micro.isDisabled"></b-form-input>
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
          <div class="hot-container col-md-12 position-relative" style="overflow-x: auto; z-index: 0">
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
      <div class="col-md-6 row p-0 scale-9 d-none" style="transform-origin: right top">
        <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTotal'">
          <template v-if="field.componentMicro.length > 0">
            <div class="row d-flex justify-content-end" v-for="micro in field.componentMicro">
              <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{
                micro.microName
              }} :</div>
              <div :class="['p-0 border border-light', micro.microClass]">
                <input :disabled="!micro.editableTotal" @input="refreshMethods()" :type="micro.microType"
                  v-model="micro.value" class="form-control form-control-sm py-1" style="text-align: right">
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

// register Handsontable's modules
registerAllModules();
import { addShipment } from '../services/components'
import { dynamicJS } from '../services/dynamic';
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
      optionsShipTo: [],
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
      console.log('component :', this.component)
      console.log('dummy', dummy)
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
    refreshFields() {
      console.log('fase 0')
      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => z.value = '')
      })
      this.component.find(x => x.componentName === 'fieldNote').componentMicro[0].microValue = ''
    },
    alertLoading() {
      this.$swal({
        title: "Loading...",
        text: "Mohon Ditunggu ya.",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        willOpen: () => {
          this.$swal.showLoading();
        },
      });
    },
    successAdd() {
      this.$swal("Berhasil!", "Data berhasil ditambahkan", "success");
    },
    selectCustomer(data) {
      alert('tes')
      if (data !== null) {
        this.$emit('data-updated', data)
      } else {
        this.$emit('data-updated', null)
      }
      console.log('tes',this.excelData)
    },
    customLabel(option) {
      return `${option.Code} (${option.Name})`;
    },
    customLabel1(option) {
      return `${option.nameAddr}: ${option.location}`;
    },
    sendData() {
      // header Data      
      const finalHeader = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldHeader' && Array.isArray(item.componentMicro)) {
          item.componentMicro.forEach((microItem) => {
            if (microItem.value !== undefined) {
              result[microItem.key] = microItem.value;
            } else {
              result[microItem.key] = '';
            }
          })
        }
        return result
      }, {})
      // table Data
      const fieldsTable = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      let finalTable = this.excelData
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
      // final Data
      const finalData = {
        header: finalHeader,
        footer: finalFooter
      }
      finalTable = finalTable.map(x => {
        const data = {
          transHysNo: finalHeader.shipNumber,
          transHysReff: x.soNumber,
          transHysType: 'DO',
          transHysUser: localStorage.getItem('_id'),
          transShipCustNo: finalHeader.customer.id,
          transHysEffDate: finalHeader.shipDate,
          transHysNotes: finalNote.note,
          transHysDomain: '648da0edc3889697b16e8675',
          transShipTo: x.shipTo,
          transShipExpedisi: {
            namaEkpedisi: finalHeader.namaEkpedisi,
            noResi: finalHeader.noResi,
            namaSupir: finalHeader.namaSupir,
            tipeMobil: finalHeader.tipeMobil,
            platNomor: finalHeader.platNomor
          },

          transHysItem: {
            itemReffCode: '',
            itemReffName: '',
            itemHysCode: '131001',
            itemHysId: '64e4a69a2ba5097c6cb3843c',
            itemHysImage: [],
            itemHysSpec: '',
            itemHysStdAmount: '',
            itemHysActAmount: '',
            itemNoBatch: '',
            itemLocation: {},
            itemHysUser: localStorage.getItem('_id'),
            itemHysQtyReceiptDetil: [],
            itemHysQtyFrom: [],
            itemHysQtyReceiptTo: [],

            itemHysName: x.productName,
            itemHysUm: x.UoM,
            itemHysQtyOrder: x.qtyReq,
            itemHysQtyRcp: x.qtySend,
            itemHysEffDate: finalHeader.shipDate,
          }
        }
        return data
      })
      console.log(finalTable)
      
      const doneValidator = Object.entries(finalHeader).every(([key, value]) => {
  if (key === 'shipNumber') {
    return true;
  } else if (value === '') {
    return false;
  }
  return true;
});
      if (doneValidator) {
        this.$swal({
          title: "Anda Yakin?",
          text: "Tekan Simpan jika anda sudah yakin!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Simpan",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.alertLoading();
            try {
            const voucher = await addShipment(finalTable);
              this.successAdd();
              this.refreshFields();
              this.$router.push({ name: this.posts.transRouting.replace('-add', '') })
            } catch (error) {
              alert(error);
            }
          }
        });
      } else {
        alert('ada data yang masih Kosong!')
      }
    },
    addList() {
      const link = '/transaksi/' + this.routingLink + '/add'
      this.$router.push(link)
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