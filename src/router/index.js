import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Dashboard from '../views/Dashboard.vue'
import UsahaList from '../views/UsahaList.vue'    

// browse 
import browseKasbankV2 from '../browse/kasbankV2.vue'
import browseTransaksiHarian from '../browse/transaksi-harian.vue'
// report
import reportKasbankV2 from '../report/kasbankV2.vue'
import reportPrint from '../report/detil-poprint.vue'
import reportTransaksiVoucher from '../report/transaksi-voucher.vue'
import reportTransaksiHarian from '../report/transaksi-harian.vue'
import reportSO from '../report/salesOrder.vue'
import reportInventory from '../report/inventory.vue'
import reportNeracaSaldo from '../report/neracaSaldo.vue'
import reportInventoryStockDetail from '../report/inventoryStockDetail.vue'
// master
import masterKasbank from '../master/kasbank.vue'
import dataCustomer from '../master/dataCustomer.vue'
import item from '../master/item.vue'
import user from '../master/user.vue'
import coa from '../master/coa.vue'
import supplier from '../master/supplier.vue'
import domain from '../master/domain.vue'
import mps from '../master/mps.vue'
import mappingLocation from '../master/mappingLocation.vue'
import formula from '../master/formula.vue'
import routing from '../master/routing.vue'
import setup from '../master/setup.vue'
import qcItemSpec from '../master/qcItemSpec.vue'
import period from '../master/period.vue'
import creditTerms from '../master/creditTerms.vue'
import costCenter from '../master/costCenter.vue'
import formulaAdd from '../master/add/formulaAdd.vue'


// transaksi
import BOM from '../transaksi/billOfMaterial.vue'
import MasterData from '../transaksi/masterData.vue'
import JurnalEntry from '../transaksi/jurnalEntry.vue'
import inventoryAdjusment from '../transaksi/inventoryAdjusment.vue'
import materialIssue from '../transaksi/materialIssue.vue'
import productionReport from '../transaksi/productionReport.vue'
import wipWO from '../transaksi/wipWo.vue'
import fixedAsset from '../transaksi/fixedAsset.vue'
import productionPlanning from '../transaksi/productionPlanning.vue'
import goodReceipt from '../transaksi/goodReceipt.vue'
import qcMaterialInspection from '../transaksi/qcMaterialInspection.vue'
import masterProductionSchedule from '../transaksi/masterProductionSchedule.vue'
import masterFormula from '../transaksi/masterFormula.vue'
import productReturn from '../transaksi/productReturn.vue'
import poReceipt from '../transaksi/poReceipt.vue'
import poReturn from '../transaksi/poReturn.vue'
import po from '../transaksi/po.vue'
import poInvoice from '../transaksi/poInvoice.vue'
import poPayment from '../transaksi/poPayment.vue'
import materialRelease from '../transaksi/materialRelease.vue'
import salesInvoice from '../transaksi/salesInvoice.vue'
import shipment from '../transaksi/shipment.vue'
import salesOrder from '../transaksi/salesOrder.vue'
import purchaseRequest from '../transaksi/purchaseRequest.vue'
import kasbank from '../transaksi/kasbank.vue'
import kasbankV2 from '../transaksi/kasbankV2.vue'

