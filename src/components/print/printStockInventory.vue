<template>
    <div class="report" style="font-size: 10px">
        <div v-if="data.length > 0">
            <template v-for="entry in testIn">
                <table class="table table-bordered mb-1">
                    <thead>
                        <tr class="bg-secondary">
                            <th colspan="2" scope="col" class="text-white" style="font-size: 10px;"><b>Kode Item : </b> {{ entry.itemCode }}</th>
                            <th colspan="5" scope="col" class="text-white" style="font-size: 10px;"><b>Nama Item : </b> {{ entry.itemName }}</th>
                            <th colspan="1" scope="col" class="text-white" style="font-size: 10px;"><b>Stok Awal : </b></th>
                            <th scope="col" class="text-white" width="130" style="font-size: 10px;"><b>{{entry.itemInvStock.invBegining }}</b></th>
                        </tr>
                        <tr>
                            <th scope="col" class="text-center" width="110" style="font-size: 10px;"><b>No. Histori</b></th>
                            <th scope="col" class="text-center" width="130" style="font-size: 10px;"><b>Lokasi</b></th>
                            <th scope="col" class="text-center" width="80" style="font-size: 10px;"><b>tgl. Trans</b></th>
                            <th scope="col" class="text-center" width="80" style="font-size: 10px;"><b>Reff</b></th>
                            <th scope="col" class="text-center" width="90" style="font-size: 10px;"><b>Batch</b></th>
                            <th scope="col" class="text-center" style="font-size: 10px;"><b>Uraian</b></th>
                            <th scope="col" class="text-center" width="100" style="font-size: 10px;"><b>Masuk</b></th>
                            <th scope="col" class="text-center" width="100" style="font-size: 10px;"><b>Keluar</b></th>
                            <th scope="col" class="text-center" width="100" style="font-size: 10px;"><b>Total</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="entry.itemInvStock.invIn.length > 0">
                        <tr v-for="trans in entry.itemInvStock.invIn">
                            <td class="text-center">{{ trans.transHysNo }}</td>
                            <td> <template v-if="trans.itemLocation">{{ trans.itemLocation.name }}</template></td>
                            <td class="text-center">{{ trans.transHysEffDate }}</td>
                            <td class="text-center">{{ trans.transHysReff }}</td>
                            <td class="text-center">{{ trans.itemNoBatch }}</td>
                            <td>{{ trans.transHysNotes }}</td>
                            <td>{{ trans.itemHysQtyRcp }}</td>
                            <td>-</td>
                            <td>{{ trans.itemHysQtyRcp }}</td>
                        </tr>
                        </template>                 
                        <template v-if="entry.itemInvStock.invOut.length > 0">
                            <tr v-for="trans in entry.itemInvStock.invOut">
                            <td class="text-center">{{ trans.transHysNo }}</td>
                            <td> <template v-if="trans.itemLocation">{{ trans.itemLocation.name }}</template></td>
                            <td class="text-center">{{ trans.transHysEffDate }}</td>
                            <td class="text-center">{{ trans.transHysReff }}</td>
                            <td class="text-center">{{ trans.itemNoBatch }}</td>
                            <td>{{ trans.transHysNotes }}</td>
                            <td>-</td>
                            <td>{{ trans.itemHysQtyRcp }}</td>
                            <td>{{ trans.itemHysQtyRcp }}</td>
                            </tr>
                        </template>
                        <template v-if="entry.itemInvStock.invOut.length === 0 && entry.itemInvStock.invIn.length === 0">
                        <tr>
                            <td colspan="8">-</td>
                        </tr>
                        </template>       
                        <tr>
                            <td colspan="7"></td>
                            <td colspan="1"><b>STOK AKHIR :</b></td>
                            <td><b>{{entry.itemInvStock.invEnd }}</b></td>
                        </tr>
                    </tbody>
                    <!-- <tbody v-if="data.length > 0">
                <tr v-for="entry in data">
                    <td>{{ entry.itemCode }}</td>
                    <td>{{ entry.itemName }}</td>
                    <td><span v-for="group in entry.itemGroup">{{ group }},</span></td>
                    <td>{{ entry.itemInvStock.invBegining }}</td>
                    <td>{{ entry.itemInvStock.invIn }}</td>
                    <td>{{ entry.itemInvStock.invOut }}</td>
                    <td>{{ entry.itemInvStock.invEnd }}</td>
                </tr>
            </tbody> -->
                </table>
            </template>
        </div>
    </div>
</template>
  
<script>
import { formatNumber } from '../function/number'
export default {
    props: {
        saldoAwal: String,
        data: Array,
    },
    data() {
        return {
            saldoAkhir: '0',
            saldoIn: '0',
            saldoOut: '0'
        }
    },
    computed: {
        testIn() {
            const tes = this.data.map(x => {
                const data = {
                    ...x
                }
                const containsEmptyObject = x.itemInvStock.invIn.some(obj => Object.keys(obj).length === 0);
                if (containsEmptyObject) {
                    data.itemInvStock.invIn = []
                    return data
                } else {
                    return data
                }
                
            })

            return tes
        }
    },
    methods: {
        // ini buat mutasi barang
        compileTrans(data)  {
            if (data.invIn.length > 0) {
                data.invIn.map(x => ({...x, stockIn}))
            }
            console.log(data)
        }
    }
};
</script>
  
<style scoped></style>