<template>
  <main id="content" role="main" class="main">
    <div class="content container-fluid p-3 ps-0 pt-0" ref="contentDiv">
      <ul class="breadcrumb m-1 mt-0">
        <li>
          <a href="#"><i class="bi-house-door"></i></a>
        </li>
        <li>Transaksi</li>
        <li>Detail</li>
        <li>{{ poNumb }}</li>
      </ul>

      <!-- Content -->
      <template v-if="isDataLoaded">
        <div class="card">
          <div class="card-header bg-light p-2">
            <div class="row">
              <div
                class="row col-9 d-flex align-items-center justify-content-end pe-0"
              >
                <b-form-group
                  label-for="coaKasbank"
                  invalid-feedback="Condition Harus Diisi!"
                  style="width: 200px"
                >
                </b-form-group>
              </div>

              <div
                class="col-3 d-flex justify-content-end py-2"
                style="z-index: 2"
              >
                <router-link
                  to="/transaksi/po"
                  class="btn btn-outline-secondary btn-xs py-1 me-2"
                >
                  <i class="bi-chevron-left"></i>Kembali
                </router-link>
                <b-button-group>
                  <button class="btn btn-primary btn-xs">
                    <i class="bi-printer pe-2" @click="printReport"></i>Print
                  </button>
                  <b-dropdown id="dropdown2" variant="primary" size="xs" right>
                    <div>
                      <p class="p-2 pb-0 m-0">Export</p>
                    </div>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="generatePDF">PDF</b-dropdown-item>
                    <b-dropdown-item>xls</b-dropdown-item>
                  </b-dropdown>
                </b-button-group>
              </div>
            </div>
          </div>
          <div class="card-body p-2 printData">
            <div class="container">
              <div class="header">
                <h1>PURCHASE ORDER</h1>
              </div>

              <div class="po-number">
                <p>Purchase Order Number: {{ dataPOId[0].PoNo }}</p>
              </div>

              <div class="po-date">
                <p>Date: {{ dataPOId[0].poDate }}</p>
              </div>

              <div class="address-info">
                <div class="address">
                  <h2>From:</h2>
                  <p>{{ dataPOId[0].PoDomain.domainName }}</p>
                  <p>{{ dataPOId[0].PoDomain.domainAddress }}</p>
                  <p>
                    {{ dataPOId[0].PoDomain.domainContactPerson[0].userEmail }}
                  </p>
                  <p>
                    Phone:
                    {{ dataPOId[0].PoDomain.domainContactPerson[0].userPhone }}
                  </p>
                </div>
                <div class="address">
                  <h2>To:</h2>
                  <p>{{ dataPOId[0].PoSupplier.userName }}</p>
                  <p>{{ dataPOId[0].PoSupplier.userAddress[0].location }}</p>
                  <p>{{ dataPOId[0].PoSupplier.userEmail }}</p>
                  <p>Phone: {{ dataPOId[0].PoSupplier.userPhone }}</p>
                </div>
                <div class="address">
                  <h2>Ship To:</h2>
                  <p>{{ dataPOId[0].PoShipto }}</p>
                </div>
              </div>

              <div class="order-details">
                <h2>Order Details:</h2>
                <table style="border-collapse: collapse; border: none">
                  <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>UoM</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                  <tr v-for="dt in dataPOId[0].PoItemDetails">
                    <td>{{ dt.itemName }}</td>
                    <td>{{ dt.itemDescription }}</td>
                    <td>{{ dt.itemQty }}</td>
                    <td>{{ dt.itemUm }}</td>
                    <td>{{ formatNumber(dt.itemPrice) }}</td>
                    <td>
                      {{
                        formatNumber(
                          parseFloat(dt.itemPrice) * parseFloat(dt.itemQty)
                        )
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" rowspan="3" style="border: none">
                      <div class="divNotePrint">
                        <p style="margin: 10px"><b>Catatan :</b></p>
                        <p style="margin: 10px 15px; font-size: 15px">
                          {{ dataPOId[0].PoNotes }}
                          <br />
                        </p>
                      </div>
                    </td>
                    <th>SubTotal</th>
                    <td>{{ formatNumber(subTotal) }}</td>
                  </tr>
                  <tr>
                    <th>Tax</th>
                    <td>{{ formatNumber(subTotal * 0.11) }}</td>
                  </tr>
                  <tr>
                    <th>Grand Total</th>
                    <td>{{ formatNumber(subTotal + subTotal * 0.11) }}</td>
                  </tr>
                </table>
              </div>

              <div class="footerPrint">
                <!-- dibuat oleh -->
                <!-- approve oleh -->
                <div class="ttd">
                  <p>Dibuat Oleh</p>

                  <span class="ttdName">( {{ pembuat }} )</span>
                </div>
                <div class="ttd">
                  <p>Di Approve Oleh</p>

                  <span class="ttdName">( {{ dataPOId[0].PoRouting }} )</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
  
<script>
import { getPObyId } from "../../components/services/components";
import { formatNumber } from "../../components/function/number";
export default {
  data() {
    return {
      poNumb: "",
      dataPOId: [],
      isDataLoaded: false,
      posts: [],
      pembuat: [],
      subTotal: 0,
    };
  },
  async mounted() {
    alert('cok')
    this.pembuat = localStorage.getItem("userName");
    this.poNumb = this.$route.params.noSO;
    console.log('cok', poNumb)
    // const transData = (await get0("kasbank")).masterData;
    this.isDataLoaded = true;
    this.routing = this.posts.transRouting;
    this.dataPOId = await getPObyId(this.poNumb);

    const dtSubTotal = this.dataPOId[0].PoItemDetails;
    console.log("dataPO", dtSubTotal);
    this.subTotal = await dtSubTotal.reduce(
      (current, acc) =>
        parseFloat(acc.itemPrice) * parseFloat(acc.itemQty) + current,
      0
    );
  },
  computed: {},
  methods: {
    formatNumber(data) {
      return formatNumber(data);
    },
    doPrint() {
      window.print();
    },
    printReport() {
      // console.log("ini print", this.getReportContent());
      const printWindow = window.open("", "_blank");
      const printDocument = `
        <html>
          <head>
	          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style scope>
            td {
              position: relative;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              background-color: #fff;
              overflow: hidden; /* Untuk mengatasi float */
            }

            .header {
              text-align: center;
              background-color: #f2f2f2;
              padding: 10px;
            }

            .header h1 {
              margin: 0;
              color: #333;
            }

            .po-number {
              text-align: right;
              margin-top: 10px;
            }

            .po-number p {
              margin: 0;
              font-weight: bold;
            }

            .po-date {
              text-align: right;
            }

            .po-date p {
              margin: 5px 0;
            }

            .address-info {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
            }

            .address-info h2 {
              font-size: 18px;
              margin: 0;
            }

            .address-info .address {
              flex: 1;
            }

            .address-info p {
              margin: 5px 0;
            }

            .order-details {
              margin-top: 20px;
              margin-bottom: 0; /* Menghilangkan margin bawah */
            }

            .order-details table {
              width: 100%;
              border-collapse: collapse;
            }

            .order-details table,
            .order-details th,
            .order-details td {
              border: 1px solid #ccc;
            }

            .order-details th,
            .order-details td {
              padding: 10px;
              text-align: left;
            }
            .divNotePrint {
              overflow: hidden;
              text-overflow: ellipsis; /* Add ellipsis for overflow text */
              border: 1px solid #ccc;
              position: absolute;
              top: 10px;
              left: 0;
              bottom: 0;
              right: 10px;
            }
            .footerPrint {
              padding: 25px 25px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .footerPrint .ttd {
              flex-wrap: wrap;
              display: flex;
              align-items: space-between;
              justify-content: center;
              width: 250px;
              height: 150px;
              border-bottom: 1px solid #000;
            }
            .footerPrint .ttd .ttdName {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: flex-end;
            }
            </style>
          </head>

          <body>
            ${this.getReportContent()}
          </body>
        </html>
      `;
      printWindow.document.write(printDocument);
      printWindow.document.close();
      printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
      };
    },
    getReportContent() {
      const reportView = document.querySelector(".printData");
      if (reportView) {
        return reportView.innerHTML;
      }
      return "No content found.";
    },
  },
};
</script>

<style scope>
td {
  position: relative;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  overflow: hidden; /* Untuk mengatasi float */
}

.header {
  text-align: center;
  background-color: #f2f2f2;
  padding: 10px;
}

.header h1 {
  margin: 0;
  color: #333;
}

.po-number {
  text-align: right;
  margin-top: 10px;
}

.po-number p {
  margin: 0;
  font-weight: bold;
}

.po-date {
  text-align: right;
}

.po-date p {
  margin: 5px 0;
}

.address-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.address-info h2 {
  font-size: 18px;
  margin: 0;
}

.address-info .address {
  flex: 1;
}

.address-info p {
  margin: 5px 0;
}

.order-details {
  margin-top: 20px;
  margin-bottom: 0; /* Menghilangkan margin bawah */
}

.order-details table {
  width: 100%;
  border-collapse: collapse;
}

.order-details table,
.order-details th,
.order-details td {
  border: 1px solid #ccc;
}

.order-details th,
.order-details td {
  padding: 10px;
  text-align: left;
}
.divNotePrint {
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
  border: 1px solid #ccc;
  position: absolute;
  top: 10px;
  left: 0;
  bottom: 0;
  right: 10px;
}
.footerPrint {
  padding: 25px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footerPrint .ttd {
  flex-wrap: wrap;
  display: flex;
  align-items: space-between;
  justify-content: center;
  width: 250px;
  height: 150px;
  border-bottom: 1px solid #000;
}
.footerPrint .ttd .ttdName {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>