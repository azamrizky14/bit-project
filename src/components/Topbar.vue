<template>
  <!-- ========== HEADER ========== -->

  <header id="header"
    class="navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white">
    <div class="navbar-nav-wrap">
      <!-- Logo -->
      <a class="navbar-brand" href="index.html" aria-label="Front">
        <img class="navbar-brand-logo" src="/assets/svg/logos/logo.svg" alt="Logo" data-hs-theme-appearance="default">
        <img class="navbar-brand-logo" src="/assets/svg/logos-light/logo.svg" alt="Logo" data-hs-theme-appearance="dark">
        <img class="navbar-brand-logo-mini" src="/assets/svg/logos/logo-short.svg" alt="Logo"
          data-hs-theme-appearance="default">
        <img class="navbar-brand-logo-mini" src="/assets/svg/logos-light/logo-short.svg" alt="Logo"
          data-hs-theme-appearance="dark">
      </a>
      <!-- End Logo -->

      <div class="navbar-nav-wrap-content-start">
        <!-- Navbar Vertical Toggle -->
        <button type="button" class="js-navbar-vertical-aside-toggle-invoker navbar-aside-toggler">
          <i class="bi-arrow-bar-left navbar-toggler-short-align"
            data-bs-template='<div class="tooltip d-none d-md-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            data-bs-toggle="tooltip" data-bs-placement="right" title="Collapse"></i>
          <i class="bi-arrow-bar-right navbar-toggler-full-align"
            data-bs-template='<div class="tooltip d-none d-md-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            data-bs-toggle="tooltip" data-bs-placement="right" title="Expand"></i>
        </button>

        <!-- End Navbar Vertical Toggle -->
      </div>
      <div class="navbar-nav-wrap-content-end">
        <!-- Navbar -->
        <ul class="navbar-nav">
          <template v-for="btn in btnList">
            <template v-if="btn.key === 'submit'">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-primary" @click="alertSwal(btn.microRouting)">Tambah</button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" href="javascript:;"
                  id="accountNavbarDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                  data-bs-dropdown-animation></button>
                <div class="dropdown">

                  <div
                    class="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                    aria-labelledby="accountNavbarDropdown">
                    <div class="flex-grow-1 ms-3">
                      <p class="card-text text-body" style="font-size: 12px">Import file</p>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> json</a>
                    <a class="dropdown-item" href="#">xls</a>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="btn.key === 'edit'">
              <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split me-2" href="javascript:;"
                id="accountNavbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-dropdown-animation>
                Export
              </button>
              <div class="dropdown">

                <div
                  class="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                  aria-labelledby="accountNavbarDropdown">
                  <div class="flex-grow-1 ms-3">
                    <p class="card-text text-body" style="font-size: 12px">Export file</p>
                  </div>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#"> json</a>
                  <a class="dropdown-item" href="#">xls</a>
                </div>
              </div>
            </template>
            <template v-else-if="btn.key === 'save'">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-success" @click="alertSwal(btn.microRouting)">Edit</button>
                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" href="javascript:;"
                  id="accountNavbarDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                  data-bs-dropdown-animation></button>
                <div class="dropdown">

                  <div
                    class="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                    aria-labelledby="accountNavbarDropdown">
                    <div class="flex-grow-1 ms-3">
                      <p class="card-text text-body" style="font-size: 12px">Import file</p>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"> json</a>
                    <a class="dropdown-item" href="#">xls</a>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="btn.key === 'back'">
              <button type="button" class="btn btn-outline-secondary me-2" @click="backToList">
                <i class="bi-chevron-left"></i> {{ btn.microText }}
              </button>
            </template>
            <template v-else>
            </template>
          </template>
          <div class="vr"></div>
          <li class="nav-item d-none d-sm-inline-block">
            <!-- Notification -->
            <div class="dropdown">
              <button type="button" class="btn btn-ghost-secondary btn-icon rounded-circle"
                id="navbarNotificationsDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                data-bs-auto-close="outside" data-bs-dropdown-animation :tabindex="tabindex">
                <i class="bi-bell"></i>
                <span v-if="listNotif.length > 0" class="btn-status btn-sm-status btn-status-danger"></span>
              </button>

              <div
                class="dropdown-menu dropdown-menu-end dropdown-card navbar-dropdown-menu navbar-dropdown-menu-borderless"
                aria-labelledby="navbarNotificationsDropdown" style="width: 25rem;">
                <div class="card">
                  <!-- Header -->
                  <div class="card-header card-header-content-between">
                    <h4 class="card-title mb-0">Notifications</h4>
                    <!-- Unfold -->
                    <!-- End Unfold -->
                  </div>
                  <!-- End Header -->

                  <!-- Nav -->
                  <ul class="nav nav-tabs nav-justified" id="notificationTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" href="#notificationNavOne" id="notificationNavOne-tab"
                        data-bs-toggle="tab" data-bs-target="#notificationNavOne" role="tab"
                        aria-controls="notificationNavOne" aria-selected="true">Messages ({{ listNotif.length }})</a>
                    </li>
                  </ul>
                  <!-- End Nav -->

                  <!-- Body -->
                  <div class="card-body-height">
                    <!-- Tab Content -->
                    <div class="tab-content" id="notificationTabContent">
                      <div class="tab-pane fade show active" id="notificationNavOne" role="tabpanel"
                        aria-labelledby="notificationNavOne-tab">
                        <!-- List Group -->
                        <ul class="list-group list-group-flush navbar-card-list-group">
                          <!-- Item -->
                          <template v-for="notif in listNotif">    
                          <li class="list-group-item form-check-select" @click="handleNotif(notif, notif.PrId)" v-if="notif.Process === 'Purchase Request'">
                            <div class="row">
                              <div class="col-auto">
                                <div class="d-flex align-items-center">
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="notificationCheck2"
                                      checked>
                                    <label class="form-check-label" for="notificationCheck2"></label>
                                    <span class="form-check-stretched-bg"></span>
                                  </div>
                                  <div class="avatar avatar-sm avatar-soft-dark avatar-circle">
                                    <span class="avatar-initials">PR</span>
                                  </div>
                                </div>
                              </div>
                              <!-- End Col -->

                              <div class="col ms-n2">
                                <h5 class="mb-1">{{ notif.Process }}</h5>
                                <p class="text-body fs-5">by: {{ notif.UserBy }}</p>
                                <blockquote class="blockquote blockquote-sm">
                                  {{ notif.PrPurpose }}
                                </blockquote>
                              </div>
                              <!-- End Col -->

                              <small class="col-auto text-muted text-cap">10hr</small>
                              <!-- End Col -->
                            </div>
                            <!-- End Row -->

                            <a class="stretched-link" href="#"></a>
                          </li>                            
                          <li class="list-group-item form-check-select" @click="handleNotif(notif, notif.PoId)" v-else-if="notif.Process === 'Purchase Order'">
                            <div class="row">
                              <div class="col-auto">
                                <div class="d-flex align-items-center">
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="notificationCheck2"
                                      checked>
                                    <label class="form-check-label" for="notificationCheck2"></label>
                                    <span class="form-check-stretched-bg"></span>
                                  </div>
                                  <div class="avatar avatar-sm avatar-soft-dark avatar-circle">
                                    <span class="avatar-initials">PO</span>
                                  </div>
                                </div>
                              </div>
                              <!-- End Col -->
                              
                              <div class="col ms-n2">
                                <h5 class="mb-1">{{ notif.Process }}</h5>
                                <p class="text-body fs-5">by: {{ notif.userBy }}</p>
                              </div>
                              <!-- End Col -->

                              <small class="col-auto text-muted text-cap">10hr</small>
                              <!-- End Col -->
                            </div>
                            <!-- End Row -->

                            <a class="stretched-link" href="#"></a>
                          </li>
                          </template>
                        </ul>
                        <!-- End List Group -->
                      </div>

                    </div>
                    <!-- End Tab Content -->
                  </div>
                  <!-- End Body -->

                  <!-- Card Footer -->
                  <a class="card-footer text-center" href="#">
                    View all notifications <i class="bi-chevron-right"></i>
                  </a>
                  <!-- End Card Footer -->
                </div>
              </div>
            </div>
            <!-- End Notification -->
          </li>

          <li class="nav-item">
            <!-- Account -->
            <div class="dropdown">
              <a class="navbar-dropdown-account-wrapper" href="javascript:;" id="accountNavbarDropdown"
                data-bs-toggle="dropdown" aria-expanded="false" data-bs-dropdown-animation>
                <div class="avatar avatar-sm avatar-circle">
                  <img class="avatar-img" src="../assets/user.png" alt="Image Description">
                  <span class="avatar-status avatar-sm-status avatar-status-success"></span>
                </div>
              </a>

              <div
                class="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                aria-labelledby="accountNavbarDropdown" style="width: 16rem;">
                <div class="dropdown-item-text">
                  <div class="d-flex align-items-center">
                    <div class="avatar avatar-sm avatar-circle" :tabindex="tabindex + 1">
                      <img class="avatar-img" src="../assets/user.png" alt="Image Description">
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h5 class="mb-0">{{ username }}</h5>
                      <p class="card-text text-body" style="font-size: 12px">{{ email }}</p>
                    </div>
                  </div>
                </div>

                <div v-if="usahaTitle !== undefined" class="dropdown-divider"></div>
                <p v-if="usahaTitle !== undefined" class="card-text text-body ps-2" style="font-size: 12px"><i
                    class="bi-shop"></i> {{ usahaTitle }}</p>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="logout">Sign out</a>
              </div>
            </div>
            <!-- End Account -->
          </li>
        </ul>
        <!-- End Navbar -->
      </div>
    </div>
  </header>

  <!-- ========== END HEADER ========== -->
