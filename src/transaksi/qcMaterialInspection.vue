<template>
    <main id="content" role="main" class="main">
          <div class="content container-fluid p-3 ps-0" ref="contentDiv">
              <!-- Content -->
              <template v-if="isDataLoaded">    
                <tableTransaksi :data="filteredTableData" :fields="tableFields" :settings="hotSettings" :routingLink="routing" :tableWidth="contentDivWidth" :filterText="filterText" />
              </template>
              <div v-else>Loading...</div>
          </div>
      </main>
  </template>
  
  <script>
  import tableTransaksi from '../components/tableTransaksi.vue'
  export default {
      components: {
        tableTransaksi
      },
    data() {
      return {
      filterText: '',
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
      this.posts = await this.getPost();
      this.getComponent();
      const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
      this.isDataLoaded = true;
      this.routing = this.posts.transRouting
      this.data = this.posts.transData
    const btnMenu = this.posts.transProperties.find(({ dataName }) => dataName === "routingButton").dataMicro
    console.log(btnMenu)
    this.$store.commit('setRouting', this.posts.transRouting);
    this.$store.commit('setBtnList', btnMenu)
    this.$store.commit('setTopbarTitle','List Data - ' + this.posts.transTitle);
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
    serviceAdd() {
      this.$router.push('/transaksi/'+this.routing+'/add')
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
      if (buttonIndex === 1) {
        this.$router.push({name: this.routing+'-detail', params: {dataDetail : rowData}})
      } else if (buttonIndex === 2) {
        this.$router.push({name: this.routing+'-edit', params: {dataDetail : rowData}})
      }
      console.log('Button', buttonIndex, 'clicked:', rowData);
    },
    async getPost() {
      const mockResponse = await this.fetchPosts(); 
      return mockResponse[0]
    },
    async getComponent() {
      this.component = this.posts.transProperties.find(({ dataName }) => dataName === "fieldTable").dataMicro
    },
    getFieldTable() {        
        const fields = this.component
        const trueFields = fields.map((x) => {
          if (x.microType === 'date') {
            return {data: x.key, title: x.microName, type: x.microType, width: 110}
          } else if (x.microType === 'numeric') {
            return {data: x.key, title: x.microName, type: x.microType, width: 125, renderer: (instance, td, row, col, prop, value) => {if (typeof value === 'number') {const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); td.innerText = formattedValue;} else {td.innerText = value}} ,validator: (value, callback) => {if (value > 1000000000000 || value < 0) {callback(false);} else {callback(true)}}}
          } else if (x.microType === 'dropdown') {
            return {data: 'action', title: 'opsi', width: 95,
            
          renderer: this.buttonRenderer
        }
          } else {
            if (x.width <= 0) {
            return {data: x.key, title: x.microName, type: x.microType}
            } else {
            return {data: x.key, title: x.microName, type: x.microType, width: x.width}
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
      for (let i  = 0; i < widthTes.length; i++) {
        if (widthTes[i].width >= 0 || widthTes[i].width !== undefined) {
          columns += widthTes[i].width
        }
      }
      if (contentDiv) {
        if (this.hotSettings.columns.length > 5) {
          this.contentDivWidth = (contentDiv.offsetWidth - 85)/4;
        } else {
          this.contentDivWidth = (contentDiv.offsetWidth - 85 - columns)/tes;
        }
      }
    },
      fetchPosts() {
        // Mocking the API response
        var mockResponse = [
          {
            transTitle: 'QC Material Inspection',
            transRouting: 'qc-material-inspection',
            transProperties: [
              {dataName: 'fieldTable', dataMicro: [
                {key: 'code',microName: 'General Jurnal', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
                {key: 'date',microName: 'Tanggal Input', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
                {key: 'user',microName: 'User Input', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
                {key: 'note',microName: 'Catatan', microType: 'text', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
                {key: 'opsi',microName: 'Catatan', microType: 'dropdown', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
              ]},
              {dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
                {key: 'add',microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary'}
              ]}
            ],
            transData: [
              {
                _id:'001', code: 'GJ000001', date: '2023-12-01', user: 'mamat', note: 'Pembelian Tunai', dataTable: [
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
                ]                
              },
              {
                _id:'002', code: 'GJ000001', date: '2023-12-01', user: 'azam', note: 'Pembelian Tunai', dataTable: [
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
                ]                
              },
              {
                _id:'003', code: 'GJ000001', date: '2023-12-01', user: 'azam', note: 'Pembelian Tunai', dataTable: [
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
                ]                
              },
              {
                _id:'004', code: 'GJ000001', date: '2023-12-01', user: 'azam', note: 'Pembelian Tunai', dataTable: [
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
                ]                
              },
              {
                _id:'005', code: 'GJ000001', date: '2023-12-01', user: 'azam', note: 'Pembelian Tunai', dataTable: [
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
                  {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
                ]                
              }
            ]
          },
        ];
        
      return mockResponse
      },
    },
  };
  </script>