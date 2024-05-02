<template>
  <div class="card">  
    <b-row>
                    <b-col class="d-flex align-items-center">
                        <b-input-group size="sm" class="mx-2">
                            <b-form-input
                            id="filter-input"
                            v-model="filter"
                            type="search"
                            pleaceholder="Type to Search"
                            ></b-form-input>

                            <b-input-group-append>
                            <b-button size="sm" :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col class="d-flex justify-content-end align-items-center">
                        <b-button v-b-modal.modal-add variant="primary" size="sm"><i class="bi-plus-circle"></i></b-button>
                        <b-dropdown id="dropdown-right" right text="Filter Column" variant="dark" class="m-2" size="sm">    
                            <template #button-content>
                                <i class="bi-sliders"></i>
                            </template>
                            <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="fields" name="flavour-1" buttons>
                            </b-form-checkbox-group>
                        </b-dropdown>
                    </b-col>
  </b-row>
  <b-table
                    ref="tableItem"
                    label-sort-asc=""
                    label-sort-desc=""
                    label-sort-clear=""
                    :bordered="true"
                    stacked="md" 
                    :items="Item" 
                    :fields="activeFields" 
                    :current-page="currentPage"
                    :per-page="perPage" 
                    :filter="filter"
                    tbody-tr-class="row-class"
                    @filtered="onFiltered"
                    v-if="selected.length > 0">>
                    <template #cell(opsi)="row" style="width: 100px">  
                        <div width="0px">
                            <b-dropdown id="dropdown-right" right text="Right align" variant="primary" size="xs">
                                <template #button-content>
                                    <i class="bi-gear-fill"></i>
                                </template>
                                <b-dropdown-item href="#" @click="info(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                                <b-dropdown-item href="#" @click="edit(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                                <b-dropdown-item href="#" @click="alertDelete('Item')">Hapus</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>
                    <template #cell(icon)="row">
                        <div class="d-flex justify-content-center">
                            <label class="avatar overflow-hidden d-flex justify-content-center" for="editAvatarUploaderModal">
                                <img :src="row.value" alt="icon">
                            </label>
                        </div>
                    </template>
                    
  </b-table>
  </div>
</template>

