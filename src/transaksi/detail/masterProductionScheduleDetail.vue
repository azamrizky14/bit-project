<template>
  <main id="content" role="main" class="main">
        <div class="content container-fluid p-3 ps-0" ref="contentDiv">
          <div class="row scale-9 ms-1">
            <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldHeader'">
              <div class="card">
              <div v-for="micro in field.componentMicro" class="px-3">
                <b-form-group disabled
                  :label="micro.microName+' :'"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm="8"
                  content-cols-lg="9">
                <b-form-input
                  :class="['form-control form-control-sm py-1 ', micro.microClass]"
                  v-model="micro.value"
                  :type="micro.microType"
                  :placeholder="micro.microText"></b-form-input>
                </b-form-group>
              </div>
            </div>

            </div>
          </div>
          <div class="row mb-3 px-3">
            <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTable'">
              <div class="" v-if="field.componentMicro.length <= 5">
                <div class="hot-container">
                  <hot-table :settings="hotSettings" :data="dataDetail.dataTable" :rowHeaders="true" :colHeaders="true" readOnly :colWidths="contentDivWidth"></hot-table>
                </div>
              </div>              
              <div class=" row" v-else>                
                <div class="hot-container col-md-12" style="overflow-x: auto">
                  <hot-table :settings="hotSettings" :data="dataDetail.dataTable" :rowHeaders="true" :colHeaders="true" :colWidths="contentDivWidth"></hot-table>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-3 px-3">
            <div class="col-md-6 scale-9">
            <div v-for="field in component" :class="['h-100',field.componentClass]" v-if="field.componentName === 'fieldNote'">
              <div class="card h-100">
              <div class="card-header bg-light py-1">{{ field.componentTitle }}</div>
              <template v-for="micro in field.componentMicro" >
                <textarea disabled
                  class="form-control form-control-sm py-1 h-100"
                  style="resize: none"
                  v-model="micro.value"
                  :placeholder="micro.microText" ></textarea>
              </template>
            </div>
            </div>

            </div>
            <div class="col-md-6 row p-0 scale-9" style="transform-origin: right top">
              <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTotal'">
                <div class="row d-flex justify-content-end" v-for="micro in field.componentMicro">
                  <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{ micro.microName }} :</div>
                  <div :class="['p-0 border border-light', micro.microClass]">
                    <input disabled :type="micro.microType" v-model="micro.value" class="form-control form-control-sm py-1" style="text-align: right">
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
    </main>
</template>

<script>
 import { HotTable } from '@handsontable/vue';
  import { registerAllModules } from 'handsontable/registry';
  import 'handsontable/dist/handsontable.full.css';

  // register Handsontable's modules
  registerAllModules();
