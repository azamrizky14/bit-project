<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <transaksiAddPayment :posts="posts" :component="refreshComponent" :hotSettings="hotSettings" :widthTable="contentDivWidth" :excelData="excelData" :refreshMethods="refreshValue"></transaksiAddPayment>
    </div>
  </main>
</template>

<script>
import { get1, getSupplier, getCoa } from '../../components/services/components'
import transaksiAddPayment from '../../components/transaksi/transaksiAddPayment.vue'
import { formatNumber } from '../../components/function/number'
export default {
  components: {
    transaksiAddPayment
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
    this.moreFunction();
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
    async moreFunction() {
      const apiSupplier = await getSupplier()
      const apiPayment = await getCoa()
      console.log(apiPayment)

      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => {
          if (z.microType === 'multiselect') {
            if (z.key === 'supplier') {
              z.microOptions = apiSupplier
            } else if (z.key === 'payMethod') {
              z.microOptions = apiPayment.coaCashBank
            } 
          }
        })
      })
    },
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
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.filter(x => x.key !== 'total' && x.editableTotal !== true).forEach(item => {
        item.value = this.getTotal(item.key);
      });
      
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.filter(x => x.key !== 'total' && x.editableTotal !== false).forEach(item => {
        item.value = 0
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
          totalNumber = parseInt(totalNumber) + (-1 * parseInt(x.value))
          }
        } else if (x.microMath === 'plus') {
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
          totalNumber = parseInt(totalNumber) + parseInt(x.value)
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
            finalNumber -= (parseInt(totalNumber) * parseInt(x.value) / 100)
          }
        } else if (x.microMath === 'percent-plus') {
          if (Number.isNaN(x.value)) {
            finalNumber += 0
          } else {
            finalNumber += (parseInt(totalNumber) * parseInt(x.value) / 100)
          }
        } else if (x.microMath === 'extra-plus') {
          if (Number.isNaN(x.value)) {
            finalNumber += 0
          } else {
            finalNumber += (parseInt(x.value))
          }
        } else if (x.microMath === 'extra-minus') {
          if (Number.isNaN(x.value)) {
            finalNumber -= 0
          } else {
            finalNumber -= (parseInt(x.value))
          }
        } else {}
        
      })
      if (finalNumber < 0) {
        this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = 0
      } else {
        this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = formatNumber(finalNumber)
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
    },  
  },
};
</script>