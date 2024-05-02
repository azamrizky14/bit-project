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
            <router-link :to="{name : posts.transRouting.replace('-edit', '')}">
              <a href="#">{{ posts.transTitle }}</a>
            </router-link>
          </li>
          <li>Edit</li>
        </ul>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <router-link :to="{name : posts.transRouting.replace('-edit', '')}"><button class="btn btn-outline-secondary btn-xs py-1 me-2" type="button"><i class="bi-chevron-left"></i>Kembali</button></router-link>
        <button class="btn btn-success btn-xs py-1" @click.prevent="sendData">Edit</button>
      </div>
    </div>
    <div class="row scale-9" style="width: 114%;">
      <div v-for="(field, index) in dummyItems" :class="[field.componentClass]" v-if="field.componentName === 'fieldHeader'" :key="index">
        <div class="card h-100">
          <div class="row px-3">
          <div v-for="micro in field.componentMicro" :class="['', micro.microClass]">
            <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
              content-cols-lg="9">
              <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                :placeholder="micro.microText" required></b-form-input>
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
                :placeholder="micro.microText" v-model="micro.value"></textarea>
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
                <input :disabled="!micro.editableTotal" :type="micro.microType" v-model="micro.value"
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

// register Handsontable's modules
registerAllModules();
export default {
  components: {
    HotTable
  },
  props: {
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
        dummy[key] = {...this.component[key]}
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
    sendData() {
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
      const finalTable = this.dataDetail.table
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