import axios from "axios";
import { API } from '@/API';

// Global
export const getFieldTable = async (component) => {
    const fields = component.find(({ componentName }) => componentName === "fieldTable").componentMicro
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
}
export const getContentWidth = async (content, column) => {
    const contentDiv = content;
    let columns = 0;
    const tes = column.filter(x => x.type === 'text' && !x.width).length
    const widthTes = column
    for (let i = 0; i < widthTes.length; i++) {
      if (widthTes[i].width >= 0 || widthTes[i].width !== undefined) {
        columns += widthTes[i].width
      }
    }
    if (contentDiv) {
      return (contentDiv.offsetWidth - 85 - columns) / tes;
    }
}
export const findData = async (dataDetail, component) => {
    const headerData = dataDetail.header[0];
    const footerData = dataDetail.footer[0];
    const combinedData = {...headerData, ...footerData}
    const detailData = Object.entries(combinedData).map(([key, value]) => ({
      key,
      value 
    }));
    component.forEach(component => {
      component.componentMicro.forEach(item => {
        const matchedObject = detailData.find(obj => obj.key === item.key);
        if (matchedObject) {
          item.value = matchedObject.value
        }
      })
    })
}

// List
export const getComponentList = async (posts) => {
    return posts.transProperties.find(({ dataName }) => dataName === "menuList").dataMicro
}
export const getDataList = async (posts) => {
    return posts.transData.reduce((result, item) => {
        if (Array.isArray(item.header)) {
          item.header.forEach((microItem) => {
            result.push(microItem);
          });
        }
        return result;
      }, []);
}
export const getFieldTableList = async (component, buttonRenderer) => {
    const fields = component
    const trueFields = fields.map((x) => {
      if (x.microType === 'date') {
        return { data: x.key, title: x.microName, type: x.microType, width: 110 }
      } else if (x.microType === 'numeric') {
        return { data: x.key, title: x.microName, type: x.microType, width: 125, renderer: (instance, td, row, col, prop, value) => { if (typeof value === 'number') { const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); td.innerText = formattedValue; } else { td.innerText = value } }, validator: (value, callback) => { if (value > 1000000000000 || value < 0) { callback(false); } else { callback(true) } } }
      } else if (x.microType === 'dropdown') {
        return {
          data: 'action', title: 'opsi', width: 50,

          renderer: buttonRenderer
        }
      } else {
        if (x.width <= 0) {
          return { data: x.key, title: x.microName, type: x.microType }
        } else {
          return { data: x.key, title: x.microName, type: x.microType, width: x.width }
        }
      }
    })
    return trueFields
}
export const listButtonClick = (router, rowData, buttonIndex, posts, routing) => {
    const sendData = posts.transData.find(item => item.header[0] === rowData)
    if (buttonIndex === 1) {
      router.push({ name: routing + '-detail', params: { dataDetail: sendData } })
    } else if (buttonIndex === 2) {
      router.push({ name: routing + '-edit', params: { dataDetail: sendData } })
    }
}

// Add
export const getComponentAdd = async (posts) => {
    return posts.transProperties.find(({ dataName }) => dataName === "menuAdd").dataMicro
}
export const dataTableAdd = async (array, data) => {    
    const dataObject = data.reduce((acc, obj) => {
    acc[obj.data] = "";
        return acc
    }, {});

    for (let i = 0; i < 1000; i++) {
        const key = `row_${i}`;
        const objectAdd = { ...dataObject, key }
        array.push(objectAdd)
    }
}

// Detail
export const getComponentDetail = async (posts) => {
    return posts.transProperties.find(({ dataName }) => dataName === "menuDetail").dataMicro
}
// Edit
export const getComponentEdit = async (posts) => {
    return posts.transProperties.find(({ dataName }) => dataName === "menuEdit").dataMicro
}
export const dataTableEdit = async (array, data, start) => {    
    const dataObject = data.reduce((acc, obj) => {
        acc[obj.data] = "";
        return acc
      }, {});
  
      const startIndex = start.table.length;
      const endIndex = 1000;
      for (let i = startIndex; i<endIndex; i++) {
        const key = `row_${i}`;
        const objectAdd = {...dataObject, key}
        array.table.push(objectAdd)
      }
}

// other
export function sumProperty(data, property) {
    return data.reduce((sum, entry) => parseInt(sum) + entry[property], 0);
  }
  
  export function getTotal(data, property) {
    return sumProperty(data, property);
  }
  
  export async function getTotalData(data, componentMicro) {
    await Promise.all(
      componentMicro
        .filter((x) => x.key !== 'total' && x.editableTotal !== true && x.fixedValue !== true)
        .map(async (item) => {
          item.value = await getTotal(data, item.key);
        }),
      componentMicro
        .filter((x) => x.key !== 'total' && x.editableTotal === true)
        .map(async (item) => {
          item.value = item.value
        })
    );
  }
  
  export async function getTotalAuto(data, component) {
    let totalNumber = 0;
    const totalValue = component
  
    totalValue
      .filter((x) => x.key !== 'total')
      .forEach((x) => {
        if (x.microMath === 'minus') {
          if (Number.isNaN(x.value) || x.value === '') {
            totalNumber += 0;
          } else {
            totalNumber -= parseInt(x.value);
          }
        } else if (x.microMath === 'plus') {
          if (Number.isNaN(x.value) || x.value === '') {
            totalNumber += 0;
          } else {
            totalNumber += parseInt(x.value);
          }
        }
      });
  
    let finalNumber = totalNumber;
  
    totalValue
      .filter((x) => x.key !== 'total' && x.microMath !== 'minus' && x.microMath !== 'plus')
      .forEach((x) => {
        if (x.microMath === 'percent-minus') {
          if (Number.isNaN(x.value) || x.value === '') {
            finalNumber += 0;
          } else {
            finalNumber -= (totalNumber * parseInt(x.value) / 100);
          }
        } else if (x.microMath === 'percent-plus') {
          if (Number.isNaN(x.value) || x.value === '') {
            finalNumber += 0;
          } else {
            finalNumber += (totalNumber * parseInt(x.value) / 100);
          }
        } else if (x.microMath === 'extra-plus') {
          if (Number.isNaN(x.value) || x.value === '') {
            finalNumber += 0;
          } else {
            finalNumber += parseInt(x.value);
          }
        } else if (x.microMath === 'extra-minus') {
          if (Number.isNaN(x.value) || x.value === '') {
            finalNumber -= 0;
          } else {
            finalNumber -= parseInt(x.value);
          }
        }
      });
      console.log(finalNumber)
    if (finalNumber < 0) {
      component.find((x) => x.key === 'total').value = 0;
    } else {
      component.find((x) => x.key === 'total').value = finalNumber;
    }
  }
  
  export async function refreshValue(data, component) {
    const fieldTotalComponent = component.find(({ componentName }) => componentName === 'fieldTotal');
  
    if (fieldTotalComponent && fieldTotalComponent.componentMicro.length > 0) {
      await getTotalData(data, fieldTotalComponent.componentMicro);
      await getTotalAuto(data, fieldTotalComponent.componentMicro);
    }
  }

  