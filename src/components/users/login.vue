<template>
  <div class="container_large login">
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <div class="login_content">
          <h1><span>Sign In to</span>Kings Pickleball Ladder</h1>
          <p>
            If you have forgotten your password, click
            <strong>Forgot your password</strong>, and it will be emailed to
            you. If you have forgotten your user account, email
            <strong>{{admin_email && admin_email.url ? admin_email.url :''}}</strong> to obtain it.
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="login_holder">
          <h2>Sign In</h2>
          <form method="post" @submit.prevent="submit()">
            <div class="form_holder">
              <div class="form_group">
                <label>Username</label>
                <input
                  type="text"
                  name=""
                  required
                  placeholder="Enter username or email"
                  v-model="loginObj.email"
                  autofocus
                />
                <v-errors :errors="errorFor('email')"></v-errors>
                 <span v-if="errors && errors.message" style="color:#b22222">{{ errors.message }}</span>
              </div>
              <div class="form_group mb-2">
                <label>Password</label>
                <input
                  type="password"
                  name=""
                  required
                  placeholder="**********"
                  v-model="loginObj.password"
                />
              </div>
              <div class="form_group">
                <div class="forgot_password">
                  <router-link :to="{ name: 'forget-password' }"
                    >Forgot Your Password?</router-link
                  >
                </div>
              </div>
              <div class="form_group mb-4">
                <input type="submit" value="Login" />
              </div>
              <div class="register_here">
                If you don't have an account you can
                <router-link :to="{ name: 'signup' }"
                  >Register here</router-link
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="men_playing_tennis">
      <img
        src="/src/assets/images/men-playing-tennis.png"
        class="img-fluid"
        alt=""
      />
    </div>
  </div>
</template>
<script>
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import { logIn, getCurrentUser, loginAdmin, setCurrentUser } from "../../utils/auth";
import usersApis from "../../Apis/users";
import socialLinksApis from '../../Apis/socialLinks';
export default {
  mixins: [validationErrors],
  data() {
    return {
      loader: true,
      errors: null,
      status: null,
      admin_email: null,
      admin_email: null,
      loginObj: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async submit() {
      this.loader = true;
      await usersApis.logout();
      await usersApis.getCSRF();
      await usersApis.login(this.loginObj)
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
             logIn();
            this.setUser();
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
    async setUser() {
      if (!getCurrentUser()) {
        await usersApis.getCurrentUser().then(async (response) => {
          console.log(response);
          const user = response.data;         
            // this.$store.dispatch("islogedIn", response.data);
            // setCurrentUser(response.data);
           
             const categories = (await usersApis.getUserCategories(user.id)).data;
             delete categories.id;
             user.categories = categories;
          // let merged = {...user, ...categories};
          // console.log(merged);
          setCurrentUser(user);
          this.$store.dispatch('islogedIn', user);
           this.loader = false;
            if(response.data.is_admin!=0){ 
              loginAdmin();
              this.$router.push({ name: "admin-seasons" });
            } else{
              this.$router.push({ name: "account-profile-settings" });
            }
            
          })
          .catch((error) => {
            this.errors = { message: error.response.data.message };
            console.log(error);
            this.loader = false;
          })
          .then(() => {
            this.loader = false;
          });
          // const user =  (await usersApis.getCurrentUser()).data;
          // const categories = (await usersApis.getUserCategories(user.id)).data;
          // let merged = {...user, ...categories};
          // console.log(merged);
          // this.$store.dispatch('islogedIn', merged);
          //  setCurrentUser(merged);
          // if(merged.is_admin && merged.is_admin!=0){
          //     this.$router.push({ name: "admin-socials" });
          //   } else{
          //     this.$router.push({ name: "account-profile-settings" });
          //   }
           
      }
    },
  },
  async created() {
   this.admin_email = (await socialLinksApis.getByType({type : 'admin_email'})).data
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    //  await this.$axios.get(`${process.env.Backend_URL}/sanctum/csrf-cookie`);
  },
};
</script>