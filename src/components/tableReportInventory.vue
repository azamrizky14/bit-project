<template  v-if="fields.length > 0">
  <div>
    <!-- <div class="row">
      <div :class="['col-sm-6 col-lg-3 mb-3', micro.microClass]" v-for="(micro, index) in header" :key="index">
        <div class="card card-hover-shadow h-100">
          <div class="card-body">
            <h6 class="card-subtitle">{{ micro.microName }}</h6>
            <div class="row align-items-center gx-2">
              <div class="col-12">
                <h1 class="card-title d-flex align-items-center my-2">
                  <span class="h4 m-0 pe-1" :class="micro.value < 0 ? 'text-danger' : ''">{{ micro.microCurrency }}</span>
                  <numberCounter :class="micro.value < 0 ? 'text-danger' : ''" :target-number="micro.value">
                  </numberCounter>
                </h1>
              </div>
              <div v-if="micro.microName === 'Saldo Akhir' && micro.value < 0" style="font-size: 11px">Saldo Minus! Mohon
                cek transaksi</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="card">
      <div class="card-header bg-light p-2">
        <div class="row">

          <div class="row col-10 d-flex align-items-center justify-content-end pe-0">
            <b-form-group label-for="coaKasbank" invalid-feedback="Condition Harus Diisi!" style="width:200px">
                  <b-form-input type="month" class="form-control-sm py-1" v-model="getDate" @change="getData"></b-form-input>
            </b-form-group>
          </div>

          <div class="col-2 d-flex justify-content-end py-2" style="z-index: 2">

            <b-button-group>
              <button class="btn btn-primary btn-xs"><i class="bi-printer pe-2" @click="printReport"></i>Print</button>
              <b-dropdown id="dropdown2" variant="primary" size="xs" right>
                <div>
                  <p class="p-2 pb-0 m-0">Export</p>
                </div>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="generatePDF">PDF</b-dropdown-item>
                <b-dropdown-item>xls</b-dropdown-item>
              </b-dropdown>
            </b-button-group>
          </div>
        </div>
      </div>
      <div class="card-body p-2 printData">
        <h2 class="text-center">Laporan Inventory Bulanan</h2>
        <printInventory :title="print" :data="hotData" :saldoAwal="saldoAwal"></printInventory>
      </div>
    </div>
  </div>
</template>

<script>
import { getE, getG, getInventoryReport } from './services/components'
import numberCounter from '../components/niceTo/numberCounter'
import { kasbankByDate } from './function/exportPDF'
import { formatNumber } from './function/number'
import printInventory from './print/printInventory' 

