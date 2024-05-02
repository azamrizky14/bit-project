<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <transaksiDetailWo
        :posts="posts"
        :component="refreshComponent"
        :hotSettings="hotSettings"
        :widthTable="contentDivWidth"
        :excelData="excelData"
        :refreshMethods="onRefresh()"
      ></transaksiDetailWo>
    </div>
  </main>
</template>

<script>
import {
  getFieldTable,
  getComponentAdd,
  dataTableAdd,
  refreshValue,
  getContentWidth,
} from "../../components/services/transaksi";
import { get1 } from "../../components/services/components";
import { getFullDate } from "../../components/function/date";
import {
  getItem,
  getDetailWObyWoNo,
} from "../../components/services/transComponent";
import transaksiDetailWo from "../../components/transaksi/transaksiDetailWo.vue";
import axios from 'axios';

export default {
  components: {
    transaksiDetailWo,
  },
  data() {
    return {
      qtyWO: [],
      dataDetilWo: [],
      contentDivWidth: 0,
      excelData: [],
      hotSettings: {
        readOnly: true,
        afterChange: this.onRefresh,
        licenseKey: "non-commercial-and-evaluation",
        height: 200,
        colHeaders: true,
        readOnly: true,
        
        rowHeaderWidth: 35,
        startRows: 10,
        columns: [{ data: "tes", type: "numeric" }],
        // Other Handsontable settings
      },
      component: [],
      posts: [],
      itemTable: [],
    };
  },
  async mounted() {
    this.posts = await get1(this.$route.name);

    const woNo = this.$route.params.dataDetail;

    // get detil wo
    const axiosDetilWO = await getDetailWObyWoNo(woNo);
    console.log('coba', axiosDetilWO)
    this.excelData = axiosDetilWO;
    console.log("detilWO :",this.excelData);


    this.component = await getComponentAdd(this.posts);
    // const qtyWO = []
    this.component
      .filter((x) => x.componentName === "fieldHeader")
      .forEach((item) => {
        // console.log('data',item.componentMicro.find(dataItem => dataItem.key ==='productQty'))
        this.qtyWO = item.componentMicro.filter(
          (dataItem) => dataItem.key === "productQty"
        );
        // qrtWO.push(...matchingData);
      });

            this.detailData = Object.entries(this.excelData).map(([key, value]) => ({
        key,
        value 
      }));
      this.component.forEach(component => {
        component.componentMicro.forEach(item => {
          const matchedObject = this.detailData.find(obj => obj.key === item.key);
          console.log(matchedObject)
          if (matchedObject) {
            item.value = matchedObject.value
          }
        })
      })
    // console.log('cok', this.qtyWO)
    this.hotSettings.columns = await getFieldTable(this.component);
    console.log(this.hotSettings.columns);
    // this.hotSettings.columns.find(x => x.data === 'qty').renderer = this.qtyRenderer
    // await dataTableAdd(this.excelData, this.hotSettings.columns);
    // this.moreFunction();
    this.onRefresh();
    this.contentDivWidth = await getContentWidth(
      this.$refs.contentDiv,
      this.hotSettings.columns
    );
  },
  computed: {
    refreshComponent() {
      return this.component.map((item) => ({
        ...item,
      }));
    },
  },
  methods: {
    async moreFunction() {
      const apiItem = await getItem();
      const currentDate = await getFullDate();
      this.component
        .filter((x) => x.componentName === "fieldHeader")
        .forEach((y) => {
          y.componentMicro.find((z) => {
            if (z.microType === "multiselect") {
              if (z.key === "productName") {
                z.microOptions = apiItem;
              }
            } else if (z.key === "scheduleDate") {
              z.value = currentDate;
            }
          });
        });
    },
    onRefresh() {
      refreshValue(this.excelData, this.component);
    },
  },
};
</script>