import BOMAdd from '../transaksi/add/billOfMaterialAdd.vue'
import MasterDataAdd from '../transaksi/add/masterDataAdd.vue'
import JurnalEntryAdd from '../transaksi/add/jurnalEntryAdd.vue'
import inventoryAdjusmentAdd from '../transaksi/add/inventoryAdjusmentAdd.vue'
import materialIssueAdd from '../transaksi/add/materialIssueAdd.vue'
import productionReportAdd from '../transaksi/add/productionReportAdd.vue'
import wipWOAdd from '../transaksi/add/wipWoAdd.vue'
import fixedAssetAdd from '../transaksi/add/fixedAssetAdd.vue'
import productionPlanningAdd from '../transaksi/add/productionPlanningAdd.vue'
import goodReceiptAdd from '../transaksi/add/goodReceiptAdd.vue'
import qcMaterialInspectionAdd from '../transaksi/add/qcMaterialInspectionAdd.vue'
import masterProductionScheduleAdd from '../transaksi/add/masterProductionScheduleAdd.vue'
import productReturnAdd from '../transaksi/add/productReturnAdd.vue'
import poReceiptAdd from '../transaksi/add/poReceiptAdd.vue'
import poReturnAdd from '../transaksi/add/poReturnAdd.vue'
import poAdd from '../transaksi/add/poAdd.vue'
import poInvoiceAdd from '../transaksi/add/poInvoiceAdd.vue'
import poPaymentAdd from '../transaksi/add/poPaymentAdd.vue'
import materialReleaseAdd from '../transaksi/add/materialReleaseAdd.vue'
import salesInvoiceAdd from '../transaksi/add/salesInvoiceAdd.vue'
import shipmentAdd from '../transaksi/add/shipmentAdd.vue'
import salesOrderAdd from '../transaksi/add/salesOrderAdd.vue'
import purchaseRequestAdd from '../transaksi/add/purchaseRequestAdd.vue'
import kasbankAdd from '../transaksi/add/kasbankAdd.vue'
import kasbankAddV2 from '../transaksi/add/kasbankAddV2.vue'

import BOMDetail from '../transaksi/detail/billOfMaterialDetail.vue'
import MasterDataDetail from '../transaksi/detail/masterDataDetail.vue'
import JurnalEntryDetail from '../transaksi/detail/jurnalEntryDetail.vue'
import inventoryAdjusmentDetail from '../transaksi/detail/inventoryAdjusmentDetail.vue'
import materialIssueDetail from '../transaksi/detail/materialIssueDetail.vue'
import productionReportDetail from '../transaksi/detail/productionReportDetail.vue'
import wipWODetail from '../transaksi/detail/wipWoDetail.vue'
import wipWOReceipt from '../transaksi/detail/wipWoReceipt.vue'
import fixedAssetDetail from '../transaksi/detail/fixedAssetDetail.vue'
import productionPlanningDetail from '../transaksi/detail/productionPlanningDetail.vue'
import goodReceiptDetail from '../transaksi/detail/goodReceiptDetail.vue'
import qcMaterialInspectionDetail from '../transaksi/detail/qcMaterialInspectionDetail.vue'
import masterProductionScheduleDetail from '../transaksi/detail/masterProductionScheduleDetail.vue'
import masterFormulaDetail from '../transaksi/detail/masterFormulaDetail.vue'
import productReturnDetail from '../transaksi/detail/productReturnDetail.vue'
import poRequestDetail from '../transaksi/detail/poRequestDetail.vue'
import poReturnDetail from '../transaksi/detail/poReturnDetail.vue'
import poDetail from '../transaksi/detail/poDetail.vue'
import poInvoiceDetail from '../transaksi/detail/poInvoiceDetail.vue'
import materialReleaseDetail from '../transaksi/detail/materialReleaseDetail.vue'
import salesInvoiceDetail from '../transaksi/detail/salesInvoiceDetail.vue'
import shipmentDetail from '../transaksi/detail/shipmentDetail.vue'
import salesOrderDetail from '../transaksi/detail/salesOrderDetail.vue'
import purchaseRequestDetail from '../transaksi/detail/purchaseRequestDetail.vue'
import kasbankDetail from '../transaksi/detail/kasbankDetail.vue'
import poReceiptDetail from '../transaksi/detail/poReceiptDetail.vue'
import poPaymentDetail from '../transaksi/detail/poPaymentDetail.vue'
import kasbankDetailV2 from '../transaksi/detail/kasbankDetailV2.vue'

