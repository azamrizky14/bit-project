<template>
  <main id="content" role="main" class="main">
    <!-- Content -->
    <div class="content container-fluid">

      <div class="tab-content" id="navTabContent">
        <div class="tab-pane py-2 show active" id="tabSummary" role="tabpanel" aria-labelledby="nav-tabSummary">
          <!-- Nav -->
          <div class="row">
            <div class="col-sm-6 col-lg-3 mb-2">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Saldo Awal Kas & Bank</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h3 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span>{{ formatPrice(saldoAwal) }}
                      </h3>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge" style="font-size: 10px"
                    :class="saldoAwal > lastSaldoAwal ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger  '">
                    <i :class="saldoAwal > lastSaldoAwal ? 'bi-graph-up' : 'bi-graph-down'"></i> Last Month
                  </span>
                  <span class="text-body fs-8 ms-1" style="font-size: 11px;">Rp. {{ formatPrice(lastSaldoAwal) }}</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-3 mb-2">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Total Pemasukan</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h3 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span>{{ formatPrice(transIn) }}
                      </h3>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge" style="font-size: 10px"
                    :class="transIn > lastTransIn ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger  '">
                    <i :class="transIn > lastTransIn ? 'bi-graph-up' : 'bi-graph-down'"></i> Last Month
                  </span>
                  <span class="text-body fs-8 ms-1" style="font-size: 11px;">Rp.{{ formatPrice(lastTransIn) }}</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-3 mb-2">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Total Pengeluaran</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h3 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span>{{ formatPrice(transOut) }}
                      </h3>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge" style="font-size: 10px"
                    :class="transOut > lastTransOut ? 'bg-soft-danger text-danger' : 'bg-soft-success text-success'">
                    <i :class="transOut > lastTransOut ? 'bi-graph-up' : 'bi-graph-down'"></i> Last Month
                  </span>
                  <span class="text-body fs-8 ms-1" style="font-size: 11px;">Rp.{{ formatPrice(lastTransOut) }}</span>
                </div>
              </a>
              <!-- End Card -->
            </div>
            <div class="col-sm-6 col-lg-3 mb-2">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Saldo Akhir Kas & Bank</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h3 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span>{{ formatPrice(saldoAkhir) }}
                      </h3>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge" style="font-size: 10px"
                    :class="saldoAkhir > lastSaldoAkhir ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger  '">
                    <i :class="saldoAkhir > lastSaldoAkhir ? 'bi-graph-up' : 'bi-graph-down'"></i> Last Month
                  </span>
                  <span class="text-body fs-8 ms-1" style="font-size: 11px;">Rp.{{ formatPrice(lastSaldoAkhir) }}</span>
                </div>
              </a>
              <!-- End Card -->
            </div>
          </div>
          <!-- End Nav -->
        </div>

        <div class="tab-pane py-2" id="tabPendapatan" role="tabpanel" aria-labelledby="nav-tabPendapatan">
          <!-- Nav -->
          <div class="row">


            <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Pendapatan Outstanding</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 0
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-success text-success">Today</span>
                  <span class="text-body fs-6 ms-1">Rp.50000000</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Pembayaran Registrasi</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 5.000.000
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-success text-success">
                    <i class="bi-graph-up"></i>Today
                  </span>
                  <span class="text-body fs-6 ms-1">Rp.50000000</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Pembayaran Migrasi</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 10.000.000
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-success text-success">
                    <i class="bi-graph-down"></i> Today
                  </span>
                  <span class="text-body fs-6 ms-1">Rp.50000000</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Penjualan Voucher</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 0
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-success text-success">Today</span>
                  <span class="text-body fs-6 ms-1">Rp.50000000</span>
                </div>
              </a>
              <!-- End Card -->
            </div>
          </div>
          <!-- End Nav -->
        </div>

        <div class="tab-pane py-2" id="tabPengeluaran" role="tabpanel" aria-labelledby="nav-tabPengeluaran">
          <!-- Nav -->
          <div class="row">
            <div class="col-sm-6 col-lg-6 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Pembelian</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 3.000.000
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-success text-success">
                    <i class="bi-graph-up"></i> 1.7%
                  </span>
                  <span class="text-body fs-6 ms-1">From Last Month</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-6 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Perjalanan Dinas</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 7.000.000
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-danger text-danger">
                    <i class="bi-graph-down"></i> 4.4%
                  </span>
                  <span class="text-body fs-6 ms-1">From Last Month</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

          </div>
          <!-- End Nav -->
        </div>

        <div class="tab-pane py-2" id="tabTotal" role="tabpanel" aria-labelledby="nav-tabTotal">
          <!-- Nav -->
          <div class="row">
            <div class="col-sm-6 col-lg-4 mb-2">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Total Saldo</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 25.000.000
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-success text-success">
                    <i class="bi-graph-up"></i> 1.7%
                  </span>
                  <span class="text-body fs-6 ms-1">From Last Month</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-4 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Total Pendapatan</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 20.000.000
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-danger text-danger">
                    <i class="bi-graph-down"></i> 4.4%
                  </span>
                  <span class="text-body fs-6 ms-1">From Last Month</span>
                </div>
              </a>
              <!-- End Card -->
            </div>

            <div class="col-sm-6 col-lg-4 mb-3 mb-lg-5">
              <!-- Card -->
              <a class="card card-hover-shadow h-100" href="#">
                <div class="card-body">
                  <h6 class="card-subtitle">Total Pengeluaran</h6>

                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-12">
                      <h1 class="card-title text-inherit my-2">
                        <span class="h4">Rp.</span> 2.000.000
                      </h1>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->

                  <span class="badge bg-soft-secondary text-body">0.0%</span>
                  <span class="text-body fs-6 ms-1">From Last Month</span>
                </div>
              </a>
              <!-- End Card -->
            </div>
          </div>
          <!-- End Nav -->
        </div>
      </div>
      <!-- End Row -->


      <div class="row" :class="notEmpty">
        <div class="col-lg-12 mb-3 mb-lg-5">
          <!-- Card -->
          <div class="card h-100">
            <!-- Header -->
            <div class="card-header card-header-content-sm-between py-2">
              <h4 class="card-header-title mb-2 mb-sm-0">Grafik Keuangan Periode</h4>

              <!-- Nav -->
              
        <div class="col-4 d-flex align-items-center">
          <b-form-input type="month" class="py-1" v-model="editableDate" @input="refreshData"></b-form-input>
        </div>
              <!-- End Nav -->
            </div>
            <!-- End Header -->

            <!-- Body -->
            <div class="card-body">
              <div class="row mb-4">
                <div class="col-sm mb-2 mb-sm-0">
                  <div class="d-flex align-items-center">

                <!-- INI BUAT KENAIKAN TOTAL -->

                    <!-- <span class="h1 mb-0">35%</span>
                    <span class="text-success ms-2">
                      <i class="bi-graph-up"></i> 25.3%
                    </span> -->
                  </div>
                </div>
                <!-- End Col -->

                <div class="col-sm-auto align-self-sm-end">
                  <div class="row fs-6 text-body">
                    <div class="col-auto" v-for="data in chartData.datasets">
                      <span class="legend-indicator" :style="{ backgroundColor: data.backgroundColor }"></span>
                      {{ data.label }}
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->
                </div>
                <!-- End Col -->
              </div>
              <!-- End Row -->

              <!-- Bar Chart -->
              <div class="chartjs-custom">
                <chart-component :chartData="chartData" />
              </div>
              <!-- End Bar Chart -->
            </div>
            <!-- End Body -->
          </div>
          <!-- End Card -->
        </div>
        <!-- End Col -->
      </div>

      <div class="row">
        <div class="col-lg-12 mb-3 mb-lg-5">
          <!-- Card -->
          <div class="card h-100">
            <!-- Header -->
            <div class="card-header card-header-content-sm-between py-2">
              <h4 class="card-header-title mb-2 mb-sm-0">Laporan Kasbank</h4>

              <!-- Nav -->
        <div class="col-4 d-flex align-items-center">
          <b-form-input type="month" class="py-1" v-model="editableDate" disabled></b-form-input>
        </div>
              <!-- End Nav -->
            </div>
            <!-- End Header -->

            <!-- Body -->
            <div class="card-body p-0">
              <!-- End Row -->

              <!-- Bar Chart -->
              <div class="chartjs-custom">
                <table class="table table-bordered">
                  <thead class="bg-light">
                    <tr>
                      <th scope="col"></th>
                      <th v-for="header in data.saldoAwal" scope="col" class="text-center"><b>{{ header.coaName }}</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Awal Periode</th>
                      <td v-for="awal in data.saldoAwal" class="text-center">{{ formatNumber(awal.FaPriceBegining) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Akhir Periode</th>
                      <td v-for="akhir in data.saldoAkhir" class="text-center">{{ formatNumber(akhir.FaPriceEnd) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">% Kenaikan/Penurunan</th>
                      <td v-for="awal in data.saldoAwal" class="text-center">{{ awal.presentase }} %</td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <!-- End Bar Chart -->
            </div>
            <!-- End Body -->
          </div>
          <!-- End Card -->
        </div>
        <!-- End Col -->
      </div>

      <div class="row">
        <!-- Card -->
        <div class="col-lg-6">
          <div class="card mb-3 mb-lg-5">
            <!-- Header -->
            <div class="card-header">
              <div class="row justify-content-between align-items-center flex-grow-1">
                <div class="col-md-12">
                  <div class="d-flex justify-content-between align-items-center">
                    <h4 class="card-header-title">Sales Order</h4>
                    <h4 class="card-header-title">Total Pesanan: {{ soTotal }}</h4>

                    <!-- Datatable Info -->
                    <div id="datatableCounterInfo" style="display: none;">
                      <div class="d-flex align-items-center">
                        <span class="fs-6 me-3">
                          <span id="datatableCounter">0</span>
                          Selected
                        </span>
                        <a class="btn btn-outline-danger btn-sm" href="javascript:;">
                          <i class="tio-delete-outlined"></i> Delete
                        </a>
                      </div>
                    </div>
                    <!-- End Datatable Info -->
                  </div>
                </div>
                <!-- End Col -->

                <div class="col-md-12">
                  <!-- Filter -->
                  <div class="row align-items-sm-center">
                    <div class="col-sm-auto">
                      <div class="row align-items-center gx-0">
                        <div class="col">
                          <span class="text-secondary me-2">Status:</span>
                        </div>
                        <!-- End Col -->

                        <div class="col-auto">
                          <!-- Select -->
                          <div class="tom-select-custom tom-select-custom-end">
                            <select
                              class="js-select js-datatable-filter form-select form-select-sm form-select-borderless"
                              data-target-column-index="2" data-target-table="datatable" autocomplete="off"
                              data-hs-tom-select-options='{
                                "searchInDropdown": false,
                                "hideSearch": true,
                                "dropdownWidth": "10rem"
                              }'>
                              <option value="null" selected>All</option>
                              <option value="Free">New</option>
                              <option value="Libur">Libur</option>
                              <option value="Sibuk">Sibuk</option>
                            </select>
                          </div>
                          <!-- End Select -->
                        </div>
                        <!-- End Col -->
                      </div>
                      <!-- End Row -->
                    </div>

                    <div class="col-md">
                      <form>
                        <!-- Search -->
                        <div class="input-group input-group-merge input-group-flush">
                          <div class="input-group-prepend input-group-text" style="position: relative; z-index: 1;">
                            <i class="bi-search"></i>
                          </div>
                          <input id="datatableSearch" v-model="soFilter" type="search" class="form-control" placeholder="Cari Sales Order..."
                            aria-label="Search users">
                        </div>
                        <!-- End Search -->
                      </form>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Filter -->
                </div>
                <!-- End Col -->
              </div>
              <!-- End Row -->
            </div>
            <!-- End Header -->

            <!-- Table -->
            <div class="table-responsive datatable-custom">
              <table id="datatable"
                class="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                >
                <thead class="thead-light px-3">
                  <tr>
                    <th class="table-column-ps-2 text-center text-dark">Customer</th>
                    <th class="text-dark text-center">Sales</th>
                    <th class="text-dark">Tgl. Order</th>
                    <th class="text-dark">Qty</th>
                    <th class="text-dark">Status</th>
                  </tr>
                </thead>

                <tbody class="px-3">
                  <tr v-for="so in soFilteredData">
                    <td class="table-column-ps-0">
                      <a class="d-flex align-items-center" href="user-profile.html">
                        <div class="flex-shrink-0">
                          <div class="avatar avatar-sm avatar-soft-primary avatar-circle">
                            <span class="avatar-initials">{{ so.transName.charAt(0) }}</span>
                          </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h5 class="text-inherit mb-0">{{ so.transName }}</h5>
                        </div>
                      </a>
                    </td>
                    <td class="text-center">{{ so.transKasir.userName }}</td>
                    <td>{{ formatIndDate(so.transDate) }}</td>
                    <td>{{ soTotal }}</td>
                    <td>
                      <span class="legend-indicator bg-success"></span>New
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- End Table -->

            <!-- Footer -->
            <div class="card-footer">
              <!-- Pagination -->
              <div class="row justify-content-center justify-content-sm-between align-items-sm-center">
                <div class="col-sm mb-2 mb-sm-0">
                  <div class="d-flex justify-content-center justify-content-sm-start align-items-center">
                    <span class="me-2">Showing:</span>

                    <!-- Select -->
                    <div class="tom-select-custom">
                      <select id="datatableEntries" class="js-select form-select form-select-borderless w-auto"
                        autocomplete="off" data-hs-tom-select-options='{
                          "searchInDropdown": false,
                          "hideSearch": true
                        }'>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8" selected>8</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <!-- End Select -->

                    <span class="text-secondary me-2">of</span>

                    <!-- Pagination Quantity -->
                    <span id="datatableWithPaginationInfoTotalQty"></span>
                    <span class="ps-2">{{ soList.length }} Data</span>
                  </div>
                </div>
                <!-- End Col -->

                <div class="col-sm-auto">
                  <div class="d-flex justify-content-center justify-content-sm-end">
                    <!-- Pagination -->
                    <nav id="datatablePagination" aria-label="Activity pagination"></nav>
                  </div>
                </div>
                <!-- End Col -->
              </div>
              <!-- End Pagination -->
            </div>
            <!-- End Footer -->
          </div>
        </div>
        <!-- End Card -->

        <div class="col-lg-6">
          <div class="card mb-3 mb-lg-5">
            <!-- Header -->
            <div class="card-header">
              <div class="row justify-content-between align-items-center flex-grow-1">
                <div class="col-md-12">
                  <div class="d-flex justify-content-between align-items-center">
                    <h4 class="card-header-title">Purchase Order</h4>
                    <h4 class="card-header-title">Total Item: {{ poTotalAll }}</h4>

                    <!-- Datatable Info -->
                    <div id="datatableCounterInfo" style="display: none;">
                      <div class="d-flex align-items-center">
                        <span class="fs-6 me-3">
                          <span id="datatableCounter">0</span>
                          Selected
                        </span>
                        <a class="btn btn-outline-danger btn-sm" href="javascript:;">
                          <i class="tio-delete-outlined"></i> Delete
                        </a>
                      </div>
                    </div>
                    <!-- End Datatable Info -->
                  </div>
                </div>
                <!-- End Col -->

                <div class="col-md-12">
                  <!-- Filter -->
                  <div class="row align-items-sm-center">
                    <div class="col-sm-auto">
                      <div class="row align-items-center gx-0">
                        <div class="col">
                          <span class="text-secondary me-2">Status:</span>
                        </div>
                        <!-- End Col -->

                        <div class="col-auto">
                          <!-- Select -->
                          <div class="tom-select-custom tom-select-custom-end">
                            <select
                              class="js-select js-datatable-filter form-select form-select-sm form-select-borderless"
                              data-target-column-index="2" data-target-table="datatable" autocomplete="off"
                              data-hs-tom-select-options='{
                                "searchInDropdown": false,
                                "hideSearch": true,
                                "dropdownWidth": "10rem"
                              }'>
                              <option value="null" selected>All</option>
                              <option value="Free">New</option>
                              <option value="Libur">Libur</option>
                              <option value="Sibuk">Sibuk</option>
                            </select>
                          </div>
                          <!-- End Select -->
                        </div>
                        <!-- End Col -->
                      </div>
                      <!-- End Row -->
                    </div>

                    <div class="col-md">
                      <form>
                        <!-- Search -->
                        <div class="input-group input-group-merge input-group-flush">
                          <div class="input-group-prepend input-group-text" style="position: relative; z-index: 1;">
                            <i class="bi-search"></i>
                          </div>
                          <input id="datatableSearch" v-model="poFilter" type="search" class="form-control" placeholder="Cari Sales Order..."
                            aria-label="Search users">
                        </div>
                        <!-- End Search -->
                      </form>
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Filter -->
                </div>
                <!-- End Col -->
              </div>
              <!-- End Row -->
            </div>
            <!-- End Header -->

            <!-- Table -->
            <div class="table-responsive datatable-custom">
              <table id="datatable"
                class="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                >
                <thead class="thead-light px-3">
                  <tr>
                    <th class="table-column-ps-2 text-center text-dark">Supplier</th>
                    <th class="text-dark text-center">Requester</th>
                    <th class="text-dark">Tgl. Order</th>
                    <th class="text-dark">Qty</th>
                    <th class="text-dark">Status</th>
                  </tr>
                </thead>

                <tbody class="px-3">
                  <tr v-for="po in poFilteredData">
                    <td class="table-column-ps-0">
                      <a class="d-flex align-items-center" href="user-profile.html">
                        <div class="flex-shrink-0">
                          <div class="avatar avatar-sm avatar-soft-primary avatar-circle">
                            <span class="avatar-initials">{{ po.PoSupplier.userName.charAt(0) }}</span>
                          </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h5 class="text-inherit mb-0">{{ po.PoSupplier.userName }}</h5>
                        </div>
                      </a>
                    </td>
                    <td class="text-center">{{ po.PoUserCreated.userName }}</td>
                    <td>{{ formatIndDate(po.poDate) }}</td>
                    <td>{{ poTotal(po.PoItemDetails) }}</td>
                    <td>
                      <span class="legend-indicator bg-success"></span>New
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- End Table -->

            <!-- Footer -->
            <div class="card-footer">
              <!-- Pagination -->
              <div class="row justify-content-center justify-content-sm-between align-items-sm-center">
                <div class="col-sm mb-2 mb-sm-0">
                  <div class="d-flex justify-content-center justify-content-sm-start align-items-center">
                    <span class="me-2">Showing:</span>

                    <!-- Select -->
                    <div class="tom-select-custom">
                      <select id="datatableEntries" class="js-select form-select form-select-borderless w-auto"
                        autocomplete="off" data-hs-tom-select-options='{
                          "searchInDropdown": false,
                          "hideSearch": true
                        }'>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8" selected>8</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <!-- End Select -->

                    <span class="text-secondary me-2">of</span>

                    <!-- Pagination Quantity -->
                    <span id="datatableWithPaginationInfoTotalQty"></span>
                    <span class="ps-2">{{ poList.length }} Data</span>
                  </div>
                </div>
                <!-- End Col -->

                <div class="col-sm-auto">
                  <div class="d-flex justify-content-center justify-content-sm-end">
                    <!-- Pagination -->
                    <nav id="datatablePagination" aria-label="Activity pagination"></nav>
                  </div>
                </div>
                <!-- End Col -->
              </div>
              <!-- End Pagination -->
            </div>
            <!-- End Footer -->
          </div>
        </div>

      </div>


      <div class="row d-none">
        <div class="col-lg-12 mb-3 mb-lg-5">
          <!-- Card -->
          <div class="card h-100">
            <!-- Header -->
            <div class="card-header card-header-content-sm-between">
              <h4 class="card-header-title mb-2 mb-sm-0">Grafik Bulanan</h4>

              <!-- Nav -->
              <ul class="nav nav-segment nav-fill" id="expensesTab" role="tablist">
                <li class="nav-item" data-bs-toggle="chart-bar" data-datasets="thisWeek" data-trigger="click"
                  data-action="toggle">
                  <a class="nav-link active" href="javascript:;" data-bs-toggle="tab">This Year</a>
                </li>
                <li class="nav-item" data-bs-toggle="chart-bar" data-datasets="lastWeek" data-trigger="click"
                  data-action="toggle">
                  <a class="nav-link" href="javascript:;" data-bs-toggle="tab">Last Year</a>
                </li>
              </ul>
              <!-- End Nav -->
            </div>
            <!-- End Header -->

            <!-- Body -->
            <div class="card-body">
              <div class="row mb-4">
                <div class="col-sm mb-2 mb-sm-0">
                  <div class="d-flex align-items-center">
                    <span class="h1 mb-0">35%</span>
                    <span class="text-success ms-2">
                      <i class="bi-graph-up"></i> 25.3%
                    </span>
                  </div>
                </div>
                <!-- End Col -->

                <div class="col-sm-auto align-self-sm-end">
                  <div class="row fs-6 text-body">
                    <div class="col-auto">
                      <span class="legend-indicator bg-primary"></span> Pendapatan
                    </div>
                    <!-- End Col -->

                    <div class="col-auto">
                      <span class="legend-indicator bg-danger"></span> Pengeluaran
                    </div>
                    <!-- End Col -->
                  </div>
                  <!-- End Row -->
                </div>
                <!-- End Col -->
              </div>
              <!-- End Row -->

              <!-- Bar Chart -->
              <div class="chartjs-custom">
                <chart-component :chartData="chartData" />
              </div>
              <!-- End Bar Chart -->
            </div>
            <!-- End Body -->
          </div>
          <!-- End Card -->
        </div>
        <!-- End Col -->
      </div>
    </div>
    <!-- End Content -->

  </main>
