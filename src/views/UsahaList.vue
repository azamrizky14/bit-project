<template>
    <main id="content" role="main" class="main">
              <!-- Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="row">
          <div class="col-md-11">
        <b-input-group size="sm">
          <b-form-input type="text" v-model="searchQuery" placeholder="Cari Usaha" />
          </b-input-group>
        </div>
        <div class="col-md-1">
          <b-button v-b-modal.modal-add size="sm" variant="primary"><i class="bi-plus-circle"></i></b-button>
        </div>
        </div>
            <hr />
            <div class="row">
                <div class="col-3 py-3" v-for="item in filteredUsaha" :key="item._id">                
                    <div class="card" @click="selectUsaha(item)" style="cursor: pointer">
                        <img v-if="item.icon !== ''" class="card-img-top overflow-hidden object-fit-contain" :src="item.icon" alt="Card image cap" style="object-fit: cover; height:160px;">
                        <img v-else class="card-img-top overflow-hidden object-fit-contain" src="assets/img/160x160/img1.jpg" alt="Card image cap" style="object-fit: cover; height:160px;">
                        <div class="card-body text-center p-3">
                            {{ item.domainName }}
                        </div>
                    </div>
                </div>
            </div>
      </div>
      
      <b-modal id="modal-add" size="lg" title="Tambah Usaha" 
                    no-close-on-esc
                    no-close-on-backdrop
                    ref="modal"
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleOk"
                    ok-title="Tambah"
                    cancel-title="Kembali">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmit">
                        <div class="col-md-3 d-flex justify-content-center">
                            <div class=" d-flex justify-content-center align-items-center flex-wrap">
                                <b-form-group class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar bg-transparent d-flex align-items-end"
                                label-for="img1"
                                invalid-feedback="Tambah gambar dulu!" 
                                @change="(event) => previewFiles(event)"
                                tabindex="-1"
                                :state="imageState"
                                style="border:none"
                                >
                                
                            <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar" for="addImage" 
                            @change="(event) => previewFiles(event)"
                            tabindex="-1"
                            invalid-feedback="Provinsi Harus Diisi!"
                            :state="imageState"
                            style="margin: 0">
                                <img v-if="image !== ''" id="editAvatarImgModal" class="avatar-img" :src="image" alt="Image Description" />
                                <img v-else id="editAvatarImgModal" class="avatar-img" src="assets/img/160x160/img1.jpg" alt="Image Description">
                                <input tabindex="-1" type="file" class="js-file-attach avatar-uploader-input" id="addImage" :state="imageState" required>
                                <span class="avatar-uploader-trigger">
                                <i class="bi-pencil-fill avatar-uploader-icon shadow-sm"></i>
                                </span>
                            </label>
                                <b-form-input
                                    tabindex="-1"
                                    id="img1" class="js-file-attach avatar-uploader-input"
                                    v-model="image"
                                    :state="imageState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                        <div class="col-9 row m-0 p-0">
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                label="Nama Usaha"
                                label-for="usahaName"
                                invalid-feedback="Nama Usaha Harus Diisi!"
                                :state="NameState"
                                >
                                <b-form-input
                                    id="usahaName"
                                    v-model="name"
                                    :state="NameState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                label="Jenis Usaha (Tidak Bisa Dirubah)"
                                label-for="usahaType"
                                invalid-feedback="Nama Depan Harus Diisi!"
                                :state="typeState"
                                >
                                <b-form-select 
                                id="usahaType"
                                class="form-control"
                                v-model="type" 
                                :options="options"
                                :state="typeState"
                                required
                                >
                                </b-form-select>
                                </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                                <b-form-group
                                label="Deskripsi"
                                label-for="usahaDesc"
                                invalid-feedback="Deskripsi Harus Diisi!"
                                :state="descState"
                                >
                                <b-form-input
                                    id="usahaDesc"
                                    v-model="desc"
                                    :state="descState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                        </div>
                            <div class="col-md-4 mb-2">
                                <b-form-group
                                label="Provinsi"
                                label-for="provinsi"
                                invalid-feedback="Provinsi Harus Diisi!"
                                :state="provState"
                                >
                                <b-form-input
                                    
                                    id="provinsi"
                                    v-model="prov"
                                    :state="provState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-4">
                                <b-form-group
                                label="Kabupaten"
                                label-for="Kabupaten"
                                invalid-feedback="Kabupaten Harus Diisi!"
                                :state="kabState"
                                >
                                <b-form-input
                                    id="Kabupaten"
                                    v-model="kab"
                                    :state="kabState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-4">
                                <b-form-group
                                label="Kecamatan"
                                label-for="kecamatan"
                                invalid-feedback="Kecamatan Harus Diisi!"
                                :state="kecState"
                                >
                                <b-form-input
                                    id="kecamatan"
                                    v-model="kec"
                                    :state="kecState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-12">
                                <b-form-group
                                label="Alamat"
                                label-for="address"
                                invalid-feedback="Alamat Harus Diisi!"
                                :state="addressState"
                                >
                                <b-form-input
                                    id="address"
                                    v-model="address"
                                    :state="addressState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                    </form>
                </b-modal>
    </main>
  </template>
  
