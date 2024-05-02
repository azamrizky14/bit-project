<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 pt-0" ref="contentDiv">
      <ul class="breadcrumb m-1 mt-0">
        <li><a href="#"><i class="bi-house-door"></i></a></li>
        <li>{{ posts.transTitle }}</li>
      </ul>
      <!-- Content -->
      <template v-if="isDataLoaded">
        <tableReport :data="filteredTableData" :fields="tableFields" :settings="hotSettings" :routingLink="routing"
          :tableWidth="contentDivWidth" :filterText="filterText" />
      </template>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
  
<script>
import { getFieldTableList, getComponentList, getDataList, getContentWidth, listButtonClick } from '../components/services/report'
import { get1 } from '../components/services/components'
import tableReport from '../components/tableReport.vue'
export default {
  components: {
    tableReport
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
    this.posts = await get1(this.$route.name.replace('report-',''));
    this.component = await getComponentList(this.posts);
    this.data = await getDataList(this.posts)
    this.hotSettings.columns = await getFieldTableList(this.component, this.buttonRenderer);
    this.isDataLoaded = true;
    this.routing = this.posts.transRouting
    this.contentDivWidth = await getContentWidth(this.$refs.contentDiv, this.hotSettings.columns);
    console.log(this.filteredTableData)
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
        listButtonClick(this.$router, rowData, 1, this.posts, this.routing);
      });
      buttonsContainer.appendChild(button1);

      // Append the buttons container to the cell
      td.appendChild(buttonsContainer);

      // Add necessary CSS classes
      td.classList.add('htCenter'); // Adjust the class based on your styling needs
    },
  },
};
</script>