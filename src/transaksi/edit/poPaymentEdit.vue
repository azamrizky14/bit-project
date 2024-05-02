<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <transaksiEdit :posts="posts" :component="component" :hotSettings="hotSettings" :widthTable="contentDivWidth" :dataDetail="dummyData" :refreshMethods="refreshValue()"></transaksiEdit>
    </div>
  </main>
</template>

<script>
import { get1 } from '../../components/services/components'
import transaksiEdit from '../../components/transaksi/transaksiEdit.vue'
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
    transaksiEdit, HotTable
  },
  data() {
    return {
      dummyData: [],
      detailData: [],
      contentDivWidth: 0,
      excelData: [],
      hotSettings: {
        afterChange: this.refreshValue,
        licenseKey: 'non-commercial-and-evaluation',
        height: 200,
        colHeaders: true,
        
        rowHeaderWidth: 35,
        startRows: 10,
        columns: [
        ]
        // Other Handsontable settings
      },
      component: [],
      posts: {},
      itemTable: []
    };
  },
  async mounted() {
    console.log(this.$route.name)
    this.posts = await get1(this.$route.name);
    this.getComponent();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    const dataObject = trueFields.reduce((acc, obj) => {
      acc[obj.data] = "";
      return acc
    }, {});

    const startIndex = this.dataDetail.table.length;
    const endIndex = 1000;
    for (let i = startIndex; i<endIndex; i++) {
      const key = `row_${i}`;
      const objectAdd = {...dataObject, key}
      this.dummyData.table.push(objectAdd)
    }
    if (this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.length > 0) {
      this.getTotalData();
      this.getTotalAuto();
    }
    this.findData()

    this.$nextTick(() => {
      this.getContentWidth();
    });
  },
  created() {
    this.dummyData = JSON.parse(JSON.stringify(this.dataDetail))
  },
  methods: {
    refreshValue() {
    if (this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.length > 0) {
      this.getTotalData();
      this.getTotalAuto();
    }
    },
    sumProperty(property) {
      return this.dummyData.table.reduce((sum, entry) => parseInt(sum) + entry[property], 0);
    },
    getTotal(property) {
      return this.sumProperty(property);
    },
    getTotalData() {
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.filter(x => x.key !== 'total' && x.editableTotal !== true).forEach(item => {
        item.value = parseInt(this.getTotal(item.key));
      });
    },
    getTotalAuto() {
      let totalNumber = 0
      const totalValue = this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro
      totalValue.filter(x => x.key !== 'total')
      .forEach((x) => {
        if (x.microMath === 'minus') {
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
          totalNumber = parseInt(totalNumber) + (-1 * x.value)
          }
        } else if (x.microMath === 'plus') {
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
          totalNumber = parseInt(totalNumber) + x.value
          }
        } else {
          
        }
      })
      let finalNumber = totalNumber
      totalValue.filter(x => x.key !== 'total' && x.microMath !== 'minus' && x.microMath !== 'plus')
      .forEach((x) => {
        if (x.microMath === 'percent-minus') {
          if (Number.isNaN(x.value)) {
            finalNumber += 0
          } else {
            finalNumber -= (parseInt(totalNumber) * x.value / 100)
          }
        } else if (x.microMath === 'percent-plus') {
          if (Number.isNaN(x.value)) {
            finalNumber += 0
          } else {
            finalNumber += (parseInt(totalNumber) * x.value / 100)
          }
        } else {
          
        }
        
      })
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = finalNumber

    },
    findData() {
      const headerData = this.dummyData.header[0];
      const footerData = this.dummyData.footer[0];
      const combinedData = {...headerData, ...footerData}
      this.detailData = Object.entries(combinedData).map(([key, value]) => ({
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
      for (let i = 0; i < widthTes.length; i++) {
        if (widthTes[i].width >= 0 || widthTes[i].width !== undefined) {
          columns += widthTes[i].width
        }
      }
      if (contentDiv) {
        this.contentDivWidth = (contentDiv.offsetWidth - 85 - columns) / tes;
      }
    },
    async getComponent() {
      this.component = this.posts.transProperties.find(({ dataName }) => dataName === "menuEdit").dataMicro
    },
    getFieldTable() {
      const fields = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      const trueFields = fields.map((x) => {
        if (x.microType === 'date') {
          return { data: x.key, title: x.microName, type: x.microType, width: 100 }
        } else if (x.microType === 'numeric') {
          return { data: x.key, title: x.microName, type: x.microType, width: 125, renderer: (instance, td, row, col, prop, value) => { if (typeof value === 'number') { const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); td.innerText = formattedValue; } else { td.innerText = value } }, validator: (value, callback) => { if (value > 1000000000000 || value < 0) { callback(false); } else { callback(true) } } }
        } else {
          if (x.width <= 0) {
            return { data: x.key, title: x.microName, type: x.microType, className: x.microClass}
          } else {
            return { data: x.key, title: x.microName, type: x.microType, width: x.width, className: x.microClass}
          }
        }
      })
      return trueFields
    }
  },
};
</script>