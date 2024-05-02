<template  v-if="fields.length > 0">
  <div class="card">
    <div class="card-header bg-light p-2">
      <div class="row">
        <div class="col-10 d-flex align-items-center">
          <select
            v-model="filterFields"
            style="font-size: 12px; max-width: 125px"
            class="form-select form-select-sm py-1 px-2"
          >
            <option value="">Filter Baris</option>
            <option v-for="list in settings.columns" :value="list.data">
              {{ list.title }}
            </option>
          </select>
          <select
            v-model="filterSort"
            class="mx-2 form-select form-select-sm py-1 px-2"
            style="font-size: 12px; max-width: 125px"
          >
            <option value="">Mulai Dari</option>
            <option value="asc">Atas</option>
            <option value="desc">Bawah</option>
          </select>
          <div class="input-group" style="width: 200px">
            <div class="input-group-prepend">
              <span class="input-group-text py-1 px-2"
                ><i class="bi-search" style="font-size: 10px"></i
              ></span>
            </div>
            <input
              v-model="filter"
              type="text"
              class="form-control form-control-sm p-1"
              placeholder="Cari Data..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              style="font-size: 12px"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary btn-xs"
                type="button"
                @click="filter = ''"
              >
                hapus
              </button>
            </div>
          </div>
          <select
            class="mx-2 form-select form-select-sm py-1 px-2"
            style="font-size: 12px; max-width: 50px"
          >
            <option value="and">dan</option>
            <option value="or">atau</option>
          </select>
          <div
            v-for="list in filterList"
            class="input-group ms-2"
            style="width: 125px"
          >
            <input
              v-model="list.filter"
              :disabled="filter === ''"
              type="text"
              class="form-control form-control-sm p-1"
              placeholder="..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              style="font-size: 12px"
            />
          </div>
          <i
            class="bi-plus-circle text-primary ms-1"
            style="cursor: pointer"
            @click="addFilter"
          ></i>
          <i
            class="bi-x-circle text-danger ms-1"
            style="cursor: pointer"
            @click="removeFilter"
          ></i>
          <button class="btn btn-outline-secondary btn-xs ms-1" type="button">
            cari
          </button>
          <button
            class="btn btn-outline-secondary btn-xs ms-1"
            type="button"
            @click="resetFilter"
          >
            reset
          </button>
        </div>
        <div class="col-2 d-flex justify-content-end" style="z-index: 2">
          <div class="btn-group me-2">
            <button
              type="button"
              class="btn btn-xs btn-primary"
              @click="addList"
            >
              Tambah
            </button>
            <button
              type="button"
              class="btn btn-xs btn-primary dropdown-toggle dropdown-toggle-split"
              href="javascript:;"
              id="accountNavbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-dropdown-animation
            ></button>
            <div class="dropdown">
              <div
                class="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                aria-labelledby="accountNavbarDropdown"
              >
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
        <span style="font-size: 11px">{{ dataRangeText }}</span>
        <nav aria-label="...">
          <ul class="pagination pagination-sm m-0">
            <li class="page-item">
              <a class="page-link" href="#" style="font-size: 12px"
                ><i class="bi-chevron-double-left"></i
              ></a>
            </li>
            <li
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              class="page-item"
              :class="{ active: currentPage === pageNumber }"
            >
              <a class="page-link" href="#" style="font-size: 12px">{{
                pageNumber
              }}</a>
            </li>
            <li>
              <a class="page-link" href="#" style="font-size: 12px"
                ><i class="bi-chevron-double-right"></i
              ></a>
            </li>
          </ul>
        </nav>
      </div>
      <hr class="my-2" />
      <hot-table
        :settings="settings"
        :data="data"
        :rowHeaders="true"
        :colHeaders="true"
        :colWidths="tableWidth"
        style="z-index: 0"
      ></hot-table>
    </div>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

// register Handsontable's modules
registerAllModules();
export default {
  components: {
    HotTable,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    routingLink: {
      type: String,
      required: true,
    },
    filterText: {
      type: String,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
    tableWidth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      filter: "",
      filterFields: "",
      filterSort: "",
      filterList: [{ filter: "" }],
      checkedFields: [],
      sortBy: "",
      sortDesc: false,
      currentPage: 1,
      perPage: 8,
    };
  },
  computed: {
    dataRange() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      console.log('cok 1',this.data);
      return this.data.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.data.length / this.perPage);
    },
    dataRangeText() {
      const startIndex = (this.currentPage - 1) * this.perPage + 1;
      const endIndex = Math.min(
        startIndex + this.perPage - 1,
        this.data.length
      );
      return `${startIndex} - ${endIndex} data dari total ${this.data.length} data`;
    },
  },
  created() {
    this.initializeCheckedFields();
  },
  methods: {
    addList() {
      const link = "/transaksi/" + this.routingLink + "/add";
      this.$router.push(link);
    },
    resetFilter() {
      this.filter = "";
      this.filterFields = "";
      this.filterSort = "";
      this.filterList = [{ filter: "" }];
    },
    addFilter() {
      if (this.filter !== "") {
        this.filterList.push({ filter: "" });
      }
    },
    removeFilter() {
      if (this.filterList.length > 1) {
        this.filterList.splice(-1);
      }
    },
    serviceDetail(item) {
      const data = item._id;
      this.$store.commit("setDataProses", item);
      this.$router.push({ name: "transaksi-detail", params: { data } });
    },
    initializeCheckedFields() {
      this.checkedFields = [];
      this.fields.forEach((field) => {
        this.checkedFields.push(field.key);
      });
    },
    handleButtonClick(item) {
      // Perform action when the button is clicked
      console.log("Button clicked:", item);
    },
    handleRowClick(item) {
      // Handle row click event
      console.log("Row clicked:", item);
    },
  },
};
</script>