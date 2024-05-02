<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <b-modal v-model="modalOpen" title="List Harga" @ok="saveModalData" @hide="closeModal">
        <!-- Modal content here, e.g., input fields to collect data -->
        <b-form-group label="Jenis Harga" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8" content-cols-lg="9"
          invalid-feedback="Condition Harus Diisi!">
          <multiselect class="my-1" v-model="modalInput" :options="priceList" placeholder="Pilih Jenis Harga"
            :multiple="false" :show-labels="false" :allow-empty="required" :custom-label="customLabel0">
          </multiselect>
        </b-form-group>
        <template v-if="modalInput">
          <div class="row">
            <div class="col-sm-4 col-lg-3 text-dark">List Harga</div>
            <div class="col-sm-8 col-lg-9">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center align-middle"><b>Min. Qty</b></th>
                    <th class="text-center align-middle"><b>Harga Satuan</b></th>
                    <th class="text-center align-middle"><b>Diskon</b></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="price in modalInput.priceData">
                    <td>{{ price.priceQty }}</td>
                    <td>{{ formatNumber(price.priceValue) }}</td>
                    <td v-for="discount in price.priceDiscount">{{ discount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </b-modal>
      <b-modal v-model="modalOpenAddOn" title="List Add-On" @ok="saveModalDataAddOn" @hide="closeModalAddOn">
        <!-- Modal content here, e.g., input fields to collect data -->
        <b-form-group label="Jenis Add-On" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8" content-cols-lg="9"
          invalid-feedback="Condition Harus Diisi!">
          <multiselect class="my-1" :options="emptyData" placeholder="Pilih Jenis Add-On" :multiple="false"
            :show-labels="false" :allow-empty="required" :custom-label="customLabel0">
          </multiselect>
        </b-form-group>
      </b-modal>
      <transaksiAddSO :Item="Item" :posts="posts" :component="refreshComponent" :hotSettings="hotSettings"
        :widthTable="contentDivWidth" :excelData="excelData" :refreshMethods="onRefresh"></transaksiAddSO>
    </div>
  </main>
</template>

<script>
import { formatNumber } from '../../components/function/number'
import { getFullDate } from '../../components/function/date'
import { getFieldTable, getComponentAdd, dataTableAdd, refreshValue, getContentWidth } from '../../components/services/transaksi'
import { get1, getUser, getCustomer, getItem } from '../../components/services/components'
import transaksiAddSO from '../../components/transaksi/transaksiAddSO.vue'

export default {
  components: {
    transaksiAddSO
  },
  data() {
    return {
      emptyData: [],
      currentDate: '',
      priceList: [],
      modalOpen: false,
      modalOpenAddOn: false,
      modalInput: [],
      modalRow: null,
      modalCol: null,
      Item: [],
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
    const tes = await getFullDate()
    this.currentDate = tes
    const coba = await getItem()
    this.Item = coba.map(x => ({...x, itemUm: x.itemUM}))
    this.posts = await get1(this.$route.name);
    this.component = await getComponentAdd(this.posts);
    this.hotSettings.columns = await getFieldTable(this.component);
    this.hotSettings.columns.find(x => x.data === 'itemTopping').renderer = this.toppingRenderer
    this.hotSettings.columns.find(x => x.data === 'tableQty').width = 50
    this.hotSettings.columns.find(x => x.data === 'tablePriceCode').renderer = this.buttonRenderer
    this.hotSettings.columns.find(x => x.data === 'tablePriceCode').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'tableUoM').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'tablePrice').renderer = this.numberRenderer
    this.hotSettings.columns.find(x => x.data === 'tablePrice').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'tableTotal').readOnly = true
    this.hotSettings.columns.find(x => x.data === 'tableTotal').renderer = this.totalRenderer
    this.hotSettings.columns.find(x => x.data === 'productCode').source = this.Item.map(x => x.itemCode)
    this.hotSettings.columns.find(x => x.data === 'productName').source = this.Item.map(x => x.itemName)
    await dataTableAdd(this.excelData, this.hotSettings.columns)
    this.moreFunction();
    this.onRefresh();
    this.contentDivWidth = await getContentWidth(this.$refs.contentDiv, this.hotSettings.columns);

  },
  computed: {
    refreshComponent() {
      return this.component.map(item => ({
        ...item
      }))
    }
  },
  methods: {
    formatNumber(data) {
      return formatNumber(data)
    },
    calculateDistribution(array, value) {
      // Sort the array in descending order based on priceQty
      array.sort((a, b) => parseInt(b.priceQty) - parseInt(a.priceQty));

      const distribution = [];
      let remainingValue = value;

      for (const item of array) {
        const priceQty = parseInt(item.priceQty);
        const priceValue = parseInt(item.priceValue);

        if (remainingValue >= priceQty) {
          const count = Math.floor(remainingValue / priceQty);
          distribution.push({ priceQty, count });
          remainingValue -= count * priceQty;
        }
      }

      // Distribute remaining value among available quantities
      for (const item of array) {
        const priceQty = parseInt(item.priceQty);

        if (remainingValue > 0 && remainingValue >= priceQty) {
          distribution.push({ priceQty, count: 1 });
          remainingValue -= priceQty;
        }
      }

      return distribution;
    },
    customLabel0(option) {
      return `${option.priceName} (${option.priceCode})`;
    },
    totalRenderer(instance, td, row, col, prop, value, cellProperties) {
      const rowData = this.excelData[row];
      let total = rowData.tableQty * rowData.tablePrice
      if (total <= 0) {
        total = null
      } else {
        total = formatNumber(total)
      }
      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'text-start'
      buttonsContainer.innerHTML = total
      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    numberRenderer(instance, td, row, col, prop, value, cellProperties) {
      const rowData = this.excelData[row];
      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'text-start'
      buttonsContainer.innerHTML = formatNumber(rowData.tablePrice)
      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    buttonRenderer(instance, td, row, col, prop, value, cellProperties) {
      const rowData = this.excelData[row];
      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');
      let classBody = ''
      if (rowData.tablePriceCode !== '' && rowData.tablePriceCode !== undefined) {
        classBody = 'd-flex justify-content-between h-100'
      } else {
        classBody = 'd-flex justify-content-between h-100 flex-row-reverse'
      }
      buttonsContainer.className = classBody
      // Create the first button
      buttonsContainer.innerHTML = rowData.tablePriceCode
      const button1 = document.createElement('button');
      button1.type = 'button';
      button1.innerHTML = '<i class="bi-search"></i>';
      button1.className = 'btn btn-xs btn-outline-secondary px-1 py-0 rounded-circle'
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
    toppingRenderer(instance, td, row, col, prop, value, cellProperties) {
      let contentData = ''
      let classData = ''
      if (this.excelData[row].itemTopping === '') {
        this.excelData[row].itemTopping = []
      }
      const rowData = this.excelData[row];

      if (rowData.itemTopping.length > 0) {
        contentData = rowData.itemTopping.length + 'Add-on Dipilih'
        classData = 'justify-content-between'
      } else {
        contentData = ''
        classData = ' justify-content-end'
      }
      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'd-flex h-100 ' + classData
      // Create the first button
      buttonsContainer.innerHTML = contentData
      const button1 = document.createElement('button');
      button1.type = 'button';
      button1.innerHTML = '<i class="bi-search"></i>';
      button1.className = 'btn btn-xs btn-outline-secondary px-1 py-0 rounded-circle'
      button1.addEventListener('click', () => {
        // Handle button 1 click event
        // this.handleButtonClick(rowData, 1);
        this.openModalAddOn(rowData, row)
      });
      buttonsContainer.appendChild(button1);

      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    openModal(data, row) {
      this.priceList = []
      this.modalInput = []
      this.modalRow = null;
      if (data.productCode !== '' && data.productCode !== null && data.tablePriceCode === '') {
        this.priceList = this.Item.find(x => x.itemCode === data.productCode).itemMasterPrice
      } else if (data.productCode !== '' && data.productCode !== null && data.tablePriceCode !== '') {
        this.priceList = this.Item.find(x => x.itemCode === data.productCode).itemMasterPrice
        this.modalInput = this.Item.find(x => x.itemCode === data.productCode).itemMasterPrice
          .find(x => x.priceName === data.tablePriceCode)
      } else {
        this.priceList = []
      }
      this.modalOpen = true;
      this.modalRow = row;
    },
    closeModal() {
      this.modalOpen = false;
    },
    openModalAddOn(data, row) {
      this.priceList = []
      this.modalInput = []
      this.modalRow = null;
      if (data.productCode !== '' && data.productCode !== null && data.tablePriceCode === '') {
        this.priceList = this.Item.find(x => x.itemCode === data.productCode).itemMasterPrice
      } else if (data.productCode !== '' && data.productCode !== null && data.tablePriceCode !== '') {
        this.priceList = this.Item.find(x => x.itemCode === data.productCode).itemMasterPrice
        this.modalInput = this.Item.find(x => x.itemCode === data.productCode).itemMasterPrice
          .find(x => x.priceName === data.tablePriceCode)
      } else {
        this.priceList = []
      }
      this.modalOpenAddOn = true;
      this.modalRow = row;
    },
    closeModalAddOn() {
      this.modalOpenAddOn = false;
    },
    saveModalDataAddOn() {
      console.log('tes')

    },
    saveModalData() {
      console.log('tes')
      if (this.modalRow !== null) {
        const totalQty = parseInt(this.excelData[this.modalRow].tableQty)
        let resultValue = null
        if (totalQty > 0) {
          for (const item of this.modalInput.priceData) {
            const itemQty = parseInt(item.priceQty);
            const itemValue = parseInt(item.priceValue);
            if (itemQty === totalQty) {
              resultValue = itemValue;
              break; // Exit the loop when an exact match is found
            } else if (itemQty < totalQty) {
              resultValue = itemValue;
            } else {
              break; // Exit the loop when we've passed the target value
            }
          }
          console.log(resultValue)
          if (resultValue !== null) {
            this.excelData[this.modalRow].tablePriceCode = this.modalInput.priceName
            this.excelData[this.modalRow].tablePrice = resultValue
          } else {
            this.excelData[this.modalRow].tablePriceCode = this.modalInput.priceName
            this.excelData[this.modalRow].tablePrice = this.priceList.find(x => x.priceCode === 'default').priceData[0].priceValue
          }
        } else {
          console.log('cok', this.modalInput)
          if (this.modalInput.priceData.some(x => x.priceQty === '1')) {
            this.excelData[this.modalRow].tablePriceCode = this.modalInput.priceName
            this.excelData[this.modalRow].tablePrice = this.modalInput.priceData[0].priceValue
          } else {
            this.excelData[this.modalRow].tablePriceCode = this.modalInput.priceName
            this.excelData[this.modalRow].tablePrice = this.priceList.find(x => x.priceCode === 'default').priceData[0].priceValue
          }
        }

        this.excelData[this.modalRow].tableTotal = this.excelData[this.modalRow].tableQty * this.excelData[this.modalRow].tablePriceCode
        this.excelData = [...this.excelData]
      }

    },
    refreshValue(changes, source) {
      if (source === 'edit' || source === 'CopyPaste.paste') {
        this.getAllItem(changes);
      }
      this.onRefresh()
    },
    getAllItem(changes) {
      for (const change of changes) {
        const [row, prop, oldValue, newValue] = change;
        this.hotSettings.columns[5].type = 'text'
        const baris = this.excelData[row]
        const findName = this.Item.find(x => x.itemCode === baris.productCode)
        const findCode = this.Item.find(x => x.itemName === baris.productName)

        if (prop === 'productCode' && baris) {
          if (baris.productCode !== null && findName !== undefined) {
            baris.productName = findName.itemName
            baris.tableUoM = findName.itemUm
            if (baris.productName === undefined) {
              baris.productName = null
              baris.productCode = null
              baris.tableUoM = null
            }
          } else {
            baris.productName = null
            baris.productCode = null
            baris.tableUoM = null
            baris.productCode = null
          }
          baris.tablePrice = ""
          baris.tablePriceCode = ""
          this.excelData = [...this.excelData]
        } else if (prop === 'productName' && baris) {
          if (baris.productName !== null && findCode !== undefined) {
            baris.productCode = findCode.itemCode
            baris.tableUoM = findCode.itemUm
          } else {
            baris.productName = null
            baris.productCode = null
            baris.tableUoM = null
          }
          baris.tablePrice = ""
          baris.tablePriceCode = ""
          this.excelData = [...this.excelData]
        } else if (prop === 'tableQty' && baris) {
          if (baris.tableQty < 0) {
            baris.tableQty = null
          } else if (isNaN(baris.tableQty)) [
            baris.tableQty = null
          ]
          this.excelData = [...this.excelData]
          this.saveModalData()
        }
        else {
          console.log('gagal')
        }
      }
    },
    async moreFunction() {
      const apiUser = await getUser()
      const apiCustomer = await getCustomer()

      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => {
          if (z.microType === 'multiselect') {
            console.log(z.key)
            if (z.key === 'sales') {
              z.microOptions = apiUser
            }
            else if (z.key === 'customer') {
              z.microOptions = apiCustomer
            }
          } else if (z.key === 'orderDate') {
            z.value = this.currentDate
          } else if (z.key === 'shipPlan') {
            z.value = this.currentDate
          }
        })
      })
    },
    onRefresh() {
      refreshValue(this.excelData, this.component);
    },
  },
};
</script>