import BOMEdit from '../transaksi/edit/billOfMaterialEdit.vue'
import MasterDataEdit from '../transaksi/edit/masterDataEdit.vue'
import JurnalEntryEdit from '../transaksi/edit/jurnalEntryEdit.vue'
import inventoryAdjusmentEdit from '../transaksi/edit/inventoryAdjusmentEdit.vue'
import materialIssueEdit from '../transaksi/edit/materialIssueEdit.vue'
import productionReportEdit from '../transaksi/edit/productionReportEdit.vue'
import wipWOEdit from '../transaksi/edit/wipWoEdit.vue'
import fixedAssetEdit from '../transaksi/edit/fixedAssetEdit.vue'
import productionPlanningEdit from '../transaksi/edit/productionPlanningEdit.vue'
import goodReceiptEdit from '../transaksi/edit/goodReceiptEdit.vue'
import qcMaterialInspectionEdit from '../transaksi/edit/qcMaterialInspectionEdit.vue'
import masterProductionScheduleEdit from '../transaksi/edit/masterProductionScheduleEdit.vue'
import masterFormulaEdit from '../transaksi/edit/masterFormulaEdit.vue'
import productReturnEdit from '../transaksi/edit/productReturnEdit.vue'
import poRequestEdit from '../transaksi/edit/poRequestEdit.vue'
import poReturnEdit from '../transaksi/edit/poReturnEdit.vue'
import poEdit from '../transaksi/edit/poEdit.vue'
import poInvoiceEdit from '../transaksi/edit/poInvoiceEdit.vue'
import materialReleaseEdit from '../transaksi/edit/materialReleaseEdit.vue'
import salesInvoiceEdit from '../transaksi/edit/salesInvoiceEdit.vue'
import shipmentEdit from '../transaksi/edit/shipmentEdit.vue'
import salesOrderEdit from '../transaksi/edit/salesOrderEdit.vue'
import purchaseRequestEdit from '../transaksi/edit/purchaseRequestEdit.vue'
import kasbankEdit from '../transaksi/edit/kasbankEdit.vue'
import poReceiptEdit from '../transaksi/edit/poReceiptEdit.vue'
import poPaymentEdit from '../transaksi/edit/poPaymentEdit.vue'
import kasbankEditV2 from '../transaksi/edit/kasbankEditV2.vue'
// end transaksi

import Usaha from '../views/Usaha.vue'    

import Login from  '../views/Login.vue'
import Register from  '../views/Register.vue'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import JsonEditorVue from 'json-editor-vue'
import master from '@/API/master'


Vue.use(JsonEditorVue)