<script>

import axios from "axios";
import { getUsaha, getOptJenis, addUsaha, getIcon } from "./services/usaha";
export default {
  data() {
    return {
      options: [],
      searchQuery: '',
      listLogo: [],
      usaha: [],

        name: '',
        type: '',
        desc: '',
        prov: '',
        kab: '',
        kec: '',
        address: '',
        image: '',
        xFilEkey: null,
        
        NameState: null,
        typeState: null,
        descState: null,
        provState: null,
        kabState: null,
        kecState: null,
        addressState: null,
        imageState: null
    };
  },
  methods: {
    async getListUsaha() {
      this.usaha = await getUsaha();
      const imageUrls = this.usaha.map(logo => logo.domainLogo);
      await this.getLogo(imageUrls)
    },
    previewFiles(event) {
        const file = event.target.files[0];
        this.xFilEkey = file;
        this.image = URL.createObjectURL(file);
    },
    async getLogo(imageUrls) {
      this.usaha = await getIcon(imageUrls, this.usaha)
    },
    selectUsaha(data) {
        this.$store.dispatch('updateDataUsaha', data);
        this.$router.push('/dashboard');
    },
    resetModal() {
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
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        if (this.name && this.type && this.desc && this.prov && this.kab && this.kec && this.address && this.image) {
            this.alertSwal('add')
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
statusSwal(status) {
  if (status === 'success') {
      this.$swal(
          'Berhasil!',
          'Data berhasil Ditambahkan',
          'success'
      )
  } else if (status === 'error') {
    this.$swal(
          'Gagal!',
          'Data gagal Ditambahkan',
          'error'
      )
  }
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
alertSwal(typeData) {
  let btnColor = '';
   
  if (typeData === 'edit') {
    btnColor = '#00AB8E';
  } else {
    btnColor = '#3085d6';
  }
  this.$swal({
          title: 'Anda Yakin?',
          text: 'Tekan OK jika anda sudah yakin!',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: btnColor,
          cancelButtonText: 'Kembali',
          confirmButtonText: 'OK',
      }).then(async (result) => {
      if (result.isConfirmed) {
          this.alertLoading()
          if (typeData === 'add') {
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
              await this.getListUsaha()
              this.$bvModal.hide('modal-add')
              this.statusSwal('success')
              } catch (error) {
                  statusSwal('error')
              }
          }
          
        }
      });
}
  },
  computed: {
    filteredUsaha() {
      if (this.searchQuery) {
        const lowercaseQuery = this.searchQuery.toLowerCase();
        return this.usaha.filter(item => {
          const lowercaseTitle = item.domainName.toLowerCase();
          return lowercaseTitle.includes(lowercaseQuery);
        });
      }
      return this.usaha;
    },
  },
async mounted() {
  await this.getListUsaha();
  const optJenis = await getOptJenis();
  this.options = optJenis.map(v => ({value: v._id, text: v.templateName}));
  this.$store.commit('setTopbarTitle', "List Usaha");
}
};
</script>

<style>
/* Add any custom styles for the JSON editor here */
</style>