<template  v-if="fields.length > 0">

<div>
  <div class="row mb-2">
        <b-form-group label-for="coaKasbank" invalid-feedback="Condition Harus Diisi!">
          <div class="row">          
            <div class="col-8 d-flex align-items-center">
          <multiselect class="my-1" id="coaKasbank" :options="data" placeholder="Pilih Kas/Bank" v-model="newData"
            :multiple="false" :show-labels="false" :allow-empty="required" :custom-label="customLabel" @input="listData">
          </multiselect>
        </div>
        <div class="col-4 d-flex align-items-center">
          <b-form-input type="month" class="" v-model="getDate" @change="getData"></b-form-input>
        </div>
      </div>
        </b-form-group>
  </div>
  <div class="row">
          <div :class="['col-sm-6 col-lg-3 mb-3', micro.microClass]" v-for="(micro, index) in header" :key="index">
            <div class="card card-hover-shadow h-100">
              <div class="card-body">
                <h6 class="card-subtitle">{{ micro.microName }}</h6>
                <div class="row align-items-center gx-2">
                  <div class="col-12">
                    <h1 class="card-title d-flex align-items-center my-2">
                    <span class="h4 m-0 pe-1" :class="micro.value < 0 ? 'text-danger' : ''">{{ micro.microCurrency }}</span> <numberCounter :class="micro.value < 0 ? 'text-danger' : ''" :target-number="micro.value"></numberCounter></h1>
                  </div>
                  <div v-if="micro.microName === 'Saldo Akhir' && micro.value < 0" style="font-size: 11px">Saldo Minus! Mohon cek transaksi</div>
                  <!-- End Col -->
                </div>
                <!-- End Row -->
              </div>
            </div>
          </div>
        </div>
<div class="card">
  <div class="card-header bg-light p-2">
    <div class="row">
      <div v-if="filterOption === 'Data'" class="col-10 d-flex align-items-center">
        <select v-model="filterFields" style="font-size: 12px; max-width: 125px;" class="form-select form-select-sm py-1 px-2">
          <option value="">Filter Baris</option>
          <option v-for="list in settings.columns" :value="list.data">{{ list.title }}</option>
        </select>
        
        <select v-model="filterSort" class="mx-2 form-select form-select-sm py-1 px-2" style="font-size: 12px; max-width: 125px;">
          <option value="">Mulai Dari</option>
          <option value="asc">Atas</option>
          <option value="desc">Bawah</option>
        </select>
        <div class="input-group" style="width: 200px;">  
          <div class="input-group-prepend">
            <span class="input-group-text py-1 px-2"><i class="bi-search" style="font-size: 10px;"></i></span>
          </div>
          <input v-model="filter" type="text" class="form-control form-control-sm p-1" placeholder="Cari Data..." aria-label="Recipient's username" aria-describedby="basic-addon2" style="font-size: 12px;">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary btn-xs" type="button" @click="filter = ''">hapus</button>
          </div>
        </div>
        <select class="mx-2 form-select form-select-sm py-1 px-2" style="font-size: 12px; max-width: 50px;">
          <option value="and">dan</option>
          <option value="or">atau</option>
        </select>
        <div v-for="list in filterList" class="input-group ms-2" style="width: 125px;">  
          <input v-model="list.filter" :disabled="filter === ''" type="text" class="form-control form-control-sm p-1" placeholder="..." aria-label="Recipient's username" aria-describedby="basic-addon2" style="font-size: 12px;">
        </div>
        <i class="bi-plus-circle text-primary ms-1" style="cursor: pointer" @click="addFilter"></i>
        <i class="bi-x-circle text-danger ms-1" style="cursor: pointer" @click="removeFilter"></i>
        <button class="btn btn-outline-secondary btn-xs ms-1" type="button">cari</button>
        <button class="btn btn-outline-secondary btn-xs ms-1" type="button" @click="resetFilter">reset</button>
      </div>
      <div v-else-if="filterOption === 'Period'" class="col-10 d-flex align-items-center">
        <span style="font-size: 12px;" class="me-2">Periode Waktu :</span>
        <div class="input-group" style="width: 125px;">
          <input v-model="startDate" type="date" class="form-control form-control-sm p-1" placeholder="Cari Data..." aria-label="Recipient's username" aria-describedby="basic-addon2" style="font-size: 12px;">
        </div>       
        <span style="font-size: 12px;" class="mx-3">Sampai</span>
        <div class="input-group" style="width: 125px;">
          <input v-model="endDate" type="date" class="form-control form-control-sm p-1" placeholder="Cari Data..." aria-label="Recipient's username" aria-describedby="basic-addon2" style="font-size: 12px;">
        </div>
        <span style="font-size: 12px;" class="mx-3">-</span>
        <select v-model="filterSort" class="mx-2 form-select form-select-sm py-1 px-2" style="font-size: 12px; max-width: 125px;">
          <option value="">Mulai Dari</option>
          <option value="asc">Atas</option>
          <option value="desc">Bawah</option>
        </select>
        <button class="btn btn-outline-secondary btn-xs ms-1" type="button">cari</button>
        <button class="btn btn-outline-secondary btn-xs ms-1" type="button" @click="resetFilter">reset</button>
      </div>
      
      <div class="col-2 d-flex justify-content-end" style="z-index: 2">

        <b-button-group>
            <b-dropdown id="dropdown1" variant="primary" class="dropdown-without-icon" size="xs" right>
                <template #button-content>
                    <i class="bi-funnel-fill pe-1"></i>Filter
                </template>
                <b-dropdown-item :active="filterOption === 'Data'" @click="filterOption = 'Data'">Filter by Data</b-dropdown-item>
                <b-dropdown-item :active="filterOption === 'Period'" @click="filterOption = 'Period'">Filter by Period</b-dropdown-item>
            </b-dropdown>
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
  <div class="card-body p-2">
    <div class="d-flex align-items-center justify-content-between">
    <span style="font-size: 11px;">{{ dataRangeText }}</span>
    <nav aria-label="...">
  <ul class="pagination pagination-sm m-0">
    <li class="page-item">
      <a class="page-link" href="#" style="font-size: 12px"><i class="bi-chevron-double-left"></i></a>
    </li>
    <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item" :class="{active: currentPage === pageNumber}">
      <a class="page-link" href="#" style="font-size: 12px">{{ pageNumber }}</a>
    </li>
    <li>
      <a class="page-link" href="#" style="font-size: 12px"><i class="bi-chevron-double-right"></i></a>
    </li>
  </ul>
