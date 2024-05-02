<template>
    <div class="report" style="font-size: 10px">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center" width="110"><b>Kode COA</b></th>
                    <th scope="col" class="text-center"><b>Nama COA</b></th>
                    <th scope="col" class="text-center" width="130"><b>Saldo Awal</b></th>
                    <th scope="col" class="text-center" width="130"><b>Mutasi Debet</b></th>
                    <th scope="col" class="text-center" width="130"><b>Mutasi Kredit</b></th>
                    <th scope="col" class="text-center" width="130"><b>Saldo Akhir</b></th>
                </tr>
            </thead>
            <tbody v-if="realData.length > 0">
                <tr v-for="entry in realData">
                    <td>{{ entry.coaCode }}</td>
                    <td>{{ entry.coaName }}</td>
                    <td>Rp. {{ formatNumber(entry.coaTrans.invBegining) }}</td>
                    <td>Rp. {{ formatNumber(entry.coaTrans.invIn) }}</td>
                    <td>Rp. {{ formatNumber(entry.coaTrans.invOut) }}</td>
                    <td>Rp. {{ formatNumber(entry.coaTrans.invEnd) }}</td>
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
        formatNumber(data) {
            return formatNumber(data)
        },        
    }
};
</script>
  
<style scoped>
</style>