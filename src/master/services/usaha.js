import axios from "axios";
import { API } from '@/API';
import { error } from "jquery";

//List Database
export const getUsaha = async () => {
    const uItem = JSON.parse(localStorage.getItem('userDomainCode') || '[]');
    const response = await fetch(API + "/domains/allbyuser",{
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            userDomainCode: uItem
            })
    });
    const usaha = await response.json();
    console.log(usaha)
    return usaha;
}

export function addUsaha(data){
    let uItem = JSON.parse(localStorage.getItem('userDomainCode') || '[]').slice(-1)
    if (uItem.length === 0) {
        alert('array nya 0')
        uItem = []

    }
    const formData = new FormData();
    formData.append('domainCode', [])
    formData.append('domainName', data.domainName);
    formData.append('domainDesc', data.domainDesc);
    formData.append('domainTypeStore', data.domainTypeStore);
    formData.append('domainLocation', data.domainLocation);
    formData.append('domainUserCreated', localStorage.getItem('_id'));
    formData.append('xFilEkey', data.xFilEkey);
    formData.append('userDomainCode', uItem);
    formData.append('domainLogo', []);

    return axios.post(API + "/domains/create/3/" + data.domainType,formData, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    .then((response) =>{
        response.data
          localStorage.setItem("userDomainCode", JSON.stringify(response.data.data.dtUser.userDomainCode));
    });
}
// edit data

export function updateUsaha(data, _id){
    return axios.post(API + `/domains/editOne/` + _id,data)
}

// Get Option Jenis Usaha

export const getOptJenis = async () => {
    const response = await fetch(API + "/template/get/3.1.1",{
        method: 'GET'
    });
    const optJenis = await response.json();
    return optJenis;
}

// Get Icon

export function getIcon(imageUrls, usaha){
    return Promise.all(
        imageUrls.map(url =>
          axios.get(url, {
            responseType: 'blob' // Set the response type to arraybuffer to handle binary data
          }).then(responses => URL.createObjectURL(responses.data))
        )
      )
        .then(imageUrls => {
            const listLogo = imageUrls.map(url =>({icon: url}));
            return usaha = usaha.map((item, index) => Object.assign({}, item, listLogo[index]))
        })
}

// Tambah App Process

export function addProc(data, id){
    return axios.post(API + `/domains/addAppprocess/` + id, data)
    
}


// Edit App Process

export function updateProc(data, link){
    return axios.post(API + `/domains/editAppprocess/` + link, data)
}

// Add Microservice

export function addMicro(data, link){
    return axios.post(API + `/domains/addNewAppMicro/` + link,data)
}

// Edit Microservice

export function updateMicro (data, link){
    return axios.post(API + `/domains/editMicroServices/` + link, data)
}


