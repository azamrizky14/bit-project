<template>
    <main id="content" role="main">
    <div class="position-fixed top-0 end-0 start-0 bg-img-start" style="height: 32rem; background-image: url(assets/svg/components/card-6.svg);">
      <!-- Shape -->
      <div class="shape shape-bottom zi-1">
        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
          <polygon fill="#fff" points="0,273 1921,273 1921,0 " />
        </svg>
      </div>
      <!-- End Shape -->
    </div>

    <!-- Content -->
    <div class="container pt-5 pt-sm-7">
      <a class="d-flex justify-content-center mb-5" href="index.html">
        <img class="zi-2" src="assets/img/logo.png" alt="Image Description" style="width: 12rem;">
      </a>

      <div class="mx-auto" style="max-width: 30rem;">
        <!-- Card -->
        <div class="card card-lg mb-5">
          <div class="card-body">
            <!-- Form -->
            <form class="js-validate needs-validation" @submit.prevent="handlerLogin">
              <div class="text-center">
                <div class="mb-5">
                  <h1 class="display-5">Sign in</h1>
                </div>
              </div>

              <!-- Form -->
              <div class="mb-4">
                <label class="form-label" for="signinSrEmail">Your email</label>
                <input type="email" v-model="email" class="form-control form-control-lg" name="email" id="signinSrEmail" tabindex="0" placeholder="email@address.com" aria-label="email@address.com" required>
                <span class="invalid-feedback">Please enter a valid email address.</span>
              </div>
              <!-- End Form -->

              <!-- Form -->
              <div class="mb-4">
                <label class="form-label w-100" for="signupSrPassword">
                  <span class="d-flex justify-content-between align-items-center">
                    <span>Password</span>
                  </span>
                </label>

                <div class="input-group input-group-merge" data-hs-validation-validate-class>
                  <input :type="showPass ? 'text' : 'password'" v-model="password" class="js-toggle-password form-control form-control-lg" name="password" id="signupSrPassword" placeholder="6+ characters required" aria-label="6+ characters required" required minlength="6">
                  <a class="input-group-append input-group-text" href="javascript:;" @click="showPass = !showPass">
                    <i class="bi-eye"></i>
                  </a>
                </div>

                <span class="invalid-feedback">Please enter a valid password.</span>
              </div>
              <!-- End Form -->

              <!-- Form Check -->
              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" value="" id="termsCheckbox">
                <label class="form-check-label" for="termsCheckbox">
                  Remember me
                </label>
                <label style="float: right">
                    <a class="form-label-link mb-0" href="authentication-reset-password-basic.html">Forgot Password?</a>
                  </label>
              </div>
              <!-- End Form Check -->

              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">Sign in</button>
                <span class="text-center mt-2">
                  <router-link class="form-label-link mb-0" to="/register">Belum Punya Akun? Register</router-link>
                </span>
                
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
        <!-- End Card -->
      </div>
    </div>
    <!-- End Content -->
  </main>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import { API } from '@/API';
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            response: [],
            showPass: false
        }
    },
    methods: {  
      ...mapActions(['login']),
       async handlerLogin() {
        
        try {
          const data = {
            userEmail: this.email,
            userPassword: this.password
          }
          this.response = await this.login(data);
          this.$swal('Berhasil', 'Selamat Datang Di LapakPOS', 'success');
          // Get local storage
          localStorage.setItem("token", this.response.token);
          localStorage.setItem("_id", this.response.datauser._id);
          localStorage.setItem("userName", this.response.datauser.userName);
          localStorage.setItem("userName", this.response.datauser.userName);
          localStorage.setItem("userEmail", this.response.datauser.userEmail);
          localStorage.setItem("userPhone", this.response.datauser.userPhone);
          localStorage.setItem("userDomainCode", JSON.stringify(this.response.datauser.userDomainCode));
          this.$router.push('/dashboard');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.error = 'Username atau Password Salah!'
            this.$swal('Login Gagal', 'Username atau Password Salah!', 'error');
          } else {
            console.error(error);
          }
        }
      }
    },
    computed: {
        ...mapState({
          topbarTitle: state => state.topbarTitle,
          isAuthenticated: state => state.isAuthenticated
        })
    }
}

</script>