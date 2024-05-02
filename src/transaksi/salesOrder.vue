<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 pt-0" ref="contentDiv">
      <div class="row my-1">
        <div class="col-4 d-flex align-items-center">
          <ul class="breadcrumb m-0">
            <li>
              <router-link to="/dashboard">
                <a href="#"><i class="bi-house-door"></i></a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: posts.transRouting }">
                <a href="#">{{ posts.transTitle }}</a>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-4 text-center"><span class="h2">List {{ posts.transTitle }}</span></div>
      </div>
      <hr class="my-2" />

      <!-- Content -->
      <template v-if="isDataLoaded">
        <div class="card">
          <div class="card-header bg-light p-2">
            <div class="row d-flex">
              <div class="col-9 row">
                <div class="d-flex col-12 align-items-center pe-0  mt-2" v-for="(data, i) in filterList">
                  <select style="font-size: 12px; max-width: 125px" class="form-select form-select-sm py-1 px-2"
                    v-model="data.filterBaris">
                    <option value="" v-if="!filterBaris">Filter Baris</option>
                    <option v-for="micro in tableHeader" :value="micro.key" v-if="micro.key !== 'actions'">{{ micro.label
                    }}</option>
                  </select>
                  <select class="mx-2 form-select form-select-sm py-1 px-2" style="font-size: 12px; max-width: 125px"
                    v-model="data.startFrom">
                    <option value="" v-if="!data.startFrom">Tipe Pencarian</option>
                    <option :value="micro" v-for="micro in optionQuery">{{ micro }}</option>
                  </select>
                  <div class="input-group" style="width: 150px">
                    <div class="input-group-prepend">
                      <span class="input-group-text py-1 px-2"><i class="bi-search" style="font-size: 10px"></i></span>
                    </div>
                    <input type="search" class="form-control form-control-sm p-1" placeholder="Cari Data..."
                      aria-label="Recipient's username" aria-describedby="basic-addon2" style="font-size: 12px"
                      v-model="data.filter1" />
                  </div>
                  <div class="input-group px-2" style="width: 150px">
                    <div class="input-group-prepend">
                      <span class="input-group-text py-1 px-2"><i class="bi-search" style="font-size: 10px"></i></span>
                    </div>
                    <input type="search" class="form-control form-control-sm p-1" placeholder="Cari Data..."
                      aria-label="Recipient's username" aria-describedby="basic-addon2" style="font-size: 12px"
                      v-model="data.filter2" />
                  </div>
                  <select class="mx-2 form-select form-select-sm py-1" style="font-size: 12px; max-width: 65px"
                    v-model="data.logic">
                    <option value="and">dan</option>
                    <option value="or">atau</option>
                  </select>
                  <i class="bi-plus-circle text-primary ms-1" style="cursor: pointer" @click="addFilterList"></i>
                  <i class="bi-x-circle text-danger ms-1" style="cursor: pointer" @click="removeFilterRow(i)"></i>
                </div>
              </div>

              <div class="col-3 d-flex justify-content-between mt-2 align-items-start p-0" style="z-index: 2">
                <button type="button" class="btn-xs btn btn-outline-success">
                  Cari
                </button>
                <button type="button" class="btn-xs btn btn-outline-warning">
                  Reset
                </button>
                <div class="btn-group me-2">
                  <router-link :to="$route.path+'/add'" class="btn btn-xs btn-primary">
                    Tambah
                  </router-link>
                  <button type="button" class="btn btn-xs btn-primary dropdown-toggle dropdown-toggle-split"
                    href="javascript:;" id="accountNavbarDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                    data-bs-dropdown-animation></button>
                  <div class="dropdown">
                    <div
                      class="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                      aria-labelledby="accountNavbarDropdown">
                      <div class="flex-grow-1 ms-3">
                        <p class="card-text text-body" style="font-size: 12px">
                          Import file
                        </p>
                      </div>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#"> json</a>
                      <a class="dropdown-item" href="#">xls</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body p-2">
            <div class="d-flex align-items-center justify-content-between">
              <div style="font-size: 11px; width: 300px" class="d-flex align-items-center justify-content-between">
                Menampilkan 1 - 10 data dari {{ rows }}
                <select class="form-select py-1" aria-label="Default select example"
                  style="width: 75px; font-size: 12px; padding: 0 0.5rem !important;">
                  <option v-for="data in pageList" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>
              <b-pagination class="m-0" v-model="currentPage" :total-rows="rows" :per-page="perPage"><template
                  #first-text><button class="btn btn-outline-primary btn-xs">
                    First
                  </button></template>
                <template #prev-text><button class="btn btn-outline-primary btn-xs">
                    Prev
                  </button></template>
                <template #next-text><button class="btn btn-outline-primary btn-xs">
                    Next
                  </button></template>
                <template #last-text><button class="btn btn-outline-primary btn-xs">
                    Last
                  </button></template>
                <template #ellipsis-text> ... </template>
                <template #page="{ page, active }">
                  <b v-if="active">{{ page }}</b>
                  <i v-else>{{ page }}</i>
                </template></b-pagination>
            </div>
            <hr class="my-2" />
            <!-- tabel view untuk detil -->
            <b-table striped hover :items="dataListPO" :fields="tableHeader" label-sort-asc="" label-sort-desc=""
              class="myTable listTable">
              <template #cell(PoSupplier)="data">
                {{ data.item.PoSupplier.userName }}
              </template>
              <template #cell(transIdMember.userAddress)="data">
                {{ data.item.transIdMember.userAddress[0].location }}
              </template>
              <template #cell(transPesanan)="data">
                <div class="inner-table">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Nama Barang</th>
                        <th>Qty</th>
                        <th>Harga</th>
                        <!-- Tambahkan kolom lain di sini sesuai kebutuhan -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in data.item.transPesanan" :key="index">
                        <td>{{ item.itemName }}</td>
                        <td>{{ item.itemQty }}</td>
                        <td>{{ item.itemMasterPrice[0].priceName }}</td>
                        <!-- Tambahkan kolom lain di sini sesuai kebutuhan -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-dropdown id="dropdown-1" right size="xs" variant="primary">
                  <template #button-content>
                    <i class="bi-gear"></i>
                  </template>
                  <b-dropdown-item @click="detilAction(data.item.transId)">Detail</b-dropdown-item>
                </b-dropdown>
              </template>
            </b-table>
          </div>
        </div>
      </template>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
  
