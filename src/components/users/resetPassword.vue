<template>
  <div class="container_large">
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <div class="login_content">
          <h1><span>Reset</span>Your Password</h1>
          <p>
            Enter the <strong>email address</strong> associated with your
            account.
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="login_holder">
          <h2>Reset Password</h2>
          <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="status && status==406">
              <strong>Wrong token!</strong> Your reset token is expired.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="status && status==200">
              <strong>Success!</strong> Password reset successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <form method="post" @submit.prevent="resetPassword()">
            <div class="form_holder">
              <div class="form_group">
                <label>Email Address</label>
                <input
                  type="email"
                  name=""
                  placeholder="Enter your email"
                  required
                  autofocus
                  v-model="updatePasswordform.email"
                  readonly
                />
                <v-errors :errors="errorFor('email')"></v-errors>
                
              </div>
               <div class="form_group mb-2">
                <label>Password</label>
                <input
                  type="password"
                  name=""
                  required
                  placeholder="**********"
                  @input="matchPassword()"
                  v-model="updatePasswordform.new_password"
                />
                 <v-errors :errors="errorFor('new_password')"></v-errors>
                 <transition-group name="fade" v-if="errors">
                    <p v-for="(error, keyIndex) in errors" :key="keyIndex+'from'">
                      <span v-if="error.password" style="color:#b22222">{{ error.password }}</span>
                    </p>
                  </transition-group>
              </div>
               <div class="form_group mb-2">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name=""
                  required
                  placeholder="**********"
                  @input="matchPassword()"
                  v-model="updatePasswordform.confirm_password"
                />
                <v-errors :errors="errorFor('confirm_password')"></v-errors>
                <transition-group name="fade" v-if="errors">
                    <p v-for="(error, keyIndex) in errors" :key="keyIndex+'from'">
                      <span v-if="error.password" style="color:#b22222">{{ error.password }}</span>
                    </p>
                  </transition-group>
              </div>
              <div class="form_group mb-4">
                <input type="submit" value="Reset Password" />
              </div>
              <div class="register_here">
                Already have an account
                <router-link :to="{ name: 'login' }">Login here</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <div class="men_playing_tennis"><img src="/src/assets/images/men-playing-tennis.png" class="img-fluid" alt=""></div> user/password-reset-email-->
  </div>
</template>

<script>
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import userApis from '../../Apis/users';
export default {
  mixins: [validationErrors],
  data() {
    return {
      loader: true,
      errors: null,
      status: null,
      updatePasswordform:{
          new_password:null,
          token: null,
        password: null,
        confirm_password: null,
      }
    };
  },
  methods: {
     // matching passwords
    matchPassword() {
      if (
        this.updatePasswordform.new_password &&
        this.updatePasswordform.confirm_password &&
        this.updatePasswordform.new_password != this.updatePasswordform.confirm_password
      ) {
        this.errors = [{ password: "password not matched" }];
        return;
      } else {
        return (this.errors = null);
      }
    },
    async resetPassword() {
     this.loader = true;
      await userApis.postResetPassword(this.updatePasswordform)
        .then((response) => {
          if (response.status == 200) {
            this.status = response.status;
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 2000);
          }
        })
        .catch((error) => {
          this.loader = false;
          if (is422(error)) {
            this.errors = error.response.data.errors;
          }
          this.status =
            error.response && error.response.status
              ? error.response.status
              : "";
        })
        .then(() => {
          this.loader = false;
        });
    },
  },
  created() {
   
     var url_string = window.location.href;
    var url = new URL(url_string);
    if (url.searchParams.get("email")) {
      this.updatePasswordform.email = url.searchParams.get("email");
    }
    if (this.$route.params.id) {
      this.updatePasswordform.token = this.$route.params.id;
    }
     setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
  computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
  },
};
</script>