<template  v-if="fields.length > 0">
  <form @submit="sendData">
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
          <li>Detail</li>
        </ul>
      </div>
      <div class="col-4 text-center">
        <span class="h2">Detail {{ posts.transTitle }}</span>
      </div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <router-link :to="{ name: posts.transRouting.replace('-detail', '') }"><button
            class="btn btn-outline-secondary btn-xs py-1 me-2" type="button"><i
              class="bi-chevron-left"></i>Kembali</button></router-link>
      </div>
      
    <hr class="mb-3 mt-1">
    </div>
    <div class="row scale-9 position-relative" style="width: 114%; z-index: 1;">
      <div v-for="(field, index) in dummyItems" :class="[field.componentClass]"
        v-if="field.componentName === 'fieldHeader'" :key="index">
        <div class="card h-100">
          <div class="row px-3">
            <div v-for="micro in field.componentMicro" :class="['', micro.microClass]">
              <div class="row" v-if="micro.microType === 'select'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-select v-model="micro.value" :options="micro.microOptions" size="sm"
                    class="mt-1 form-control-sm py-0 form-control" disabled></b-form-select>
                </b-form-group>
              </div>
              <template v-else-if="micro.microType === 'multiselect'">
                <b-form-group :label="micro.microName + ' :'" :label-for="micro.microName" label-cols-sm="4"
                  label-cols-lg="3" content-cols-sm="8" content-cols-lg="9" invalid-feedback="Condition Harus Diisi!">
                  <template v-if="micro.key === 'transShipTo'">
                    <multiselect class="my-1" :id="micro.microName" v-model="micro.value" :options="micro.value"
                      placeholder="Pilih Alamat" :multiple="false" :show-labels="false" required
                      :custom-label="customLabel1" disabled>
                    </multiselect>
                  </template>
                  <template v-else-if="micro.key === 'customer'">
                    <multiselect class="my-1" :id="micro.microName1" v-model="micro.value" :options="micro.microOptions" placeholder="Select one" :multiple="false" :show-labels="false"
                      required :custom-label="customLabel" disabled>
                    </multiselect>
                  </template>
                  <template v-else>
                    <multiselect class="my-1" :id="micro.microName" v-model="micro.value" :options="micro.microOptions"
                      placeholder="Select one" :multiple="false" :show-labels="false" required :custom-label="customLabel" disabled>
                    </multiselect >
                  </template>
                </b-form-group>
              </template>
              <template v-else-if="micro.key === 'orderNumber'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" disabled></b-form-input>
                </b-form-group>
              </template>
              <template v-else>
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" required disabled></b-form-input>
                </b-form-group>
              </template>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row mb-3">
      <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTable'">
        <div class=" row">
          <div class="hot-container col-md-12 position-relative" style="overflow-x: auto; z-index: 0">
            <hot-table :settings="hotSettings" :data="excelData[0].transPesanan" :rowHeaders="true" :colHeaders="true"
              :colWidths="widthTable"></hot-table>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6 scale-9">
        <div v-for="field in component" :class="['h-100', field.componentClass]"
          v-if="field.componentName === 'fieldNote'">
          <div class="card h-100">
            <div class="card-header bg-light py-1">{{ field.componentTitle }}</div>
            <template v-for="micro in field.componentMicro">
              <textarea class="form-control form-control-sm py-1 h-100" style="resize: none"
                :placeholder="micro.microText" v-model="micro.microValue" disabled></textarea>
            </template>
          </div>
        </div>

      </div>
      <div class="col-md-6 row p-0 scale-9" style="transform-origin: right top">
        <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTotal'">
          <template v-if="field.componentMicro.length > 0">
            <div class="row d-flex justify-content-end" v-for="micro in field.componentMicro">
              <template v-if="micro.key === 'tableTotal'">
                <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{
                  micro.microName
                }} :</div>
                <div :class="['p-0 border border-light', micro.microClass]">
                  <input :disabled="!micro.editableTotal" :type="formatNumber(micro.microValue)" v-model="micro.value"
                    class="form-control form-control-sm py-1" style="text-align: right">
                </div>
              </template>
              <template v-else>
                <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{
                  micro.microName
                }} :</div>
                <div :class="['p-0 border border-light', micro.microClass]">
                  <input :disabled="!micro.editableTotal" @input="refreshMethods()" :type="micro.microType"
                    v-model="micro.value" class="form-control form-control-sm py-1" style="text-align: right">
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

