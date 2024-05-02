<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      
      <b-modal v-model="modalOpen" title="List Purchase Request" @ok="saveModalData" @hide="closeModal" :ok-disabled="modalInput.length < 1 || dataItem.length < 1">
        <!-- Modal content here, e.g., input fields to collect data -->
        <b-form-group label="Pilih PR :" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8" content-cols-lg="9"
          invalid-feedback="Condition Harus Diisi!">
          <multiselect class="my-1" v-model="modalInput" :options="prList" placeholder="Pilih PR"
            :multiple="false" :show-labels="false" :allow-empty="required" :custom-label="customLabel0">
          </multiselect>
        </b-form-group>

        <template v-if="modalInput.PrNo">
          <b-form-group label="Pilih Item :" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8" content-cols-lg="9"
          invalid-feedback="Condition Harus Diisi!">
          <multiselect class="my-1" v-model="dataItem" :options="modalInput.PrItemDetails" placeholder="Pilih PR"
            :multiple="false" :show-labels="false" :allow-empty="required" :custom-label="customLabel1">
          </multiselect>
        </b-form-group>
        </template>
        <template v-if="dataItem.itemName">
          <b>Data Item</b>
          <div class="row">
            <div class="col-sm-4 col-lg-3">Kode :</div><div class="col-sm-8 col-lg-9">{{ dataItem.itemId }}</div>
            <div class="col-sm-4 col-lg-3">Nama :</div><div class="col-sm-8 col-lg-9">{{ dataItem.itemName }}</div>
            <div class="col-sm-4 col-lg-3">Item UoM :</div><div class="col-sm-8 col-lg-9">{{ dataItem.itemUm }}</div>
            <div class="col-sm-4 col-lg-3">Item Qty :</div><div class="col-sm-8 col-lg-9">{{ dataItem.itemQty }}</div>
          </div>
        </template>
      </b-modal>
      <transaksiAddPO :posts="posts" :component="refreshComponent" :hotSettings="hotSettings" :widthTable="contentDivWidth" :excelData="excelData"></transaksiAddPO>
    </div>
  </main>
</template>

<script>
import { get1, getSupplier, getK, getN } from '../../components/services/components'
import transaksiAddPO from '../../components/transaksi/transaksiAddPO.vue'
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import { formatNumber } from '../../components/function/number'

// register Handsontable's modules
registerAllModules();
export default {
  components: {
    transaksiAddPO, HotTable
  },
  data() {
    return {
      dataItem: [],
      prList: [],
      modalOpen: false,
      modalInput: [],
      modalRow: null,
      modalCol: null,
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
    const tes = await getK()
    this.prList = tes.filter(x => x.PrItemDetails.length > 0)
    this.posts = await get1(this.$route.name);
    this.getComponent();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    this.hotSettings.columns.find(x => x.data === 'PrCode').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'itemCode').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'itemName').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'uom').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'qty').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'tableTotal').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'PrCode').renderer = this.prRenderer
    this.hotSettings.columns.find(x => x.data === 'itemCode').renderer = this.itemRenderer
    this.hotSettings.columns.find(x => x.data === 'tableTotal').renderer = this.totalRenderer
    this.hotSettings.columns.find(x => x.data === 'qty').width = 100
    const dataObject = trueFields.reduce((acc, obj) => {
      acc[obj.data] = "";
      return acc
    }, {});

    for (let i = 0; i < 1000; i++) {
      const key = `row_${i}`;
      const objectAdd = { ...dataObject, key }
      this.excelData.push(objectAdd)
    }
    this.moreFunction();
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
    customLabel0(option) {
      return `${option.PrNo} (By: ${option.PrRequestBy})`;
    },
    customLabel1(option) {
      return `${option.itemName} (${option.itemId})`;
    },
    openModal(data, row) {
      if (data.PrCode !== '') {
        this.modalInput = data.PrCode
        this.dataItem = data.itemCode
      }
      console.log(data, row)
      this.modalOpen = true;
      this.modalRow = row;
    },
    saveModalData() {
      this.excelData[this.modalRow].PrCode = this.modalInput
      this.excelData[this.modalRow].itemCode = this.dataItem
      this.excelData[this.modalRow].itemName = this.dataItem.itemName
      this.excelData[this.modalRow].uom = this.dataItem.itemUm
      this.excelData[this.modalRow].qty = this.dataItem.itemQty
      this.excelData = [...this.excelData]
    },
    closeModal() {
      this.modalInput = []
      this.modalRow = null;
      this.dataItem = []
      this.modalOpen = false;
    },
    totalRenderer(instance, td, row, col, prop, value, cellProperties) {
      const rowData = this.excelData[row];
      let total = rowData.qty*rowData.harga
      if (total <= 0 || isNaN(total)) {
        total = null
      } else {
        total
      }
      rowData.tableTotal = total

      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'text-start'
      buttonsContainer.innerHTML = formatNumber(total)
      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    itemRenderer(instance, td, row, col, prop, value, cellProperties) {
      const rowData = this.excelData[row];
      let dataDiv = ''
      if (rowData.itemCode === '' || rowData.itemCode === null || rowData.itemCode.itemId === undefined) {
        dataDiv = null
      } else {
        dataDiv = rowData.itemCode.itemId
      }

      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');
      buttonsContainer.innerHTML = dataDiv
      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    prRenderer(instance, td, row, col, prop, value, cellProperties) {
      const rowData = this.excelData[row];
      let dataDiv = ''
      let classDiv = 'd-flex align-items-center justify-content-between'
      if (rowData.PrCode === '' || rowData.PrCode === null) {
        dataDiv = null
        classDiv = 'd-flex align-items-center justify-content-between flex-row-reverse'
      } else {
        dataDiv = rowData.PrCode.PrNo
      }

      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = classDiv
      buttonsContainer.innerHTML = dataDiv
      // Create the first button
      const button1 = document.createElement('button');
      button1.innerHTML = '<i class="bi-eye"></i>';
      button1.className = 'btn btn-xs btn-outline-secondary px-1 py-0 rounded-circle'
      button1.type = 'button'
      button1.addEventListener('click', () => {
        // Handle button 1 click event
        // this.handleButtonClick(rowData, 1);
        this.openModal(rowData, row)
      });
      buttonsContainer.appendChild(button1);

      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    async moreFunction() {
      const apiSupplier = await getSupplier()
      const apiShipTo = await getN()

      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => {
          if (z.microType === 'multiselect') {
            if (z.key === 'supplier') {
              z.microOptions = apiSupplier
            } else if (z.key === 'shipTo') {
              z.microOptions = apiShipTo
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
          totalNumber = parseInt(totalNumber) + (-1 * parseInt(x.value))
          }
        } else if (x.microMath === 'plus') {
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
          totalNumber = parseInt(totalNumber) + parseInt(x.value)
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