export default {
  components: {
    numberCounter, printInventory
  },
  props: {
    header: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    routingLink: {
      type: String,
      required: true,
    },
    filterText: {
      type: String,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
    tableWidth: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      saldoAwal: '',
      print: 'ini title',
      description: 'ini cuma deskripsi',
      optionsData: [],
      getDate: '',
      hotData: [],
      newData: [],
      startDate: '',
      endDate: '',
      filterOption: 'Data',
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
    refreshData() {
      return this.data
    },
    dataRange() {
      if (this.data !== undefined) {
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        return this.data.map(item => item).slice(startIndex, endIndex)
      }
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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    this.getDate = year + '-' + month
    this.getData()

    this.header.forEach(item => {
      item.value = 0
    })
  },
  created() {
    this.initializeCheckedFields();
  },
  methods: {
    doPrint() {
      alert('tes')
      window.print()
    },
    printReport() {
      console.log('ini print',this.getReportContent())
      const printWindow = window.open('', '_blank');
      const printDocument = `
        <html>
          <head>
	          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
th {
  font-weight: 500
}
tr {
  font-size: 10px
}
          </style>
            </head>

          <body>
            ${this.getReportContent()}
          </body>
        </html>
      `;
      printWindow.document.write(printDocument);
      printWindow.document.close();
      printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
      };
    },
    getReportContent() {
      const reportView = document.querySelector('.printData');
      if (reportView) {
        return reportView.innerHTML;
      }
      return 'No content found.';
    },
    async generatePDF() {
      const data = {
        title: 'Laporan Kas Harian',
        tgl: this.getDate,
        nomor: 'BKK-0118',
        saldoAwal: await getG(this.getDate),
        transData: this.optionsData.flatMap(item => item.trans).map(x => {
          const minus = {
            bukti: x.transNo,
            name: x.transDescription,
            code: x.coaCode
          }

          if (x.transType === 'debet') {
            minus.kredit = x.transAmount
            minus.debet = 0
          } else if (x.transType === 'kredit') {
            minus.debet = x.transAmount
            minus.kredit = 0
          }

          minus.kredit = parseInt(minus.kredit)
          minus.debet = parseInt(minus.debet)
          return minus
        })
        // transData: [
        //   { code: '001', name: 'Kas Besar', kredit: 20000, debet: 20000 },
        //   { code: '001', name: 'Kas Besar', kredit: 20000, debet: 20000 },
        //   { code: '002', name: 'Kas Kecil', kredit: 15000, debet: 20000 },
        //   { code: '002', name: 'Kas Kecil', kredit: 30000, debet: 20000 },
        // ],
        // catatan: ''
      }
      await kasbankByDate(data)
    },
    async getData() {
      this.hotData = await getInventoryReport(this.getDate)
      this.hotData = [...this.hotData]
      // const data = await getE(this.getDate)
      // this.saldoAwal = await getG(this.getDate)
      // this.optionsData = data
      // this.listData()
    },
    async listData() {
      console.log(this.newData)
      let saldoAwal = ''
      let cok = ''
      this.hotData.splice(0, this.hotData.length)

      if (this.newData == null || this.newData.length === 0) {
        saldoAwal = 0

        cok = this.optionsData.flatMap(item => item.trans).map(x => {
          const minus = {
            ...x
          }
          if (x.transAmount.startsWith('-')) {
            x.transAmount = x.transAmount.slice(1)
          }
          if (x.transType === 'debet') {
            minus.transIn = x.transAmount
            minus.transOut = 0
          } else if (x.transType === 'kredit') {
            minus.transOut = x.transAmount
            minus.transIn = 0
          }
          minus.transIn = formatNumber(minus.transIn)
          minus.transOut = formatNumber(minus.transOut)
          return minus
        })
        this.hotData.push(...cok)
      } else if (this.newData.code !== '' && this.newData.code !== undefined) {
        const data = this.optionsData.find(x => x.code === this.newData.code)
        this.hotData.push(...data.trans.map(x => {
          const value = {
            ...x
          }
          if (x.transAmount === 'debet') {
            value.transIn = x.transAmount
            value.transOut = 0
          } else if (x.transType === 'kredit') {
            value.transOut = x.transAmount.slice(1)
            value.transIn = 0
          }
          value.transIn = formatNumber(value.transIn)
          value.transOut = formatNumber(value.transOut)
          console.log('value',value)
          return value
        }))
        saldoAwal = 0
      }


      let saldoMasuk = ''
      let saldoKeluar = ''

      if (this.hotData.length > 0) {
        saldoMasuk = this.hotData.filter(x => x.transType === 'debet').reduce((sum, item) => sum + parseInt(item.transAmount), 0)
        saldoKeluar = this.hotData.filter(x => x.transType === 'kredit').reduce((sum, item) => sum + parseInt(item.transAmount), 0)
        this.header.forEach(item => {
          if (item.key === 'saldoAwal') {
            item.value = saldoAwal
          }
          else if (item.key === 'saldoIn') {
            item.value = saldoMasuk
          }
          else if (item.key === 'saldoOut') {
            item.value = saldoKeluar
          }
          else if (item.key === 'saldoAkhir') {
            item.value = saldoAwal + saldoMasuk - saldoKeluar
          }
        })
      } else {
        this.header.forEach(item => {
          item.value = 0
        })
      }
    },
    customLabel(option) {
      return `${option.code} (${option.user})`;
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
      this.startDate = ''
      this.endDate = ''
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
      this.checkedFields = [];
      this.fields.forEach(field => {
        this.checkedFields.push(field.key);
      });
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
<style>
</style>