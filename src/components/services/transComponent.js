import axios from "axios";
import { API } from "@/API";

// Temporary
const mainID = "648da0edc3889697b16e8675";

export const getItem = async () => {
  const idDomain = mainID;
  // return master.find(data => data.masterRouting === routes).masterData
  const response = await axios.get(API + "/items/bydomainNgroup/" + idDomain + "/product");
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const addWO = async (data) => {
  // return master.find(data => data.masterRouting === routes).masterData
  const response = await axios.post(API + "/transWO/create", data);
  console.log(response.data, "tes");
  var suppData = response.data;
  return suppData;
};
export const getAllWObyDomain = async () => {
  const idDomain = mainID;
  // return master.find(data => data.masterRouting === routes).masterData
  const response = await axios.get(API + "/transWO/getAllWOCreatebyDomain/" + idDomain);
  const suppData = response.data;
  return suppData;
};
export const getDetailWObyWoNo = async (noWO) => {
  const idDomain = mainID;
  // return master.find(data => data.masterRouting === routes).masterData
  const response = await axios.get(API + "/transWO/getWObyWoNo/" + idDomain + "/" + noWO);
  const suppData = response.data;
  return suppData;
};