<script>
// import router from "@/router";
import { get1, getSO } from '../components/services/components'
import { getListPObyDomainPagination } from "../components/services/components";
export default {
  components: {},
  data() {
    return {
      // pagination
      rows: 3,
      perPage: 10,
      currentPage: 1,
      optionQuery: ['start at', 'equal', 'include'],
      pageList: ["10", "25", "50", "Semua"],
      // ===
      listUser: [],
      filterList: [],
      filterText: "",
      sendData: {},
      transData: [],
      contentDivWidth: 0,
      routing: "",
      tableHeader: [],
      component: [],
      dataListPO: [],
      isDataLoaded: false,
      posts: [],
    };
  },
  async mounted() {
    this.addFilterList();
    this.posts = await get1(this.$route.name);
    (this.tableHeader = [
      {
        key: "transId",
        label: "SO Number",
        sortable: true,
        class: "align-top", thClass: "text-center"
      },
      {
        key: "transName",
        label: "Customer",
        sortable: true,
        class: "align-top", thClass: "text-center"
      },
      {
        key: "transKasir.userName",
        label: "Sales",
        sortable: true,
        class: "align-top", thClass: "text-center"
      },
      {
        key: "transIdMember.userAddress",
        label: "Ship To",
        sortable: true,
        class: "align-top", thClass: "text-center",
        thStyle: 'width: 200px'
      },
      {
        key: "transPesanan",
        label: "Item",
        sortable: true,
        class: "align-top", thClass: "text-center"
      },
      {
        key: "transShipmentPlanDate",
        label: "Tgl. Kirim",
        sortable: true,
        class: "align-top", thClass: "text-center"
      },
      {
        key: "transStatusSO",
        label: "Status",
        sortable: true,
        class: "align-top", thClass: "text-center"
      },
      { key: "actions", label: "Actions", class: "align-top", thClass: "text-center" },
    ]),
      // this.listUser = await getUser()
      // this.listSupplier = await getSupplier()
      this.dataListPO = await getSO();
      console.log('coba',this.dataListPO)
    this.isDataLoaded = true;
  },
  computed: {
    filteredTableData() {
      const filterText = this.filterText.toLowerCase().trim();
      return this.data.filter((row) => {
        for (let key in row) {
          const value = String(row[key]);
          if (value.toLowerCase().includes(filterText)) {
            return true;
          }
        }
        return false;
      });
    },
  },
  methods: {
    addFilterList() {
      const data = {
        filterBaris: '',
        startFrom: '',
        filter1: '',
        logic: '',
        filter2: ''
      }
      this.filterList.push(data)
    },

    removeFilterRow(data) {
      this.filterList.splice(data, 1)
    },
    detilAction(sonum) {
      // alert(sonum);
      this.$router.push({ name: this.$route.name+'-detail', params: { noSO: sonum } });
    },
  },
};
</script>
<style scope>
</style>