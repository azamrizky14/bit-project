const report = [
  // Sales Order
  {
    transTitle: 'Sales Order',
    transRouting: 'sales-order',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          { key: 'orderNumber', microName: 'Order Number', microType: 'text', width: 110, microText: '', microFormat: '', microClass: '' },
          { key: 'orderDate', microName: 'Order Date', microType: 'date', width: 0, microText: '', microFormat: 'DD-MM-YYYY', microClass: '' },
          { key: 'sales', microName: 'Sales', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'customer', microName: 'Customer', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'shipTo', microName: 'Ship To', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'shipPlan', microName: 'Ship Plan', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'status', microName: 'Status', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { key: 'H001', orderNumber: 'SO0001', orderDate: '2023-12-01', sales: 'Mamat', customer: 'Yamaaf', shipTo: '-', shipPlan: '-', status: 'complete' }
        ],
        table: [
          { productCode: 'MIE001', productName: 'Mie Gelas', desc: '-', tableUoM: 'pcs', tableQty: 10, tablePriceCode: 'PH001', tablePrice: 10000, tableTotal: 100000 }
        ],
        footer: [
          { note: 'Nggak Ada', diskon: 10 }
        ]
      },
      {
        key: '002',
        header: [
          { key: 'H002', orderNumber: 'SO0002', orderDate: '2023-12-01', sales: 'Mamat', customer: 'Yamaaf', shipTo: '-', shipPlan: '-', status: 'complete' }
        ],
        table: [
          { productCode: 'MIE001', productName: 'Mie Gelas', desc: '-', tableUoM: 'pcs', tableQty: 10, tablePriceCode: 'PH001', tablePrice: 10000, tableTotal: 100000 }
        ],
        footer: [
          { note: 'Nggak Ada', diskon: 10 }
        ]
      },
      {
        key: '003',
        header: [
          { key: 'H003', orderNumber: 'SO0003', orderDate: '2023-12-01', sales: 'Mamat', customer: 'Yamaaf', shipTo: '-', shipPlan: '-', status: 'complete' }
        ]
      },
      {
        key: '004',
        header: [
          { key: 'H004', orderNumber: 'SO0004', orderDate: '2023-12-01', sales: 'Mamat', customer: 'Yamaaf', shipTo: '-', shipPlan: '-', status: 'complete' }
        ]
      },
      {
        key: '005',
        header: [
          { key: 'H005', orderNumber: 'SO0005', orderDate: '2023-12-01', sales: 'Mamat', customer: 'Yamaaf', shipTo: '-', shipPlan: '-', status: 'complete' }
        ]
      },
    ]
  },
  {
    transTitle: 'Sales Order',
    transRouting: 'sales-order-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'orderNumber', microName: 'Order Number', microType: 'text', microText: 'Masukan order number', microClass: '', microValue:'' },
              { key: 'orderDate', microName: 'Order Date', microType: 'date', microText: 'Masukan tanggal order', microClass: '', microValue:'' },
              { key: 'salesName', microName: 'Nama Sales', microType: 'text', microText: 'Masukan Nama Sales', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'customer', microName: 'Customer', microType: 'text', microText: 'Masukan Nama Customer', microClass: '', microValue:'' },
              { key: 'shipTo', microName: 'Ship to', microType: 'text', microText: 'Masukan Ship to', microClass: '', microValue:'' },
              { key: 'shipPlan', microName: 'Shipment plan', microType: 'date', microText: 'Masukan tanggal order', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'productCode', microName: 'Kode Produk', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'tableUoM', microName: 'UoM', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tableQty', microName: 'Qty', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tablePriceCode', microName: 'Price Code', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tablePrice', microName: 'Harga', microType: 'numeric', width: 100, microText: 'Masukan Nama', microClass: '', },
              { key: 'tableTotal', microName: 'Total', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'tableTotal', microName: 'Sub Total', value: '', editableTotal: false, fixedValue: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'diskon', microName: 'Diskon (%)', value: '', editableTotal: true, fixedValue: false, microType: 'number', microMath: 'percent-minus', microClass: 'col-md-4' },
              { key: 'ppn', microName: 'PPn (%)', value: 11, editableTotal: false, fixedValue: true, microType: 'number', microMath: 'percent-minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, fixedValue: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Sales Order ',
    transRouting: 'sales-order-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'orderNumber', microName: 'Order Number', microType: 'text', microText: 'Masukan order number', microClass: '', value:'' },
              { key: 'orderDate', microName: 'Order Date', microType: 'date', microText: 'Masukan tanggal order', microClass: '', value:'' },
              { key: 'sales', microName: 'Nama Sales', microType: 'text', microText: 'Masukan Nama Sales', microClass: '', value:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'customer', microName: 'Customer', microType: 'text', microText: 'Masukan Nama Customer', microClass: '', value:'' },
              { key: 'shipTo', microName: 'Ship to', microType: 'text', microText: 'Masukan Ship to', microClass: '', value:'' },
              { key: 'shipPlan', microName: 'Shipment plan', microType: 'date', microText: 'Masukan tanggal order', microClass: '', value:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'productCode', microName: 'Kode Produk', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'tableUoM', microName: 'UoM', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tableQty', microName: 'Qty', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tablePriceCode', microName: 'Price Code', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tablePrice', microName: 'Harga', microType: 'numeric', width: 100, microText: 'Masukan Nama', microClass: '', },
              { key: 'tableTotal', microName: 'Total', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', value:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'tableTotal', microName: 'Sub Total', value: 0, editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'diskon', microName: 'Diskon (%)', value: '', editableTotal: true, microType: 'number', microMath: 'percent-minus', microClass: 'col-md-4' },
              { key: 'ppn', microName: 'PPn (%)', value: '', editableTotal: false, microType: 'number', microMath: 'percent-plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },  
  {
    transTitle: 'Sales Order ',
    transRouting: 'sales-order-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'orderNumber', microName: 'Order Number', microType: 'text', microText: 'Masukan order number', microClass: '', value:'' },
              { key: 'orderDate', microName: 'Order Date', microType: 'date', microText: 'Masukan tanggal order', microClass: '', value:'' },
              { key: 'sales', microName: 'Nama Sales', microType: 'text', microText: 'Masukan Nama Sales', microClass: '', value:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'customer', microName: 'Customer', microType: 'text', microText: 'Masukan Nama Customer', microClass: '', value:'' },
              { key: 'shipTo', microName: 'Ship to', microType: 'text', microText: 'Masukan Ship to', microClass: '', value:'' },
              { key: 'shipPlan', microName: 'Shipment plan', microType: 'date', microText: 'Masukan tanggal order', microClass: '', value:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'productCode', microName: 'Kode Produk', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'tableUoM', microName: 'UoM', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tableQty', microName: 'Qty', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tablePriceCode', microName: 'Price Code', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'tablePrice', microName: 'Harga', microType: 'numeric', width: 100, microText: 'Masukan Nama', microClass: '', },
              { key: 'tableTotal', microName: 'Total', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', value:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'tableTotal', microName: 'Sub Total', value: 0, editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'diskon', microName: 'Diskon (%)', value: '', editableTotal: true, microType: 'number', microMath: 'percent-minus', microClass: 'col-md-4' },
              { key: 'ppn', microName: 'PPn (%)', value: '', editableTotal: false, microType: 'number', microMath: 'percent-plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  }, 
  // Work Order
  {
    transTitle: 'Work Order',
    transRouting: 'wip-workorder',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          { key: 'woNumber', microName: 'WO Number', microType: 'text', width: 100, microText: '', microFormat: '', microClass: '' },
          { key: 'noBatch', microName: 'No. Batch', microType: 'text', width: 100, microText: '', microFormat: '', microClass: '' },
          { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'productQty', microName: 'Quantity', microType: 'numeric', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', width: 0, microText: '', microFormat: 'DD-MM-YYYY', microClass: '' },
          { key: 'startDate', microName: 'Start Date', microType: 'date', width: 0, microText: '', microFormat: 'DD-MM-YYYY', microClass: '' },
          { key: 'operation', microName: 'Operation', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'status', microName: 'Status', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { key: 'H001', woNumber: 'WO0001', noBatch: 'BTC001', productName: 'Mie Gelas', productQty: 10, scheduleDate: '2023-12-01', startDate: '2023-12-01', operation: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', desc: '-', uom: 'pcs', qty: 10, status: 'complete' }
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', woNumber: 'WO0001', noBatch: 'BTC001', productName: 'Mie Gelas', productQty: 10, scheduleDate: '2023-12-01', startDate: '2023-12-01', operation: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', desc: '-', uom: 'pcs', qty: 10, status: 'complete' }
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', woNumber: 'WO0001', noBatch: 'BTC001', productName: 'Mie Gelas', productQty: 10, scheduleDate: '2023-12-01', startDate: '2023-12-01', operation: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', desc: '-', uom: 'pcs', qty: 10, status: 'complete' }
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', woNumber: 'WO0001', noBatch: 'BTC001', productName: 'Mie Gelas', productQty: 10, scheduleDate: '2023-12-01', startDate: '2023-12-01', operation: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', desc: '-', uom: 'pcs', qty: 10, status: 'complete' }
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', woNumber: 'WO0001', noBatch: 'BTC001', productName: 'Mie Gelas', productQty: 10, scheduleDate: '2023-12-01', startDate: '2023-12-01', operation: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', desc: '-', uom: 'pcs', qty: 10, status: 'complete' }
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
    ]
  },
  {
    transTitle: 'Work Order',
    transRouting: 'wip-workorder-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', microText: 'Masukan nomor batch', microClass: '', microValue:'' },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', microText: 'Masukan nama produk', microClass: '', microValue:'' },
              { key: 'productQty', microName: 'Kuantitas', microType: 'number', microText: 'Masukan kuantitas', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'startDate', microName: 'Start Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'operation', microName: 'Operation', microType: 'text', microText: 'Masukan operasi', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'itemCode', microName: 'Kode Item', microType: 'text', width: 100, microText: '', microClass: ''},
              { key: 'itemName', microName: 'Nama Item', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'qty', microName: 'Qty', microType: 'numeric', width: 0, microText: '', microClass: ''},
              { key: 'uom', microName: 'UoM', microType: 'text', width:100, microText: '', microClass: ''},
              { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microClass: ''},
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Work Order',
    transRouting: 'wip-workorder-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', microText: 'Masukan nomor batch', microClass: '', microValue:'' },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', microText: 'Masukan nama produk', microClass: '', microValue:'' },
              { key: 'productQty', microName: 'Kuantitas', microType: 'number', microText: 'Masukan kuantitas', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'startDate', microName: 'Start Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'operation', microName: 'Operation', microType: 'text', microText: 'Masukan operasi', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'itemCode', microName: 'Kode Item', microType: 'text', width: 100, microText: '', microClass: ''},
              { key: 'itemName', microName: 'Nama Item', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'qty', microName: 'Qty', microType: 'numeric', width: 0, microText: '', microClass: ''},
              { key: 'uom', microName: 'UoM', microType: 'text', width:100, microText: '', microClass: ''},
              { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microClass: ''},
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Work Order',
    transRouting: 'wip-workorder-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', microText: 'Masukan nomor batch', microClass: '', microValue:'' },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', microText: 'Masukan nama produk', microClass: '', microValue:'' },
              { key: 'productQty', microName: 'Kuantitas', microType: 'number', microText: 'Masukan kuantitas', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'startDate', microName: 'Start Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'operation', microName: 'Operation', microType: 'text', microText: 'Masukan operasi', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'itemCode', microName: 'Kode Item', microType: 'text', width: 100, microText: '', microClass: ''},
              { key: 'itemName', microName: 'Nama Item', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'qty', microName: 'Qty', microType: 'numeric', width: 0, microText: '', microClass: ''},
              { key: 'uom', microName: 'UoM', microType: 'text', width:100, microText: '', microClass: ''},
              { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microClass: ''},
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catat  an', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  // Bill of Material
  {
    transTitle: 'Bill of Material',
    transRouting: 'bill-of-material',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          { key: 'bomNumber', microName: 'BOM Number', microType: 'text', width: 100, microText: '', microFormat: '', microClass: '' },
          { key: 'noBatch', microName: 'No. Batch', microType: 'text', width: 100, microText: '', microFormat: '', microClass: '' },
          { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'createDate', microName: 'Create Date', microType: 'date', width: 0, microText: '', microFormat: 'DD-MM-YYYY', microClass: '' },
          { key: 'reference', microName: 'Reference', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microFormat: '', microClass: '' },
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { key: 'H001', bomNumber: 'BOM0001', noBatch: 'NB0001', productName: 'Kardus', createDate: '2023-12-01', scheduleDate: '2023-12-01', sales: 'Mamat', reference: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', desc: '-', sendDate: '2023-12-01', qtyRequest: 10, uomRequest: 'pcs', qtySend: 10, uomSend: 'pcs', status: 'completed' }
        ],
        footer: [
          { note: 'Nggak Ada' }
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', bomNumber: 'BOM0001', noBatch: 'NB0001', productName: 'Kardus', createDate: '2023-12-01', scheduleDate: '2023-12-01', sales: 'Mamat', reference: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', sendDate: '2023-12-01', qtyRequest: 10, uomRequest: 'pcs', qtySend: 10, uomSend: 'pcs', status: 'completed' }
        ],
        footer: [
          { note: 'Nggak Ada' }
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', bomNumber: 'BOM0001', noBatch: 'NB0001', productName: 'Kardus', createDate: '2023-12-01', scheduleDate: '2023-12-01', sales: 'Mamat', reference: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', sendDate: '2023-12-01', qtyRequest: 10, uomRequest: 'pcs', qtySend: 10, uomSend: 'pcs', status: 'completed' }
        ],
        footer: [
          { note: 'Nggak Ada' }
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', bomNumber: 'BOM0001', noBatch: 'NB0001', productName: 'Kardus', createDate: '2023-12-01', scheduleDate: '2023-12-01', sales: 'Mamat', reference: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', sendDate: '2023-12-01', qtyRequest: 10, uomRequest: 'pcs', qtySend: 10, uomSend: 'pcs', status: 'completed' }
        ],
        footer: [
          { note: 'Nggak Ada' }
        ]
      },
      {
        key: '001',
        header: [
          { key: 'H001', bomNumber: 'BOM0001', noBatch: 'NB0001', productName: 'Kardus', createDate: '2023-12-01', scheduleDate: '2023-12-01', sales: 'Mamat', reference: '-', status: 'complete' }
        ],
        table: [
          { itemCode: 'MIE001', itemName: 'Mie Gelas', sendDate: '2023-12-01', qtyRequest: 10, uomRequest: 'pcs', qtySend: 10, uomSend: 'pcs', status: 'completed' }
        ],
        footer: [
          { note: 'Nggak Ada' }
        ]
      },
    ]
  },
  {
    transTitle: 'Bill of Material',
    transRouting: 'bill-of-material-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              {key: 'user', microName: 'No. Batch', microType: 'numeric', microText: 'Masukan nomor batch', microClass: ''},
              {key:'journal', microName: 'Nama Produk', microType: 'text', microText: 'Masukan nama produk', microClass: ''},
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              {key: 'date', microName: 'Create Date', microType: 'date', microText: 'Masukan tanggal', microClass: ''},
              {key: 'date', microName: 'Schedule Date', microType: 'date', microText: 'Masukan tanggal', microClass: ''},
              {key:'journal', microName: 'Reference', microType: 'text', microText: 'Masukan referensi', microClass: ''},
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'itemCode', microName: 'Kode Item', microType: 'text', width: 100, microText: 'Masukan Kode', microClass: '', },
              { key: 'itemName', microName: 'Nama Item', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'sendDate', microName: 'Send Date', microType: 'date', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qtyRequest', microName: 'Qty (Request)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'uomRequest', microName: 'UoM (Request)', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qtySend', microName: 'Qty (Send)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'uomSend', microName: 'UoM (Send)', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'status', microName: 'Status', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qtyRequest', microName: 'Total Qty (Request)', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'qtySend', microName: 'Total Qty (send)', value: '', editableTotal: false, microType: 'number', microMath: 'minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4 d-none' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Bill of Material',
    transRouting: 'bill-of-material-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              {key: 'user', microName: 'No. Batch', microType: 'numeric', microText: 'Masukan nomor batch', microClass: ''},
              {key:'journal', microName: 'Nama Produk', microType: 'text', microText: 'Masukan nama produk', microClass: ''},
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              {key: 'date', microName: 'Create Date', microType: 'date', microText: 'Masukan tanggal', microClass: ''},
              {key: 'date', microName: 'Schedule Date', microType: 'date', microText: 'Masukan tanggal', microClass: ''},
              {key:'journal', microName: 'Reference', microType: 'text', microText: 'Masukan referensi', microClass: ''},
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'itemCode', microName: 'Kode Item', microType: 'text', width: 100, microText: 'Masukan Kode', microClass: '', },
              { key: 'itemName', microName: 'Nama Item', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'sendDate', microName: 'Send Date', microType: 'date', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qtyRequest', microName: 'Qty (Request)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'uomRequest', microName: 'UoM (Request)', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qtySend', microName: 'Qty (Send)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'uomSend', microName: 'UoM (Send)', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'status', microName: 'Status', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qtyRequest', microName: 'Total Qty (Request)', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'qtySend', microName: 'Total Qty (send)', value: '', editableTotal: false, microType: 'number', microMath: 'minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4 d-none' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Bill of Material',
    transRouting: 'bill-of-material-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              {key: 'user', microName: 'No. Batch', microType: 'numeric', microText: 'Masukan nomor batch', microClass: ''},
              {key:'journal', microName: 'Nama Produk', microType: 'text', microText: 'Masukan nama produk', microClass: ''},
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              {key: 'date', microName: 'Create Date', microType: 'date', microText: 'Masukan tanggal', microClass: ''},
              {key: 'date', microName: 'Schedule Date', microType: 'date', microText: 'Masukan tanggal', microClass: ''},
              {key:'journal', microName: 'Reference', microType: 'text', microText: 'Masukan referensi', microClass: ''},
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'itemCode', microName: 'Kode Item', microType: 'text', width: 100, microText: 'Masukan Kode', microClass: '', },
              { key: 'itemName', microName: 'Nama Item', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'desc', microName: 'Deskripsi', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'sendDate', microName: 'Send Date', microType: 'date', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qtyRequest', microName: 'Qty (Request)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'uomRequest', microName: 'UoM (Request)', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qtySend', microName: 'Qty (Send)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'uomSend', microName: 'UoM (Send)', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'status', microName: 'Status', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qtyRequest', microName: 'Total Qty (Request)', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'qtySend', microName: 'Total Qty (send)', value: '', editableTotal: false, microType: 'number', microMath: 'minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4 d-none' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  // Production Report
  {
    transTitle: 'Production Report',
    transRouting: 'production-report',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          { key: 'prNumber', microName: 'PR Number', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'noBatch', microName: 'No. Batch', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'createDate', microName: 'Create Date', microType: 'date', width: 0, microText: '', microFormat: 'DD-MM-YYYY', microClass: '' },
          { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', width: 0, microText: '', microFormat: 'DD-MM-YYYY', microClass: '' },
          { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microFormat: '', microClass: '' },
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { key: 'H001', prNumber: 'WO0001', noBatch: 'BTC001', productQty: 10, createDate: '2023-12-01', scheduleDate: '2023-12-01', status: 'completed' }
        ],
        table: [
          { operation: 'Pembuatan Mie Gelas', workCenter: 'Nggak Tahu', namaProduk: 'Mie Gelas', realDuration: 'pcs', qtyResult: 10, status: 'computed' }
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
    ]
  },
  {
    transTitle: 'Production Report',
    transRouting: 'production-report-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', microText: 'Masukan nomor batch', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'createDate', microName: 'Create Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', microText: '', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'operation', microName: 'Operation', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'workCenter', microName: 'Work Center', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'namaProduk', microName: 'Nama Produk', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'qtyResult', microName: 'Qty Result', microType: 'numeric', width: 0, microText: '', microClass: ''},
              { key: 'realDuration', microName: 'Real Dration', microType: 'date', width:100, microText: '', microClass: ''},
              { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microClass: ''},
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Production Report',
    transRouting: 'production-report-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', microText: 'Masukan nomor batch', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'createDate', microName: 'Create Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', microText: '', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'operation', microName: 'Operation', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'workCenter', microName: 'Work Center', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'namaProduk', microName: 'Nama Produk', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'qtyResult', microName: 'Qty Result', microType: 'numeric', width: 0, microText: '', microClass: ''},
              { key: 'realDuration', microName: 'Real Dration', microType: 'date', width:100, microText: '', microClass: ''},
              { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microClass: ''},
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Production Report',
    transRouting: 'production-report-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', microText: 'Masukan nomor batch', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'createDate', microName: 'Create Date', microType: 'date', microText: '', microClass: '', microValue:'' },
              { key: 'scheduleDate', microName: 'Schedule Date', microType: 'date', microText: '', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'operation', microName: 'Operation', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'workCenter', microName: 'Work Center', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'namaProduk', microName: 'Nama Produk', microType: 'text', width: 0, microText: '', microClass: ''},
              { key: 'qtyResult', microName: 'Qty Result', microType: 'numeric', width: 0, microText: '', microClass: ''},
              { key: 'realDuration', microName: 'Real Dration', microType: 'date', width:100, microText: '', microClass: ''},
              { key: 'status', microName: 'Status', microType: 'text', width: 100, microText: '', microClass: ''},
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  // Shipment
  {
    transTitle: 'Shipment',
    transRouting: 'shipment',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          { key: 'shipNumber', microName: 'Ship Number', microType: 'text', width: 110, microText: '', microFormat: '', microClass: '' },
          { key: 'shipDate', microName: 'Ship Date', microType: 'date', width: 0, microText: '', microFormat: 'DD-MM-YYYY', microClass: '' },
          { key: 'courier', microName: 'Nama Courier', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'customer', microName: 'Customer', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'shipTo', microName: 'Ship To', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'status', microName: 'Status', microType: 'text', width: 0, microText: '', microFormat: '', microClass: '' },
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { key: 'H001', shipNumber: 'SO0001', shipDate: '2023-12-01', courier: 'Mamat', customer: 'Yamaaf', shipTo: '-', status: 'complete' }
        ],
        table: [
          { soNumber: 'SO00001', productCode: 'MIE001', productName: 'Mie Gelas', noBatch: 'BTC0001', tableUoM: 'pcs', qty: 100, tableTotal: 10 }
        ],
        footer: [
          { note: 'Nggak Ada', diskon: 10 }
        ]
      },
    ]
  },
  {
    transTitle: 'Shipment',
    transRouting: 'shipment-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'shipNumber', microName: 'Ship Number', microType: 'text', microText: 'Masukan order number', microClass: '', microValue:'' },
              { key: 'shipDate', microName: 'Ship Date', microType: 'date', microText: 'Masukan tanggal order', microClass: '', microValue:'' },
              { key: 'courier', microName: 'Nama Courier', microType: 'text', microText: 'Masukan Nama Sales', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'customer', microName: 'Customer', microType: 'text', microText: 'Masukan Nama Customer', microClass: '', microValue:'' },
              { key: 'shipTo', microName: 'Ship to', microType: 'text', microText: 'Masukan Ship to', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'soNumber', microName: 'Nomor SO', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: '', microClass: '', },
              { key: 'productCode', microName: 'Kode Produk', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: '', microClass: '', },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'tableUoM', microName: 'UoM', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qty', microName: 'Qty', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
              { key: 'tableTotal', microName: 'Total Pack', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qty', microName: 'Total QTY', value: '', editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'tableTotal', microName: 'Total Pack', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Total Tonase', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Shipment',
    transRouting: 'shipment-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'shipNumber', microName: 'Ship Number', microType: 'text', microText: 'Masukan order number', microClass: '', microValue:'' },
              { key: 'shipDate', microName: 'Ship Date', microType: 'date', microText: 'Masukan tanggal order', microClass: '', microValue:'' },
              { key: 'courier', microName: 'Nama Courier', microType: 'text', microText: 'Masukan Nama Sales', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'customer', microName: 'Customer', microType: 'text', microText: 'Masukan Nama Customer', microClass: '', microValue:'' },
              { key: 'shipTo', microName: 'Ship to', microType: 'text', microText: 'Masukan Ship to', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'soNumber', microName: 'Nomor SO', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: '', microClass: '', },
              { key: 'productCode', microName: 'Kode Produk', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: '', microClass: '', },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'tableUoM', microName: 'UoM', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qty', microName: 'Qty', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
              { key: 'tableTotal', microName: 'Total Pack', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qty', microName: 'Total QTY', value: '', editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'tableTotal', microName: 'Total Pack', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Total Tonase', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Shipment',
    transRouting: 'shipment-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'shipNumber', microName: 'Ship Number', microType: 'text', microText: 'Masukan order number', microClass: '', microValue:'' },
              { key: 'shipDate', microName: 'Ship Date', microType: 'date', microText: 'Masukan tanggal order', microClass: '', microValue:'' },
              { key: 'courier', microName: 'Nama Courier', microType: 'text', microText: 'Masukan Nama Sales', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
              { key: 'customer', microName: 'Customer', microType: 'text', microText: 'Masukan Nama Customer', microClass: '', microValue:'' },
              { key: 'shipTo', microName: 'Ship to', microType: 'text', microText: 'Masukan Ship to', microClass: '', microValue:'' },
            ]
          },
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'soNumber', microName: 'Nomor SO', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: '', microClass: '', },
              { key: 'productCode', microName: 'Kode Produk', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: '', microClass: '', },
              { key: 'productName', microName: 'Nama Produk', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'noBatch', microName: 'No. Batch', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'tableUoM', microName: 'UoM', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'qty', microName: 'Qty', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
              { key: 'tableTotal', microName: 'Total Pack', microType: 'numeric', width: 0, microText: 'Masukan Unit', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qty', microName: 'Total QTY', value: '', editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'tableTotal', microName: 'Total Pack', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Total Tonase', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  // Purchase Request
  {
    transTitle: 'Purchase Request',
    transRouting: 'purchase-request',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          {key: 'prCode',microName: 'Kode PR', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'requester',microName: 'Requester', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'departement',microName: 'Departement', microType: 'text', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
          {key: 'purpose',microName: 'Purpose', microType: 'text', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
          {key: 'dateReq',microName: 'Request Date', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'dateNeed',microName: 'Needed Date', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'status',microName: 'Status', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { prCode: 'PR00001', requester: 'mamat', departement: 'Gudang', purpose: 'Tambah Stock', dateReq: '2023-12-01', dateNeed: '2023-12-01', status: 'Approve' }
        ],
        table: [                
          {itemCode: 'MIE001', itemName: 'Mie Gelas', tableType: 'barang', tableKet: '-', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
          {itemCode: 'MIE001', itemName: 'Mie Gelas', tableType: 'barang', tableKet: '-', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
    ]
  },
  {
    transTitle: 'Purchase Request',
    transRouting: 'purchase-request-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'journal', microName: 'Requester', microType: 'text', microText: 'Masukan peminta', microClass: ''},
            {key: 'date', microName: 'Departement', microType: 'text', microText: 'Masukan departemen', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'code', microName: 'Purpose', microType: 'text', microText: 'Masukan Alasan permintaan', microClass: ''},
            {key:'code', microName: 'Needed Date', microType: 'date', microText: 'Masukan', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'tableDate',microName: 'Kode Barang', microType: 'text', width:0, microText: 'Masukan Kode',microClass: ''},
            {key: 'tableDate',microName: 'Nama Barang', microType: 'text', width:0, microText: 'Masukan Kode',microClass: ''},
            {key: 'tableNama',microName: 'Deskripsi', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'tableNama',microName: 'Barang /Jasa', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'tableDesc',microName: 'Keterangan', microType: 'text', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
            {key: 'tableCredit',microName: 'UoM', microType: 'text', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'tableReff',microName: 'Quantity', microType: 'numeric', width:100, microText: 'Masukan Nama', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Purchase Request',
    transRouting: 'purchase-request-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'requester', microName: 'Requester', microType: 'text', microText: 'Masukan peminta', microClass: ''},
            {key: 'departement', microName: 'Departement', microType: 'text', microText: 'Masukan departemen', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'purpose', microName: 'Purpose', microType: 'text', microText: 'Masukan Alasan permintaan', microClass: ''},
            {key:'dateNeed', microName: 'Needed Date', microType: 'date', microText: 'Masukan', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'itemCode',microName: 'Kode Barang', microType: 'text', width:0, microText: 'Masukan Kode',microClass: ''},
            {key: 'itemName',microName: 'Nama Barang', microType: 'text', width:0, microText: 'Masukan Kode',microClass: ''},
            {key: 'tableDesc',microName: 'Deskripsi', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'tableType',microName: 'Barang /Jasa', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'tableKet',microName: 'Keterangan Tipe', microType: 'text', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
            {key: 'tableCredit',microName: 'UoM', microType: 'text', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'tableReff',microName: 'Quantity', microType: 'numeric', width:100, microText: 'Masukan Nama', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Purchase Request',
    transRouting: 'purchase-request-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'journal', microName: 'Requester', microType: 'text', microText: 'Masukan peminta', microClass: ''},
            {key: 'date', microName: 'Departement', microType: 'text', microText: 'Masukan departemen', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'code', microName: 'Purpose', microType: 'text', microText: 'Masukan Alasan permintaan', microClass: ''},
            {key:'code', microName: 'Needed Date', microType: 'date', microText: 'Masukan', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'itemCode',microName: 'Kode Barang', microType: 'text', width:0, microText: 'Masukan Kode',microClass: ''},
            {key: 'itemName',microName: 'Nama Barang', microType: 'text', width:0, microText: 'Masukan Kode',microClass: ''},
            {key: 'tableDesc',microName: 'Deskripsi', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'tableType',microName: 'Barang /Jasa', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'tableKet',microName: 'Keterangan Tipe', microType: 'text', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
            {key: 'tableCredit',microName: 'UoM', microType: 'text', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'tableReff',microName: 'Quantity', microType: 'numeric', width:100, microText: 'Masukan Nama', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: []
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  // Purchase Order
  {
    transTitle: 'Purchase Order',
    transRouting: 'po',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          {key: 'codePR',microName: 'Kode PR', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'codePO',microName: 'Kode PO', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'dateNeed',microName: 'Needed Date', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'reqUser',microName: 'User Request', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
          {key: 'supplier',microName: 'Supplier', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
          {key: 'unitCost',microName: 'Unit Cost (Rp)', microType: 'numeric', width:110, microText: 'Masukan Spesifikasi', microClass: ''},
          {key: 'status',microName: 'Status', microType: 'text', width:110, microText: 'Masukan Spesifikasi', microClass: ''},
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { codePR:'PR00001', codePO: 'PO00001', dateNeed: '2023-12-01', reqUser: 10, supplier: 'Yamaaf', unitCost: 10000000, creditTerms: '-', status: 'Pending' }
        ],
        table: [                
          {itemCode: 'KDS001', itemName: 'Kardus Mie', uom: 'pack', qty: 10, harga: 1000000, diskon: 10, tableTotal: 9000000},
          {itemCode: 'KDS001', itemName: 'Kardus Mie', uom: 'pack', qty: 10, harga: 1000000, diskon: 10, tableTotal: 9000000}
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
      {
        key: '001',
        header: [
          { codePR:'PR00001', codePO: 'PO00001', dateNeed: '2023-12-01', reqUser: 10, supplier: 'Yamaaf', unitCost: 10000000, status: 'Pending' }
        ],
        table: [                
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
    ]
  },
  {
    transTitle: 'Purchase Order',
    transRouting: 'po-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'codePR', microName: 'Kode PR', microType: 'text', microText: 'Masukan kode purchase request', microClass: ''},
            {key:'datePO', microName: 'Tanggal PO', microType: 'date', microText: 'Masukan kode purchase order', microClass: ''},
            {key:'creditTerms', microName: 'Credit Terms', microType: 'text', microText: 'Masukan kode purchase order', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'shipTo', microName: 'Ship To', microType: 'text', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:150, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'qty',microName: 'Qty.', microType: 'numeric', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
            {key: 'harga',microName: 'Harga', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'diskon',microName: 'Diskon', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'tableTotal',microName: 'Total', microType: 'numeric', width:0, microText: 'Masukan Unit', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'tableTotal', microName: 'Sub Total', value: 0, editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'ppn', microName: 'PPn (%)', value: '', editableTotal: false, microType: 'number', microMath: 'percent-plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Purchase Order',
    transRouting: 'po-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'codePR', microName: 'Kode PR', microType: 'text', microText: 'Masukan kode purchase request', microClass: ''},
            {key:'datePO', microName: 'Tanggal PO', microType: 'date', microText: 'Masukan kode purchase order', microClass: ''},
            {key:'creditTerms', microName: 'Credit Terms', microType: 'text', microText: 'Masukan kode purchase order', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'shipTo', microName: 'Ship To', microType: 'text', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:150, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'qty',microName: 'Qty.', microType: 'numeric', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
            {key: 'harga',microName: 'Harga', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'diskon',microName: 'Diskon', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'tableTotal',microName: 'Total', microType: 'numeric', width:0, microText: 'Masukan Unit', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'tableTotal', microName: 'Sub Total', value: 0, editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'ppn', microName: 'PPn (%)', value: '', editableTotal: false, microType: 'number', microMath: 'percent-plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Purchase Order',
    transRouting: 'po-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'codePR', microName: 'Kode PR', microType: 'text', microText: 'Masukan kode purchase request', microClass: ''},
            {key:'datePO', microName: 'Tanggal PO', microType: 'date', microText: 'Masukan kode purchase order', microClass: ''},
            {key:'creditTerms', microName: 'Credit Terms', microType: 'text', microText: 'Masukan kode purchase order', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'shipTo', microName: 'Ship To', microType: 'text', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:150, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'qty',microName: 'Qty.', microType: 'numeric', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
            {key: 'harga',microName: 'Harga', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'diskon',microName: 'Diskon', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'tableTotal',microName: 'Total', microType: 'numeric', width:0, microText: 'Masukan Unit', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'tableTotal', microName: 'Sub Total', value: 0, editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'ppn', microName: 'PPn (%)', value: '', editableTotal: false, microType: 'number', microMath: 'percent-plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  // Purchase Order Receipt
  {
    transTitle: 'Purchase Order Receipt',
    transRouting: 'po-receipt',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          {key: 'supplier',microName: 'Supplier', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
          {key: 'noPOR',microName: 'No. PO Receipt', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'noSJ',microName: 'No. Surat Jalan', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'noKen',microName: 'No. Kendaraan', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
          {key: 'tglReceipt',microName: 'Tgl. Receipt', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'status',microName: 'Status', microType: 'text', width:110, microText: 'Masukan Spesifikasi', microClass: ''},
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { noPOR: 'POR0001', noSJ: 'SJ00001', noKen: 'KEN0001', tglReceipt: '2023-12-01', supplier: 'Yamaaf', status: 'Pending' }
        ],
        table: [                
          {poCode: 'PO0001', itemCode: 'KDS001', itemName: 'Kardus Mie', noBatch: 'BCH0001', uom: 'pack', qtyRequest: 10, qtyReceive: 10},
          {poCode: 'PO0001', itemCode: 'KDS001', itemName: 'Kardus Mie', noBatch: 'BCH0001', uom: 'pack', qtyRequest: 10, qtyReceive: 10}
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
      {
        key: '001',
        header: [
          { codePR:'PR00001', codePO: 'PO00001', dateNeed: '2023-12-01', reqUser: 10, supplier: 'Yamaaf', unitCost: 10000000, status: 'Pending' }
        ],
        table: [                
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
    ]
  },
  {
    transTitle: 'Purchase Order Receipt',
    transRouting: 'po-receipt-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'noPOR', microName: 'No. PO Receipt', microType: 'text', microText: 'Masukan nomor purchase order receipt', microClass: ''},
            {key:'noSJ', microName: 'No. Surat Jalan', microType: 'text', microText: 'Masukan nomor surat jalan', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'noKen', microName: 'No. Kendaraan', microType: 'text', microText: 'Masukan nomor kendaraan', microClass: ''},
            {key:'tglReceipt', microName: 'Tgl. Receipt', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'poCode',microName: 'Kode PO', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'noBatch',microName: 'No. Batch', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'qtyRequest',microName: 'Qty. Request', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'qtyReceive',microName: 'Qty. Receive', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qtyRequest', microName: 'Total Qty Request', value: 0, editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'qtyReceive', microName: 'Total Qty Receive', value: 0, editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4 d-none' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Purchase Order Receipt',
    transRouting: 'po-receipt-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'noPOR', microName: 'No. PO Receipt', microType: 'text', microText: 'Masukan nomor purchase order receipt', microClass: ''},
            {key:'noSJ', microName: 'No. Surat Jalan', microType: 'text', microText: 'Masukan nomor surat jalan', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'noKen', microName: 'No. Kendaraan', microType: 'text', microText: 'Masukan nomor kendaraan', microClass: ''},
            {key:'tglReceipt', microName: 'Tgl. Receipt', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'poCode',microName: 'Kode PO', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'noBatch',microName: 'No. Batch', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'qtyRequest',microName: 'Qty. Request', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'qtyReceive',microName: 'Qty. Receive', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qtyRequest', microName: 'Total Qty Request', value: 0, editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'qtyReceive', microName: 'Total Qty Receive', value: 0, editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4 d-none' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  {
    transTitle: 'Purchase Order Receipt',
    transRouting: 'po-receipt-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'noPOR', microName: 'No. PO Receipt', microType: 'text', microText: 'Masukan nomor purchase order receipt', microClass: ''},
            {key:'noSJ', microName: 'No. Surat Jalan', microType: 'text', microText: 'Masukan nomor surat jalan', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'noKen', microName: 'No. Kendaraan', microType: 'text', microText: 'Masukan nomor kendaraan', microClass: ''},
            {key:'tglReceipt', microName: 'Tgl. Receipt', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'poCode',microName: 'Kode PO', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'noBatch',microName: 'No. Batch', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'qtyRequest',microName: 'Qty. Request', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'qtyReceive',microName: 'Qty. Receive', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'qtyRequest', microName: 'Total Qty Request', value: 0, editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'qtyReceive', microName: 'Total Qty Receive', value: 0, editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4 d-none' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ]
  },
  // Purchase Invoice
  {
    transTitle: 'Purchase Invoice',
    transRouting: 'po-invoice',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          {key: 'supplier',microName: 'Supplier', microType: 'text', width:0, microText: 'Masukan supplier', microClass: ''},
          {key: 'codePI',microName: 'Kode PI', microType: 'text', width:110, microText: 'Masukan kode purchase invoice', microClass: ''},
          {key: 'creditTerms',microName: 'Credit Terms', microType: 'text', width:110, microText: 'Masukan credit terms', microClass: ''},
          {key: 'invoiceDate',microName: 'Invoice Date', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'dueDate',microName: 'Due Date', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'refNumber',microName: 'Reference Number', microType: 'text', width:0, microText: 'Masukan reference number', microClass: ''},
          {key: 'status',microName: 'Status', microType: 'text', width:110, microText: 'Masukan Spesifikasi', microClass: ''},
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { codePI: 'PI00001', creditTerms: '-', noKen: 'KEN0001', invoiceDate: '2023-12-01', dueDate: '2023-12-01', reffNumber: '-', supplier: 'Yamaaf', status: 'Pending' }
        ],
        table: [                
          {grCode: 'PO0001', itemCode: 'KDS001', itemName: 'Kardus Mie', uom: 'pack', qty: 10, price: 100000, discount: 10, amount: 900000},
          {grCode: 'PO0001', itemCode: 'KDS001', itemName: 'Kardus Mie', uom: 'pack', qty: 10, price: 100000, discount: 0, amount: 1000000}
        ],
        footer: [
          { note: 'Nggak Ada', additionalDiscount: 100000}
        ]
      },
      {
        key: '001',
        header: [
          { codePR:'PR00001', codePO: 'PO00001', dateNeed: '2023-12-01', reqUser: 10, supplier: 'Yamaaf', unitCost: 10000000, status: 'Pending' }
        ],
        table: [                
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
    ]
  },
  {
    transTitle: 'Purchase Invoice',
    transRouting: 'po-invoice-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'codePI', microName: 'Kode purchase invoice', microType: 'text', microText: 'Masukan purchase invoice', microClass: ''},
            {key:'creditTerms', microName: 'Credit Terms', microType: 'text', microText: 'Masukan credit terms', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'invoiceDate', microName: 'Invoice Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
            {key:'dueDate', microName: 'Due Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
            {key:'reffNumber', microName: 'Refference Number', microType: 'text', microText: 'Masukan refference number', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'grCode',microName: 'Kode GR', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'qty',microName: 'Qty.', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'price',microName: 'Price', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'discount',microName: 'Discount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'amount',microName: 'Amount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Sub Total', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'additionalDiscount', microName: 'Diskon (Rp)', value: '', editableTotal: true, microType: 'number', microMath: 'extra-minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Purchase Invoice',
    transRouting: 'po-invoice-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'codePI', microName: 'Kode purchase invoice', microType: 'text', microText: 'Masukan purchase invoice', microClass: ''},
            {key:'creditTerms', microName: 'Credit Terms', microType: 'text', microText: 'Masukan credit terms', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'invoiceDate', microName: 'Invoice Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
            {key:'dueDate', microName: 'Due Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
            {key:'reffNumber', microName: 'Refference Number', microType: 'text', microText: 'Masukan refference number', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'grCode',microName: 'Kode GR', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'qty',microName: 'Qty.', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'price',microName: 'Price', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'discount',microName: 'Discount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'amount',microName: 'Amount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Sub Total', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'additionalDiscount', microName: 'Diskon (Rp)', value: 1000, editableTotal: true, microType: 'number', microMath: 'extra-minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Purchase Invoice',
    transRouting: 'po-invoice-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'codePI', microName: 'Kode purchase invoice', microType: 'text', microText: 'Masukan purchase invoice', microClass: ''},
            {key:'creditTerms', microName: 'Credit Terms', microType: 'text', microText: 'Masukan credit terms', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'invoiceDate', microName: 'Invoice Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
            {key:'dueDate', microName: 'Due Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
            {key:'reffNumber', microName: 'Refference Number', microType: 'text', microText: 'Masukan refference number', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key: 'grCode',microName: 'Kode GR', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemCode',microName: 'Kode Item', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'itemName',microName: 'Nama Item', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'uom',microName: 'UoM', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'qty',microName: 'Qty.', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'price',microName: 'Price', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'discount',microName: 'Discount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'amount',microName: 'Amount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Sub Total', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'additionalDiscount', microName: 'Diskon (Rp)', value: 1000, editableTotal: true, microType: 'number', microMath: 'extra-minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  // Purchase Payment
  {
    transTitle: 'Purchase Payment',
    transRouting: 'po-payment',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          {key: 'supplier',microName: 'Supplier', microType: 'text', width:0, microText: 'Masukan supplier', microClass: ''},
          {key: 'codePP',microName: 'Kode PP', microType: 'text', width:110, microText: 'Masukan kode purchase invoice', microClass: ''},
          {key: 'createDate',microName: 'Create Date', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'refNumber',microName: 'Reff. Number', microType: 'text', width:0, microText: 'Masukan reference number', microClass: ''},
          {key: 'payMethod',microName: 'Payment Method', microType: 'text', width:125, microText: 'Masukan Spesifikasi', microClass: ''},
          {key: 'noCheck',microName: 'No. Check', microType: 'text', width:110, microText: 'Masukan Spesifikasi', microClass: ''},
          {key: 'status',microName: 'Status', microType: 'text', width:110, microText: 'Masukan Spesifikasi', microClass: ''},
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { codePP: 'PP00001', payMethod: 'BRI - Pusat', noCheck: 'CHK0001', createDate: '2023-12-01', reffNumber: '-', supplier: 'Yamaaf', status: 'Pending' }
        ],
        table: [                  
          {invoiceDate: '2023-12-01', invoiceCode: 'PO0001', desc: 'KDS001', price: 100000, payment: true, amount: 500000},
          {invoiceDate: '2023-12-01', invoiceCode: 'PO0002', desc: 'KDS001', price: 100000, payment: false, amount: 0},
          {invoiceDate: '2023-12-01', invoiceCode: 'PO0003', desc: 'KDS001', price: 100000, payment: true, amount: 1000000}
        ],
        footer: [
          { note: 'Nggak Ada', additionalDiscount: 100000}
        ]
      },
      {
        key: '001',
        header: [
          { codePR:'PR00001', codePO: 'PO00001', dateNeed: '2023-12-01', reqUser: 10, supplier: 'Yamaaf', unitCost: 10000000, status: 'Pending' }
        ],
        table: [                
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 30000, tableDebit: 10000},
          {tableDate: '09/01/2023', tableName: 'azam', tableDesc: 'bacot', tableReff: 'ABC123', tableCredit: 20000, tableDebit: 10000}
        ],
        footer: [
          { note: 'Nggak Ada'}
        ]
      },
    ]
  },
  {
    transTitle: 'Purchase Payment',
    transRouting: 'po-payment-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'codePP', microName: 'Kode Purchase Payment', microType: 'text', microText: 'Masukan purchase payment', microClass: ''},
            {key:'createDate', microName: 'Create Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'reffNumber', microName: 'Refference Number', microType: 'text', microText: 'Masukan refference number', microClass: ''},
            {key:'payMethod', microName: 'Payment Method', microType: 'text', microText: 'Masukan payment method', microClass: ''},
            {key:'noCheck', microName: 'No. Check/BG', microType: 'text', microText: 'Masukan nomor check', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key:'invoiceDate', microName: 'Tgl. Invoice', microType: 'date', width:100, microText: '', microFormat: 'DD-MM-YYYY', microClass: ''},
            {key: 'invoiceCode',microName: 'Kode Invoice', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'desc',microName: 'Deskripsi', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'price',microName: 'Price', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'payment',microName: 'Payment', microType: 'checkbox', width:75, microText: 'Masukan Nama', microClass: 'd-flex justify-content-center align-items-center'},
            {key: 'amount',microName: 'Amount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Sub Total', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'additionalDiscount', microName: 'Diskon (Rp)', value: '', editableTotal: true, microType: 'number', microMath: 'extra-minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Purchase Payment',
    transRouting: 'po-payment-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'codePP', microName: 'Kode Purchase Payment', microType: 'text', microText: 'Masukan purchase payment', microClass: ''},
            {key:'createDate', microName: 'Create Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'reffNumber', microName: 'Refference Number', microType: 'text', microText: 'Masukan refference number', microClass: ''},
            {key:'payMethod', microName: 'Payment Method', microType: 'text', microText: 'Masukan payment method', microClass: ''},
            {key:'noCheck', microName: 'No. Check/BG', microType: 'text', microText: 'Masukan nomor check', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key:'invoiceDate', microName: 'Tgl. Invoice', microType: 'date', width:100, microText: '', microFormat: 'DD-MM-YYYY', microClass: ''},
            {key: 'invoiceCode',microName: 'Kode Invoice', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'desc',microName: 'Deskripsi', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'price',microName: 'Price', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'payment',microName: 'Payment', microType: 'checkbox', width:75, microText: 'Masukan Nama', microClass: 'd-flex justify-content-center align-items-center'},
            {key: 'amount',microName: 'Amount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Sub Total', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'additionalDiscount', microName: 'Diskon (Rp)', value: '', editableTotal: true, microType: 'number', microMath: 'extra-minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Purchase Payment',
    transRouting: 'po-payment-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'supplier', microName: 'Supplier', microType: 'text', microText: 'Masukan supplier', microClass: ''},
            {key:'codePP', microName: 'Kode Purchase Payment', microType: 'text', microText: 'Masukan purchase payment', microClass: ''},
            {key:'createDate', microName: 'Create Date', microType: 'date', microText: 'Masukan tujuan pengiriman', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'reffNumber', microName: 'Refference Number', microType: 'text', microText: 'Masukan refference number', microClass: ''},
            {key:'payMethod', microName: 'Payment Method', microType: 'text', microText: 'Masukan payment method', microClass: ''},
            {key:'noCheck', microName: 'No. Check/BG', microType: 'text', microText: 'Masukan nomor check', microClass: ''},
          ]},
          {componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
            {key:'invoiceDate', microName: 'Tgl. Invoice', microType: 'date', width:100, microText: '', microFormat: 'DD-MM-YYYY', microClass: ''},
            {key: 'invoiceCode',microName: 'Kode Invoice', microType: 'text', width:100, microText: 'Masukan Nama', microClass: ''},
            {key: 'desc',microName: 'Deskripsi', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
            {key: 'price',microName: 'Price', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
            {key: 'payment',microName: 'Payment', microType: 'checkbox', width:75, microText: 'Masukan Nama', microClass: 'd-flex justify-content-center align-items-center'},
            {key: 'amount',microName: 'Amount', microType: 'numeric', width:0, microText: 'Masukan Quantity', microClass: ''},
          ]},
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Sub Total', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'additionalDiscount', microName: 'Diskon (Rp)', value: '', editableTotal: true, microType: 'number', microMath: 'extra-minus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Grand Total', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  // Kasbank
  {
    transTitle: 'Kas & Bank',
    transRouting: 'kasbank',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          {key: 'code',microName: 'Kode Kasbank', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'type',microName: 'Tipe', microType: 'text', width:50, microText: 'Masukan Nama', microClass: ''},
          {key: 'jenis',microName: 'Jenis', microType: 'text', width:50, microText: 'Masukan Nama', microClass: ''},
          {key: 'name',microName: 'Nama Kasbank', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
          {key: 'date',microName: 'Tgl. Transaksi', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'voucher',microName: 'Kode Voucher', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'saldo',microName: 'Saldo', microType: 'numeric', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
          {key: 'status',microName: 'Status', microType: 'text', width:100, microText: 'Masukan Spesifikasi', microClass: ''},
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { key: 'H001', type:'in', jenis: 'cash', code: 'KB000001', date: '2023-12-01', name: 'BRI - Pusat', voucher: 'qwerty123', saldo: 10000000, status: 'aktif' }
        ],
        table: [
          { kodeCOA: 'COA0001', namaCOA: 'COA pertama', costCenter: '-', uraian: 'tidak ada', amount: 1000000 }
        ],
        footer: [
          { note: 'Nggak Ada' }
        ]
      },
    ]
  },
  {
    transTitle: 'Kas & Bank',
    transRouting: 'kasbank-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'type', microName: 'Tipe', microType: 'text', microText: 'In/out', microClass: ' col-6'},
            {key:'jenis', microName: 'Jenis', microType: 'text', microText: 'Jenis Kasbank', microClass: ' col-6'},
            {key:'code', microName: 'Kode Kasbank', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key:'name', microName: 'Nama Kasbank', microType: 'text', microText: 'Masukan Nama Kasbank', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'voucher', microName: 'Kode Voucher', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key: 'date', microName: 'Tanggal Dibuat', microType: 'date', microText: 'Masukan tanggal order', microClass: ''},
            {key:'saldo', microName: 'Nilai', microType: 'number', microText: 'Masukan Saldo Awal', microClass: ''},
          ]},
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'kodeCOA', microName: 'Kode COA', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'namaCOA', microName: 'Nama COA', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'costCenter', microName: 'Cost Center', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'uraian', microName: 'Uraian', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'amount', microName: 'Amount', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Total Amount', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Saldo Akhir', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Kas & Bank',
    transRouting: 'kasbank-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'type', microName: 'Tipe', microType: 'text', microText: 'In/out', microClass: ' col-6'},
            {key:'jenis', microName: 'Jenis', microType: 'text', microText: 'Jenis Kasbank', microClass: ' col-6'},
            {key:'code', microName: 'Kode Kasbank', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key:'name', microName: 'Nama Kasbank', microType: 'text', microText: 'Masukan Nama Kasbank', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'voucher', microName: 'Kode Voucher', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key: 'date', microName: 'Tanggal Dibuat', microType: 'date', microText: 'Masukan tanggal order', microClass: ''},
            {key:'saldo', microName: 'Saldo Awal', microType: 'number', microText: 'Masukan Saldo Awal', microClass: ''},
          ]},
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'kodeCOA', microName: 'Kode COA', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'namaCOA', microName: 'Nama COA', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'costCenter', microName: 'Cost Center', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'uraian', microName: 'Uraian', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'amount', microName: 'Amount', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Total Amount', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Saldo Akhir', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Kas & Bank',
    transRouting: 'kasbank-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'type', microName: 'Tipe', microType: 'text', microText: 'In/out', microClass: ' col-6'},
            {key:'jenis', microName: 'Jenis', microType: 'text', microText: 'Jenis Kasbank', microClass: ' col-6'},
            {key:'code', microName: 'Kode Kasbank', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key:'name', microName: 'Nama Kasbank', microType: 'text', microText: 'Masukan Nama Kasbank', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'voucher', microName: 'Kode Voucher', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key: 'date', microName: 'Tanggal Dibuat', microType: 'date', microText: 'Masukan tanggal order', microClass: ''},
            {key:'saldo', microName: 'Saldo Awal', microType: 'number', microText: 'Masukan Saldo Awal', microClass: ''},
          ]},
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'kodeCOA', microName: 'Kode COA', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'namaCOA', microName: 'Nama COA', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'costCenter', microName: 'Cost Center', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'uraian', microName: 'Uraian', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'amount', microName: 'Amount', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Total Amount', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Saldo Akhir', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  // Kasbank V2
  {
    transTitle: 'Kas & Bank V2',
    transRouting: 'kasbank-v2',
    transProperties: [
      {
        dataName: 'menuList', dataMicro: [
          {key: 'code',microName: 'Kode Kasbank', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'jenis',microName: 'Jenis', microType: 'text', width:50, microText: 'Masukan Nama', microClass: ''},
          {key: 'name',microName: 'Nama Kasbank', microType: 'text', width:0, microText: 'Masukan Nama', microClass: ''},
          {key: 'date',microName: 'Tgl. Transaksi', microType: 'date', width:0, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: ''},
          {key: 'voucher',microName: 'Kode Voucher', microType: 'text', width:110, microText: 'Masukan Nama', microClass: ''},
          {key: 'saldo',microName: 'Saldo', microType: 'numeric', width:0, microText: 'Masukan Spesifikasi', microClass: ''},
          {key: 'status',microName: 'Status', microType: 'text', width:100, microText: 'Masukan Spesifikasi', microClass: ''},
          { key: 'opsi', microName: '', microType: 'dropdown', width: 0, microText: '', microFormat: '', microClass: '' },
        ]
      },
      {
        dataName: 'routingButton', dataTitle: 'button', dataClass: 'col-md-12', dataMicro: [
          { key: 'add', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
        ]
      }
    ],
    transData: [
      {
        key: '001',
        header: [
          { key: 'H001', jenis: 'cash', code: 'KB000001', date: '2023-12-01', name: 'BRI - Pusat', voucher: 'qwerty123', saldo: 10000000, status: 'aktif' }
        ],
        table: [
          { kodeCOA: 'COA0001', namaCOA: 'COA pertama', costCenter: '-', jenis: 'in', uraian: 'tidak ada', amount: 1000000 },
          { kodeCOA: 'COA0001', namaCOA: 'COA kedua', costCenter: '-', jenis: 'out', uraian: 'tidak ada', amount: 100000 }
        ],
        footer: [
          { note: 'Nggak Ada' }
        ]
      },
    ]
  },
  {
    transTitle: 'Kas & Bank V2',
    transRouting: 'kasbank-v2-add',
    transProperties: [
      {
        dataName: 'menuAdd', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'jenis', microName: 'Jenis', microType: 'text', microText: 'Jenis Kasbank', microClass: ''},
            {key:'code', microName: 'Kode Kasbank', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key:'name', microName: 'Nama Kasbank', microType: 'text', microText: 'Masukan Nama Kasbank', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'voucher', microName: 'Kode Voucher', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key: 'date', microName: 'Tanggal Dibuat', microType: 'date', microText: 'Masukan tanggal order', microClass: ''},
            {key:'saldo', microName: 'Saldo Awal', microType: 'number', microText: 'Masukan Saldo Awal', microClass: ''},
          ]},
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'kodeCOA', microName: 'Kode', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'namaCOA', microName: 'Nama', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'costCenter', microName: 'Cost Center', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'uraian', microName: 'Uraian', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'in', microName: 'In (Masuk)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'out', microName: 'Out (Keluar)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'amount', microName: 'Amount', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'in', microName: 'Total Masuk (In)', value: '', editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'out', microName: 'Total Keluar (Out)', value: '', editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'amount', microName: 'Total Amount', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Saldo Akhir', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Kas & Bank V2',
    transRouting: 'kasbank-v2-detail',
    transProperties: [
      {
        dataName: 'menuDetail', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'jenis', microName: 'Jenis', microType: 'text', microText: 'Jenis Kasbank', microClass: ''},
            {key:'code', microName: 'Kode Kasbank', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key:'name', microName: 'Nama Kasbank', microType: 'text', microText: 'Masukan Nama Kasbank', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'voucher', microName: 'Kode Voucher', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key: 'date', microName: 'Tanggal Dibuat', microType: 'date', microText: 'Masukan tanggal order', microClass: ''},
            {key:'saldo', microName: 'Saldo Awal', microType: 'number', microText: 'Masukan Saldo Awal', microClass: ''},
          ]},
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'kodeCOA', microName: 'Kode', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'namaCOA', microName: 'Nama', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'costCenter', microName: 'Cost Center', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'uraian', microName: 'Uraian', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'in', microName: 'In (Masuk)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'out', microName: 'Out (Keluar)', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'amount', microName: 'Amount', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'in', microName: 'Total Masuk (In)', value: '', editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'out', microName: 'Total Keluar (Out)', value: '', editableTotal: false, microType: 'number', microMath: '', microClass: 'col-md-4' },
              { key: 'amount', microName: 'Total Amount', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Saldo Akhir', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
  {
    transTitle: 'Kas & Bank V2',
    transRouting: 'kasbank-v2-edit',
    transProperties: [
      {
        dataName: 'menuEdit', dataMicro: [
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'jenis', microName: 'Jenis', microType: 'text', microText: 'Jenis Kasbank', microClass: ''},
            {key:'code', microName: 'Kode Kasbank', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key:'name', microName: 'Nama Kasbank', microType: 'text', microText: 'Masukan Nama Kasbank', microClass: ''},
          ]},
          {componentName: 'fieldHeader', componentTitle: '', componentClass: 'col-md-6', componentMicro: [
            {key:'voucher', microName: 'Kode Voucher', microType: 'text', microText: 'Masukan kode kasbank', microClass: ''},
            {key: 'date', microName: 'Tanggal Dibuat', microType: 'date', microText: 'Masukan tanggal order', microClass: ''},
            {key:'saldo', microName: 'Saldo Awal', microType: 'number', microText: 'Masukan Saldo Awal', microClass: ''},
          ]},
          {
            componentName: 'fieldTable', componentTitle: '', componentClass: 'col-md-12', componentMicro: [
              { key: 'kodeCOA', microName: 'Kode', microType: 'text', width: 100, microText: 'Masukan Kode', microFormat: 'DD-MM-YYYY', microClass: '', },
              { key: 'namaCOA', microName: 'Nama', microType: 'text', width: 0, microText: 'Masukan Nama', microClass: '', },
              { key: 'costCenter', microName: 'Cost Center', microType: 'text', width: 0, microText: 'Masukan Spesifikasi', microClass: '', },
              { key: 'uraian', microName: 'Uraian', microType: 'text', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'jenis', microName: 'Jenis', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
              { key: 'amount', microName: 'Amount', microType: 'numeric', width: 0, microText: 'Masukan Quantity', microClass: '', },
            ]
          },
          {
            componentName: 'fieldNote', componentTitle: 'Catatan', componentClass: 'col-md-12', componentMicro: [
              { key: 'note', microName: 'Note', microType: 'textarea', microText: 'Masukan Catatan Tambahan', microClass: '', microValue:'' }
            ]
          },
          {
            componentName: 'fieldTotal', componentTitle: 'Total', componentClass: 'col-md-12', componentMicro: [
              { key: 'amount', microName: 'Total Amount', value: '', editableTotal: false, microType: 'number', microMath: 'plus', microClass: 'col-md-4' },
              { key: 'total', microName: 'Saldo Akhir', editableTotal: false, value: '', microType: 'number', microClass: 'col-md-4' }
            ]
          },
          {
            componentName: 'routingButton', componentTitle: 'button', componentClass: 'col-md-12', componentMicro: [
              { key: 'back', microName: 'Kembali', microRouting: 'back', microText: 'Kembali', microClass: 'btn-light' },
              { key: 'submit', microName: 'Tambah', microRouting: 'add', microText: 'Tambah', microClass: 'btn-primary' }
            ]
          },
        ]
      }
    ],
  },
]

export default report