// register Handsontable's modules
registerAllModules();
import { addTrans } from '../services/components'
import { dynamicJS } from '../services/dynamic';
import { formatNumber } from '../../components/function/number'
export default {
  components: {
    HotTable
  },
  props: {
    refreshMethods: {
      type: Function,
      required: true,
    },
    posts: {
      type: Object,
      required: true,
    },
    Item: {
      type: Array,
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
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isDisabled: true,
      shipTo: [],
      dynamicFunction: dynamicJS,
      filter: '',
      filterFields: '',
      filterSort: '',
      filterList: [{ filter: '' }],
      checkedFields: [],
      sortBy: '',
      sortDesc: false,
      currentPage: 1,
      perPage: 8,
    };
  },
  computed: {
    dummyItems() {
      const dummy = {}
      for (const key in this.component) {
        dummy[key] = { ...this.component[key] }
      }
      return dummy
    },
    subTotal() {
      let sum = 0
      for (const item of this.excelData) {
        const value = item.microValue; // Remove leading and trailing spaces
        if (value !== '') {
          sum += parseFloat(value); // Convert to float and add to the sum
        }
      }
      return sum
    },
    dataRange() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.data.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.data.length / this.perPage)
    },
    dataRangeText() {
      const startIndex = (this.currentPage - 1) * this.perPage + 1;
      const endIndex = Math.min(startIndex + this.perPage - 1, this.data.length);
      return `${startIndex} - ${endIndex} data dari total ${this.data.length} data`
    }
  },
  created() {
    this.initializeCheckedFields();
  },
  mounted() {
  },
  methods: {
    refreshFields() {
      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => z.value = '')
      })
      this.component.find(x => x.componentName === 'fieldNote').componentMicro[0].microValue = ''
    },
    formatNumber(data) {
      formatNumber(data)
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
    generateIdChart(length) {
      const numChars = '0123456789';
      const alphaChars = 'abcdefghijklmnopqrstuvwxyz';
      const characters = numChars.repeat(0.8 * length) + alphaChars.repeat(0.2 * length);
      let result = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }

      return result;
    },
    selectCustomer(data) {
      if (data._id) {
        this.shipTo = data.userAddress
      } else {
        this.shipTo = []
      }
    },
    addRequester(newCat) {
      const cat = {
        userName: newCat,
        userType: '-'
      };

      let tes = ''
      let tesLagi = ''
      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => {
          if (z.microType === 'multiselect') {
            if (z.key === 'PrRequestBy') {
              z.microOptions.push(cat)
              z.value = cat
            }
          }
        })
      })
    },
    customLabel(option) {
      return `${option.userName} (${option.userType})`;
    },
    customLabel1(option) {
      return `${option.nameAddr} (${option.location})`;
    },
    sendData(event) {
      event.preventDefault()
      // header Data      
      const finalHeader = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldHeader' && Array.isArray(item.componentMicro)) {
          item.componentMicro.forEach((microItem) => {
            if (microItem.value !== undefined) {
              result[microItem.key] = microItem.value;
            } else {
              result[microItem.key] = '';
            }
          })
        }
        return result
      }, {})
      // table Data
      const filteredItem = {}
      this.Item.forEach(item => {
        filteredItem[item.itemCode] = item
      });
      const fieldsTable = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      const finalTable = this.excelData
        .filter(item => {
          return fieldsTable.some(obj => {
            const value = item[obj.key]
            return value !== '' && value !== undefined && value !== null && value.length > 0;
          })
        })
        .map(item => ({
          ...filteredItem[item.productCode],
          idCart: this.generateIdChart(24),
          itemQty: item.tableQty.toString()
        }))
      // final Note
      const finalNote = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldNote' && Array.isArray(item.componentMicro)) {
          item.componentMicro.forEach((microItem) => {
            result[microItem.key] = microItem.microValue;
          })
        }
        return result
      }, {})
      // final Total
      const finalTotal = this.component.reduce((result, item) => {
        if (item.componentName === 'fieldTotal' && Array.isArray(item.componentMicro)) {
          item.componentMicro.filter(tes => tes.editableTotal === true).forEach((microItem) => {
            if (isNaN(microItem.value)) {
              result[microItem.key] = 0;
            } else {
              result[microItem.key] = microItem.value;
            }
          })
        }
        return result
      }, {})
      // final Footer
      const finalFooter = {
        note: finalNote, total: finalTotal
      }
      // final Data
      const now = new Date();
      const hour = String(now.getHours()).padStart(2, 0);
      const minutes = String(now.getMinutes()).padStart(2, 0);
      const finalData = {
        transDomain: "648da0edc3889697b16e8675", // nanti dibuat otomatis
        // transId: "0",
        transKasir: finalHeader.sales._id,
        transName: finalHeader.customer.userName,
        transIdMember: finalHeader.customer._id,
        transTable: "",
        transStatusPayment: "no",
        transCetakShift: "no",
        transPayment: "",
        transPesanan: finalTable,
        transTime: hour + ':' + minutes,
        transDate: finalHeader.orderDate,
        transShipmentPlanDate: finalHeader.shipPlan,
        transShipTo: [finalHeader.shipTo]

      }
      const doneValidator = Object.values(finalHeader).every(value => value !== '');
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
            const voucher = await addTrans(finalData);
            // const voucherData = await getD(encodeURIComponent(voucher.voucher))
            // const type = voucherData[0].voucherCode.slice(0, 3)
            // let title = ''
            // let by = ''
            // if (type === 'BKM' || type === 'BBM') {
            //   by = 'Masuk Ke :'
            //   title = 'Bukti Kas Masuk'
            // } else if (type === 'BKK' || type === 'BBK') {
            //   by = 'Keluar Dari :'
            //   title = 'Bukti Kas Keluar'
            // } else {
            //   by = ''
            //   title = 'Bukti Kas'
            // }
            this.successAdd();
            // const data = {
            //   oleh: `${by}\n  ${voucherData[0].Trans[0].transCoaName}\n  ${voucherData[0].Trans[0].transCoaCode}`,
            //   title: title,
            //   tgl: voucherData[0].tgl,
            //   nomor: voucherData[0].voucherCode,
            //   catatan: voucherData[0].note,
            //   transData: voucherData[0].Trans.map(x => {
            //     const final = {
            //       code: x.transCoaCode,
            //       name: x.transCoaName
            //     }
            //     if (x.transAmount.startsWith('-')) {
            //       final.nominal = x.transAmount.slice(1)
            //     } else {
            //       final.nominal = x.transAmount
            //     }
            //       final.nominal = parseFloat(final.nominal)
            //     return final
            //   })
            // }
            // await kasbankByVoucher(data);
            this.refreshFields();
            this.$router.push({ name: this.posts.transRouting.replace('-add', '') })
          } catch (error) {
            alert(error);
          }
        }
      });
      } else {
        alert('ada data yang masih Kosong!')
      }
    },
    addList() {
      const link = '/transaksi/' + this.routingLink + '/add'
      this.$router.push(link)
    },
    resetFilter() {
      this.filter = ''
      this.filterFields = ''
      this.filterSort = ''
      this.filterList = [{ filter: '' }]
    },
    addFilter() {
      if (this.filter !== '') {
        this.filterList.push({ filter: '' })
      }
    },
    removeFilter() {
      if (this.filterList.length > 1) {
        this.filterList.splice(-1)
      }
    },
    serviceDetail(item) {
      const data = item._id
      this.$store.commit('setDataProses', item)
      this.$router.push({ name: 'transaksi-detail', params: { data } })
    },
    initializeCheckedFields() {
      if (this.fields !== undefined) {
        this.checkedFields = [];
        this.fields.forEach(field => {
          this.checkedFields.push(field.key);
        });
      }
    },
    handleButtonClick(item) {
      // Perform action when the button is clicked
      console.log('Button clicked:', item);
    },
    handleRowClick(item) {
      // Handle row click event
      console.log('Row clicked:', item);
    },
  }
};
</script>