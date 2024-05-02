<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <transaksiAddShipment @data-updated="updateData" :posts="posts" :component="refreshComponent"
        :hotSettings="hotSettings" :widthTable="contentDivWidth" :excelData="excelData"></transaksiAddShipment>
    </div>
  </main>
</template>

<script>
import { get1, getH, getListCustomerSO } from '../../components/services/components'
import transaksiAddShipment from '../../components/transaksi/transaksiAddShipment.vue'
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import { getFullDate } from '@/components/function/date';

// register Handsontable's modules
registerAllModules();
export default {
  components: {
    transaksiAddShipment, HotTable
  },
  data() {
    return {
      currentDate: '',
      contentDivWidth: 0,
      excelData: [],
      hotSettings: {
        afterChange: this.refreshValue,
        licenseKey: 'non-commercial-and-evaluation',
        height: 200,
        colHeaders: true,

        rowHeaderWidth: 35,
        startRows: 10,
        columns: [
          { data: 'tes', type: 'numeric' }
        ]
        // Other Handsontable settings
      },
      component: [],
      posts: [],
      itemTable: []
    };
  },
  async mounted() {
    const date = await getFullDate()
    this.currentDate = date
    const coba = await getH()
    const tes = await get1(this.$route.name);
    console.log(tes)
    this.posts = { ...tes }
    this.getComponent();
    const trueFields = this.getFieldTable();
    this.hotSettings.columns = trueFields;
    this.hotSettings.columns.find(x => x.data === 'soNumber').source = coba.map(x => x.transId)
    this.hotSettings.columns.find(x => x.data === 'qtyReq').width = 75
    this.hotSettings.columns.find(x => x.data === 'qtySend').width = 75
    const dataObject = trueFields.reduce((acc, obj) => {
      acc[obj.data] = "";
      return acc
    }, {});

    for (let i = 0; i < 1000; i++) {
      const key = `row_${i}`;
      const objectAdd = { ...dataObject, key }
      this.excelData.push(objectAdd)
    }
    this.moreFunction()
    if (this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.length > 0) {
      this.getTotalData();
      this.getTotalAuto();
    }
    this.getContentWidth();
  },
  computed: {
    refreshComponent() {
      return this.component.map(item => ({
        ...item
      }))
    }
  },
  methods: {
    updateData(data) {
      // this.excelData = this.excelData.splice(this.excelData.length)
      // console.log('coba 1', this.excelData)
      //   for (let i = 0; i < 1000; i++) {
      //     const key = `row_${i}`;
      //     const objectAdd = {
      //       key,
      //       soNumber: '',
      //       productName: '',
      //       noBatch: '',
      //       qtyReq: '',
      //       qtySend: '',
      //       UoM: '',
      //       shipTo: ''
      //     }
      //     this.excelData.push(objectAdd)
      //   }
      console.log('coba 2',this.excelData)
      console.log('dari child', data)
      if (data !== null) {

        this.hotSettings.columns = this.hotSettings.columns.map(x => {
            const data1 = {
              ...x
            }
            if (x.data === 'shipTo') {
              data1.source = data.userAddress.map(x => x.nameAddr + ': ' + x.location)
            } else if (x.data === 'soNumber') {
              data1.source = data.data.map(x => x.transId);
              data1.strict = true
            }
            return data1
          })
      } else {
        this.hotSettings.columns = this.hotSettings.columns.map(x => {
          const data1 = {
            ...x
          }
          if (x.data === 'shipTo') {
            data1.source = []
          } else if (x.data === 'soNumber') {
              data1.source = []
            }
          return data1
        })
      }
      console.log('ini', this.hotSettings.columns)
    },
    async moreFunction() {
      const apiCustomer = await getListCustomerSO()
      const tes = []


      const mergedData = {};

      apiCustomer.forEach(transaction => {
        const { _id, transId, transIdMember, transPesanan } = transaction;
        const memberId = transIdMember._id;
        const userName = transIdMember.userName;

        if (!mergedData[memberId]) {
          mergedData[memberId] = {
            id: memberId,
            userName: userName,
            userAddress: transIdMember.userAddress,
            data: []
          };
        }

        mergedData[memberId].data.push({ _id, transId, transPesanan });
      });

      const transformedData = Object.values(mergedData);

      // const apiSupplier = await getCustomer()
      // const apiShipTo = await getN()

      this.component.filter(x => x.componentName === 'fieldHeader').forEach(y => {
        y.componentMicro.find(z => {
          if (z.microType === 'multiselect') {
            if (z.key === 'customer') {
              z.microOptions = transformedData
            } else if (z.key === 'shipTo') {
              // z.microOptions = apiShipTo
            }
          } else if (z.key === 'shipDate') {
            z.value = this.currentDate
          }
        })
      })
    },
    refreshValue(changes, source) {
      if (source === 'edit') {
        this.getAllCOA(changes);
      }
      else if (source === 'CopyPaste.paste') {
        this.getAllCOA(changes);
      }

      this.getTotalData();
      this.getTotalAuto();
    },
    getAllCOA(changes) {
      for (const change of changes) {
        const [row, prop, oldValue, newValue] = change;
        const baris = this.excelData[row]
        // const findName = this.Item.find(x => x.itemCode === baris.Code)
        // const findCode = this.Item.find(x => x.itemName === baris.Name)

        if (prop === 'soNumber' && baris) {
          if (baris.Code !== null) {
            console.log('column', this.hotSettings.columns)
            if (baris.Name === undefined) {
              // baris.Name = null
              // baris.Code = null
              // baris.Desc = null
            }
          } else {
            // baris.Name = null
            // baris.Code = null
            // baris.Desc = null
          }
          this.excelData = [...this.excelData]
        } else {
          console.log('gagal')
        }
      }
    },
    sumProperty(property) {
      return this.excelData.reduce((sum, entry) => parseInt(sum) + entry[property], 0);
    },
    getTotal(property) {
      return this.sumProperty(property);
    },
    getTotalData() {
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.filter(x => x.key !== 'total').forEach(item => {
        item.value = this.getTotal(item.key);
      });
    },
    getTotalAuto() {
      let totalNumber = 0
      const totalValue = this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro
      let totalList = totalValue.filter(x => x.key !== 'total')
      totalList = totalList.forEach((x) => {
        if (x.microMath === 'minus') {
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
            totalNumber = parseInt(totalNumber) + (-1 * parseInt(x.value))
          }
        } else if (x.microMath === 'plus') {
          if (Number.isNaN(x.value)) {
            totalNumber = parseInt(totalNumber) + 0
          } else {
            totalNumber = parseInt(totalNumber) + parseInt(x.value)
          }
        }
      })
      this.component.find(({ componentName }) => componentName === "fieldTotal").componentMicro.find(x => x.key === 'total').value = totalNumber

    },
    getContentWidth() {
      const contentDiv = this.$refs.contentDiv;
      let columns = 0;
      const tes = this.hotSettings.columns.filter(x => x.type === 'text' && !x.width).length
      const widthTes = this.hotSettings.columns
      for (let i = 0; i < widthTes.length; i++) {
        if (widthTes[i].width >= 0 || widthTes[i].width !== undefined) {
          columns += widthTes[i].width
        }
      }
      if (contentDiv) {
        this.contentDivWidth = (contentDiv.offsetWidth - 85 - columns) / tes;
      }
    },
    async getComponent() {
      this.component = this.posts.transProperties.find(({ dataName }) => dataName === "menuAdd").dataMicro
    },
    getFieldTable() {
      const fields = this.component.find(({ componentName }) => componentName === "fieldTable").componentMicro
      const trueFields = fields.map((x) => {
        if (x.microType === 'date') {
          return { data: x.key, title: x.microName, type: x.microType, width: 100 }
        } else if (x.microType === 'numeric') {
          return { data: x.key, title: x.microName, type: x.microType, width: 125, renderer: (instance, td, row, col, prop, value) => { if (typeof value === 'number') { const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); td.innerText = formattedValue; } else { td.innerText = value } }, validator: (value, callback) => { if (value > 1000000000000 || value < 0) { callback(false); } else { callback(true) } } }
        } else {
          if (x.width <= 0) {
            return { data: x.key, title: x.microName, type: x.microType }
          } else {
            return { data: x.key, title: x.microName, type: x.microType, width: x.width }
          }
        }
      })
      return trueFields
    },
  },
};
</script>