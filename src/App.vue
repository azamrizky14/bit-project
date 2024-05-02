<template>
  <div v-if="$route.name ==='login'">
      <router-view></router-view>
  </div>
  <div v-else-if="this.$route.name ==='register'">
      <router-view></router-view>
  </div>
  <div id="app" v-else>
    <Topbar style="z-index: 3;" />
    <Sidebar style="z-index: 3;" />
    <router-view style="z-index: 1;" />
  </div>
</template>
<script>
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'app',
    components: {
        Topbar,
        Sidebar,
        Footer
    },
    data() {
        return {

        }
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn;
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push('/');
            });
        }
    },
};

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>/* Style the list */
.active .page-link {
  z-index: 1 !important
}
/* .multiselect-md .multiselect__tags {
  min-height: 30px;
  padding: 8px;
  line-height: 0;
} */
.dropdown-without-icon .dropdown-toggle::after {
  content: none; /* Remove the triangle icon */
}
.disabled-link {
  /* Add styles to visually indicate that the link is disabled */
  color: #999; /* Change the color to a muted gray */
  cursor: not-allowed; /* Change the cursor to indicate it's not clickable */
  pointer-events: none; /* Disable mouse events on the element */
  text-decoration: none; /* Remove underline (optional, based on your preference) */
}
ul.breadcrumb {
  list-style: none;
}

/* Display list items side by side */
ul.breadcrumb li {
  display: inline;
  font-size: 11px;
}

/* Add a slash symbol (/) before/behind each list item */
ul.breadcrumb li+li:before {
  padding: 0 8px;
  color: black;
  content: "/\00a0";
}

/* Add a color to all links inside the list */
ul.breadcrumb li a {
  color: #0275d8;
  text-decoration: none;
}

/* Add a color on mouse-over */
ul.breadcrumb li a:hover {
  color: #01447e;
  text-decoration: underline;
}
.form-row {
  display: flex;
  align-items: center
}
.form-control-sm {
  min-height: 2em !important; 
}
.footer-offset {
  margin-bottom: 0 !important 
}
body {
  margin-bottom: 0;
  min-height: 100vh;
}
#header {
  scale: 0.9;
  transform-origin: left top;
  width: 92%;
}
#content .container-fluid {
  padding-left: 0;
  padding-top: 0;
}
.js-navbar-vertical-aside {
  scale: 0.9;
  transform-origin: top left;
  height: 110%;
}
.scale-9 {
  scale: 0.9;
  transform-origin: left top;
  width: 110%;
}
.footer {
  scale: 0.9;
    transform-origin: bottom left;
}
.dataTables_wrapper .pagination {
  display: flex;
  justify-content: flex-end;
}

#myTable_filter label {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#myTable_filter label .form-control{
  margin: 1rem 0;
  margin-left: 2rem;
  width: 200px;
}

#myTable_length label {
  display: flex;
  align-items: center;
}

#myTable_length label .form-control{
  margin: 1rem;
  width: 50px;
}
.dropdown-toggle:not(.dropdown-toggle-empty)::after {
  border: none;
}
.nav-vertical.nav-pills .nav-link {
  margin-bottom: 0 !important;
}
.table>:not(caption)>*>* {
  padding: 0.25rem !important;
}
td{
  vertical-align: middle
}
.modal-header {
  padding-top: 0.5rem !important;
}
.modal-header .close{
  border: none;
  background: transparent;
  font-size: 25px;
}
.modal-body{
  margin-top: 5px;
  border-top-width: 0.05rem;
  border-top: #f2f2f2 solid
}
</style>