</template>
<script>
// navbar.vue
import { getNotif, getUser, getConfirmPR, getConfirmPO } from './services/components';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      listUser: [],
      data: []
    }
  },
  props: {
    tabindex: {
      type: Number,
      required: false,
      default: -100,
    }
  },
  methods: {
    closeDropdown() {
      // Close the dropdown when the route changes
      const dropdownMenu = document.querySelector('.dropdown-menu');

      if (dropdownMenu && dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
      }
    },
    findUserName(id) {
      return this.listUser.find(x => x._id === id).userName
    },
    async handleNotif(data, id) {
      if (data.Process === 'Purchase Request' && this.$route.name !== 'purchase-request-detail') {
        const sendData = await getConfirmPR(id)
        this.$router.push({ name: 'purchase-request-detail', params: { dataDetail: sendData[0], type: 'confirmPR', confirmData: data } })
      } else if (data.Process === 'Purchase Order' && this.$route.name !== 'po-detail') {
        const sendData = await getConfirmPR(id)
      }
        this.closeDropdown()
    },
    backToList() {
      const link = '/transaksi/' + this.routing
      this.$router.push(link)
    },
    addList() {
      const link = '/transaksi/' + this.routing + '/add'
      this.$router.push(link)
    },
    statusSwal(status) {
      if (status === 'success') {
        this.$swal(
          'Berhasil!',
          'Data berhasil Ditambahkan',
          'success'
        )
      } else if (status === 'successEdit') {
        this.$swal(
          'Berhasil!',
          'Data berhasil Diedit',
          'success'
        )
      } else if (status === 'cancel') {
        this.$swal(
          'yakin?',
          'Semua yang anda masukan akan dihapus!',
          'info'
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
      let swalText = '';

      if (typeData === 'edit') {
        btnColor = '#00AB8E';
        swalText = 'Tekan OK jika anda sudah yakin!';
      } else if (typeData === 'kembali') {
        btnColor = '#ED4C78';
        swalText = 'Semua yang anda masukan akan dihapus!';
      } else {
        btnColor = '#3085d6';
        swalText = 'Tekan OK jika anda sudah yakin!';
      }
      this.$swal({
        title: 'Anda Yakin?',
        text: swalText,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: btnColor,
        cancelButtonText: 'Kembali',
        confirmButtonText: 'OK',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.alertLoading()
          if (typeData === 'add') {
            this.$router.push('/transaksi/' + this.routing)
            this.statusSwal('success')
          } else if (typeData === 'edit') {
            this.$router.push('/transaksi/' + this.routing)
            this.statusSwal('successEdit')
          } else if (typeData === 'kembali') {
            this.$swal.close()
            this.$router.push('/transaksi/' + this.routing)
          }

        }
      });
    },
    resetStore() {
      this.$store.dispatch('updateDataUsaha', []);
      this.$store.commit('setTopbarTitle', '');
    },
    changeUsaha() {
      this.$store.dispatch('updateDataUsaha', []);
      this.$router.push('/list-usaha');
    },
    logout() {
      this.resetStore()
      // Get local storage
      localStorage.setItem("token", '');
      localStorage.setItem("_id", '');
      localStorage.setItem("userName", '');
      localStorage.setItem("userName", '');
      localStorage.setItem("userEmail", '');
      localStorage.setItem("userPhone", '');
      localStorage.setItem("userDomainCode", '');
      this.$swal('Berhasil', 'Log Out berhasil', 'success');
      this.$store.dispatch('logout')
      this.$router.push('/');
    }
  },
  async mounted() {
    this.listUser = await getUser()
    this.data = await getNotif(localStorage.getItem('_id'))
    console.log('coba ',this.data)
  },
  computed: {
    ...mapState({
      topbarTitle: state => state.topbarTitle,
      routing: state => state.routing,
      dataUsaha: state => state.dataUsaha,
      btnList: state => state.btnList
    }),
    listNotif () {
      console.log('tes',this.data)
      return this.data.filter(x => x.Routing === true)
    },
    usahaTitle: function () {
      const usahaTitle = this.dataUsaha.domainName;
      return usahaTitle;
    },
    username: function () {
      const username = localStorage.getItem('userName');
      return username;
    },
    email: function () {
      const email = localStorage.getItem('userEmail');
      return email;
    }
  }
}
</script>
<style scoped>.brand-img {
  width: 25px;
  height: 25px;
}</style>
