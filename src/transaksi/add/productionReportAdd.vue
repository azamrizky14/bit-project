<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <transaksiAdd :posts="posts" :component="refreshComponent" :hotSettings="hotSettings" :widthTable="contentDivWidth" :excelData="excelData"></transaksiAdd>
    </div>
  </main>
</template>

<script>
import { get1 } from '../../components/services/components'
import transaksiAdd from '../../components/transaksi/transaksiAdd.vue'
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

// register Handsontable's modules
registerAllModules();
export default {
  components: {
    transaksiAdd, HotTable
  },
  data() {
    return {
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
          { data: 'tes', type: 'numeric' }
        ]
        // Other Handsontable settings
      },
      component: [],
      posts: [],
      itemTable: []
    };
  },
  async mounted() {
    this.posts = await get1(this.$route.name);
    this.getComponent();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    const dataObject = trueFields.reduce((acc, obj) => {
      acc[obj.data] = "";
      return acc
    }, {});

    for (let i = 0; i < 1000; i++) {
      const key = `row_${i}`;
      const objectAdd = { ...dataObject, key }
      this.excelData.push(objectAdd)
    }
    if (this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.length > 0) {
      this.getTotalData();
      this.getTotalAuto();
    }
    this.getContentWidth();
  },
  computed: {
    refreshComponent() {
      return this.component.map(item => ({
        ...item
      }))
    }
  },
  methods: {
    refreshValue() {
      this.getTotalData();
      this.getTotalAuto();
    },
    sumProperty(property) {
      return this.excelData.reduce((sum, entry) => parseInt(sum) + entry[property], 0);
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
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
          totalNumber = parseInt(totalNumber) + (-1 * x.value)
          }
        } else {
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
          totalNumber = parseInt(totalNumber) + x.value
          }
        }
      })
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = totalNumber

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
      this.component = this.posts.transProperties.find(({ dataName }) => dataName === "menuAdd").dataMicro
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
            return { data: x.key, title: x.microName, type: x.microType }
          } else {
            return { data: x.key, title: x.microName, type: x.microType, width: x.width }
          }
        }
      })
      return trueFields
    },  
  },
};
</script>