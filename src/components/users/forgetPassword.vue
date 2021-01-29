<template>
  <div class="container_large">
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <div class="login_content">
          <h1><span>Forgot</span>Your Password?</h1>
          <p>
            Enter the <strong>email address</strong> associated with your
            account.
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="login_holder">
          <h2>Reset Password</h2>
          <form method="post" @submit.prevent="sendEmail()">
            <div class="form_holder">
              <div class="form_group">
                <label>Email Address</label>
                <input
                  type="email"
                  name=""
                  placeholder="Enter your email"
                  required
                  autofocus
                  v-model="forget_email"
                />
                <div class="invalid-feedback" v-if="errors && status && status==422 && errors['email']">
                  We can't find a user with that email address.
                </div>
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
      forget_email: null,
    };
  },
  methods: {
    async sendEmail() {
      this.loader = true;
      await userApis.forgetPasswordEmail({ email: this.forget_email })
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          this.loader = false;
       
          if (is422(error)) {
            this.errors = error.response.data.message.errors;
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
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
  // computed: {
  //   hasErrors() {
  //     return 422 === this.status && this.errors !== null;
  //   },
  // },
};
</script>