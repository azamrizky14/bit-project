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
    <div class="container py-5 py-sm-7">
      <a class="d-flex justify-content-center mb-5" href="#">
        <img class="zi-2" src="assets/img/logo.png" alt="Image Description" style="width: 12rem;">
      </a>

      <div class="mx-auto" style="max-width: 30rem;">
        <!-- Card -->
        <div class="card card-lg mb-5">
          <div class="card-body">
            <!-- Form -->
            <form class="js-validate needs-validation" @submit="handleRegister" v-if="isRegister === true">
              <div>
                <div class="text-center">
                <div class="mb-5">
                  <h1 class="display-5">Create your account</h1>
                </div>
              </div>

              <label class="form-label" for="fullNameSrEmail">Full name</label>

              <!-- Form -->
              <div class="row">
                <div class="col-sm-6">
                  <!-- Form -->
                  <div class="mb-4">
                    <input type="text" v-model="first_name" class="form-control form-control-lg" name="firstName" id="firstName" placeholder="Mark" aria-label="Mark" required>
                  </div>
                  <!-- End Form -->
                </div>

                <div class="col-sm-6">
                  <!-- Form -->
                  <div class="mb-4">
                    <input type="text" v-model="last_name" class="form-control form-control-lg" name="lastName" id="lastName" placeholder="Williams" aria-label="Williams" required>
                  </div>
                  <!-- End Form -->
                </div>
              </div>
              <!-- End Form -->

              <!-- Form -->
              <div class="mb-4">
                <label class="form-label" for="signupSrEmail">Your email</label>
                <input type="email" v-model="email" class="form-control form-control-lg" name="email" id="signupSrEmail" placeholder="Markwilliams@site.com" aria-label="Markwilliams@site.com" required>
                <span class="invalid-feedback">Please enter a valid email address.</span>
              </div>
              <!-- End Form -->

              <!-- Form -->
              <div class="mb-4">
                <label class="form-label" for="signupSrPhone">No. Telepon</label>

                <div class="input-group" data-hs-validation-validate-class>
                  <div class="input-group-prepend">
                    <span class="input-group-text">+62</span>
                  </div>
                  <input type="number" v-model="phone" class="form-control" aria-label="Minimal nomer telepon adalah 10" required minlength="9" id="signupSrPhone" placeholder="xxx-xxxx-xxxx">
                </div>

                <span class="invalid-feedback">Your password is invalid. Please try again.</span>
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

              <!-- Form -->
              <div class="mb-4">
                <label class="form-label w-100" for="signupSrPassword">
                  <span class="d-flex justify-content-between align-items-center">
                    <span>Confirm Password</span>
                  </span>
                </label>

                <div class="input-group input-group-merge" data-hs-validation-validate-class>
                  <input :type="showConfirm ? 'text' : 'password'" v-model="pass_confirm" @input="checkPass" class="js-toggle-password form-control form-control-lg" name="confPassword" id="confirmPassword" placeholder="6+ characters required" aria-label="6+ characters required" required minlength="6">
                  <a class="input-group-append input-group-text" href="javascript:;" @click="showConfirm = !showConfirm">
                    <i class="bi-eye"></i>
                  </a>
                </div>

                <span class="text-danger" :class="passSame ? 'd-none' : ''">Password does not match!</span>
              </div>
              <!-- End Form -->

              <!-- Form Check -->
              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" value="" id="termsCheckbox" required>
                <label class="form-check-label" for="termsCheckbox">
                  I accept the <a href="#">Terms and Conditions</a>
                </label>
                <span class="invalid-feedback">Please accept our Terms and Conditions.</span>
              </div>
              <!-- End Form Check -->

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary btn-lg">Create an account</button>

                <router-link class="btn btn-link" to="/">
                Sudah Punya Akun? Login<i class="bu-chevron-right"></i>
                </router-link>
              </div>
              </div>
            </form>
            <!-- End Form -->

              <div v-else-if="isRegister === false">
                <div class="text-center">
                  <div class="mb-5">
                    <h1 class="display-5">Confirm your phone pumber</h1>
                  </div>
                </div>
                <div class="text-center">Kode OTP telah terkirim pada nomor +62 {{ phone }}. Kode ini hanya berlaku sampai {{ formatTime(remainingTime) }}. <a href="#" @click="resendOTP" :class="remainingTime > 0 ? 'disabled-link' : ''">Klik disini,</a> untuk mengirim ulang Kode OTP</div>
                <div class="d-flex justify-content-center mt-5">
                    <v-otp-input
                      ref="otpInput"
                      input-classes="otp-input"
                      separator="-"
                      :num-inputs="6"
                      :should-auto-focus="true"
                      :is-input-num="true"
                      @on-change="handleOnChange"
                      @on-complete="handleOnComplete"
                    />
                </div>
                <div class="d-grid gap-2 mt-5">
                  <button @click="registerAuth" class="btn btn-primary btn-lg">Confirm OTP</button>
                  <!-- <button type="submit" class="btn btn-primary btn-lg">Confirm OTP</button> -->
                </div>
              </div>

          </div>
        </div>
        <!-- End Card -->
      </div>
    </div>
    <!-- End Content -->
  </main>