Vue.use(VueSweetalert2);

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/list-usaha', name: 'list-usaha', component: UsahaList, meta: {requiresAuth: true} },
  { path: '/dashboard', name: 'home', component: Dashboard, meta: {requiresAuth: true} },

  // transaksi
  { path: '/transaksi/bill-of-material', name: 'bill-of-material', component: BOM, meta: {requiresAuth: true} },
  { path: '/transaksi/master-data', name: 'master-data', component: MasterData, meta: {requiresAuth: true} },
  { path: '/transaksi/jurnal-entry', name: 'jurnal-entry', component: JurnalEntry, meta: {requiresAuth: true} },  
  { path: '/transaksi/inventory-adjusment', name: 'inventory-adjusment', component: inventoryAdjusment, meta: {requiresAuth: true} },  
  { path: '/transaksi/material-issue', name: 'material-issue', component: materialIssue, meta: {requiresAuth: true} },  
  { path: '/transaksi/production-report', name: 'production-report', component: productionReport, meta: {requiresAuth: true} },
  { path: '/transaksi/wip-workorder', name: 'wip-workorder', component: wipWO, meta: {requiresAuth: true} },  
  { path: '/transaksi/fixed-asset', name: 'fixed-asset', component: fixedAsset, meta: {requiresAuth: true} },  
  { path: '/transaksi/production-planning', name: 'production-planning', component: productionPlanning, meta: {requiresAuth: true} }, 
  { path: '/transaksi/good-receipt', name: 'good-receipt', component: goodReceipt, meta: {requiresAuth: true} },  
  { path: '/transaksi/qc-material-inspection', name: 'qc-material-inspection', component: qcMaterialInspection, meta: {requiresAuth: true} },  
  { path: '/transaksi/master-production-schedule', name: 'master-production-schedule', component: masterProductionSchedule, meta: {requiresAuth: true} },  
  { path: '/transaksi/master-formula', name: 'master-formula', component: masterFormula, meta: {requiresAuth: true} },  
  { path: '/transaksi/product-return', name: 'product-return', component: productReturn, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-receipt', name: 'po-receipt', component: poReceipt, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-return', name: 'po-return', component: poReturn, meta: {requiresAuth: true} },  
  { path: '/transaksi/po', name: 'po', component: po, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-invoice', name: 'po-invoice', component: poInvoice, meta: {requiresAuth: true} },
  { path: '/transaksi/po-payment', name: 'po-payment', component: poPayment, meta: {requiresAuth: true} },
  { path: '/transaksi/material-release', name: 'material-release', component: materialRelease, meta: {requiresAuth: true} },  
  { path: '/transaksi/sales-invoice', name: 'sales-invoice', component: salesInvoice, meta: {requiresAuth: true} },  
  { path: '/transaksi/shipment', name: 'shipment', component: shipment, meta: {requiresAuth: true} },  
  { path: '/transaksi/sales-order', name: 'sales-order', component: salesOrder, meta: {requiresAuth: true} },  
  { path: '/transaksi/purchase-request', name: 'purchase-request', component: purchaseRequest, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank', name: 'kasbank', component: kasbank, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank-v2', name: 'kasbank-v2', component: kasbankV2, meta: {requiresAuth: true} },  
  
  // add transaksi
  { path: '/transaksi/bill-of-material/add', name: 'bill-of-material-add', component: BOMAdd, meta: {requiresAuth: true} },
  { path: '/transaksi/master-data/add', name: 'master-data-add', component: MasterDataAdd, meta: {requiresAuth: true} },
  { path: '/transaksi/jurnal-entry/add', name: 'jurnal-entry-add', component: JurnalEntryAdd, meta: {requiresAuth: true} }, 
  { path: '/transaksi/inventory-adjusment/add', name: 'inventory-adjusment-add', component: inventoryAdjusmentAdd, meta: {requiresAuth: true} }, 
  { path: '/transaksi/material-issue/add', name: 'material-issue-add', component: materialIssueAdd, meta: {requiresAuth: true} }, 
  { path: '/transaksi/production-report/add', name: 'production-report-add', component: productionReportAdd, meta: {requiresAuth: true} }, 
  { path: '/transaksi/wip-workorder/add', name: 'wip-workorder-add', component: wipWOAdd, meta: {requiresAuth: true} },    
  { path: '/transaksi/fixed-asset/add', name: 'fixed-asset-add', component: fixedAssetAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/production-planning/add', name: 'production-planning-add', component: productionPlanningAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/good-receipt/add', name: 'good-receipt-add', component: goodReceiptAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/qc-material-inspection/add', name: 'qc-material-inspection-add', component: qcMaterialInspectionAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/master-production-schedule/add', name: 'master-production-schedule-add', component: masterProductionScheduleAdd, meta: {requiresAuth: true} },  
  { path: '/formula/add', name: 'formula-add', component: formulaAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/product-return/add', name: 'product-return-add', component: productReturnAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-receipt/add', name: 'po-receipt-add', component: poReceiptAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-return/add', name: 'po-return-add', component: poReturnAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/po/add', name: 'po-add', component: poAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-invoice/add', name: 'po-invoice-add', component: poInvoiceAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-payment/add', name: 'po-payment-add', component: poPaymentAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/material-release/add', name: 'material-release-add', component: materialReleaseAdd, meta: {requiresAuth: true} }, 
  { path: '/transaksi/sales-invoice/add', name: 'sales-invoice-add', component: salesInvoiceAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/shipment/add', name: 'shipment-add', component: shipmentAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/sales-order/add', name: 'sales-order-add', component: salesOrderAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/purchase-request/add', name: 'purchase-request-add', component: purchaseRequestAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank/add', name: 'kasbank-add', component: kasbankAdd, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank-v2/add', name: 'kasbank-v2-add', component: kasbankAddV2, meta: {requiresAuth: true} },  
  
  // detail transaksi
  { path: '/transaksi/bill-of-material/detail', name: 'bill-of-material-detail', component: BOMDetail, props: true, meta: {requiresAuth: true} },
  { path: '/transaksi/master-data/detail', name: 'master-data-detail', component: MasterDataDetail, props: true, meta: {requiresAuth: true} },
  { path: '/transaksi/jurnal-entry/detail', name: 'jurnal-entry-detail', component: JurnalEntryDetail, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/inventory-adjusment/detail', name: 'inventory-adjusment-detail', component: inventoryAdjusmentDetail, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/material-issue/detail', name: 'material-issue-detail', component: materialIssueDetail, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/production-report/detail', name: 'production-report-detail', component: productionReportDetail, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/wip-workorder/detail/:dataDetail', name: 'wip-workorder-detail', component: wipWODetail, props: true, meta: {requiresAuth: true} },    
  { path: '/transaksi/wip-workorder/receipt/:dataDetail', name: 'wip-workorder-receipt', component: wipWOReceipt, props: true, meta: {requiresAuth: true} },    
  { path: '/transaksi/fixed-asset/detail', name: 'fixed-asset-detail', component: fixedAssetDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/production-planning/detail', name: 'production-planning-detail', component: productionPlanningDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/good-receipt/detail', name: 'good-receipt-detail', component: goodReceiptDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/qc-material-inspection/detail', name: 'qc-material-inspection-detail', component: qcMaterialInspectionDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/master-production-schedule/detail', name: 'master-production-schedule-detail', component: masterProductionScheduleDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/master-formula/detail', name: 'master-formula-detail', component: masterFormulaDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/product-return/detail', name: 'product-return-detail', component: productReturnDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-request/detail', name: 'po-request-detail', component: poRequestDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-return/detail', name: 'po-return-detail', component: poReturnDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po/detail', name: 'po-detail', component: poDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-invoice/detail', name: 'po-invoice-detail', component: poInvoiceDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/material-release/detail', name: 'material-release-detail', component: materialReleaseDetail, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/sales-invoice/detail', name: 'sales-invoice-detail', component: salesInvoiceDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/shipment/detail', name: 'shipment-detail', component: shipmentDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/sales-order/detail/:noSO', name: 'sales-order-detail', component: salesOrderDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/purchase-request/detail', name: 'purchase-request-detail', component: purchaseRequestDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank/detail', name: 'kasbank-detail', component: kasbankDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-receipt/detail', name: 'po-receipt-detail', component: poReceiptDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-payment/detail', name: 'po-payment-detail', component: poPaymentDetail, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank-v2/detail', name: 'kasbank-v2-detail', component: kasbankDetailV2, props: true, meta: {requiresAuth: true} },  

  // edit transaksi
  { path: '/transaksi/bill-of-material/edit', name: 'bill-of-material-edit', component: BOMEdit, props: true, meta: {requiresAuth: true} },
  { path: '/transaksi/master-data/edit', name: 'master-data-edit', component: MasterDataEdit, props: true, meta: {requiresAuth: true} },
  { path: '/transaksi/jurnal-entry/edit', name: 'jurnal-entry-edit', component: JurnalEntryEdit, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/inventory-adjusment/edit', name: 'inventory-adjusment-edit', component: inventoryAdjusmentEdit, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/material-issue/edit', name: 'material-issue-edit', component: materialIssueEdit, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/production-report/edit', name: 'production-report-edit', component: productionReportEdit, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/wip-workorder/edit', name: 'wip-workorder-edit', component: wipWOEdit, props: true, meta: {requiresAuth: true} },    
  { path: '/transaksi/fixed-asset/edit', name: 'fixed-asset-edit', component: fixedAssetEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/production-planning/edit', name: 'production-planning-edit', component: productionPlanningEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/good-receipt/edit', name: 'good-receipt-edit', component: goodReceiptEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/qc-material-inspection/edit', name: 'qc-material-inspection-edit', component: qcMaterialInspectionEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/master-production-schedule/edit', name: 'master-production-schedule-edit', component: masterProductionScheduleEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/master-formula/edit', name: 'master-formula-edit', component: masterFormulaEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/product-return/edit', name: 'product-return-edit', component: productReturnEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-request/edit', name: 'po-request-edit', component: poRequestEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-return/edit', name: 'po-return-edit', component: poReturnEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po/edit', name: 'po-edit', component: poEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-invoice/edit', name: 'po-invoice-edit', component: poInvoiceEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/material-release/edit', name: 'material-release-edit', component: materialReleaseEdit, props: true, meta: {requiresAuth: true} }, 
  { path: '/transaksi/sales-invoice/edit', name: 'sales-invoice-edit', component: salesInvoiceEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/shipment/edit', name: 'shipment-edit', component: shipmentEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/sales-order/edit', name: 'sales-order-edit', component: salesOrderEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank/edit', name: 'kasbank-edit', component: kasbankEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/kasbank-v2/edit', name: 'kasbank-v2-edit', component: kasbankEditV2, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-receipt/edit', name: 'po-receipt-edit', component: poReceiptEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/po-payment/edit', name: 'po-payment-edit', component: poPaymentEdit, props: true, meta: {requiresAuth: true} },  
  { path: '/transaksi/purchase-request/edit', name: 'purchase-request-edit', component: purchaseRequestEdit, props: true, meta: {requiresAuth: true} },  
  // End transaksi

  // master
  { path: '/master/kasbank', name: 'master-kasbank', component: masterKasbank, meta: {requiresAuth: true} },
  { path: '/master/data-customer', name: 'data-customer', component: dataCustomer, meta: {requiresAuth: true} },
  { path: '/master/item', name: 'item', component: item, meta: {requiresAuth: true} },
  { path: '/master/user', name: 'user', component: user, meta: {requiresAuth: true} },
  { path: '/master/coa', name: 'coa', component: coa, meta: {requiresAuth: true} },
  { path: '/master/supplier', name: 'supplier', component: supplier, meta: {requiresAuth: true} },
  { path: '/master/mapping-location', name: 'mapping-location', component: mappingLocation, meta: {requiresAuth: true} },
  { path: '/master/credit-terms', name: 'credit-terms', component: creditTerms, meta: {requiresAuth: true} },
  { path: '/master/cost-center', name: 'cost-center', component: costCenter, meta: {requiresAuth: true} },
  { path: '/master/domain', name: 'domain', component: domain, meta: {requiresAuth: true} },
  { path: '/master/master-production-schedule', name: 'mps', component: mps, meta: {requiresAuth: true} },
  { path: '/master/formula', name: 'formula', component: formula, meta: {requiresAuth: true} },
  { path: '/master/routing', name: 'routing', component: routing, meta: {requiresAuth: true} },
  { path: '/master/setup', name: 'setup', component: setup, meta: {requiresAuth: true} },
  { path: '/master/qc-item-spec', name: 'qc-item-spec', component: qcItemSpec, meta: {requiresAuth: true} },
  { path: '/master/period', name: 'period', component: period, meta: {requiresAuth: true} },

  // end master

  // browse
  { path: '/browse/kasbank-v2', name: 'browse-kasbank-v2', component: browseKasbankV2, meta: {requiresAuth: true} },
  { path: '/browse/transaksi-harian', name: 'browse-transaksi-harian', component: browseTransaksiHarian, meta: {requiresAuth: true} },
  // end browse

  // report
  { path: '/report/sales-order', name: 'report-sales-order', component: reportSO, meta: {requiresAuth: true} },
  { path: '/report/inventory', name: 'report-inventory', component: reportInventory, meta: {requiresAuth: true} },
  { path: '/report/report-neraca-saldo', name: 'report-neraca-saldo', component: reportNeracaSaldo, meta: {requiresAuth: true} },
  { path: '/report/inventory-stock-detail', name: 'report-inventory-stock-detail', component: reportInventoryStockDetail, meta: {requiresAuth: true} },
  { path: '/report/kasbank-v2', name: 'report-kasbank-v2', component: reportKasbankV2, meta: {requiresAuth: true} },
  { path: '/transaksi/detil-poprint/:noPO', name: 'detil-poprint', component: reportPrint, meta: {requiresAuth: true} },
  { path: '/report/transaksi-voucher', name: 'report-transaksi-voucher', component: reportTransaksiVoucher, meta: {requiresAuth: true} },
  { path: '/report/transaksi-harian', name: 'transaksi-harian', component: reportTransaksiHarian, meta: {requiresAuth: true} },
  // end report

  { path: '/master/usaha', name: 'usaha', component: Usaha, meta: {requiresAuth: true} },

]

const router = new VueRouter({
  mode: 'hash',
  routes
})
//router
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.isAuthenticated) {
        next();
      } else {
        next('/');
      }
    } else if (to.path === '/' || to.path === '/register') {
      if (store.state.isAuthenticated) {
        next('/dashboard');
      } else {
        next();
      }
    } else {
      next();
    }
});

export default router
