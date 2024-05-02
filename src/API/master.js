const master = [
    {
        masterName: 'kasbank',
        masterRouting: 'kasbank',
        masterData: [
            {kasbankCode: 'KB0001', kasbankJenis: 'Cash', kasbankName: 'Kantor Pusat', kasbankCreatedDate: '2023-12-01', kasbankAmount: 100000, kasbankDeleted: 'no', kasbankStatus: 'aktif'},
            {kasbankCode: 'KB0002', kasbankJenis: 'Bank', kasbankName: 'BCA - Pusat', kasbankCreatedDate: '2023-12-01', kasbankAmount: 100000, kasbankDeleted: 'no', kasbankStatus: 'aktif'},
            {kasbankCode: 'KB0003', kasbankJenis: 'Bank', kasbankName: 'BRI - Pusat', kasbankCreatedDate: '2023-12-01', kasbankAmount: 100000, kasbankDeleted: 'no', kasbankStatus: 'aktif'},
            {kasbankCode: 'KB0004', kasbankJenis: 'Bank', kasbankName: 'Mandiri - Pusat', kasbankCreatedDate: '2023-12-01', kasbankAmount: 100000, kasbankDeleted: 'no', kasbankStatus: 'aktif'},
        ]
    },
    {
        masterName: 'data-customer',
        masterRouting: 'data-customer',
        masterData: [
            {customerCode: 'DC0001',customerName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', customerAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', customerTelp: '081235556324', customerContact: 'azam', },
            {customerCode: 'DC0002',customerName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', customerAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', customerTelp: '081235556324', customerContact: 'azam', },
            {customerCode: 'DC0003',customerName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', customerAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', customerTelp: '081235556324', customerContact: 'azam', },
            {customerCode: 'DC0001',customerName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', customerAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', customerTelp: '081235556324', customerContact: 'azam', },
            {customerCode: 'DC0002',customerName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', customerAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', customerTelp: '081235556324', customerContact: 'azam', },
            {customerCode: 'DC0003',customerName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', customerAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', customerTelp: '081235556324', customerContact: 'azam', }
        ]
    },
    {
        masterName: 'Supplier',
        masterRouting: 'supplier',
        masterData: [
            {supplierCode: 'SP0001',supplierName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', supplierAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', supplierTelp: '081235556324', supplierContact: 'azam', },
            {supplierCode: 'SP0002',supplierName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', supplierAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', supplierTelp: '081235556324', supplierContact: 'azam', },
            {supplierCode: 'SP0003',supplierName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', supplierAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', supplierTelp: '081235556324', supplierContact: 'azam', },
            {supplierCode: 'SP0004',supplierName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', supplierAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', supplierTelp: '081235556324', supplierContact: 'azam', },
            {supplierCode: 'SP0005',supplierName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', supplierAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', supplierTelp: '081235556324', supplierContact: 'azam', },
            {supplierCode: 'SP0006',supplierName: 'PT. Yamaaf', noNPWP: '08.178.554.2-123.321', supplierAddress: 'mojokerto, mojosari, jawa timur, indonesia, bumi', supplierTelp: '081235556324', supplierContact: 'azam', }
        ]
    },
    {
        masterName: 'Item',
        masterRouting: 'item',
        masterData: [
            {itemCode: 'IM0001', coa: 'COA001', itemName: 'Mie Ayam', itemCategory: 'Persediaan', itemLocation: 'Gudang Pusat', lotNumber: 'LOT0001', batchNumber: 'BCH0001', satuan: 'pcs', convert: 'pcs'},
            {itemCode: 'IM0002', coa: 'COA001', itemName: 'Mie Ayam', itemCategory: 'Persediaan', itemLocation: 'Gudang Pusat', lotNumber: 'LOT0001', batchNumber: 'BCH0001', satuan: 'Kg', convert: 'g'},
            {itemCode: 'IM0003', coa: 'COA001', itemName: 'Mie Ayam', itemCategory: 'Persediaan', itemLocation: 'Gudang Pusat', lotNumber: 'LOT0001', batchNumber: 'BCH0001', satuan: 'L', convert: 'L'},
            {itemCode: 'IM0004', coa: 'COA001', itemName: 'Mie Ayam', itemCategory: 'Non-Persediaan', itemLocation: 'Gudang Pusat', lotNumber: 'LOT0001', batchNumber: 'BCH0001', satuan: 'pcs', convert: 'pcs'},
            {itemCode: 'IM0005', coa: 'COA001', itemName: 'Mie Ayam', itemCategory: 'Persediaan', itemLocation: 'Gudang Pusat', lotNumber: 'LOT0001', batchNumber: 'BCH0001', satuan: 'pcs', convert: 'pcs'},
            {itemCode: 'IM0006', coa: 'COA001', itemName: 'Mie Ayam', itemCategory: 'Persediaan', itemLocation: 'Gudang Pusat', lotNumber: 'LOT0001', batchNumber: 'BCH0001', satuan: 'pcs', convert: 'pcs'}
        ]
    }
]

export default master