</template>

<script>

import { postOTP } from '../components/services/components'
 
export default {
    name: 'Register',
    props: {
      tabindex: {
      type: Number, 
      required: false,
      default: 1,
      }
    },
    data() {
        return {
            passSame: true,
            showPass: false,
            showConfirm: false,
            isRegister: true,
            first_name: '',
            last_name: '',
            full_name: '',
            phone: '',
            email: '',
            password: '',
            pass_confirm: '',

            remainingTime: 0,
            timerExpired: false,
            intervalId: null,
            otp: '',
            otpInput: '',
        }
    },
    methods: {
        sweetAlert(data) {
          if (data === 'success') {
            this.$swal(
                'Berhasil!',
                'Registrasi Berhasil',
                'success'
            )
          } else if (data === 'otpError') {
            this.$swal(
                'Gagal!',
                'Kode OTP Salah!',
                'error'
            )
          } else if (data === 'otpExp') {
            this.$swal(
                'Gagal!',
                'Kode OTP Kadaluarsa!',
                'error'
            )
          } else if (data === 'networkError') {
            this.$swal(
                'Gagal!',
                'Terjadi Masalah Koneksi!',
                'error'
            )
          } else {
            this.$swal.close()
          }
        },
        alertLoading() {
          this.$swal({
              title: 'Loading...',
              text: 'Mohon Ditunggu ya.',
              allowOutsideClick: false,
              showCancelButton: false,
              showConfirmButton: false,
              willOpen: () => {
                  this.$swal.showLoading();
              },
            });
        },
        startTimer() {
          if (this.remainingTime > 0) {
            return
          }
          this.remainingTime = 180;
          this.intervalId = setInterval(() => {
            this.remainingTime--;
            if (this.remainingTime <=0) {
              this.stopTimer();
            }
          }, 1000);
        },
        stopTimer() {
          clearInterval(this.intervalId);
          this.timerExpired = true
        },
        formatTime(seconds) {
          const minutes = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },
        checkPass() {
          if (this.password !== this.pass_confirm) {
            this.passSame = false
          } else {
            this.passSame = true
          }
        },
        registerAuth() {
          if (this.remainingTime !== 0) {
            if (this.otp === this.otpInput) {
            const data = {
                    userName: this.first_name + ' ' + this.last_name,
                    userImage: '',
                    userPhone: '0'+this.phone,
                    userEmail: this.email,
                    userToken: '',
                    userPassword: this.password
            }
            try {
              console.log(data)
              this.sweetAlert('success')
              this.$router.push('/')
            } catch (error) {
              this.sweetAlert('networkError')
            }
            } else {
              this.sweetAlert('otpError')
            }
          } else {
            this.sweetAlert('otpExp')
          }
        },
        async handleRegister(event) {
          event.preventDefault();
          if (this.password === this.pass_confirm) {
            this.alertLoading();
            try {
              this.sendOTP();
              await postOTP('0' + this.phone, this.otp)
              this.sweetAlert();
              this.isRegister = false
              this.startTimer();
            } catch (error) {
              this.sweetAlert('networkError')
            }
          }        
        },
      resendOTP() {
        this.$refs.otpInput.otp = []
        this.sendOTP();
        this.startTimer();
        this.otp = '';
      },
      sendOTP() {
        const otp = Math.floor(Math.random() * 900000) + 100000
        this.otp = otp.toString();
        console.log(this.otp)
      },
    handleOnComplete(value) {
      this.otpInput = value
    },
    handleOnChange(value) {
    },
    },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
}

</script>

<style>

.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  .otp-input .error {
      border: 1px solid red !important;
    }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>