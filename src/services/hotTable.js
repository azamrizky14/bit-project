import Vue from 'vue';
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

Vue.component('hot-table', HotTable);
registerAllModules(Vue);
