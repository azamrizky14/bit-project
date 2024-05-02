<template>
  
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 pt-0" ref="contentDiv">
      <ul class="breadcrumb m-1 mt-0">
        <li><a href="#"><i class="bi-house-door"></i></a></li>
        <li>Laporan Inventory</li>
      </ul>
      <!-- Content -->
      <template v-if="isDataLoaded">
        <tableReportStockInventory :header="header" :data="data" :fields="tableFields" :settings="hotSettings" :routingLink="routing"
          :tableWidth="contentDivWidth" :filterText="filterText" />
      </template>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
  
<script>
import { get1, get0, getCoa } from '../components/services/components'
import tableReportStockInventory from '../components/tableReportStockInventory.vue'
export default {
  components: {
    tableReportStockInventory
  },
  data() {
    return {
      filterText: '',
      header: [],
      sendData: {},
      transData: [],
      contentDivWidth: 0,
      routing: '',
      tableFields: [],
      component: [],
      hotSettings: {
        licenseKey: 'non-commercial-and-evaluation',
        colHeaders: true,
        
        rowHeaderWidth: 35,
        startRows: 10,
        readOnly: true,
        columns: [],
      },
      data: [],
      isDataLoaded: false,
      posts: [],
      coaList: [],
    };
  },
  async mounted() {
    console.log(this.$route.name.replace('report-',''))

    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // let month = currentDate.getMonth() + 1; 
    // if (month < 10) {
    //   month = '0'+month
    // }

    this.coaList = await getCoa()
    this.posts = await get1('kasbank-v2');

    const transData = (await get0('kasbank')).masterData;
    this.posts.transData = transData
    this.getComponent();
    this.getHeader();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    this.isDataLoaded = true;
    this.routing = this.posts.transRouting
    // this.data = this.getData()
    this.$nextTick(() => {
      this.getContentWidth();
    });
  },
  computed: {
    filteredTableData() {
      const filterText = this.filterText.toLowerCase().trim();
      return this.coaList.coaCashBank.filter((row) => {
        for (let key in row) {
          const value = String(row[key]);
          if (value.toLowerCase().includes(filterText)) {
            return true
          }
        }
        return false
      });
    },
  },
  methods: {
    sumProperty(property, condition) {
      if (condition !== '') {
        condition = 'item.'+ condition
        const filterFunction = new Function('item', `return ${condition}`);
        console.log(this.posts.transData.filter(filterFunction))
        return this.posts.transData.filter(filterFunction).reduce((sum, entry) => parseInt(sum) + entry[property], 0);
      } else {
        return this.posts.transData.reduce((sum, entry) => parseInt(sum) + entry[property], 0);
      }
    },
    getTotal(property, condition) {
      return this.sumProperty(property, condition);
    },
    getData() {
      console.log(this.posts.transData)
      return this.posts.transData.reduce((result, item) => {
            result.push(item);
        return result;
      }, []);
    },
    serviceAdd() {
      this.$router.push('/transaksi/' + this.routing + '/add')
    },
    buttonRenderer(instance, td, row, col, prop, value, cellProperties) {
      const rowData = this.data[row];
      // Clear the cell content
      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      // Create the buttons container element
      const buttonsContainer = document.createElement('div');

      // Create the first button
      const button1 = document.createElement('button');
      button1.innerHTML = '<i class="bi-eye"></i>';
      button1.className = 'btn btn-xs btn-outline-secondary px-1 py-0 rounded-circle'
      button1.addEventListener('click', () => {
        // Handle button 1 click event
        this.handleButtonClick(rowData, 1);
      });
      buttonsContainer.appendChild(button1);

      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    handleButtonClick(rowData, buttonIndex) {
      console.log(rowData)
      console.log(buttonIndex)
      // Handle the button click event with row data
      this.sendData = this.posts.transData.find(item => item.header === rowData)
      if (buttonIndex === 1) {
        this.$router.push({ name: this.routing + '-detail', params: { dataDetail: this.sendData } })
      }
    },
    async getComponent() {
      this.component = this.posts.transProperties.find(({ dataName }) => dataName === "menuListReportHarian").dataMicro
    },
    async getHeader() {
      this.header = this.posts.transProperties.find(({ dataName }) => dataName === "headerReportHarian").dataMicro
    },
    getFieldTable() {
      const fields = this.component
      const trueFields = fields.map((x) => {
        if (x.microType === 'date') {
          return { data: x.key, title: x.microName, type: x.microType, width: 110 }
        } else if (x.microType === 'numeric') {
          return { data: x.key, title: x.microName, type: x.microType, width: 125, renderer: (instance, td, row, col, prop, value) => { if (typeof value === 'number') { const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); td.innerText = formattedValue; } else { td.innerText = value } }, validator: (value, callback) => { if (value > 1000000000000 || value < 0) { callback(false); } else { callback(true) } } }
        } else if (x.microType === 'dropdown') {
          return {
            data: 'action', title: 'opsi', width: 50,

            renderer: this.buttonRenderer
          }
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
        this.contentDivWidth = (contentDiv.offsetWidth - 100 - columns) / tes;

      }
    },
  },
};
</script>