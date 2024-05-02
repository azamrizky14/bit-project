<template  v-if="fields.length > 0">
  <form>
    <div class="row my-1">
      <div class="col-4 d-flex align-items-end">
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
          <li>Detail</li>
        </ul>
      </div>
      <div class="col-4 text-center">
        <span class="h2">Detail {{ posts.transTitle }}</span>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <router-link :to="{ name: posts.transRouting.replace('-detail', '') }"><button
            class="btn btn-outline-secondary btn-xs py-1 me-2" type="button"><i
              class="bi-chevron-left"></i>Kembali</button></router-link>
        <button @click="sendData('confirmPR')"  v-if="confirmData"
            class="btn btn-success btn-xs py-1 me-2" type="button">Confirm</button>
      </div>
      
    <hr class="mb-3 mt-1">
    </div>
    <div class="row scale-9" style="width: 114%;">
      <div v-for="(field, index) in dummyItems" :class="[field.componentClass]"
        v-if="field.componentName === 'fieldHeader'" :key="index">
        <div class="card h-100">
          <div class="row px-3">
            <div v-for="micro in field.componentMicro" :class="['', micro.microClass]">
              <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                content-cols-lg="9">
                <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                  :placeholder="micro.microText" disabled></b-form-input>
              </b-form-group>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row mb-3">
      <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTable'">
        <div class=" row">
          <div class="hot-container col-md-12" style="overflow-x: auto">
            <hot-table :settings="hotSettings" :data="dataDetail.table" :rowHeaders="true" :colHeaders="true"
              :colWidths="widthTable" style="position: relative; z-index: 1"></hot-table>
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
                :placeholder="micro.microText" v-model="micro.value" disabled></textarea>
            </template>
          </div>
        </div>

      </div>
      <div class="col-md-6 row p-0 scale-9" style="transform-origin: right top">
        <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTotal'">
          <div class="row d-flex justify-content-end" v-for="micro in field.componentMicro">
            <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{ micro.microName
            }} :</div>
            <div :class="['p-0 border border-light', micro.microClass]">
              <input disabled @input="refreshMethods" :type="micro.microType" v-model="micro.value"
                class="form-control form-control-sm py-1" style="text-align: right">
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import { postConfirmPR } from '../services/components'

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
    confirmData: {
      type: Array,
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
      type: Object,
      required: true,
    },
    type: {
      type: String,
    }    
  },
  data() {
    return {
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
      return this.component.map(item => ({
        ...item
      }))
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
  mounted() {
  },
  methods: {
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
successAdd() {
  this.$swal(
      'Berhasil!',
      'Data berhasil ditambahkan',
      'success'
  )
},
    refreshFields() {
      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => z.value = '')
      })
      this.component.find(x => x.componentName === 'fieldNote').componentMicro[0].microValue = ''
    },
    sendData(data) {
      // header Data      
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
          if (data === 'confirmPR') {
            try {
              console.log('ini data', this.confirmData)
              // console.log(this.confirmData.PrId, this.confirmData.routingId, this.confirmData.userLogicId, this.confirmData.logic)
              await postConfirmPR(this.confirmData.PrId, this.confirmData.routingId, this.confirmData.userLogicId, this.confirmData.logic)
              this.successAdd();
              this.refreshFields();
              this.$router.push({ name: this.posts.transRouting.replace('-detail', '') })
              window.location.reload();
            } catch (error) {
              alert(error);
            }
          }
        }
      });
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