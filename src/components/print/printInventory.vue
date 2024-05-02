<template>
    <div class="report" style="font-size: 10px">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center" width="110"><b>Kode Item</b></th>
                    <th scope="col" class="text-center"><b>Nama Item</b></th>
                    <th scope="col" class="text-center"><b>Grup Item</b></th>
                    <th scope="col" class="text-center"><b>Item UM</b></th>
                    <th scope="col" class="text-center" width="100"><b>Stok Awal</b></th>
                    <th scope="col" class="text-center"><b>Masuk</b></th>
                    <th scope="col" class="text-center" width="130"><b>Keluar</b></th>
                    <th scope="col" class="text-center" width="130"><b>Stok Akhir</b></th>
                </tr>
            </thead>
            <tbody v-if="realData.length > 0">
                <tr v-for="entry in realData">
                    <td>{{ entry.itemCode }}</td>
                    <td>{{ entry.itemName }}</td>
                    <td><span v-for="group in entry.itemGroup">{{ group }},</span></td>
                    <td>{{ entry.itemInvStock.invUM }}</td>
                    <td>{{ entry.itemInvStock.invBegining }}</td>
                    <td>{{ entry.itemInvStock.invIn }}</td>
                    <td>{{ entry.itemInvStock.invOut }}</td>
                    <td>{{ entry.itemInvStock.invEnd }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr><td colspan="6">Data Tidak Ditemukan</td></tr>
            </tbody>
        </table>
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
        realData() {
            return this.data
        },  
        updateSaldoAwal() {        
            return formatNumber(this.saldoAwal.toString())
        },
        updateSaldoIn() {     
            let ini = this.data.filter(x => parseFloat(x.transIn) > 0 && parseFloat(x.transOut) <= 0)
                .reduce((sum, item) => sum + parseFloat(item.transAmount), 0)   
            this.saldoIn = ini
            return formatNumber(ini)
        },
        updateSaldoOut() {        
            let out = this.data.filter(x => parseFloat(x.transOut) > 0 && parseFloat(x.transIn) <= 0)
                .reduce((sum, item) => sum + parseFloat(item.transAmount), 0)
            if (out < 0)  {
                out = out*-1
            }
            this.saldoOut = out
            return formatNumber(out)
        },
        updateSaldoAkhir() {
            return formatNumber((this.saldoAwal + this.saldoIn - this.saldoOut).toString())
        }
    },
    methods: {
        
    }
};
</script>
  
<style scoped>
</style>