export default {
  props: {
    dataDetail: {
      type: Object,
      required: true,
    }
  },
    components: {
      HotTable
    },
  data() {
    return {
      fieldContent: [],
      detailData: [],
      contentDivWidth: 0,
      excelData: [],
      hotSettings: {
        licenseKey: 'non-commercial-and-evaluation',
        height: 200,
        colHeaders: true,
        readOnly: true,
        
        rowHeaderWidth: 35,
        startRows: 10,
        columns: [],
        filters: true, // Enable the filters plugin
        dropdownMenu: [
          'alignment', 'filter_by_condition', 'filter_operators', 'filter_by_value', 'filter_action_bar'
        ],
        columnSorting: true // Enable column sorting
      },
      component: [],
      posts: [],
      itemTable: []
    };
  },
  async mounted() {
    this.posts = await this.getPost();
    this.getComponent();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    const btnMenu = this.component.find(({ componentName }) => componentName === "routingButton").componentMicro
    this.$store.commit('setTopbarTitle', 'Detail - ' + this.posts.transTitle);
    this.$store.commit('setRouting', this.posts.transRouting);
    this.$store.commit('setBtnList', btnMenu)
    const totalRow = 1000;
    this.excelData = Array.from({length: totalRow}, () => ({}))
    this.findData()
    this.getContentWidth();
    this.getTotalData();
    this.getTotalAuto();
  },
  methods: {
    sumProperty(property) {
      return this.dataDetail.dataTable.reduce((sum, entry) => sum + entry[property], 0);
    },
    getTotal(property) {
      return this.sumProperty(property);
    },
    getTotalData() {
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.filter(x => x.key !== 'total').forEach(item => {
        item.value = this.getTotal(item.key);
      });
    },
    getTotalAuto() {
      let totalNumber = 0
      const totalValue = this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro
      let totalList = totalValue.filter(x => x.key !== 'total')
      totalList = totalList.forEach((x) => {
        if (x.microMath === 'minus') {
          totalNumber = totalNumber + (-1 * x.value)
        } else {
          totalNumber = totalNumber + x.value
        }
      })
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = totalNumber
    },
    findData() {
      this.detailData = Object.entries(this.dataDetail).map(([key, value]) => ({
        key,
        value 
      }));
      this.component.forEach(component => {
        component.componentMicro.forEach(item => {
          const matchedObject = this.detailData.find(obj => obj.key === item.key);
          if (matchedObject) {
            item.value = matchedObject.value
          }
        })
      })

    },
    getContentWidth() {
      const contentDiv = this.$refs.contentDiv;
      let columns = 0;
      const tes = this.hotSettings.columns.filter(x => x.type === 'text' && !x.width).length
      const widthTes = this.hotSettings.columns
      for (let i  = 0; i < widthTes.length; i++) {
        if (widthTes[i].width >= 0 || widthTes[i].width !== undefined) {
          columns += widthTes[i].width
        }
      }
      if (contentDiv) {
        if (this.hotSettings.columns.length > 5) {
          this.contentDivWidth = (contentDiv.offsetWidth - 85)/4;
        } else {
          this.contentDivWidth = (contentDiv.offsetWidth - 85 - columns)/tes;
        }
      }
    },
    async getPost() {
      const mockResponse = await this.fetchPosts(); 
      return mockResponse[0]
    },
    async getComponent() {
      this.component = this.posts.transProperties.find(({ dataName }) => dataName === "menuAdd").dataMicro
    },
    getFieldTable() {        
        const fields = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
        this.fieldContent = fields
        const trueFields = fields.map((x) => {
          if (x.microType === 'date') {
            return {data: x.key, title: x.microName, type: x.microType, width: 100}
          } else if (x.microType === 'numeric') {
            return {data: x.key, title: x.microName, type: x.microType, width: 125, renderer: (instance, td, row, col, prop, value) => {if (typeof value === 'number') {const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); td.innerText = formattedValue;} else {td.innerText = value}} ,validator: (value, callback) => {if (value > 1000000000000 || value < 0) {callback(false);} else {callback(true)}}}
          } else {
            if (x.width <= 0) {
            return {data: x.key, title: x.microName, type: x.microType}
            } else {
            return {data: x.key, title: x.microName, type: x.microType, width: x.width}
            }
          }
        })
        return trueFields
    },
    fetchPosts() {
      // Mocking the API response
      var mockResponse = [
        {
            transTitle: 'Master Production Schedule (MPS)',
            transRouting: 'master-production-schedule',
          transProperties: [
            {dataName: 'menuAdd', dataMicro: [
              {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
                {key: 'code', microName: 'General Jurnal', microType: 'text', microText: 'Masukan general jurnal', microClass: 'my-2'},
                {key: '_id', microName: 'Kode Jurnal', microType: 'text', microText: 'Masukan Kode Jurnal', microClass: 'my-2'},
              ]},
              {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
                {key: 'user', microName: 'User Input', microType: 'text', microText: 'Masukan User Input', microClass: 'my-2'},
                {key: 'date', microName: 'Tanggal Input', microType: 'date', microText: 'Masukan tanggal', microClass: 'my-2'},
              ]},
              {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
                {key: 'tableDate',microName: 'Tanggal', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
                {key: 'tableName',microName: 'Nama Akun', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
                {key: 'tableDesc',microName: 'Deskripsi', microType: 'text', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
                {key: 'tableReff',microName: 'Kode Reff', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
                {key: 'tableCredit',microName: 'Kredit', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
                {key: 'tableDebit',microName: 'Debit', microType: 'numeric', width:0, microText: 'Masukan Unit', microClass: ''},
              ]},
              {componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
                {key: 'note',microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: ''}
              ]},
              {componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
                {key: 'tableCredit',microName: 'Total Kredit', microType: 'number', microMath: 'plus', microClass: 'col-md-4'},
                {key: 'tableDebit',microName: 'Total Debit', microType: 'number', microMath: 'minus', microClass: 'col-md-4'},
                {key: 'total',microName: 'Total', microType: 'number', microClass: 'col-md-4'}
              ]},
              {componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
                {key: 'back',microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light'},
                {key: 'edit',microName: 'Edit', microRouting: 'edit', microText: 'Edit', microClass: 'btn-success'}
              ]},
            ]}
          ],
          transData: [
            {
              _id:'001', customerAccount: 'CUST001', recordType: 'Organization', customerName: 'Mohammed Aamer', currency: 'USD', customerGroup: 10
            },
            {
              _id:'002', customerAccount: 'CUST001', recordType: 'Organization', customerName: 'Mohammed Aamer', currency: 'USD', customerGroup: 10
            },
            {
              _id:'003', customerAccount: 'CUST001', recordType: 'Organization', customerName: 'Mohammed Aamer', currency: 'USD', customerGroup: 10
            },
            {
              _id:'004', customerAccount: 'CUST001', recordType: 'Organization', customerName: 'Mohammed Aamer', currency: 'USD', customerGroup: 10
            },
            {
              _id:'005', customerAccount: 'CUST001', recordType: 'Organization', customerName: 'Mohammed Aamer', currency: 'USD', customerGroup: 10
            }
          ]
        },
      ];
      return mockResponse
    },
  },
};
</script>