</template>
<script>
import chartComponent from '../components/chartComponent.vue';
import { formatIndDate } from '../components/function/date.js'
// @ is an alias to /src
import { getF, getH, getL } from '../components/services/components'
export default {
  components: {
    chartComponent
  },
  name: 'home',
  data() {
    return {
      currentMonth: '',
      prevMonth: '',
      soFilter: '',
      poFilter: '',
      soList: [],
      poList: [],
      notEmpty: true,
      chartData: null,
      // chartTahun: {
      //   labels: ["Jan", "Feb", "Mar", "Apr"],
      //   datasets: [
      //     {

      //       label: "Awal Periode",
      //       data: [0, 1, 2, 300000],
      //       backgroundColor: "#377dff",
      //       hoverBackgroundColor: "#377dff",
      //       borderColor: "#377dff",
      //       maxBarThickness: "40"
      //     },
      //     {
      //       label: "Akhir Periode",
      //       data: [0, 1, 2, 250000],
      //       backgroundColor: "#ED4C78",
      //       borderColor: "#ED4C78",
      //       maxBarThickness: "40"
      //     }
      //   ]
      // },

      editableDate: '',
      data: '',
      saldoAwal: '0',
      transIn: '0',
      transOut: '0',
      saldoAkhir: '0',

      lastMonthData: '',
      lastSaldoAwal: '0',
      lastTransIn: '0',
      lastTransOut: '0',
      lastSaldoAkhir: '0',
    }
  },
  computed: {
    soTotal() {
      let sum = 0;
      for (const item of this.soList) {
        for (const subItem of item.transPesanan) {
          // Convert qty to a number and add it to the sum
          sum += parseInt(subItem.itemQty);
        }
      }
      return sum;
    },
    poTotalAll() {
      let sum = 0;
      for (const item of this.poList) {
        for (const subItem of item.PoItemDetails) {
          // Convert qty to a number and add it to the sum
          sum += parseInt(subItem.itemQty);
        }
      }
      return sum;
    },
    soFilteredData() {
      const searchText = this.soFilter.toLowerCase();
      return this.soList.filter(item => {
        // Check if any property of the item includes the search text
        for (const key in item) {
          if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchText)) {
            return true;
          }
        }
        return false;
      });
    },
    poFilteredData() {
      const searchText = this.poFilter.toLowerCase();
      return this.poList.filter(item => {
        // Check if any property of the item includes the search text
        for (const key in item) {
          if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchText)) {
            return true;
          }
        }
        return false;
      });
    },
    // fixChartData() {
    //   const newData = {
    //     ...this.chartData,
    //   }
    //   newData.labels = this.data.saldoAwal.map(x => x.coaName)
    //   newData.datasets[0].data = this.data.saldoAwal.map(x => parseInt(x.FaPriceBegining))
    //   newData.datasets[1].data = this.data.saldoAkhir.map(x => parseInt(x.FaPriceEnd))
    //   return newData
    // }
  },
  async mounted() {
    this.soList = await getH()
    this.poList = await getL()
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth()+1).toString().padStart(2, '0');
    let month1 = currentDate.getMonth().toString().padStart(2, '0');
    this.editableDate = year+'-'+month
    this.data = await getF(year, month)
    this.lastMonthData = await getF(year, month1)
    this.getChartData(this.data)
    console.log('tes', this.chartData)
    this.getAllData()
    this.getLastMonthData()
    this.$store.commit('setTopbarTitle', "Dashboard ");
  },
  methods: {
    formatIndDate(date) {
      return formatIndDate(date)
    },
    getChartData(data) {
      let label = []
      let saldoAwal = []
      let saldoAkhir = []
      if (data) {
      label = data.saldoAwal.map(x => x.coaName)
      saldoAwal = data.saldoAwal.map(x => parseInt(x.FaPriceBegining))
      saldoAkhir = data.saldoAkhir.map(x => parseInt(x.FaPriceEnd))
      }
      this.chartData= {
        class: 'canvasHeight300',
        labels: label,
        datasets: [
          {
            label: "Saldo Awal Periode",
            data: saldoAwal,
            backgroundColor: "#377dff",
            hoverBackgroundColor: "#377dff",
            borderColor: "#377dff",
            maxBarThickness: "50"
          },
          {

            label: "Saldo Akhir Periode",
            data: saldoAkhir,
            backgroundColor: "#FE8638",
            borderColor: "#FE8638",
            maxBarThickness: "50"
          }
        ]
      }
    },
    poTotal(data) {
      console.log(data)
      let sum = 0;
        for (const subItem of data) {
          // Convert qty to a number and add it to the sum
          sum += parseInt(subItem.itemQty);
        }
        return sum
    },
    getAllData() {
      if (this.checkObject(this.data)) {
        this.saldoAwal = this.data.saldoAwal.reduce((sum, data) => sum + parseInt(data.FaPriceBegining), 0)
        this.saldoAkhir = this.data.saldoAkhir.reduce((sum, data) => sum + parseInt(data.FaPriceEnd), 0)
        this.transIn = this.data.In.reduce((sum, data) => sum + parseInt(data.totalAmount), 0)
        this.transOut = this.data.out.reduce((sum, data) => sum + parseInt(data.totalAmount), 0)
        console.log(this.saldoAwal, this.saldoAkhir, this.transIn, this.transOut)
      }
    },
    getLastMonthData() {
      if (this.checkObject(this.lastMonthData)) {
        this.lastSaldoAwal = this.lastMonthData.saldoAwal.reduce((sum, data) => sum + parseInt(data.FaPriceBegining), 0)
        this.lastSaldoAkhir = this.lastMonthData.saldoAkhir.reduce((sum, data) => sum + parseInt(data.FaPriceEnd), 0)
        this.lastTransIn = this.lastMonthData.In.reduce((sum, data) => sum + parseInt(data.totalAmount), 0)
        this.lastTransOut = this.lastMonthData.out.reduce((sum, data) => sum + parseInt(data.totalAmount), 0)
      }
    },
    async refreshData() {
      let prevYear = ''
      let prevMonth = ''
        const [year, month] = this.editableDate.split('-');
        if (month > 1) {
          prevMonth = month - 1
          prevYear = year
        } else {
          prevMonth = 12
          prevYear = year
        }
        // alert('prevMonth', prevYear)
      const currentData = await getF(year, month)
      const prevData = await getF(prevYear, (prevMonth).toString().padStart(2, '0'))
      console.log('cok',prevData)
      if (currentData) {
        this.data = currentData
        this.lastMonthData = prevData
        // console.log(this.lastMonthData)
        this.notEmpty = true
        this.getAllData()
        this.getLastMonthData()
        this.getChartData(this.data)
      } else{
        this.notEmpty = false,
        this.data = {saldoAwal: [], saldoAkhir: []}
    }
    },
    formatPrice(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    formatNumber(value) {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue)) {
        return value; // Return the original string value if it's not a valid number
      }
      const parts = floatValue.toFixed(2).toString().split('.');
      const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

      if (parts.length > 1) {
        return `${wholePart},${parts[1]}`;
      } else {
        return wholePart;
      }
    },
    checkObject(data) {
      return Object.values(data).length > 0;
    }
  }
};
</script>
