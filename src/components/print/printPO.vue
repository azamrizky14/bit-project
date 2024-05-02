<template>
    <div class="report" style="font-size: 10px">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center" width="110"><b>No. Bukti</b></th>
                    <th scope="col" class="text-center"><b>Nama Perkiraan</b></th>
                    <th scope="col" class="text-center" width="100"><b>Perkiraan</b></th>
                    <th scope="col" class="text-center"><b>Deskripsi</b></th>
                    <th scope="col" class="text-center" width="130"><b>Penerimaan</b></th>
                    <th scope="col" class="text-center" width="130"><b>Pengeluaran</b></th>
                </tr>
            </thead>
            <tbody v-if="data.length > 0">
                <tr v-for="entry in data">
                    <td>{{ entry.transNo }}</td>
                    <td>{{ entry.coaName }}</td>
                    <td>{{ entry.coaCode }}</td>
                    <td>{{ entry.transDescription }}</td>
                    <td>Rp. {{ entry.transIn }}</td>
                    <td>Rp. {{ entry.transOut }}</td>
                </tr>
                <tr>
                    <td rowspan="5" colspan="3">
                        <div class="w-100 row d-flex align-items-center">
                            <div class="col-4 d-flex justify-content-between pe-0 my-1">
                                <span>Uang Tunai</span>
                                <span>: Rp.</span>
                            </div>
                            <div class="col-8 d-flex justify-content-between ps-0 pt-2">
                                <p class="m-0 border-bottom border-secondary w-100"></p>
                            </div>
                            <div class="col-4 d-flex justify-content-between pe-0 my-1">
                                <span>Bon Sementara</span>
                                <span>: Rp.</span>
                            </div>
                            <div class="col-8 d-flex justify-content-between ps-0 pt-2">
                                <p class="m-0 border-bottom border-secondary w-100"></p>
                            </div>
                            <div class="col-4 d-flex justify-content-between pe-0 my-1">
                                <span>Saldo Kasir</span>
                                <span>: Rp.</span>
                            </div>
                            <div class="col-8 d-flex justify-content-between ps-0 pt-2">
                                <p class="m-0 border-bottom border-secondary w-100"></p>
                            </div>
                            <div class="col-4 d-flex justify-content-between pe-0 my-1">
                                <span>Sisa Keuangan</span>
                                <span>: Rp.</span>
                            </div>
                            <div class="col-8 d-flex justify-content-between ps-0 pt-2">
                                <p class="m-0 border-bottom border-secondary w-100"></p>
                            </div>
                            <div class="col-4 d-flex justify-content-between pe-0 my-1">
                                <span>Beda Kas</span>
                                <span>: Rp.</span>
                            </div>
                            <div class="col-8 d-flex justify-content-between ps-0 pt-2">
                                <p class="m-0 border-bottom border-secondary w-100"></p>
                            </div>
                        </div>
                    </td>
                    <td class="text-end"><b>Total :</b></td>
                    <td><b>Rp. {{ updateSaldoIn }}</b></td>
                    <td><b>Rp. {{ updateSaldoOut }}</b></td>
                </tr>
                <tr>
                    <td class="text-end"><b>Saldo Awal :</b></td>
                    <td colspan="2"><b>Rp. {{ updateSaldoAwal }}</b></td>
                </tr>
                <tr>
                    <td class="text-end"><b>Saldo Akhir :</b></td>
                    <td colspan="2"><b>Rp. {{ updateSaldoAkhir }}</b></td>
                </tr>
                <tr>
                    <td colspan="3" rowspan="2" class="p-0">
                        <table class="table table-bordered">
                            <tr>
                                <th class="text-center" style="width: 30%">Kasir</th>
                                <th class="text-center" style="width: 30%">Accounting</th>
                                <th class="text-center" style="width: 30%">Pimpinan</th>
                            </tr>
                            <tr>
                                <td><br><br><br><br></td>
                                <td><br><br><br><br></td>
                                <td><br><br><br><br></td>
                            </tr>
                        </table>
                    </td>
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