<script>
    export default {
        data(){
    return {
        listLogo: [],
        dataId: '',
        procId: '',
        microId: '',
        dataIndex: '',
        procIndex: '',
        microIndex: '',
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 25],
        fields: ['domainName', 'domainDesc', 'domainLocation', 'opsi'],
        sorts: [],
        selected: ['domainName', 'domainDesc', 'domainLocation', 'opsi'],
        Item: [],
        process: [],
        microservice: [],
        filter: '',
      }
  },
  methods: {
    handleJsonError(err) {
      console.error('JSON editor error:', err);
    },
    convertToJson() {
        try {
            const lines = this.id.trim().split('\n').replace('\"', '');
            lines.forEach((line) => {
                    const array = line.split(',');
                    this.parsedArrays.push(array);
            });
        } catch(error) {
            console.error(error)
        }
    },      
    getLogo(imageUrls) {
    Promise.all(
        imageUrls.map(url =>
          axios.get(url, {
            responseType: 'blob' // Set the response type to arraybuffer to handle binary data
          }).then(responses => URL.createObjectURL(responses.data))
        )
      )
        .then(imageUrls => {
            this.listLogo = imageUrls.map(url =>({icon: url}));
            this.Item = this.Item.map((item, index) => Object.assign({}, item, this.listLogo[index]) )
        })
    },
    async ItemTable() {
        this.Item = await getUsaha();
        const imageUrls = this.Item.map(logo => logo.domainLogo);
        await this.getLogo(imageUrls)
        this.totalRows = this.Item.length;
        const oldCurrentPage = this.currentPage;
        this.currentPage = 1;
        this.$nextTick(() => {
            this.currentPage = oldCurrentPage
        });
    },
  async procTable() {
    await this.ItemTable();
        this.procModal.content = this.Item.filter(dTemplate => dTemplate._id === this.dataId)[0];
        this.process = this.procModal.content.appProcess;
        this.$store.commit('setDataItem', this.process);
  },
  async microTable() {
    await this.procTable();
    this.microservice = this.process[this.procIndex].appProcMicroservices
    this.microModal.content = this.microservice
  },
    
  swalDel() {
    
},
successAdd() {
  this.$swal(
      'Berhasil!',
      'Data berhasil ditambahkan',
      'success'
  )
},
failedAdd() {
  this.$swal(
      'Gagal!',
      'Data gagal ditambahkan!',
      'cancel'
  )
},
successEdit() {
  this.$swal(
      'Berhasil!',
      'Data berhasil Diedit',
      'success'
  )
},
successDelete() {
  this.$swal(
      'Berhasil!',
      'Data berhasil Dihapus',
      'success'
  )
},
alertLoading() {
  this.$swal({
      title: 'Loading...',
      text: 'Mohon Ditunggu ya.',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      willOpen: () => {
          this.$swal.showLoading();
      },
    });
},
alertAdd(typeData) {
  this.$swal({
          title: 'Anda Yakin?',
          text: "Tekan Tambah jika anda sudah yakin!",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tambah'
      }).then(async (result) => {
      if (result.isConfirmed) {
          this.alertLoading()
          if (typeData === 'Item') {
                const domainTypeStore = this.options.find(item => item.value === this.type).text
                const data = {
                    domainName: this.name,
                    domainDesc: this.desc,
                    domainType: this.type,
                    domainTypeStore: domainTypeStore,
                    domainLocation: this.prov + ', ' +  this.kab + ', ' + this.kec + ', ' + this.address,
                    xFilEkey: this.xFilEkey 
                }
              try {
              await addUsaha(data)
              await this.ItemTable()
              this.$bvModal.hide('modal-add')
              this.successAdd()
              } catch (error) {
                  alert(error)
              }
          } else if (typeData === 'proses') {
              const id = this.dataId
              const data = {
                  appProcCode: this.id,
                  appProcName: this.name,
                  appProcDesc: this.desc,
                  appGroupMenu: this.type,
                  appProcMicroservices: []
              }
              try {
              await addProc(data, id)
              await this.procTable()
              } catch (error) {
                  alert(error)
              }
              this.$bvModal.hide('modal-addProc')
              this.successAdd()
          } else if (typeData === 'micro') {
              if (this.id == '') {
                  alert(this.id, '" "')
              }
              try {
                const microData = JSON.parse(this.id);

              } catch(error) {
                
              }
              const link = this.dataId + '/' + this.procId
              const data = {
                  microCode: this.infoModal.content.appProcCode+'.'+this.microCode,
                  microName: this.name,
                  microType: this.type,
                  microDescription: this.desc,
                  microIcon: this.image,
                  microData: JSON.parse(this.id),
                  microVariable: [],
                  microPleaceholder: this.prov,
                  microRouting: this.kab,
                  microNavigate: this.kec,
                  microAPIFunctionScript: this.address
              }
              try {
              await addMicro(data, link)
              await this.microTable()
              this.$bvModal.hide('modal-addMicro')
              this.successAdd()
              } catch (error) {
                  alert(error)
                  this.failedAdd()
              }
          }
          
        }
      });
},
alertEdit(typeData) {
  this.$swal({
          title: 'Anda Yakin?',
          text: "Tekan Edit jika anda sudah yakin!",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#00AB8E',
          confirmButtonText: 'Edit'
      }).then(async (result) => {
      if (result.isConfirmed) {
          
          this.alertLoading()
          if (typeData === 'Item') {
              const uId = this.id
                const data = {
                    domainName: this.name,
                    domainDesc: this.desc,
                    domainLocation: this.address
                }
              try {
                await updateUsaha(data, uId);
                await this.ItemTable()
              } catch (error) {
                  alert(error)
              }
              this.$bvModal.hide('edit-modal')
              this.successEdit()
          } else if (typeData === 'proses') {
              const link = this.dataId + '/' + this.procId
              const data = {
                  appProcCode: this.id,
                  appProcName: this.name,
                  appProcDesc: this.desc,
                  appGroupMenu: this.type,
                  appLinkMenu: this.prov,
                  appIconMenu: this.kab
              }
              try {
              await updateProc(data, link);
              await this.procTable()
              } catch (error) {
                  alert(error)
              }
              this.$bvModal.hide('edit-modal-proc')
              this.successEdit()
              
          } else if (typeData === 'micro') {
              const link = this.dataId + '/' + this.procId + '/' + this.microId
              const microVar = this.microservice.find(x => x._id === this.microId).microVariable
              if (this.arrayVariable === microVar) {
                this.arrayVariable = JSON.stringify(this.arrayVariable)
              }

              const data = {
                  microCode: this.infoModal.content.appProcCode+'.'+this.microCode,
                  microName: this.name,
                  microType: this.type,
                  microDescription: this.desc,
                  microIcon: this.image,
                  microData: JSON.parse(this.id),
                  microVariable: JSON.parse(this.arrayVariable),
                  microPleaceholder: this.prov,
                  microRouting: this.kab,
                  microNavigate: this.kec,
                  microAPIFunctionScript: this.address
              }
              try {
              await updateMicro(data, link)
              await this.microTable()
              } catch (error) {
                  alert(error)
              }
              this.$bvModal.hide('edit-modal-proc')
              this.successEdit()
              
          }
          
        }
      });
},
alertDelete(typeData, data) {

    this.$swal({
        title: 'Anda Yakin?',
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonText: 'Kembali',
        confirmButtonText: 'Ya, Hapus Saja!'
    }).then(async (result) => {
    if (result.isConfirmed) {
        
      if (typeData === 'Item') {
          try {
              await deleteTemplate(data._id);
              await this.ItemTable();
          } catch (error) {
              alert(error)
          }
        } else if (typeData === 'proses') {
          try {
              await deleteProc(this.dataId + '/' + data._id);
              await this.procTable();
          } catch (error) {
              alert(error)
          }
        } else if (typeData === 'micro') {
          try {
              await deleteMicro(this.dataId + '/' + this.procId + '/' + data._id);
              await this.microTable();
          } catch (error) {
              alert(error)
          }
        }
            this.successDelete()
        }
    });
},


    resetAll() {
        this.id = ''
        this.name = ''
        this.type = ''
        this.desc = ''
        this.prov = ''
        this.kab = ''
        this.kec = ''
        this.address = ''
        this.image = ''
        
        this.NameState = null
        this.typeState = null
        this.descState = null
        this.provState = null
        this.kabState = null
        this.kecState = null
        this.addressState = null
        this.imageState = null
      },
      resetModal() {
        this.microCode = ''
        this.resetAll()
      },
    onFiltered(filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
    },
    numberFormat(value) {
        this.zero = Number(value.replace(/\D/g, ''))
        return value == null ? '' : this.zero.toLocaleString();
    },
    previewFiles(event) {
        const file = event.target.files[0];
        this.xFilEkey = file;
        this.image = URL.createObjectURL(file);
    },
    // edit methods
    resetEditModal() {
        this.editModal.title = ''
        this.editModal.content = ''
        this.resetAll()
    },
    edit(Item, index, button) {
        this.editModal.title = `Edit Data: ${Item.domainName}`
        this.editModal.content = Item
        this.$root.$emit('bv::show::modal', this.editModal.id, button)
        
        this.id = this.editModal.content._id
        this.name = this.editModal.content.domainName
        this.desc = this.editModal.content.domainDesc
        this.address = this.editModal.content.domainLocation
    },
      handleEdit(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleEditSubmit()
      },
      handleEditSubmit() {
        // Exit when the form isn't valid
        if (this.name && this.desc && this.address) {
            this.alertEdit('Item')
        }
        if (this.name == "") {
            this.NameState = false;
        } else {
            this.NameState = true;
        }
        if (this.desc == "") {
            this.descState = false;
        } else {
            this.descState = true;
        }
        if (this.address == "") {
            this.addressState = false;
        } else {
            this.addressState = true;
        }
      },
      
    infoMicro(Item, index) {
        this.microModal.content = this.microservice[index]
        this.microId = this.microModal.content._id
        this.microIndex = index
    },
    editMicroModal(item, index, button) {
        this.editProc.title = 'Edit Microservice'
        this.$root.$emit('bv::show::modal', this.editProc.id, button)
        this.microCode = parseInt(item.microCode.replace(this.infoModal.content.appProcCode+'.',' '))
        this.name = item.microName
        this.type = item.microType
        this.desc = item.microDescription
        this.image = item.microIcon
        this.id = JSON.stringify(item.microData, null, " ")
        this.prov = item.microPleaceholder
        this.kab = item.microRouting
        this.kec = item.microNavigate
        this.address = item.microAPIFunctionScript 
        this.microId = item._id
        this.arrayVariable = item.microVariable
    },
    editMicroVar(item, index, button) {
        this.editMicroModal(item, index, button)
        this.editProc.title = 'Edit Variabel Microservice'
        this.microVar = true
    },
    addMicroservice() {
        this.$bvModal.show('modal-addMicro')
        this.id = '" "'
    },
    // add method proc
    proc(Item, index, button) {
        this.procModal.title = `Proses Dari: ${Item.domainName}`
        this.procModal.content = Item
        this.process = Item.appProcess
        this.$root.$emit('bv::show::modal', this.procModal.id, button)
        this.dataId = Item._id
        this.dataIndex = index
        
    },
      resetProcDetail() {
        this.resetAll()
        this.$bvModal.show('proc-modal')
      },
    
    addProcModal() {
        this.$bvModal.show('modal-addProc')
    },
      handleOkProc(bvModalEvent) {
        bvModalEvent.preventDefault()
        this.handleSubmitProc()
      },
      handleSubmitProc() {
        if (this.name && this.type && this.desc) {
            this.alertAdd('proses')
        }
        // add validation
        if (!this.name) {
            this.NameState = false;
        } else {
            this.NameState = true;
        }
        if (!this.type) {
            this.typeState = false;
        } else {
            this.typeState = true;
        }
        if (!this.desc) {
            this.descState = false;
        } else {
            this.descState = true;
        }
      },
    // Item Item
    item(item) {
        const sendData = {
            title:  item.domainName,
            code: item._id
        }
        this.$router.push({
            name: 'item',
            params: {
                itemDomain: sendData
            }
        });
    },
    // Info Proc
    infoProc(item, index, button) {
        this.infoModal.title = this.procModal.title
        this.infoModal.content = this.procModal.content.appProcess[index]
        this.microservice = this.infoModal.content.appProcMicroservices
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        this.procId = this.infoModal.content._id
        this.procIndex = index
    },
    // edit proc methods
    editProcModal(item, index, button) {
        this.editProc.title = this.procModal.title
        this.$root.$emit('bv::show::modal', this.editProc.id, button)
        this.procId = this.procModal.content.appProcess[index]._id
        this.procIndex = index
        this.id = item.appProcCode
        this.name = item.appProcName
        this.desc = item.appProcDesc
        this.type = item.appGroupMenu
        this.prov = item.appLinkMenu
        this.kab = item.appIconMenu
    },
    resetEditProc() {
        this.editProc.title = ''
        this.editProc.content = ''
        
        this.microId = ''
        this.microCode = ''
        this.microVar = false
        this.arrayVariable = []
        this.resetAll()
    },
      handleProcEdit() {
        // Exit when the form isn't valid
        if (this.name && this.id && this.type && this.prov) {
            this.alertEdit('proses')
        }
        if (this.name == "") {
            this.NameState = false;
        } else {
            this.NameState = true;
        }
        if (this.id == "") {
            this.descState = false;
        } else {
            this.descState = true;
        }
        if (this.type == "") {
            this.typeState = false;
        } else {
            this.typeState = true;
        }
        if (this.prov == "") {
            this.provState = false;
        } else {
            this.provState = true;
        }
      },
    // add micro data 
    handleMicroOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleMicroSubmit()
      },
      handleMicroSubmit() {
        if (this.name && this.type && this.microCode) {
            this.alertAdd('micro')
        }
        // add validation
        if (!this.name) {
            this.NameState = false;
        } else {
            this.NameState = true;
        }
        if (!this.type) {
            this.typeState = false;
        } else {
            this.typeState = true;
        }
        if (!this.microCode) {
            this.descState = false;
        } else {
            this.descState = true;
        }
      },
      handleMicroEdit() {
        if (this.name && this.type && this.microCode) {
            this.alertEdit('micro')
        }
        // add validation
        if (!this.name) {
            this.NameState = false;
        } else {
            this.NameState = true;
        }
        if (!this.type) {
            this.typeState = false;
        } else {
            this.typeState = true;
        }
      },
    // add method info
    async info(Item, index, button) {
        this.infoModal.title = `Detail Data: ${Item.domainName}`
        this.infoModal.content = Item
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        this.dataId = ''
    },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.microservice = ''
        this.procId = ''
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        if (this.name && this.type && this.desc && this.prov && this.kab && this.kec && this.address && this.image) {
            this.alertAdd('Item')
        }
        // add validation
        if (!this.name) {
            this.NameState = false;
        } else {
            this.NameState = true;
        }
        if (!this.type) {
            this.typeState = false;
        } else {
            this.typeState = true;
        }
        if (!this.desc) {
            this.descState = false;
        } else {
            this.descState = true;
        }
        if (!this.prov) {
            this.provState = false;
        } else {
            this.provState = true;
        }
        if (!this.kab) {
            this.kabState = false;
        } else {
            this.kabState = true;
        }
        if (!this.kec) {
            this.kecState = false;
        } else {
            this.kecState = true;
        }
        if (!this.address) {
            this.addressState = false;
        } else {
            this.addressState = true;
        }
        if (!this.image) {
            this.imageState = false;
        } else {
            this.imageState = true;
        }
      },
  },
  computed: {
    activeFields(){
      this.sorts = this.fields.filter(name => this.selected.includes(name));
     return this.sorts.map(v => {
        var Item = {}
        Item['key']= v
        Item['label']= v
        if(v !== 'opsi') {
            Item['sortable']= true
        } else {
            Item['fillterByFormatted']= false,
            Item['thStyle']= "width:80px",
            Item['class']= "text-center"
        }
        if(v === 'icon') {
            Item['sortable']=false,
            Item['thStyle']= "width: 60px",
            Item['class']= "text-center"
        }
        if(v === 'domainName') {
            Item['label']="Nama Customer"
        }
        if(v === 'domainDesc') {
            Item['label']="Deskripsi"
        }
        if(v === 'domainLocation') {
            Item['label']="Lokasi"
        }
        return Item
     });
    },

  },
  async mounted() {
    this.$store.commit('setBtnList', [])
    this.$store.commit('setTopbarTitle', "Data Customer");
    const optJenis = await getOptJenis();
    this.options = optJenis.map(v => ({value: v._id, text: v.templateName}));
    this.ItemTable();
  }
    }
</script>