<template>
  <div>
    <hot-table :data="tableData" :settings="hotSettings" :columns="columns" @hotInstance="onHotInstance"
      :cells="cellRenderer"></hot-table>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue';
  import { registerAllModules } from 'handsontable/registry';
  import 'handsontable/dist/handsontable.full.css';

  // register Handsontable's modules
  registerAllModules();

  export default {
  name: 'TableSuper',
  components: {
    HotTable,
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    hotSettings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colHeaders: true,
    };
  },
  mounted() {
  },
  computed: {
    
    cellRenderer() {
      return (row, col, prop, value, cellProperties) => {
        if (col === this.tableColumns.length - 1) {
          cellProperties.renderer = (instance, td, row, col, prop, value) => {
            td.innerHTML = '<button @click="moveToAnotherPage">Move to Another Page</button>';
            const button = td.querySelector('button');
            button.addEventListener('click', this.moveToAnotherPage);
          };
        }
      };
    },
  },
  methods: {
    moveToAnotherPage() {
      // Code to navigate to another page
    }
  },
};
</script>