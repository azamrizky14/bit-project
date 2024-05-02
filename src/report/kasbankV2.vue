<template>
  
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 pt-0" ref="contentDiv">
      <ul class="breadcrumb m-1 mt-0">
        <li><a href="#"><i class="bi-house-door"></i></a></li>
        <li>Mutasi Bulanan</li>
      </ul>
      <!-- Content -->
      <template v-if="isDataLoaded">
        <tableMutasiBulanan :data="filteredTableData" :fields="tableFields" :routingLink="routing"
          :tableWidth="contentDivWidth"/>
      </template>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
  
<script>
import { get1, get0 } from '../components/services/components'
import tableMutasiBulanan from '../components/tableMutasiBulanan.vue'
export default {
  components: {
    tableMutasiBulanan
  },
  data() {
    return {
      filterText: '',
      header: [],
      sendData: {},
      transData: [],
      contentDivWidth: 0,
      routing: '',
      tableFields: [],
      component: [],
      data: [],
      isDataLoaded: false,
      posts: [],
      coaList: [],
    };
  },
  async mounted() {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; 
    if (month < 10) {
      month = '0'+month
    }

    this.isDataLoaded = true;
    this.routing = this.posts.transRouting
    this.data = this.getData()
    this.$nextTick(() => {
      this.getContentWidth();
    });
  },
  computed: {
  },
  methods: {
    sumProperty(property, condition) {
      if (condition !== '') {
        condition = 'item.'+ condition
        const filterFunction = new Function('item', `return ${condition}`);
        console.log(this.posts.transData.filter(filterFunction))
        return this.posts.transData.filter(filterFunction).reduce((sum, entry) => parseInt(sum) + entry[property], 0);
      } else {
        return this.posts.transData.reduce((sum, entry) => parseInt(sum) + entry[property], 0);
      }
    },
    getTotal(property, condition) {
      return this.sumProperty(property, condition);
    },
    getData() {
      console.log(this.posts.transData)
      return this.posts.transData.reduce((result, item) => {
            result.push(item);
        return result;
      }, []);
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
        this.contentDivWidth = (contentDiv.offsetWidth - 100 - columns) / tes;

      }
    },
  },
};
</script>