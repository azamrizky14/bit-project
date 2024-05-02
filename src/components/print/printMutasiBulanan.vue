<template>
    <div class="report" style="font-size: 10px">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center align-middle" width="110"><b>COA</b></th>
            <th scope="col" class="text-center align-middle"><b>Uraian</b></th>
            <th scope="col" class="text-center align-middle" width="100"><b>Total</b></th>
            <th v-for="item in data.saldoAwal" :key="item.coaName" scope="col" class="text-center align-middle" width="100px">
              <b>{{ item.coaName }}</b>
            </th>
          </tr>
        </thead>
        <tbody v-if="data.saldoAwal">
          <tr>
            <td :colspan="3 + data.saldoAwal.length" style="font-size: 12px"><b>SALDO AWAL KEUANGAN</b></td>
          </tr>
            <tr v-for="saldo in data.saldoAwal">
              <td>{{ saldo.coaCode }}</td>
              <td>{{ formatNumber(saldo.coaName) }}</td>
              <td>{{ formatNumber(saldo.FaPriceBegining) }}</td>
              <td v-for="item in data.saldoAwal">
                <template v-if="saldo.coaCode === item.coaCode">{{ formatNumber(saldo.FaPriceBegining) }}</template>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center"><b>Jumlah</b></td>
              <td><b>{{ totalSaldoAwal }}</b></td>
              <td v-for="item in data.saldoAwal"><b>{{ formatNumber(item.FaPriceBegining) }}</b></td>
            </tr>
    <!-- <tbody v-html="getSaldoAwal()" style="font-size: 12px;"></tbody> -->
          <tr>
            <td :colspan="3 + data.saldoAwal.length" style="font-size: 12px"><b>PENERIMAAN KEUANGAN</b></td>
          </tr>
            <tr v-for="saldo in filterIn">
              <td>{{ saldo.transCoaCode }}</td>
              <td>{{ formatNumber(saldo.transCoaName) }}</td>
              <td>{{ formatNumber(saldo.totalAmount) }}</td>
              <td v-for="item in data.saldoAwal">
                <template v-for="total in saldo.filter">
                  <template v-if="total.coaCode === item.coaCode">{{ formatNumber(total.totalAmount) }}</template>
                </template>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center"><b>Jumlah</b></td>
              <td><b>{{ totalSaldoIn }}</b></td>
              <td v-for="item in data.saldoAwal"><b>{{ jumlahIn(item.coaCode) }}</b></td>
            </tr>
          <tr>
            <td :colspan="3 + data.saldoAwal.length" style="font-size: 12px"><b>PENGELUARAN KEUANGAN</b></td>
          </tr>
            <tr v-for="saldo in filterOut">
              <td>{{ saldo.coaCode }}</td>
              <td>{{ formatNumber(saldo.coaName) }}</td>
              <td>{{ formatNumber(saldo.totalAmount) }}</td>
              <td v-for="item in data.saldoAwal">
                <template v-for="total in saldo.filter">
                  <template v-if="total.transCoaCode === item.coaCode">{{ formatNumber(total.totalAmount) }}</template>
                </template>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center"><b>Jumlah</b></td>
              <td><b>{{ totalSaldoOut }}</b></td>
              <td v-for="item in data.saldoAwal"><b>{{ jumlahOut(item.coaCode) }}</b></td>
            </tr>
          <tr>
            <td :colspan="3 + data.saldoAwal.length" style="font-size: 12px"><b>SALDO AKHIR KEUANGAN</b></td>
          </tr>
            <tr v-for="saldo in data.saldoAkhir">
              <td>{{ saldo.coaCode }}</td>
              <td>{{ formatNumber(saldo.coaName) }}</td>
              <td>{{ formatNumber(saldo.FaPriceEnd) }}</td>
              <td v-for="item in data.saldoAkhir">
                <template v-if="saldo.coaCode === item.coaCode">{{ formatNumber(saldo.FaPriceEnd) }}</template>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center"><b>Jumlah</b></td>
              <td><b>{{ totalSaldoAkhir }}</b></td>
              <td v-for="item in data.saldoAkhir"><b>{{ formatNumber(item.FaPriceEnd) }}</b></td>
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
      data: Array
    },
    data() {
      return {
        filteredIn: [],
        filterredOut: []
      }
    },
    computed: {
      totalSaldoAwal() {
        return formatNumber(this.data.saldoAwal.reduce((sum, item) => sum + parseInt(item.FaPriceBegining), 0))
      },
      totalSaldoAkhir() {
        return formatNumber(this.data.saldoAkhir.reduce((sum, item) => sum + parseInt(item.FaPriceEnd), 0))
      },
      totalSaldoIn() {
        return formatNumber(this.data.In.reduce((sum, item) => sum + parseInt(item.totalAmount), 0))
      },
      totalSaldoOut() {
        return formatNumber(this.data.out.reduce((sum, item) => sum + parseInt(item.totalAmount), 0))
      },
      
      filterIn() {
      const groupedData = {};
      for (const item of this.data.In) {
        if (!groupedData[item.transCoaCode]) {
          groupedData[item.transCoaCode] = {
            transCoaCode: item.transCoaCode,
            transCoaName: item.transCoaName,
            totalAmount: 0,
            filter: []
          };
        }
        groupedData[item.transCoaCode].totalAmount += parseInt(item.totalAmount);
        groupedData[item.transCoaCode].filter.push({
          coaCode: item.coaCode,
          totalAmount: item.totalAmount
        });
      }
      return Object.values(groupedData);
    },
      filterOut() {
      const groupedData = {};
      for (const item of this.data.out) {
        if (!groupedData[item.coaCode]) {
          groupedData[item.coaCode] = {
            coaCode: item.coaCode,
            coaName: item.coaName,
            totalAmount: 0,
            filter: []
          };
        }
        groupedData[item.coaCode].totalAmount += parseInt(item.totalAmount);
        groupedData[item.coaCode].filter.push({
          transCoaCode: item.transCoaCode,
          totalAmount: item.totalAmount
        });
      }
      return Object.values(groupedData);
    }
    },
    methods: {
      formatNumber(value) {
        return formatNumber(value)
      },
      jumlahIn(value) {
        if (value.length > 0) {
          return formatNumber(this.data.In.filter(x => x.coaCode === value).reduce((sum, item) => sum + parseInt(item.totalAmount), 0))
        } else {
          return '0,00'
        }
      },
      jumlahOut(value) {
        if (value.length > 0) {
          return formatNumber(this.data.out.filter(x => x.transCoaCode === value).reduce((sum, item) => sum + parseInt(item.totalAmount), 0))
        } else {
          return '0,00'
        }
      }
    },
      
    mounted() {}
  }
  </script>
  
  <style scoped>
  </style>
  