<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <transaksiAddKasbank :posts="posts" :component="refreshComponent" :hotSettings="hotSettings" :widthTable="contentDivWidth" :excelData="excelData" :refreshMethods="onRefresh"></transaksiAddKasbank>
    </div>
  </main>
</template>

<script>
import { getFieldTable, getComponentAdd, dataTableAdd, refreshValue, getContentWidth } from '../../components/services/transaksi'
import { get1, getCoa } from '../../components/services/components'
import transaksiAddKasbank from '../../components/transaksi/transaksiAddKasbank.vue'
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable';

// register Handsontable's modules
registerAllModules();
export default {
  components: {
    transaksiAddKasbank, HotTable
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
      itemTable: [],
      coa: []
    };
  },
  async mounted() {
    this.posts = await get1(this.$route.name);
    this.getComponent();    
    this.coa = await getCoa()
    const fieldHeader = this.component.filter(x => x.componentName === "fieldHeader")
    for(const field in fieldHeader) {
      const fieldInside = fieldHeader[field].componentMicro.find(x => x.key === 'transNo')
      if (fieldInside) {
        fieldInside.microOptions = this.coa.coaCashBank
      }
    }
    const trueFields = await this.getFieldTable();
    this.hotSettings.columns = trueFields;
    this.hotSettings.columns.find(x => x.data === 'Code').source = this.coa.dataList.map(x => x.coaCode)
    this.hotSettings.columns.find(x => x.data === 'Name').source = this.coa.dataList.map(x => x.coaName)
    const dataObject = trueFields.reduce((acc, obj) => {
      acc[obj.data] = "";
      return acc
    }, {});

    for (let i = 0; i < 1000; i++) {
      const key = `row_${i}`;
      const objectAdd = { ...dataObject, key }
      this.excelData.push(objectAdd)
    }
    this.onRefresh()
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
    getTotalValue(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments) 
      const baris = this.excelData[row]
      if (baris.Amount !== '') {
        const total = baris.Amount * (100 - baris.Discount) / 100
        baris.Value = total
        td.innerText = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
      }
    },
    refreshValue(changes, source) {
      if (source === 'edit') {
        this.getAllCOA(changes  );
      }
      else if (source === 'CopyPaste.paste') {
        this.getAllCOA(changes  );
      }
      
      this.onRefresh()
    },
    getAllCOA(changes) {
        for (const change of changes) {
          const [row, prop, oldValue, newValue] = change;
            const  baris = this.excelData[row]
            const findName = this.coa.dataList.find(x => x.coaCode === baris.Code)
            const findCode = this.coa.dataList.find(x => x.coaName === baris.Name)

          if (prop === 'Code' && baris) {
            if (baris.Code !== null && findName !== undefined) {
              baris.Name = findName.coaName
              if (baris.Name === undefined) {
                baris.Name = null
                baris.Code = null
              }
            } else {
              baris.Name = null
              baris.Code = null
            }
            this.excelData = [...this.excelData]
          } else if (prop === 'Name' && baris) {
            if (baris.Name !== null && findCode !== undefined) {
              baris.Code = findCode.coaCode
            } else {
              baris.Name = null
              baris.Code = null
            }
            this.excelData = [...this.excelData]
        } else {
          console.log('gagal')
        }
        }
    },
    onRefresh() {
      refreshValue(this.excelData, this.component);
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
      totalValue.filter(x => x.key !== 'total')
      .forEach((x) => {
        if (x.microMath === 'minus') {
          if (Number.isNaN(x.value || x.value === '')) {
            totalNumber += 0
          } else {
          totalNumber -= parseInt(x.value)
          }
        } else if (x.microMath === 'plus') {
          if (Number.isNaN(x.value || x.value === '')) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
          totalNumber = parseInt(totalNumber) + parseInt(x.value)
          }
        }
      });

      let finalNumber = totalNumber;
  
  totalValue
    .filter((x) => x.key !== 'total' && x.microMath !== 'minus' && x.microMath !== 'plus')
    .forEach((x) => {
      if (x.microMath === 'percent-minus') {
        if (Number.isNaN(x.value) || x.value === '') {
          finalNumber += 0;
        } else {
          finalNumber -= (totalNumber * parseInt(x.value) / 100);
        }
      } else if (x.microMath === 'percent-plus') {
        if (Number.isNaN(x.value) || x.value === '') {
          finalNumber += 0;
        } else {
          finalNumber += (totalNumber * parseInt(x.value) / 100);
        }
      } else if (x.microMath === 'extra-plus') {
        if (Number.isNaN(x.value) || x.value === '') {
          finalNumber += 0;
        } else {
          finalNumber += parseInt(x.value);
        }
      } else if (x.microMath === 'extra-minus') {
        if (Number.isNaN(x.value) || x.value === '') {
          finalNumber -= 0;
        } else {
          finalNumber -= parseInt(x.value);
        }
      }
    });

    if (finalNumber < 0) {
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = 0;
    } else {
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = finalNumber;
    }

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
    async getFieldTable() {
      const fields = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      const trueFields = fields.map((x) => {
        if (x.microType === 'date') {
          return { data: x.key, title: x.microName, type: x.microType, width: 100 }
        } else if (x.microType === 'numeric') {
          return { data: x.key, title: x.microName, type: x.microType, width: x.width, renderer: (instance, td, row, col, prop, value) => { if (typeof value === 'number') { const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); td.innerText = formattedValue; } else { td.innerText = value } }, validator: (value, callback) => { if (value > 1000000000000 || value < 0) { callback(false); } else { callback(true) } } }
        } else if (x.microType === 'dropdown') {
          return { data: x.key, title: x.microName, type: x.microType, source: x.microOption, width: x.width, readOnly: x.readOnly }
        } else if (x.microType === 'renderer') {
          return { data: x.key, title: x.microName, type: 'numeric', width: x.width, readOnly: x.readOnly, renderer: this.getTotalValue }
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