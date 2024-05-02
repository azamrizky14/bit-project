<template  v-if="fields.length > 0">
  <form>
    <div class="row my-1">
      <div class="col-4 d-flex align-items-center">
        <ul class="breadcrumb m-0">
          <li>
            <router-link to="/dashboard">
              <a href="#"><i class="bi-house-door"></i></a>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: posts.transRouting.replace('-detail', '') }"
            >
              <a href="#">{{ posts.transTitle }}</a>
            </router-link>
          </li>
          <li>Details</li>
        </ul>
      </div>
      <div class="col-4 align-items-center">
        <h4
          style="display: flex;align-items: center;justify-content: center;flex-direction: column; !important"
        >
          {{ posts.transTitle }} Details
        </h4>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <router-link :to="{ name: posts.transRouting.replace('-detail', '') }"
          ><button
            class="btn btn-outline-secondary btn-xs py-1 me-2"
            type="button"
          >
            <i class="bi-chevron-left"></i>Kembali
          </button></router-link
        >
        <button
          type="button"
          class="btn btn-primary btn-xs py-1"
          @click.prevent="sendData"
        >
          Tambah
        </button>
      </div>
    </div>
    <div class="row scale-9 position-relative" style="width: 114%; z-index: 1">
      <div
        v-for="(field, index) in dummyItems"
        :class="[field.componentClass]"
        v-if="field.componentName === 'fieldHeader'"
        :key="index"
      >
        <div class="card h-100">
          <div class="row px-3">
            <div
              v-for="micro in field.componentMicro"
              :class="['', micro.microClass]"
            >
              <div class="row" v-if="micro.microType === 'select'">
                <b-form-group
                  :label="micro.microName + ' :'"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm="8"
                  content-cols-lg="9"
                >
                  <b-form-select
                    v-model="micro.value"
                    :options="micro.microOptions"
                    size="sm"
                    class="mt-1 form-control-sm py-0 form-control"
                    :disabled="micro.isDisabled"
                  ></b-form-select>
                </b-form-group>
              </div>
              <template v-else-if="micro.microType === 'multiselect'">
                <b-form-group
                  :label="micro.microName + ' :'"
                  :label-for="micro.microName"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm="8"
                  content-cols-lg="9"
                  invalid-feedback="Condition Harus Diisi!"
                >
                  <multiselect
                    class="my-1"
                    @input="changeCondition(micro.value)"
                    :id="micro.microName"
                    v-model="micro.value"
                    :options="micro.microOptions"
                    placeholder="Select one"
                    :multiple="false"
                    :show-labels="false"
                    :allow-empty="required"
                    :custom-label="customLabel"
                  >
                  </multiselect>
                </b-form-group>
              </template>
              <template v-else-if="micro.key === 'productQty'">
                <b-form-group
                  :label="micro.microName + ' :'"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm="8"
                  content-cols-lg="9"
                >
                  <b-form-input
                    v-model="micro.value"
                    class="form-control form-control-sm py-0"
                    :type="micro.microType"
                    :placeholder="micro.microText"
                    required
                    @change="getQty(micro.value)"
                  ></b-form-input>
                </b-form-group>
              </template>
              <template v-else>
                <b-form-group
                  :label="micro.microName + ' :'"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm="8"
                  content-cols-lg="9"
                >
                  <b-form-input
                    v-model="micro.value"
                    class="form-control form-control-sm py-0"
                    :type="micro.microType"
                    :placeholder="micro.microText"
                    required
                    :disabled="micro.isDisabled"
                  ></b-form-input>
                </b-form-group>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12 scale-12">
        <div
          v-for="field in component"
          :class="['h-100', field.componentClass]"
          v-if="field.componentName === 'fieldNote'"
        >
          <div class="card h-100">
            <div class="card-header bg-light py-1">
              {{ field.componentTitle }}
            </div>
            <template v-for="micro in field.componentMicro">
              <textarea
                disabled
                class="form-control form-control-sm py-1 h-100"
                style="resize: none"
                :placeholder="micro.microText"
                v-model="micro.value"
              ></textarea>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <!-- table disini -->
      <!-- {{ excelData.woRecipeItem }} -->
      <div
        class="row"
        style="padding-bottom: 10px; !important;"
        v-if="excelData.woRecipeItem.length > 0"
        v-for="data in excelData.woRecipeItem"
      >
        <div class="col-4">
          <!-- List Group -->
          <ul class="list-group">
            <b>
              <li
                class="list-group-item active"
                style="padding: 10px; !important; border-radius: 5px 5px 0 0"
              >
                <i
                  :class="
                    ['bi bi-'] +
                    data.processCode +
                    ['-square-fill '] +
                    ['list-group-icon']
                  "
                ></i>
                {{ data.processName }}
              </li></b
            >
            <li
              class="list-group-item"
              style="padding-bottom: 2px;padding-top: 1px; !important"
            >
              <i class="bi bi-box-seam list-group-icon"></i><b>Menghasilkan :</b
              ><br />
              <table class="table">
                <tr>
                  <td>
                    <!-- <small>{{ data.recipeItemResult.itemCode }}</small> -->
                  </td>
                  <td>{{ data.recipeItemResult.itemName }}</td>
                  <td>{{ data.recipeQty }} ({{ data.recipeUM }})</td>
                </tr>
              </table>
            </li>
            <li
              class="list-group-item"
              style="padding-bottom: 2px;padding-top: 1px; !important"
            >
              <i class="bi bi-receipt list-group-icon"></i>Material :<br />
              <table class="table">
                <tr v-for="itemData in data.recipeMaterial">
                  <!-- <td>
                    <small>{{ itemData.itemCode }}</small>
                  </td> -->
                  <td>{{ itemData.itemName }}</td>
                  <td>{{ itemData.qty }}</td>
                  <td>{{ itemData.UM }}</td>
                </tr>
              </table>
            </li>
          </ul>
          <!-- End List Group -->
        </div>
        <div class="col-4">
          <!-- List Group -->
          <ul class="list-group">
            <b>
              <li
                class="list-group-item active"
                style="padding: 10px; !important; border-radius: 5px 5px 0 0"
              >
                <i :class="['bi bi-receipt '] + ['list-group-icon']"></i>
                Penggunaan Material
              </li></b
            >
            <li
              class="list-group-item"
              style="padding-bottom: 2px;padding-top: 1px; !important"
            >
              <table class="table">
                <tr v-for="itemData in data.recipeMaterial">
                  <!-- <td>
                    <small>{{ itemData.itemCode }}</small>
                  </td> -->
                  <td>{{ itemData.itemName }}</td>
                  <td>
                    <!-- <input
                        class="form-control form-control-sm"
                        type="text"
                        size="5"
                        :value="itemData.qty"
                      /> -->
                    {{ itemData.qty }}
                  </td>
                  <td>{{ itemData.UM }}</td>
                </tr>
              </table>
            </li>
          </ul>
          <!-- End List Group -->
        </div>
        <div class="col-4">
          <!-- List Group -->
          <ul class="list-group">
            <b>
              <li
                class="list-group-item active"
                style="padding: 10px; !important; border-radius: 5px 5px 0 0"
              >
                <i class="bi bi-box-seam list-group-icon"></i>
                <b>Hasil Work Order : </b> {{ data.recipeItemResult.itemName }}
              </li></b
            >
            <li
              class="list-group-item"
              style="padding-bottom: 2px;padding-top: 1px; !important"
            >
              <table class="table">
                <tr>
                  <td>
                    <!-- <input
                        class="form-control form-control-sm"
                        type="text"
                        placeholder="Nama User"
                        size="5"
                      /> -->
                    Nama User
                  </td>
                  <td>
                    <!-- <input
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Kuantitas hasil"
                      size="5"
                    /> -->
                    Qty
                  </td>
                  <td>({{ data.recipeUM }})</td>
                  <td>location</td>
                  
                </tr>
              </table>
            </li>
          </ul>
          <!-- End List Group -->
        </div>
      </div>

      <div class="col-12" v-else>
        <h4>Item ini belum di setup formula</h4>
      </div>
    </div>
  </form>
