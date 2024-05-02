<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 pt-0" ref="contentDiv">
      <ul class="breadcrumb m-1 mt-0">
        <li><a href="#"><i class="bi-house-door"></i></a></li>
        <li>{{ posts.transTitle }}</li>
      </ul>
      <!-- Content -->
      <template v-if="isDataLoaded">
        <tableTransaksi :data="filteredTableData" :fields="tableFields" :settings="hotSettings" :routingLink="routing"
          :tableWidth="contentDivWidth" :filterText="filterText" />
      </template>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
  
<script>
import { get1 } from '../components/services/components'
import tableTransaksi from '../components/tableTransaksi.vue'
export default {
  components: {
    tableTransaksi
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
    this.posts = await get1(this.$route.name);
    this.getComponent();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    this.isDataLoaded = true;
    this.routing = this.posts.transRouting
    this.data = this.getData()
    this.$nextTick(() => {
      this.getContentWidth();
    });
  },
  computed: {
    filteredTableData() {
      const filterText = this.filterText.toLowerCase().trim();
      return this.data.filter((row) => {
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
    getData() {
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

      // Create the second button
      const button2 = document.createElement('button');
      button2.innerHTML = '<i class="bi-pencil-square"></i>';
      button2.className = 'btn btn-xs btn-outline-secondary px-1 py-0 rounded-circle'
      button2.addEventListener('click', () => {

        // Handle button 2 click event
        this.handleButtonClick(rowData, 2);
      });
      buttonsContainer.appendChild(button2);

      // Create the third button
      const button3 = document.createElement('button');
      button3.innerHTML = '<i class="bi-trash"></i>';
      button3.className = 'btn btn-xs btn-outline-secondary px-1 py-0 rounded-circle'
      button3.addEventListener('click', () => {

        // Handle button 3 click event
        this.handleButtonClick(rowData, 3);
      });
      buttonsContainer.appendChild(button3);

      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
    handleButtonClick(rowData, buttonIndex) {
      // Handle the button click event with row data
      this.sendData = this.posts.transData.find(item => item.header[0] === rowData)
      if (buttonIndex === 1) {
        this.$router.push({ name: this.routing + '-detail', params: { dataDetail: this.sendData } })
      } else if (buttonIndex === 2) {
        this.$router.push({ name: this.routing + '-edit', params: { dataDetail: this.sendData } })
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
            data: 'action', title: 'opsi', width: 95,

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
        this.contentDivWidth = (contentDiv.offsetWidth - 85 - columns) / tes;

      }
    },
  },
};
</script>