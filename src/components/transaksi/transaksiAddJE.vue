<template  v-if="fields.length > 0">
  <form @submit="sendData">
    <div class="row my-1">
      <div class="col-4 d-flex align-items-center">
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
          <li>Buat</li>
        </ul>
      </div>
      <div class="col-4 text-center"><span class="h2">Buat {{ posts.transTitle }}</span></div>
      <div class="col-4 d-flex justify-content-end align-items-center">
        <router-link :to="{ name: posts.transRouting.replace('-add', '') }"><button
            class="btn btn-outline-secondary btn-xs py-1 me-2" type="button"><i
              class="bi-chevron-left"></i>Kembali</button></router-link>
        <button type="submit" class="btn btn-primary btn-xs py-1" :disabled="saldoAkhir < 0">Simpan</button>
      </div>
    </div>
    <div class="row mx-1">
      <div class="alert alert-danger" role="alert" :class="saldoAkhir < 0 ? '' : 'd-none'">
        <b><i class="bi-exclamation-circle"></i> Saldo Akhir tidak Boleh Kurang Dari 0!</b>
      </div>
    </div>
    <div class="row scale-9 position-relative" style="width: 114%; z-index: 1;">
      <div v-for="(field, index) in dummyItems" :class="[field.componentClass]"
        v-if="field.componentName === 'fieldHeader'" :key="index">
        <div class="card h-100">
          <div class="row px-3 pt-1">
            <div v-for="micro in field.componentMicro" :class="['', micro.microClass]">
              <div class="row" v-if="micro.microType === 'select'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-select @input="inOut(micro.value)" v-model="micro.value" :options="micro.microOptions" size="sm"
                    class="mt-1 form-control-sm py-0 form-control" required></b-form-select>
                </b-form-group>
              </div>
              <template class="row" v-else-if="micro.key === 'transEffDate'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input v-model="getDate" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" required :disabled="micro.isDisabled"></b-form-input>
                </b-form-group>
              </template>
              <template v-else-if="micro.microType === 'multiselect'">
                
                <b-form-group :label="micro.microName + ' :'" :label-for="micro.microName" label-cols-sm="4"
                  label-cols-lg="3" content-cols-sm="8" content-cols-lg="9" invalid-feedback="Condition Harus Diisi!">
                  <multiselect class="my-1" @input="changeCondition(micro.value)" :id="micro.microName"
                    v-model="micro.value" :options="optionsKasbank" placeholder="Select one" :multiple="false"
                    :show-labels="false" :allow-empty="required" :custom-label="customLabel" required>
                  </multiselect>
                </b-form-group>
              </template>
              <template v-else-if="micro.key === 'transAmount'">
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" required :disabled="micro.isDisabled"></b-form-input>
                </b-form-group>
              </template>
              <template v-else>
                <b-form-group :label="micro.microName + ' :'" label-cols-sm="4" label-cols-lg="3" content-cols-sm="8"
                  content-cols-lg="9">
                  <b-form-input v-model="micro.value" class="form-control form-control-sm py-0" :type="micro.microType"
                    :placeholder="micro.microText" required :disabled="micro.isDisabled"></b-form-input>
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
            <hot-table :settings="hotSettings" :data="excelData" :rowHeaders="true" :colHeaders="true"
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
                :placeholder="micro.microText" v-model="micro.microValue"></textarea>
            </template>
          </div>
        </div>

      </div>
      <div class="col-md-6 row p-0 scale-9" style="transform-origin: right top">
        <div v-for="field in component" :class="[field.componentClass]" v-if="field.componentName === 'fieldTotal'">
          <template v-if="field.componentMicro.length > 0">
            <div class="row d-flex justify-content-end" v-for="micro in field.componentMicro">
              <div :class="['border border-light bg-light d-flex align-items-center', micro.microClass]">{{
                micro.microName
              }} :</div>
              <div :class="['p-0 border border-light', micro.microClass]">
                <input v-if="micro.key === 'total'" :disabled="!micro.editableTotal" @input="refreshMethods()"
                  v-model="totalData" :type="micro.microType" class="form-control form-control-sm py-1"
                  style="text-align: right">
                <input v-else-if="micro.key === 'transAmount'" :disabled="!micro.editableTotal" @input="refreshMethods()"
                  v-model="totalAmount" :type="micro.microType" class="form-control form-control-sm py-1"
                  style="text-align: right">

                <input v-else :disabled="!micro.editableTotal" @input="refreshMethods()" :type="micro.microType"
                  v-model="micro.value" class="form-control form-control-sm py-1" style="text-align: right">
              </div>
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
import { dynamicJS } from '../services/dynamic';
import { alertRouter } from '../function/sweetalert'
import { getF, getJEVoucher, getD, addKasbank, getCoa } from '../services/components';
import { kasbankByVoucher } from '../function/exportPDF'
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
      getDate: '',
      transType: '',
      transNo: '',
      kasbank: {},
      voucher: '',
      mainCoa: [],
      dataList: [],
      saldoAwal: '',
      saldoAkhir: '',
      optionsKasbank: [],
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
    
    totalData() {
      const amount = this.component.find(x => x.componentName === 'fieldTotal').componentMicro
        .find(y => y.key === 'transAmount').value
      if (this.transType === 'kredit') {
        this.saldoAkhir = parseFloat(this.saldoAwal) + parseFloat(amount)
      } else if (this.transType === 'debet') {
        this.saldoAkhir = parseFloat(this.saldoAwal) - parseFloat(amount)
      }
      return this.formatNumber(this.saldoAkhir)
    },
    totalAmount() {
      const amount = this.component.find(x => x.componentName === 'fieldTotal').componentMicro
        .find(y => y.key === 'transAmount').value
      return this.formatNumber(amount)
    },
    dummyItems() {
      const dummy = {}
      for (const key in this.component) {
        dummy[key] = { ...this.component[key] }
      }
      return dummy
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
  async mounted() {
    const tes = await getCoa()
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    this.getDate = year + '-' + month + '-' + day
    console.log(this.getDate)
    this.dataList = await getF(year, month)
    // console.log('mounted', this.dataList)
    // alert('this', this.dataList)

    this.optionsKasbank = tes.coaNonBank

    this.voucher = await getJEVoucher()
    this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
      y.componentMicro.find(z => {
        if (z.key === 'transAmount') {
          this.SaldoAwal = z
        } else if (z.key === 'transNo') {
          z.value = this.transNo
        }
      })
    })
    console.log("load Awal", this.voucher)
  },
  methods: {
    refreshFields() {
      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => z.value = '')
      })
      this.component.find(x => x.componentName === 'fieldNote').componentMicro[0].microValue = ''
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
    formatNumber(value) {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue)) {
        return value; // Return the original string value if it's not a valid number
      }
      const parts = floatValue.toFixed(2).toString().split('.');
      const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      if (parts.length > 1) {
        return `${wholePart},${parts[1]}`;
      } else {
        return wholePart;
      }
    },
    async changeCondition(data) {
      console.log('data', data)
      // for filter if empty or not input
      if (data !== undefined) {
        this.kasbank = data
        this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
          y.componentMicro.find(z => {
            if (z.key === 'transAmount') {
              if (data !== null) {
                // const tes = this.dataList.saldoAwal.find(x => x._id === data._id)
                  z.value = data.coaFaAmount[0].FaPriceEnd
                  this.saldoAwal = z.value
                  z.value = this.formatNumber(z.value)
              } else {
                z.value = ""
              }
            }
          })
        })
      }
      this.findVoucher()
      // this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
      //   y.componentMicro.find(z => {
      //     if (z.key === 'type') {
      //       if (z.value !== undefined) {
      //         type = z.value
      //       } else {
      //         type = ''
      //       }
      //     } else if (z.key === 'kasbankCode') {
      //       console.log(z.value)
      //       if (z.value !== undefined) {
      //         code = z.value
      //         this.mainCoa = z.value
      //       } else {
      //         code = ''
      //       }
      //     }
      //   })
      // })
    },
    inOut(data) {
      console.log('coba',this.kasbank, data, this.transNo)
      this.transType = data
      this.findVoucher()
    },
    findVoucher() {
      if (this.kasbank.coaCode && this.transType !== '') {
        this.transNo = this.voucher

        console.log("inOut Change",this.transNo, this.kasbank.coaCode)
        this.changeVoucher() 
      }
    },
    changeVoucher() {
    this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
      y.componentMicro.find(z => {
        if (z.key === 'transNo') {
          z.value = this.transNo
        }
      })
    })
    },
    customLabel(option) {
      return `${option.coaCode} (${option.coaName})`;
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
      if (finalHeader.type === 'debet') {
        finalHeader.type = 'kredit'
      } else if (finalHeader.type === 'kredit') {
        finalHeader.type = 'debet'
      }
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
      const finalFooter = {}
      Object.assign(finalFooter, finalNote)
      Object.assign(finalFooter, finalTotal)
      // final Data
      // table Data
      const fieldsTable = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      const finalTable = this.excelData
        .filter(item => {
          return fieldsTable.some(obj => {
            const value = item[obj.key]
            return value !== '' && value !== undefined && value !== null;
          })
        })
        .map(item => {
          const tes = {
            ...item, transType: finalHeader.type, transNo: finalHeader.transNo, transUser: finalHeader.transUser, transName: '', transEffDate: this.getDate, transUser: localStorage.getItem('_id'), transNotes: finalNote.transNotes,
            transAmount: item.transAmount,
            transCoaCode: item.Code, Code: undefined,
            transCoaName: item.Name, Name: undefined,
            coaCode: finalHeader.kasbankCode.coaCode,
            coaName: finalHeader.kasbankCode.coaName
          }
          if (finalHeader.type === 'kredit') {
            tes.transAmount = (tes.transAmount * -1).toString();
          } else {
            tes.transAmount = tes.transAmount.toString();
          }

          return tes
        })

      const finalData = finalTable

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
            const voucher = await addKasbank(finalData, finalHeader.kasbankCode._id, finalHeader.kasbankCode.coaCode, finalHeader.kasbankCode.coaName);
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