</template>

<script>
import { addWO } from "../services/transComponent";
import { dynamicJS } from "../services/dynamic";
import { getRouting } from "../services/components";
export default {
  props: {
    listQty: {
      type: String,
    },
    refreshMethods: {
      type: Function,
      required: true,
    },
    posts: {
      type: Object,
      required: true,
    },
    component: {
      type: Array,
      required: true,
    },
    hotSettings: {
      type: Object,
      required: true,
    },
    contentDivWidth: {
      type: Number,
      required: true,
    },
    widthTable: {
      type: Number,
      required: true,
    },
    excelData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      routing: [],
      minData: "",
      dataTable: [],
      tempData: [],
      multipler: "",
      dynamicFunction: dynamicJS,
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
    dummyItems() {
      const dummy = {};
      for (const key in this.component) {
        dummy[key] = { ...this.component[key] };
      }
      console.log("component :", this.component);
      console.log("dummy", dummy);
      return dummy;
    },
    dataRange() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
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
  async mounted() {
    const tes = await getRouting();
    this.routing = tes.filter(
      (x) => x.routingGroup === "Work Order"
    )[0].routingConfirm;
  },
  methods: {
    getQty(data) {
      let numericValue = parseInt(data);
      numericValue =
        Math.round(numericValue / parseInt(this.minData)) *
        parseInt(this.minData);
      // Menghindari nilai negatif atau nol
      numericValue = Math.max(numericValue, parseInt(this.minData));
      console.log("JANCOK KON ", numericValue);

      this.$nextTick(() => {
        this.component
          .filter((x) => x.componentName === "fieldHeader")
          .forEach((y) => {
            y.componentMicro.find((z) => {
              if (z.key === "productQty") {
                z.value = numericValue;
              }
            });
          });
      });
      this.component = [...this.component];
      let tes = Math.round(numericValue / parseInt(this.minData));
      this.multipler = tes;
    },
    changeCondition(data) {
      console.log(data);
      if (data === null) {
        data.invSaldo = 0;
        data.itemMinRecipe = 0;
        data.itemRecipe = [];
      }
      this.multipler = 1;
      this.dataTable = [...data.itemRecipe];
      this.minData = data.itemMinRecipe;
      this.component
        .filter((x) => x.componentName === "fieldHeader")
        .forEach((y) => {
          y.componentMicro.find((z) => {
            if (z.key === "stockProduk") {
              z.value = data.invSaldo;
            } else if (z.key === "minQtyProduk") {
              z.value = data.itemMinRecipe;
            } else if (z.key === "productQty") {
              z.value = data.itemMinRecipe;
            }
          });
        });
    },
    customLabel(option) {
      return `${option.itemName} - ${option.itemCode}`;
    },
    sendData(event) {
      event.preventDefault();
      // header Data
      const finalHeader = this.component.reduce((result, item) => {
        if (
          item.componentName === "fieldHeader" &&
          Array.isArray(item.componentMicro)
        ) {
          console.log("fase 1");
          item.componentMicro.forEach((microItem) => {
            if (microItem.value !== undefined) {
              result[microItem.key] = microItem.value;
            } else {
              result[microItem.key] = "";
            }
          });
        }
        return result;
      }, {});
      const finalNote = this.component.reduce((result, item) => {
        if (
          item.componentName === "fieldNote" &&
          Array.isArray(item.componentMicro)
        ) {
          item.componentMicro.forEach((microItem) => {
            result[microItem.key] = microItem.microValue;
          });
        }
        return result;
      }, {});
      // table Data
      const fieldsTable = this.component.find(
        ({ componentName }) => componentName === "fieldTable"
      ).componentMicro;
      const finalTable = this.excelData
        .filter((item) => {
          return fieldsTable.some((obj) => {
            const value = item[obj.key];
            return (
              value !== "" &&
              value !== undefined &&
              value !== null &&
              value.length > 0
            );
          });
        })
        .map((item) => ({
          ...item,
        }));
      // final Note
      // final Total
      const finalTotal = this.component.reduce((result, item) => {
        if (
          item.componentName === "fieldTotal" &&
          Array.isArray(item.componentMicro)
        ) {
          item.componentMicro
            .filter((tes) => tes.editableTotal === true)
            .forEach((microItem) => {
              if (isNaN(microItem.value)) {
                result[microItem.key] = 0;
              } else {
                result[microItem.key] = microItem.value;
              }
            });
        }
        return result;
      }, {});
      // final Footer
      const finalFooter = {
        note: finalNote,
        total: finalTotal,
      };
      // final Data
      const finalData = {
        woDomain: "648da0edc3889697b16e8675",
        woNoBatch: finalHeader.noBatch,
        woUserCreated: localStorage.getItem("_id"),
        woitemId: finalHeader.productName._id,
        woItemName: finalHeader.productName.itemName,
        woItemCategory: finalHeader.productName.itemCategory,
        woItemUm: finalHeader.productName.itemUM,
        woItemQty: finalHeader.productQty,
        woScheduleDate: finalHeader.scheduleDate,
        woStartDate: "",
        woNoted: finalNote.note,

        woRouting: this.routing,
        woRecipeItem: finalHeader.productName.itemRecipe.map((x) => {
          const data = {
            ...x,
          };
          data.recipeQty = data.recipeQty * this.multipler;
          return data;
        }),
      };
      console.log("tes", finalData);
      const doneValidator = Object.entries(finalHeader).every(
        ([value, key]) => {
          if (key === "noBatch") {
            return true;
          }
          return value !== "";
        }
      );
      if (doneValidator) {
        this.$swal({
          title: "Anda Yakin?",
          text: "Tekan Simpan jika anda sudah yakin!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Simpan",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.alertLoading();
            try {
              console.log(finalData);
              const voucher = await addWO(finalData);
              this.successAdd();
              this.refreshFields();
              this.$router.push({
                name: this.posts.transRouting.replace("-detail", ""),
              });
            } catch (error) {
              alert(error);
            }
          }
        });
      } else {
        alert("ada data yang masih Kosong!");
      }
    },
    alertLoading() {
      this.$swal({
        title: "Loading...",
        text: "Mohon Ditunggu ya.",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        willOpen: () => {
          this.$swal.showLoading();
        },
      });
    },
    successAdd() {
      this.$swal("Berhasil!", "Data berhasil ditambahkan", "success");
    },
    refreshFields() {
      this.component
        .filter((x) => x.componentName === "fieldHeader")
        .forEach((y) => {
          y.componentMicro.find((z) => (z.value = ""));
        });
      this.component.find(
        (x) => x.componentName === "fieldNote"
      ).componentMicro[0].microValue = "";
    },
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
      if (this.fields !== undefined) {
        this.checkedFields = [];
        this.fields.forEach((field) => {
          this.checkedFields.push(field.key);
        });
      }
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