</nav>
</div>
    <hr class="my-2">
    <hot-table :settings="settings" :data="hotData" :rowHeaders="true" :colHeaders="true" :colWidths="tableWidth" style="z-index:0"></hot-table>
  </div>
</div>
</div>
</template>

<script> 
  import {getA, getF} from './services/components'
import numberCounter from '../components/niceTo/numberCounter'
import {kasbankByMonth} from './function/exportPDF'

export default {
    components: {
      numberCounter
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
      filterList: [{filter: ''}],
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
      if(this.data !== undefined) {
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
      month = '0'+month
    }
    this.getDate = year+'-'+month
  this.getData()
  },
  created() {
    this.initializeCheckedFields();
  },
  methods: {
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
        const data = await getA(year, month)
        this.optionsData = data
        
        this.listData()
    },
    async listData() {
      const [year, month] = this.getDate.split('-');
      const neraca = await getF(year, month)
      this.neraca = neraca
      console.log('neraca ',neraca)
      let saldoAwal = ''
      let saldoAkhir = ''
      let cok = ''
      this.hotData.splice(0, this.hotData.length)
      console.log('total data', this.hotData)
      if (this.newData == null || this.newData.length === 0){
        saldoAwal = neraca.saldoAwal.reduce((sum, item) => {
        const amount = parseFloat(item.FaPriceBegining);
        return sum + amount
      }, 0);
        saldoAkhir = neraca.saldoAkhir.reduce((sum, item) => {
        const amount = parseFloat(item.FaPriceEnd);
        return sum + amount
      }, 0);

        cok = this.optionsData.flatMap(item => item.coaTrans).map(x => {
          const minus = {
            ...x
          }
            if(x.transAmount.startsWith('-')) {
              minus.transAmount = x.transAmount.slice(1)
            } else {
              minus.transAmount = x.transAmount
            }
            minus.transAmount = this.formatNumber(minus.transAmount)
          return minus
        })
      this.hotData.push(...cok)
      } else if (this.newData._id !== '' && this.newData._id !== undefined) {        
        const data = this.optionsData.find(x => x._id === this.newData._id)
      this.hotData.push(...data.coaTrans.map(x => {
        const value = {
          ...x
        }
        if (x.transAmount.startsWith('-')) {
          value.transAmount = value.transAmount.slice(1)
        }
        return value
      }))
        saldoAwal = parseFloat(neraca.saldoAwal.find(x => x._id === this.newData._id).FaPriceBegining)
        saldoAkhir = parseFloat(neraca.saldoAkhir.find(x => x._id === this.newData._id).FaPriceEnd)
      }
      
      let saldoMasuk = ''
      let saldoKeluar = ''

        saldoMasuk = this.hotData.filter(x => x.transType === 'debet').reduce((sum, item) => sum + parseFloat(item.transAmount.replace(/\./g, '').replace(',', '.')), 0)
        saldoKeluar =this.hotData.filter(x => x.transType === 'kredit').reduce((sum, item) => sum + parseFloat(item.transAmount.replace(/\./g, '').replace(',', '.')), 0)
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
          item.value = saldoAkhir
        }
      })
    },
    customLabel(option) {
        return `${option.coaCode} (${option.coaName})`;
    },
      addList() {
        const link = '/transaksi/'+this.routingLink+'/add'
        this.$router.push(link)
      },
    resetFilter() {
      this.filter = ''
      this.filterFields = ''
      this.filterSort = ''
      this.filterList = [{filter: ''}]
      this.startDate = ''
      this.endDate = ''
    },
    addFilter() {
      if (this.filter !== '') {
      this.filterList.push({filter: ''})
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
      this.$router.push({name: 'transaksi-detail', params: {data} })
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