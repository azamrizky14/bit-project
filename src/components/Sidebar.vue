<template>
  <!-- Navbar Vertical -->

  <aside
    class="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered bg-white m-0 ">
    <div class="navbar-vertical-container">
      <div class="navbar-vertical-footer-offset d-flex flex-wrap">
        <!-- Logo -->
        <router-link to="/dashboard" data-toggle="collapse" data-target="#dashboard_dr">
          <a class="navbar-brand" href="#" aria-label="Front">
            <img class="navbar-brand-logo" src="/assets/img/logo.png" alt="Logo" data-hs-theme-appearance="default"
              style="max-width: 11rem">
            <img class="navbar-brand-logo" src="/assets/img/logo.png" alt="Logo" data-hs-theme-appearance="dark"
              style="max-width: 11rem">
            <img class="navbar-brand-logo-mini" src="/assets/img/logo-mini.png" alt="Logo"
              data-hs-theme-appearance="default" style="max-width: 11rem">
            <img class="navbar-brand-logo-mini" src="/assets/img/logo-mini.png" alt="Logo" data-hs-theme-appearance="dark"
              style="max-width: 11rem">
          </a>
        </router-link>

        <!-- End Logo -->

        <!-- Navbar Vertical Toggle -->
        <button type="button" class="js-navbar-vertical-aside-toggle-invoker navbar-aside-toggler">
          <i class="bi-arrow-bar-left navbar-toggler-short-align"
            data-bs-template='<div class="tooltip d-none d-md-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            data-bs-toggle="tooltip" data-bs-placement="right" title="Collapse"></i>
          <i class="bi-arrow-bar-right navbar-toggler-full-align"
            data-bs-template='<div class="tooltip d-none d-md-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            data-bs-toggle="tooltip" data-bs-placement="right" title="Expand"></i>
        </button>

        <!-- End Navbar Vertical Toggle -->

        <!-- Content -->
        <div class="navbar-vertical-content w-100">
          <div id="navbarVerticalMenu" class="nav nav-pills nav-vertical card-navbar-nav pt-0">
            <div class="nav-item">
              <router-link to="/dashboard" data-toggle="collapse" data-target="#usaha">
                <a class="nav-link " href="#" data-placement="left">
                  <i class="bi-house-door nav-icon"></i>
                  <span class="nav-link-title">Dashboard</span>
                </a>
              </router-link>
            </div>

            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#masterDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#masterDropdown" aria-expanded="false" aria-controls="masterDropdown">
                <i class="bi-stack nav-icon"></i>
                <span class="nav-link-title">Master</span>
              </a>
              <div id="masterDropdown" class="nav-collapse collapse " data-bs-parent="#masterDropdown">
                <router-link to="/master/coa">
                  <router-link to="/master/usaha">
                    <a class="nav-link " href="#">1. Setup Perusahaan</a>
                  </router-link>
                  <a class="nav-link " href="#">2. COA</a>
                </router-link>
                <router-link to="/master/data-customer">
                  <a class="nav-link " href="#">3. Customer</a>
                </router-link>
                <router-link to="/master/supplier">
                  <a class="nav-link " href="#">4. Supplier</a>
                </router-link>
                <router-link to="/master/user">
                  <a class="nav-link " href="#">5. User</a>
                </router-link>
                <router-link to="/master/item">
                  <a class="nav-link " href="#">6. Master Item</a>
                </router-link>
                <router-link to="/master/formula">
                  <a class="nav-link " href="#">7. Formula</a>
                </router-link>
                <router-link to="/master/mapping-location">
                  <a class="nav-link " href="#">8. Mapping Location</a>
                </router-link>
                <router-link to="/master/period">
                  <a class="nav-link " href="#">9. Period</a>
                </router-link>
                <router-link to="/master/routing">
                  <a class="nav-link " href="#">10. Routing</a>
                </router-link>
                <router-link to="/master/setup">
                  <a class="nav-link " href="#">11. Setup</a>
                </router-link>
                <router-link to="/master/credit-terms">
                  <a class="nav-link " href="#">12. Credit Terms</a>
                </router-link>
                <router-link to="/master/cost-center">
                  <a class="nav-link " href="#">13. Cost Center</a>
                </router-link>
              </div>

            </div>
            <!-- Collapse -->
            <div class="nav-item d-none">
              <a class="nav-link dropdown-toggle " href="#laporanDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#laporanDropdown" aria-expanded="false" aria-controls="laporanDropdown">
                <i class="bi-arrow-left-right nav-icon"></i>
                <span class="nav-link-title">Transaksi</span>
              </a>

              <div id="laporanDropdown" class="nav-collapse collapse " data-bs-parent="#laporanDropdown">
                <router-link to="/transaksi/bill-of-material">
                  <router-link to="/transaksi/sales-order">
                    <a class="nav-link " href="#">1. Sales Order</a>
                  </router-link>
                  <!-- <router-link to="/transaksi/production-planning">
                    <a class="nav-link " href="#">2. Production Planning</a>
                  </router-link> -->
                  <router-link to="/transaksi/wip-workorder">
                    <a class="nav-link " href="#">3. Work Order</a>
                  </router-link>
                  <a class="nav-link " href="#">4. Bill of Material (BoM)</a>
                </router-link>
                <!-- <router-link to="/transaksi/production-report">
                  <a class="nav-link " href="#">5. Production Report</a>
                </router-link> -->
                <router-link to="/transaksi/shipment">
                  <a class="nav-link " href="#">6. Shipment</a>
                </router-link>
                <router-link to="/transaksi/purchase-request">
                  <a class="nav-link " href="#">7. Purchase Request</a>
                </router-link>
                <router-link to="/transaksi/po">
                  <a class="nav-link " href="#">8. Purchase Order</a>
                </router-link>
                <router-link to="/transaksi/po-receipt">
                  <a class="nav-link " href="#">9. Purchase Order Receipt</a>
                </router-link>
                <!-- <router-link to="/transaksi/qc-material-inspection">
                  <a class="nav-link " href="#">10. QC Inspection</a>
                </router-link> -->
                <router-link to="/transaksi/po-invoice">
                  <a class="nav-link " href="#">11. Purchase Order Invoice</a>
                </router-link>
                <router-link to="/transaksi/po-payment">
                  <a class="nav-link " href="#">12. Purchase Payment</a>
                </router-link>
                <router-link to="/transaksi/kasbank">
                  <a class="nav-link " href="#">13. Kasbank</a>
                </router-link>
                <!-- <router-link to="/transaksi/kasbank-v2">
                    <a class="nav-link " href="#">13,5. Kasbank V2</a>
                  </router-link> -->
                <!-- <router-link to="/transaksi/good-receipt">
                    <a class="nav-link " href="#">Good Receipt</a>
                  </router-link> -->
                <router-link to="/transaksi/jurnal-entry">
                  <a class="nav-link " href="#">Jurnal Entry</a>
                </router-link>
                <!-- <router-link to="/transaksi/inventory-adjusment">
                  <a class="nav-link " href="#">Inventory Adjusment</a>
                </router-link> -->
                <!-- <router-link to="/transaksi/material-issue">
                  <a class="nav-link " href="#">Material Issue</a>
                </router-link> -->
                <!-- <router-link to="/transaksi/fixed-asset">
                  <a class="nav-link " href="#">Fixed Asset</a>
                </router-link> -->
                <!-- <router-link to="/transaksi/material-release">
                  <a class="nav-link " href="#">Material Release</a>
                </router-link> -->
                <!-- <router-link to="/transaksi/product-return">
                  <a class="nav-link " href="#">Product Return</a>
                </router-link>
                <router-link to="/transaksi/po-return">
                  <a class="nav-link " href="#">Purchase Order Return</a>
                </router-link> -->
                <router-link to="/transaksi/sales-invoice">
                  <a class="nav-link " href="#">Sales Invoice</a>
                </router-link>
              </div>
            </div>

            <!-- sales -->
            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#salesDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#salesDropdown" aria-expanded="false" aria-controls="salesDropdown">
                <i class="bi-shop nav-icon"></i>
                <span class="nav-link-title">Sales</span>
              </a>

              <div id="salesDropdown" class="nav-collapse collapse " data-bs-parent="#salesDropdown">
                <router-link to="/master/data-customer">
                  <a class="nav-link " href="#">Master Customer</a>
                </router-link>
                <router-link to="/transaksi/sales-order">
                  <a class="nav-link " href="#">Sales Order</a>
                </router-link>
                <router-link to="/transaksi/purchase-request">
                  <a class="nav-link " href="#">Purchase Request</a>
                </router-link>
              </div>

            </div>

            <!-- finance -->
            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#financeDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#financeDropdown" aria-expanded="false" aria-controls="financeDropdown">
                <i class="bi-cash-stack nav-icon"></i>
                <span class="nav-link-title">Finance</span>
              </a>

              <div id="financeDropdown" class="nav-collapse collapse " data-bs-parent="#financeDropdown">
                <router-link to="/transaksi/kasbank">
                  <a class="nav-link " href="#">Kasbank</a>
                </router-link>
                <router-link to="/transaksi/jurnal-entry">
                  <a class="nav-link " href="#">Jurnal Entry</a>
                </router-link>
                <router-link to="/transaksi/po-invoice">
                  <a class="nav-link " href="#">Purchase Order Invoice</a>
                </router-link>
                <router-link to="/transaksi/po-payment">
                  <a class="nav-link " href="#">Purchase Payment</a>
                </router-link>
                <router-link to="/transaksi/sales-invoice">
                  <a class="nav-link " href="#">Sales Invoice</a>
                </router-link>
                <router-link to="/transaksi/purchase-request">
                  <a class="nav-link " href="#">Purchase Request</a>
                </router-link>
              </div>

            </div>
            <!-- produksi -->
            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#produksiDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#produksiDropdown" aria-expanded="false" aria-controls="produksiDropdown">
                <i class="bi-boxes nav-icon"></i>
                <span class="nav-link-title">Produksi</span>
              </a>

              <div id="produksiDropdown" class="nav-collapse collapse " data-bs-parent="#produksiDropdown">
                  <router-link to="/transaksi/wip-workorder">
                    <a class="nav-link " href="#">Work Order</a>
                  </router-link>
                  <a class="nav-link " href="#">Bill of Material (BoM)</a>
                </router-link>
                <router-link to="/transaksi/purchase-request">
                  <a class="nav-link " href="#">Purchase Request</a>
                </router-link>
              </div>

            </div>
            <!-- gudang -->
            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#gudangDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#gudangDropdown" aria-expanded="false" aria-controls="gudangDropdown">
                <i class="bi-house nav-icon"></i>
                <span class="nav-link-title">Gudang</span>
              </a>

              <div id="gudangDropdown" class="nav-collapse collapse " data-bs-parent="#gudangDropdown">
                <router-link to="/gudang/kasbank-v2">
                  </router-link>
                  <a class="nav-link " href="#">Bill of Material (Pelayanan)</a>
                </router-link>
                <router-link to="/transaksi/po-receipt">
                  <a class="nav-link " href="#">Purchase Order Receipt</a>
                </router-link>
                <router-link to="/transaksi/shipment">
                  <a class="nav-link " href="#">Shipment</a>
                </router-link>
                <router-link to="/transaksi/purchase-request">
                  <a class="nav-link " href="#">Purchase Request</a>
                </router-link>
              </div>

            </div>
            <!-- pembelian -->
            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#pembelianDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#pembelianDropdown" aria-expanded="false" aria-controls="pembelianDropdown">
                <i class="bi-cart3 nav-icon"></i>
                <span class="nav-link-title">Pembelian</span>
              </a>

              <div id="pembelianDropdown" class="nav-collapse collapse " data-bs-parent="#pembelianDropdown">
                <router-link to="/transaksi/po">
                  <a class="nav-link " href="#">Purchase Order</a>
                </router-link>
                <router-link to="/transaksi/po-invoice">
                  <a class="nav-link " href="#">Purchase Order Invoice</a>
                </router-link>
                <router-link to="/transaksi/purchase-request">
                  <a class="nav-link " href="#">Purchase Request</a>
                </router-link>
              </div>

            </div>
            <!-- browse -->
            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#browseDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#browseDropdown" aria-expanded="false" aria-controls="browseDropdown">
                <i class="bi-distribute-vertical nav-icon"></i>
                <span class="nav-link-title">Browse</span>
              </a>

              <div id="browseDropdown" class="nav-collapse collapse " data-bs-parent="#browseDropdown">
                <router-link to="/browse/kasbank-v2">
                  <a class="nav-link " href="#">2. Transaksi Bulanan</a>
                </router-link>
                <router-link to="/browse/transaksi-harian">
                  <a class="nav-link " href="#">3. Kasbank Harian</a>
                </router-link>
              </div>

            </div>
            <div class="nav-item">
              <a class="nav-link dropdown-toggle " href="#reportDropdown" role="button" data-bs-toggle="collapse"
                data-bs-target="#reportDropdown" aria-expanded="false" aria-controls="reportDropdown">
                <i class="bi-file-text nav-icon"></i>
                <span class="nav-link-title">Laporan</span>
              </a>

              <div id="reportDropdown" class="nav-collapse collapse " data-bs-parent="#reportDropdown">
                <router-link to="/report/kasbank-v2">
                  <a class="nav-link " href="#">1. Mutasi Bulanan</a>
                </router-link>
                <router-link to="/report/report-neraca-saldo">
                  <a class="nav-link " href="#">2. Neraca Saldo</a>
                </router-link>
                <router-link to="/report/transaksi-harian">
                  <a class="nav-link " href="#">3. Kasbank Harian</a>
                </router-link>
                <router-link to="/report/transaksi-voucher">
                  <a class="nav-link " href="#">4. Kasbank By Voucher</a>
                </router-link>
                <router-link to="/report/inventory">
                  <a class="nav-link " href="#">5. Inventory</a>
                </router-link>
                <router-link to="/report/inventory-stock-detail">
                  <a class="nav-link " href="#">6. Inventory Stock Detail</a>
                </router-link>
              </div>

            </div>
            <!-- End Collapse -->
          </div>

        </div>
        <!-- End Content -->

        <!-- Footer -->
        <div class="navbar-vertical-footer">
          <ul class="navbar-vertical-footer-list">
            <li class="navbar-vertical-footer-list-item">
              <!-- Style Switcher -->
              <div class="dropdown dropup">
                <button type="button" class="btn btn-ghost-secondary btn-icon rounded-circle" id="selectThemeDropdown"
                  data-bs-toggle="dropdown" aria-expanded="false" data-bs-dropdown-animation>

                </button>

                <div class="dropdown-menu navbar-dropdown-menu navbar-dropdown-menu-borderless"
                  aria-labelledby="selectThemeDropdown">
                  <a class="dropdown-item" href="#" data-icon="bi-brightness-high" data-value="default">
                    <i class="bi-brightness-high me-2"></i>
                    <span class="text-truncate" title="Light Mode">Light Mode</span>
                  </a>
                  <a class="dropdown-item" href="#" data-icon="bi-moon-stars" data-value="auto">
                    <i class="bi-moon-stars me-2"></i>
                    <span class="text-truncate" title="Dark Mode">Dark Mode</span>
                  </a>
                </div>
              </div>

              <!-- End Style Switcher -->
            </li>

            <li class="navbar-vertical-footer-list-item">
              <!-- Other Links -->
              <div class="dropdown dropup">
                <button type="button" class="btn btn-ghost-secondary btn-icon rounded-circle" id="otherLinksDropdown"
                  data-bs-toggle="dropdown" aria-expanded="false" data-bs-dropdown-animation>
                  <i class="bi-info-circle"></i>
                </button>

                <div class="dropdown-menu navbar-dropdown-menu-borderless" aria-labelledby="otherLinksDropdown">
                  <span class="dropdown-header">Help</span>
                  <a class="dropdown-item" href="#">
                    <i class="bi-journals dropdown-item-icon"></i>
                    <span class="text-truncate" title="Resources &amp; tutorials">Resources &amp; tutorials</span>
                  </a>
                  <a class="dropdown-item" href="https://letsredi.id" target="_blank">
                    <i class="bi-gift dropdown-item-icon"></i>
                    <span class="text-truncate" title="What's new?">What's new?</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <span class="dropdown-header">Contacts</span>
                  <a class="dropdown-item"
                    href="https://api.whatsapp.com/send/?phone=6285935000057&text=Saya+tertarik+dengan+produk+REDI&type=phone_number&app_absent=0"
                    target="_blank">
                    <i class="bi-chat-left-dots dropdown-item-icon"></i>
                    <span class="text-truncate" title="Contact support">Contact support</span>
                  </a>
                </div>
              </div>
              <!-- End Other Links -->
            </li>

            <li class="navbar-vertical-footer-list-item">
              <!-- Language -->

              <!-- <div class="dropdown dropup">
                <button type="button" class="btn btn-ghost-secondary btn-icon rounded-circle" id="selectLanguageDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-dropdown-animation>
                  <img class="avatar avatar-xss avatar-circle" src="/assets/vendor/flag-icon-css/flags/1x1/us.svg" alt="United States Flag">
                </button>

                <div class="dropdown-menu navbar-dropdown-menu-borderless" aria-labelledby="selectLanguageDropdown">
                  <span class="dropdown-header">Select language</span>
                  <a class="dropdown-item" href="#">
                    <img class="avatar avatar-xss avatar-circle me-2" src="/assets/vendor/flag-icon-css/flags/1x1/us.svg" alt="Flag">
                    <span class="text-truncate" title="English">English (US)</span>
                  </a>
                  <a class="dropdown-item" href="#">
                    <img class="avatar avatar-xss avatar-circle me-2" src="/assets/vendor/flag-icon-css/flags/1x1/gb.svg" alt="Flag">
                    <span class="text-truncate" title="English">English (UK)</span>
                  </a>
                  <a class="dropdown-item" href="#">
                    <img class="avatar avatar-xss avatar-circle me-2" src="/assets/vendor/flag-icon-css/flags/1x1/de.svg" alt="Flag">
                    <span class="text-truncate" title="Deutsch">Deutsch</span>
                  </a>
                  <a class="dropdown-item" href="#">
                    <img class="avatar avatar-xss avatar-circle me-2" src="/assets/vendor/flag-icon-css/flags/1x1/dk.svg" alt="Flag">
                    <span class="text-truncate" title="Dansk">Dansk</span>
                  </a>
                  <a class="dropdown-item" href="#">
                    <img class="avatar avatar-xss avatar-circle me-2" src="/assets/vendor/flag-icon-css/flags/1x1/it.svg" alt="Flag">
                    <span class="text-truncate" title="Italiano">Italiano</span>
                  </a>
                  <a class="dropdown-item" href="#">
                    <img class="avatar avatar-xss avatar-circle me-2" src="/assets/vendor/flag-icon-css/flags/1x1/cn.svg" alt="Flag">
                    <span class="text-truncate" title="中文 (繁體)">中文 (繁體)</span>
                  </a>
                </div>
              </div> -->

              <!-- End Language -->
            </li>
          </ul>
        </div>
        <!-- End Footer -->
      </div>
    </div>
  </aside>

  <!-- End Navbar Vertical -->
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      auth: false,
    }
  },
  mounted() {
    (function () {
      // STYLE SWITCHER
      // =======================================================
      const $dropdownBtn = document.getElementById('selectThemeDropdown') // Dropdowon trigger
      const $variants = document.querySelectorAll(`[aria-labelledby="selectThemeDropdown"] [data-icon]`) // All items of the dropdown

      // Function to set active style in the dorpdown menu and set icon for dropdown trigger
      const setActiveStyle = function () {
        $variants.forEach($item => {
          if ($item.getAttribute('data-value') === HSThemeAppearance.getOriginalAppearance()) {
            $dropdownBtn.innerHTML = `<i class="${$item.getAttribute('data-icon')}" />`
            return $item.classList.add('active')
          }

          $item.classList.remove('active')
        })
      }

      // Add a click event to all items of the dropdown to set the style
      $variants.forEach(function ($item) {
        $item.addEventListener('click', function () {
          HSThemeAppearance.setAppearance($item.getAttribute('data-value'))
        })
      })

      // Call the setActiveStyle on load page
      setActiveStyle()

      // Add event listener on change style to call the setActiveStyle function
      window.addEventListener('on-hs-appearance-change', function () {
        setActiveStyle()
      })

      localStorage.removeItem('hs_theme')

      window.onload = function () {


        // INITIALIZATION OF NAVBAR VERTICAL ASIDE
        // =======================================================
        new HSSideNav('.js-navbar-vertical-aside').init()


        // INITIALIZATION OF FORM SEARCH
        // =======================================================
        const HSFormSearchInstance = new HSFormSearch('.js-form-search')

        if (HSFormSearchInstance.collection.length) {
          HSFormSearchInstance.getItem(1).on('close', function (el) {
            el.classList.remove('top-0')
          })

          document.querySelector('.js-form-search-mobile-toggle').addEventListener('click', e => {
            let dataOptions = JSON.parse(e.currentTarget.getAttribute('data-hs-form-search-options')),
              $menu = document.querySelector(dataOptions.dropMenuElement)

            $menu.classList.add('top-0')
            $menu.style.left = 0
          })
        }


        // INITIALIZATION OF BOOTSTRAP DROPDOWN
        // =======================================================
        HSBsDropdown.init()


        // INITIALIZATION OF CHARTJS
        // =======================================================
        HSCore.components.HSChartJS.init('.js-chart')


        // INITIALIZATION OF CHARTJS
        // =======================================================
        HSCore.components.HSChartJS.init('#updatingBarChart')
        const updatingBarChart = HSCore.components.HSChartJS.getItem('updatingBarChart')



        // INITIALIZATION OF CHARTJS
        // =======================================================
        HSCore.components.HSChartJS.init('.js-chart-datalabels', {
          plugins: [ChartDataLabels],
          options: {
            plugins: {
              datalabels: {
                anchor: function (context) {
                  var value = context.dataset.data[context.dataIndex];
                  return value.r < 20 ? 'end' : 'center';
                },
                align: function (context) {
                  var value = context.dataset.data[context.dataIndex];
                  return value.r < 20 ? 'end' : 'center';
                },
                color: function (context) {
                  var value = context.dataset.data[context.dataIndex];
                  return value.r < 20 ? context.dataset.backgroundColor : context.dataset.color;
                },
                font: function (context) {
                  var value = context.dataset.data[context.dataIndex],
                    fontSize = 25;

                  if (value.r > 50) {
                    fontSize = 35;
                  }

                  if (value.r > 70) {
                    fontSize = 55;
                  }

                  return {
                    weight: 'lighter',
                    size: fontSize
                  };
                },
                formatter: function (value) {
                  return value.r
                },
                offset: 2,
                padding: 0
              }
            },
          }
        })

        // INITIALIZATION OF SELECT
        // =======================================================
        HSCore.components.HSTomSelect.init('.js-select')


        // INITIALIZATION OF CLIPBOARD
        // =======================================================
        HSCore.components.HSClipboard.init('.js-clipboard')
      }

        (function () {
          // STYLE SWITCHER
          // =======================================================
          const $dropdownBtn = document.getElementById('selectThemeDropdown') // Dropdowon trigger
          const $variants = document.querySelectorAll(`[aria-labelledby="selectThemeDropdown"] [data-icon]`) // All items of the dropdown

          // Function to set active style in the dorpdown menu and set icon for dropdown trigger
          const setActiveStyle = function () {
            $variants.forEach($item => {
              if ($item.getAttribute('data-value') === HSThemeAppearance.getOriginalAppearance()) {
                $dropdownBtn.innerHTML = `<i class="${$item.getAttribute('data-icon')}" />`
                return $item.classList.add('active')
              }

              $item.classList.remove('active')
            })
          }

          // Add a click event to all items of the dropdown to set the style
          $variants.forEach(function ($item) {
            $item.addEventListener('click', function () {
              HSThemeAppearance.setAppearance($item.getAttribute('data-value'))
            })
          })

          // Call the setActiveStyle on load page
          setActiveStyle()

          // Add event listener on change style to call the setActiveStyle function
          window.addEventListener('on-hs-appearance-change', function () {
            setActiveStyle()
          })
        })()

    })()

  },
  created() {
    this.$store.dispatch('fetchMyArray');
  },
  computed: {
    ...mapState({
      dataUsaha: state => state.dataUsaha
    })

  }
};
</script>

