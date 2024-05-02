<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 pt-0" ref="contentDiv">
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
        </ul>
      </div>
      <div class="col-4 text-center">
        <span class="h2">List {{ posts.transTitle }}</span>
      </div>
      
    <hr class="mb-3 mt-1">
    </div>
      <!-- Content -->
      <template v-if="isDataLoaded">
        <tableTransaksiKasbank :data="data" :fields="tableFields" :settings="hotSettings" :routingLink="routing"
          :tableWidth="contentDivWidth" :filterText="filterText" />
      </template>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
  
<script>
import { get1, getC, getD } from '../components/services/components'
import tableTransaksiKasbank from '../components/tableTransaksiKasbank.vue'
export default {
  components: {
    tableTransaksiKasbank
  },
  data() {
    return {
      filterText: '',
      sendData: {},
      transData: [],
      contentDivWidth: 0,
      routing: '',
      tableFields: [],
      component: [],
      hotSettings: {
        licenseKey: 'non-commercial-and-evaluation',
        height: 200,
        colHeaders: true,
        
        rowHeaderWidth: 35,
        startRows: 10,
        readOnly: true,
        columns: [],
        filters: true, // Enable the filters plugin
        dropdownMenu: [
          'alignment', 'filter_by_condition', 'filter_operators', 'filter_by_value', 'filter_action_bar'
        ],
        columnSorting: true // Enable column sorting
      },
      data: [],
      isDataLoaded: false,
      posts: [],
    };
  },
  async mounted() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; 
    if (month < 10) {
      month = '0'+month
    }

    const coba = await getC(year, month)
    console.log('coba',coba)
    this.data = coba.map(x => {
      const data = {
        ...x
      }
      if (x.transAmount.startsWith('-')) {
        data.transAmount = x.transAmount.slice(1)
      }
      data.transAmount = this.formatNumber(data.transAmount)
      return data
    })
    this.posts = await get1(this.$route.name);
    this.getComponent();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    this.isDataLoaded = true;
    this.routing = this.posts.transRouting
    // this.data = this.getC()
    this.$nextTick(() => {
      this.getContentWidth();
    });
  },
  computed: {
    // filteredTableData() {
    //   const filterText = this.filterText.toLowerCase().trim();
    //   return this.data.filter((row) => {
    //     for (let key in row) {
    //       const value = String(row[key]);
    //       if (value.toLowerCase().includes(filterText)) {
    //         return true
    //       }
    //     }
    //     return false
    //   });
    // },
  },
  methods: {
    formatNumber(value) {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue)) {
        return value; // Return the original string value if it's not a valid number
      }
      console.log(floatValue)
      const parts = floatValue.toFixed(2).toString().split('.');
      const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      if (parts.length > 1) {
        return `${wholePart},${parts[1]}`;
      } else {
        return wholePart;
      }
    },
    getC() {
      return this.posts.transData.reduce((result, item) => {
        if (Array.isArray(item.header)) {
          item.header.forEach((microItem) => {
            result.push(microItem);
          });
        }
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
    async handleButtonClick(rowData, buttonIndex) {
      // Handle the button click event with row data
      this.sendData = await getD(encodeURIComponent(rowData.code))
      if (buttonIndex === 1) {
        this.$router.push({ name: this.routing + '-detail', params: { dataDetail: this.sendData } })
      }
    },
    async getComponent() {
      this.component = this.posts.transProperties.find(({ dataName }) => dataName === "menuList").dataMicro
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