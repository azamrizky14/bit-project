<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 py-0" ref="contentDiv">
      <transaksiEdit :posts="posts" :component="component" :hotSettings="hotSettings" :widthTable="contentDivWidth" :dataDetail="dummyData" :refreshMethods="onRefresh()"></transaksiEdit>
    </div>
  </main>
</template>

<script>
import { getFieldTable, getComponentEdit, refreshValue, dataTableEdit, getContentWidth, findData } from '../../components/services/transaksi'
import { get1 } from '../../components/services/components'
import transaksiEdit from '../../components/transaksi/transaksiEdit.vue'
export default {
  props: {
    dataDetail: {
      type: Object,
      required: true,
    }
  },
  components: {
    transaksiEdit
  },
  data() {
    return {
      dummyData: [],
      detailData: [],
      contentDivWidth: 0,
      excelData: [],
      hotSettings: {
        afterChange: this.onRefresh,
        licenseKey: 'non-commercial-and-evaluation',
        height: 200,
        colHeaders: true,
        
        rowHeaderWidth: 35,
        startRows: 10,
        columns: [
        ]
      },
      component: [],
      posts: {},
      itemTable: []
    };
  },
  async mounted() {
    this.posts = await get1(this.$route.name);
    this.component = await getComponentEdit(this.posts);
    this.hotSettings.columns = await getFieldTable(this.component);
    await dataTableEdit(this.dummyData, this.hotSettings.columns, this.dataDetail)
    this.onRefresh();
    this.contentDivWidth = await getContentWidth(this.$refs.contentDiv, this.hotSettings.columns);
    await findData(this.detailData, this.component)
  },
  created() {
    this.dummyData = JSON.parse(JSON.stringify(this.dataDetail))
  },
  methods: {
    onRefresh() {
      refreshValue(this.excelData, this.component);
    },
  },
};
</script>