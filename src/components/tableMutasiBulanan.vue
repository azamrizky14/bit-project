<template  v-if="fields.length > 0">
  <div>
    <div class="card">
      <div class="card-header bg-light p-2">
        <div class="row">
          <div class="col-10 d-flex align-items-center justify-content-end">
            <input type="month" v-model="getDate" @change="getData" style="font-size: 12px; max-width: 125px;"
              class="form-input form-input-sm py-1 px-2">
          </div>

          <div class="col-2 d-flex justify-content-end" style="z-index: 2">

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
        <h2 class="text-center">Mutasi Keuangan Bulanan</h2>
        <printMutasiBulanan :title="print" :data="neraca" :saldoAwal="saldoAwal"></printMutasiBulanan>
      </div>
    </div>
  </div>
</template>

<script>
import { getA, getF } from './services/components'
import numberCounter from '../components/niceTo/numberCounter'
import { kasbankByMonth } from './function/exportPDF'
import printMutasiBulanan from './print/printMutasiBulanan'

export default {
  components: {
    numberCounter, printMutasiBulanan
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
      neraca: [],
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
  mounted() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month
    }
    this.getDate = year + '-' + month
    this.getData()
  },
  created() {
    this.initializeCheckedFields();
  },
  methods: {
    printReport() {
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
    async generatePDF() {
      const data = {
        title: 'Laporan Kas Harian',
        tgl: this.getDate,
        kasbank: ['kas1', 'kas2', 'bank1', 'bank2', 'bank3'],
        // transData: [
        //   { code: '001', name: 'Kas Besar', kredit: 20000, nominal: 20000, debet: 20000 },
        //   { code: '001', name: 'Kas Besar', kredit: 20000, nominal: 20000, debet: 20000 },
        //   { code: '002', name: 'Kas Kecil', kredit: 15000, nominal: 15000, debet: 20000 },
        //   { code: '002', name: 'Kas Kecil', kredit: 30000, nominal: 30000, debet: 20000 },
        // ],
        saldoAwal: this.neraca.saldoAwal.map(x => {
          const data = {
            code: x.coaCode,
            name: x.coaName
          }
          data.nominal = x.FaPriceBegining
          if (data.nominal.startsWith('-')) {
            data.nominal = data.nominal.slice(1)
          }
          data.nominal = parseInt(data.nominal)
          return data
        }),
      }
      await kasbankByMonth(data)
    },
    async getData() {
      const [year, month] = this.getDate.split('-');
      const neraca = await getF(year, month)
      this.neraca = neraca
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