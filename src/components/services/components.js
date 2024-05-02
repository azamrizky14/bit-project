import axios from "axios";
import { API, WA } from "@/API";
import transaksi from "../../API/transaksi";
import report from "../../API/report";
import master from "../../API/master";

// Temporary
const mainID = "648da0edc3889697b16e8675";

// Get

export const get0 = async (routes) => {
    return master.find(data => data.masterRouting === routes)
}
export const getA = async (year, month) => {
    const id = mainID
    const response = await axios.get(API+'/coa/cashBankCurrentMonth/'+id+'/'+year+'/'+month)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const getB = async () => {
    const id = mainID
    const response = await axios.get(API+'/coa/cashBankVoucher/'+id)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const getC = async (year, month) => {
  const id = mainID;
  const response = await axios.get(API + "/coa/listcashBankTransByPeriode/" + id + "/" + year + "/" + month);
  console.log(response.data.voucher, "tes");
  var suppData = response.data;
  return suppData;
};
export const getD = async (code) => {
  const id = mainID;
  const response = await axios.get(API + "/coa/cashBankTransByVoucher/" + id + "/" + code);
  var suppData = response.data;
  return suppData;
};
export const getE = async (code) => {
  const id = mainID;
  const response = await axios.get(API + "/coa/listcashBankTrans/" + id + "/" + code);
  var suppData = response.data;
  return suppData;
};
export const getF = async (year, month) => {
  const id = mainID;
  const response = await axios.get(API + "/coa/cashBankNeraca/" + id + "/" + year + "/" + month);
  var suppData = response.data;
  return suppData;
};

export const getG = async (date) => {
    const id = mainID
    const response = await axios.get(API+'/coa/getSumCashBankSaldoByDate/'+id+'/'+date)
    var suppData = response.data;
    return suppData
}
export const getH = async () => {
    const id = mainID
    const response = await axios.get(API+'/trans/listTransAll/'+id)
    var suppData = response.data.filter(x => x.transType === 'SalesOrder');
    return suppData
}
export const getI = async () => {
    const id = mainID
    const response = await axios.get(API+'/purchase/allpurchase/'+id)
    var suppData = response.data;
    return suppData
}
export const getJ = async () => {
    const id = mainID
    const response = await axios.get(API+'/purchase/allpurchase/'+id)
    var suppData = response.data;
    return suppData
}
export const getK = async () => {
    const id = mainID
    const response = await axios.get(API+'/purchase/prListforPO/'+id)
    var suppData = response.data;
    return suppData
}
export const getL = async () => {
    const id = mainID
    const response = await axios.get(API+'/purchase/listPObyDomain/'+id)
    var suppData = response.data;
    return suppData
}
export const getM = async () => {
    const id = mainID
    const response = await axios.get(API+'/purchase/supplierListforGR/'+id)
    var suppData = response.data;
    return suppData
}
export const getN = async () => {
    const id = mainID
    const response = await axios.get(API+'/domains/mappList/'+id)
    var suppData = response.data;
    return suppData
}
export const getO = async () => {
    const response = await axios.get(API+'/user/getUserDepartemenEnum')
    var suppData = response.data;
    return suppData
}
export const get1 = async (routes) => {
    return transaksi.find(data => data.transRouting === routes)
}
export const get2 = async () => {
    // return master.find(data => data.masterRouting === routes).masterData
    const response = await axios.get(API+'/user/allSupplier')
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const get3 = async (routes) => {
  return report.find((data) => data.transRouting === routes);
};
export const get4 = async (data) => {
    const id = mainID
    const response = await axios.get(API+'/domains/getRoutingByAppProcess/'+id+'/'+data)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const get5 = async () => {
    const response = await axios.get(API+'/items/getItemGroupEnum')
    var suppData = response.data;
    return suppData
}
export const get6 = async () => {
    const id = mainID
    const response = await axios.get(API+'/items/getFieldCatDistinct/'+id)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const get7 = async (data) => {
    const id = mainID
    const response = await axios.get(API+'/items/bydomainNgroup/'+id+'/'+data)
    var suppData = response.data;
    return suppData
}

export const getItem = async () => {
    const idDomain = mainID
    // return master.find(data => data.masterRouting === routes).masterData
    const response = await axios.get(API+'/items/bydomain/'+idDomain)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const getCoa = async () => {
    const id = mainID
    const response = await axios.get(API+'/coa/allCoa/'+id)
    // return master.find(data => data.masterRouting === routes).masterData
    // const response = await axios.get(API+'/coa/allCoa')
    // console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const getCustomer = async () => {
    const response = await axios.get(API+'/user/allCustomer')
    return response.data
}
export const getSupplier = async () => {
    const response = await axios.get(API+'/user/allSupplier')
    return response.data
}
export const getUser = async () => {
    const id = mainID
    const response = await axios.get(API+'/user/allUser/'+id)
    return response.data
}
export const getRouting = async () => {
    const id = mainID
    const response = await axios.get(API+'/domains/routeList/'+id)
    return response.data
}
export const getRoutingGroup = async () => {
    const response = await axios.get(API+'/domains/getRoutingGroupEnum')
    return response.data
}
export const getMappingLocation = async () => {
    const id = mainID
    const response = await axios.get(API+'/domains/mappList/'+id)
    return response.data
}
export const getCreditTerms = async () => {
    const id = mainID
    const response = await axios.get(API+'/domains/creditList/'+id)
    return response.data
}
export const getCostCenter = async () => {
    const id = mainID
    const response = await axios.get(API+'/domains/costCenterList/'+id)
    return response.data
}
export const getUsaha = async () => {
    const id = mainID
    const response = await axios.get(API+'/domains/nextStepByCode/'+id+'/3.1.1')
    return response.data
}
export const getPeriod = async () => {
    const id = mainID
    const response = await axios.get(API+'/domains/periodList/'+id)
    return response.data
}
export const getSetup = async () => {
    const response = await axios.get(API+'/setup/getAllSetup')
    console.log(response.data)
    return response.data
}
export const getListUser = async () => {
    // return master.find(data => data.masterRouting === routes).masterData
    const response = await axios.get(API+'/user/getUserFieldDistinct/3.1.1.3.1/userType')
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const getPObyId = async (poNo) => {
    const id = mainID;
    const response = await axios.get(API + "/purchase/PObyId/" + id + "/" + poNo);
    var suppData = response.data;
    return suppData;
  };
  
export const getJEVoucher = async () => {
  const response = await axios.get(API+'/coa/journalEntryVoucher')
  console.log(response.data)
  return response.data
} 
export const getInventoryReport = async (date) => {
  const id = mainID;
  const response = await axios.get(API+'/invreport/getAllItemByPeriode/'+id+'/'+date)
  console.log(response.data)
  return response.data
}
export const getInventoryStockReport = async (date) => {
  const id = mainID;
  const response = await axios.get(API+'/invreport/getDetilAllItemByPeriode/'+id+'/'+date)
  console.log(response.data)
  return response.data
}
export const getListCustomerSO = async () => {
  const id = mainID;
  const response = await axios.get(API+'/trans/soListforShipment/'+id)
  console.log(response.data)
  return response.data
}
export const getSO = async () => {
  const id = mainID;
  const response = await axios.get(API+'/trans/soListSalesOrder/'+id)
  console.log(response.data)
  return response.data
}
export const getJE = async () => {
  const id = mainID;
  const response = await axios.get(API+'/coa/allJounalEntry/'+id)
  console.log(response.data)
  return response.data
}
export const getPOReceipt = async () => {
  const id = mainID;
  const response = await axios.get(API+'/transHys/getAllGRbyDomain/'+id)
  console.log(response.data)
  return response.data
}
export const getShipment = async () => {
  const id = mainID;
  const response = await axios.get(API+'/shipment/getAllDObyDomain/'+id)
  console.log(response.data)
  return response.data
}
export const getNeracaSaldo = async (data) => {
  const [year, month] = data.split('-');
  const id = mainID;
  const response = await axios.get(API+'/coa/neracaSaldo/'+id+'/'+year+'/'+month)
  console.log(response.data)
  return response.data
}
export const getFormula = async () => {
  const id = mainID;
  const response = await axios.get(API+'/items/formulaList/'+id)
  console.log(response.data)
  return response.data
}
export const getItemDetail = async (id) => {
  const response = await axios.get(API+'/items/getItemAllDetailbyId/'+id)
  console.log(response.data)
  return response.data
}

// Post
export const allByUser = async () => {
  const uItem = JSON.parse(localStorage.getItem("userDomainCode") || "[]");
  console.log(uItem);
  const response = await axios.post(API + "/domains/allbyuser", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userDomainCode: uItem,
    }),
  });
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const postOTP = async (data) => {
  const response = await axios.post(API + "/coa/create", data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const postConfirmPR = async (prId, routingId, userLogicId, logic) => {
  console.log(prId, routingId, userLogicId, logic);
  const response = await axios.post(
    API + "/purchase/confirmPRByIdConfirm/" + prId + "/" + routingId + "/" + userLogicId + "/" + logic
  );
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};

// Add
export const addFormData = async (data) => {
  const response = await axios.post(API + "/user/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};

export const addCOA = async (data) => {
  const response = await axios.post(API + "/coa/create", data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};

export const addUser = async (data) => {
  const response = await axios.post(API + "/user/register", data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addItems = async (data) => {
    const response = await axios.post(API+'/items/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const addMappingLocation = async (data) => {
  const id = mainID;
  const response = await axios.post(API + "/domains/mappcreate/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addCreditTerms = async (data) => {
  const id = mainID;
  const response = await axios.post(API + "/domains/creditCreate/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addCostCenter = async (data) => {
  const id = mainID;
  const response = await axios.post(API + "/domains/costCenterCreate/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addRouting = async (data) => {
  const id = mainID;
  const response = await axios.post(API + "/domains/routeCreate/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addPeriod = async (data) => {
  const id = mainID;
  const response = await axios.post(API + "/domains/periodCreate/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addKasbank = async (data, id, code, name) => {
  const domainID = mainID;
  const response = await axios.post(API + "/coa/cashBankCreate/"+ domainID + '/' + id + "/" + code + "/" + name, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addTrans = async (data) => {
  const response = await axios.post(API + "/trans/createTrans/", data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addPR = async (data) => {
  const response = await axios.post(API + "/purchase/purchaseRequestCreate", data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addPO = async (data) => {
    const id = mainID
    const response = await axios.post(API+'/purchase/poCreate/'+id, data)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const addGR = async (data) => {
    const response = await axios.post(API+'/transHys/create', data)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const addShipment = async (data) => {
    const response = await axios.post(API+'/shipment/ShipmentCreate', data)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}
export const addFormula = async (data, id, qty) => {
  const response = await axios.post(API+'/items/formulaCreate/'+id+'/'+qty, data)
  console.log(response.data, 'tes');
  var suppData = response.data;
  return suppData
}

// Update
export const updateCOA = async (data, id) => {
  const response = await axios.post(API + "/coa/edit/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};

export const updateCustomer = async (data, id) => {
  const response = await axios.post(API + "/user/editCust/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateSupplier = async (data, id) => {
  const response = await axios.post(API + "/user/editCust/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateUser = async (data, id) => {
  const response = await axios.post(API + "/user/editCust/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};

export const updateItem = async (data, id) => {
  const response = await axios.post(API + "/items/updateItemOne/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateMappingLocation = async (data, id) => {
  const idU = mainID;
  const response = await axios.post(API + "/domains/mappEdit/" + idU + "/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateCreditTerms = async (data, id) => {
  const idU = mainID;
  const response = await axios.post(API + "/domains/creditEdit/" + idU + "/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateCostCenter = async (data, id) => {
  const idU = mainID;
  const response = await axios.post(API + "/domains/costCenterEdit/" + idU + "/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateRouting = async (data, id) => {
  const idU = mainID;
  const response = await axios.post(API + "/domains/routeEdit/" + idU + "/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updatePeriod = async (data, id) => {
  const idU = mainID;
  const response = await axios.post(API + "/domains/periodEdit/" + idU + "/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateSetup = async (data) => {
  const response = await axios.post(API + "/setup/updateAllsetup", data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updatePassword = async (data, id) => {
  const response = await axios.post(API + "/user/editPwd/"+id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const updateFormula = async (data, id) => {
  const response = await axios.post(API + "/items/updateItemOne/"+id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};

// Delete
export const deleteCOA = async (data, id) => {
  const response = await axios.post(API + "/coa/edit/" + id, data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const deleteCreditTerms = async (id) => {
  const idU = mainID;
  const response = await axios.post(API + "/domains/creditDelete/" + idU + "/" + id);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const deleteCostCenter = async (id) => {
  const idU = mainID;
  const response = await axios.post(API + "/domains/costCenterDelete/" + idU + "/" + id);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};

// Other
export const mergePeriod = async (year, month) => {
    const id = mainID
    const response = await axios.get(API+'/domains/periodListbyMonth/'+id+'/'+year+'/'+month)
    return response.data
}
// Topbar
export const getNotif = async (data) => {
    const id = mainID
    const response = await axios.get(API+'/purchase/getListConfirmByUser/'+id+'/'+data)
    return response.data
}
export const getConfirmPR = async (data) => {
    const id = mainID
    const response = await axios.get(API+'/purchase/detilPurchaseById/'+data)
    return response.data
}
// Global

export const getDataDistinc = async (data) => {
    const id = mainID
    const response = await axios.get(API+'/items/getItemFieldDistinct/'+id+'/'+data)
    console.log(response.data, 'tes');
    var suppData = response.data;
    return suppData
}

export const getListPObyDomainPagination = async (perPage, currpage) => {
    const id = mainID;
    const response = await axios.get(API + "/purchase/listPObyDomainPagination/" + id + "/" + perPage + "/" + currpage);
    var suppData = response.data;
    return suppData;
  };

  export const getListArrItem = async (data) => {
    const id = mainID;
    const response = await axios.get(API + "/items/listArrItemGroupbydomain/" + id + "/" + data );
    var suppData = response.data;
    return suppData;
  };