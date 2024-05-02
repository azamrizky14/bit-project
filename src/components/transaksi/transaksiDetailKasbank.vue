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
            <router-link :to="{ name: posts.transRouting.replace('-detail', '') }">
              <a href="#">{{ posts.transTitle }}</a>
            </router-link>
          </li>
          <li>Detail</li>
        </ul>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <router-link :to="{ name: posts.transRouting.replace('-detail', '') }"><button
            class="btn btn-outline-secondary btn-xs py-1 me-2" type="button"><i
              class="bi-chevron-left"></i>Kembali</button></router-link>
        <div>
          <b-dropdown id="dropdown-1" right text="Export" variant="primary" size="xs">
            <b-dropdown-item @click="generatePDF">PDF</b-dropdown-item>
            <b-dropdown-item>xls</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
    <div class="row scale-9" style="width: 114%;">
      <div v-for="(field, index) in dummyItems" :class="[field.componentClass]"
        v-if="field.componentName === 'fieldHeader'" :key="index">
        <div class="card h-100">
          <div class="row px-3">
            <div v-for="micro in field.componentMicro" :class="['', micro.microClass]">
              <template v-if="micro.key === 'type'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input :value="dataDetail[0].Trans[0].transType === 'kredit' ? 'Pemasukan' : 'pengeluaran'"
                    class="form-control form-control-sm py-0" :type="micro.microType" :placeholder="micro.microText"
                    disabled></b-form-input>
                </b-form-group>
              </template>
              <template v-else-if="micro.key === 'kasbankCode'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input :value="dataDetail[0].coaCode + ' (' + dataDetail[0].coaName + ')'"
                    class="form-control form-control-sm py-0" :type="micro.microType" :placeholder="micro.microText"
                    disabled></b-form-input>
                </b-form-group>
              </template>
              <template v-else-if="micro.key === 'transAmount'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input :value="getBeginning()" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" disabled></b-form-input>
                </b-form-group>
              </template>
              <template v-else>
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" disabled></b-form-input>
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
            <hot-table :settings="hotSettings" :data="refreshComponent" :rowHeaders="true" :colHeaders="true"
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
                :placeholder="micro.microText" v-model="dataDetail[0].note" disabled></textarea>
            </template>
          </div>
        </div>

      </div>
      <div class="col-md-6 row p-0 scale-9" style="transform-origin: right top">
        <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTotal'">
          <div class="row d-flex justify-content-end" v-for="micro in field.componentMicro">
            <template v-if="micro.key === 'total'">
              <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{
                micro.microName
              }} :</div>
              <div :class="['p-0 border border-light', micro.microClass]">
                <input disabled @input="refreshMethods" :type="micro.microType"
                  :value="formatNumber(saldoAwal.FaPriceBegining)" class="form-control form-control-sm py-1"
                  style="text-align: right">
              </div>
            </template>
            <template v-else-if="micro.key === 'transAmount'">
              <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{
                micro.microName
              }} :</div>
              <div :class="['p-0 border border-light', micro.microClass]">
                <input disabled @input="refreshMethods" :type="micro.microType" :value="getTotal(dataDetail[0].sum)"
                  class="form-control form-control-sm py-1" style="text-align: right">
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import terbilang from 'terbilang-js';
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import { getCoa } from '../../components/services/components'
import { kasbankByVoucher } from '../../components/function/exportPDF'

// register Handsontable's modules
registerAllModules();
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
    widthTable: {
      type: Number,
      required: true,
    },
    dataDetail: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      saldoTotal: '',
      saldoAwal: '',
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
    refreshComponent() {
      this.dataDetail.map(x => {
        const data = {
          ...x
        }
        if (x.sum.startsWith('-')) {
          data.sum = x.sum.slice(1)
        }
        if (x.Trans[0].transAmount.startsWith('-')) {
          data.Trans[0].transAmount = x.Trans[0].transAmount.slice(1)
        }
        console.log(data)
        return data
      })
      console.log(this.dataDetail)
      return this.dataDetail[0].Trans
    },
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
  async mounted() {
    const data = await getCoa()
    this.saldoAwal = data.dataList.find(x => x.coaCode === this.dataDetail[0].coaCode).coaFaAmount[0]
  },
  methods: {
    async generatePDF() {
      const type = this.dataDetail[0].voucherCode.slice(0, 3)
      let title = ''
      let by = ''
      let terbilang = ''
      if (type === 'BKM') {
        by = 'Masuk Ke :'
        title = 'Bukti Kas Masuk'
      } else if (type === 'BKK') {
        by = 'Keluar Dari :'
        title = 'Bukti Kas Keluar'
      } else if (type === 'BBM') {
        by = 'Masuk Ke :'
        title = 'Bukti Bank Masuk'
      } else if (type === 'BBK') {
        by = 'Keluar Dari :'
        title = 'Bukti Bank Keluar'
      } else {
        by = ''
        title = 'Bukti Kas'
      }
      if (this.dataDetail[0].sum.startsWith('-')) {
        terbilang = parseInt(this.dataDetail[0].sum.slice(1))
      } else {
        terbilang = parseInt(this.dataDetail[0])
      }
      const data = {
        nomor: this.dataDetail[0].voucherCode,
        title: title,
        terbilang: terbilang,
        tgl: this.dataDetail[0].tgl,
        oleh: `${by}\n ${this.dataDetail[0].coaName}\n ${this.dataDetail[0].coaCode}`,
        transData: this.dataDetail[0].Trans.map(x => {
          const data = {
            code: x.transCoaCode,
            name: x.transCoaName,
            nominal: x.transAmount
          }
          return data
        }),
        // transData: [
        //     { code: '001', name: 'Kas Besar', nominal: 20000 },
        //     { code: '001', name: 'Kas Besar', nominal: 20000 },
        //     { code: '002', name: 'Kas Kecil', nominal: 15000 },
        //     { code: '002', name: 'Kas Kecil', nominal: 30000 },
        //     { code: '003', name: 'Kas Pribadi', nominal: 30000 }
        // ],
        catatan: this.dataDetail[0].note
      }
      await kasbankByVoucher(data)
      // alert('ini PDF')
      // console.log(this.dataDetail[0], data)
    },
    formatNumber(value) {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue)) {
        return value; // Return the original string value if it's not a valid number
      }
      const parts = floatValue.toFixed(2).toString().split('.');
      const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      if (parts.length > 1) {
        return `${wholePart},${parts[1]}`;
      } else {
        return wholePart;
      }
    },
    getTotal(data) {
      this.saldoTotal = data
      return this.formatNumber(data.slice(1))
    },
    getBeginning() {
      if (this.dataDetail[0].Trans[0].transType === 'kredit') {
        return this.formatNumber(parseFloat(this.saldoAwal.FaPriceBegining) + parseFloat(this.saldoTotal))
      } else if (this.dataDetail[0].Trans[0].transType === 'debet') {
        return this.formatNumber(parseFloat(this.saldoAwal.FaPriceBegining) - parseFloat(this.saldoTotal))
      }
    },
    sendData() {
      // header Data      
      const finalHeader = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldHeader' && Array.isArray(item.componentMicro)) {
          item.componentMicro.forEach((microItem) => {
            result[microItem.key] = microItem.value;
          })
        }
        return result
      }, {})
      // table Data
      const fieldsTable = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      const finalTable = this.dataDetail
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
            result[microItem.key] = microItem.value;
          })
        }
        return result
      }, {})
      // final Total
      const finalTotal = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldTotal' && Array.isArray(item.componentMicro)) {
          item.componentMicro.filter(tes => tes.editableTotal === true).forEach((microItem) => {
            if (isNaN(microItem.value)) {
              result[microItem.key] = '';
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
        table: finalTable,
        footer: finalFooter
      }
      console.log(finalData)
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