<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--   Main Content Start Here   -->
    <main>
      <section class="default_wraper">
        <div class="container_large">
          <div class="row">
            <div class="col-md-12 col-lg-3">
              <!-- Sidebar Panel -->
              <sidebar-component></sidebar-component>
            </div>
            <!-- Content Panel -->
            <!-- Content Panel -->
            <div class="col-md-12 col-lg-9">
              <div class="content_column">
                <div class="content_header">
                  <h1>Reset Password</h1>
                </div>
                <div class="content_body">
                   <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="status && status==200">
                      <strong>Success!</strong> Password reset successfully.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Old Password</label>
                            <input
                              type="password"
                              required
                              v-model="formObj.current_password"
                              placeholder="********"
                            />
                            <v-errors :errors="errorFor('current_password')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>New Password</label>
                            <input
                              type="password"
                              required
                              v-model="formObj.new_password"
                              @input="matchPassword()"
                              placeholder="********"
                            />
                             <v-errors :errors="errorFor('new_password')"></v-errors>
                              <transition-group name="fade" v-if="errors">
                                <p v-for="(error, keyIndex) in errors" :key="keyIndex+'from'">
                                  <span v-if="error.password" style="color:#b22222">{{ error.password }}</span>
                                </p>
                              </transition-group>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Confirm New Password</label>
                            <input
                              type="password"
                              required
                              v-model="formObj.confirm_password"
                              @input="matchPassword()"
                              placeholder="********"
                            />
                             <v-errors :errors="errorFor('confirm_password')"></v-errors>
                              <transition-group name="fade" v-if="errors">
                                  <p v-for="(error, keyIndex) in errors" :key="keyIndex+'from'">
                                    <span v-if="error.password" style="color:#b22222">{{ error.password }}</span>
                                  </p>
                              </transition-group>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form_group">
                            <input
                              type="submit"
                              name=""
                              class="save_btn"
                              value="Save"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!--   Main Content End Here   -->
  </div>
</template>
<script>
import sidebarComponent from "./sidebar";
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import { getCurrentUserId } from "../../utils/auth";
import usersApis from '../../Apis/users';
export default {
  mixins: [validationErrors],
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      id: getCurrentUserId(),
      formObj: {
        current_password: null,
        new_password: null,
        confirm_password: null,
      },
    };
  },
  methods: {
    // matching passwords
    matchPassword() {
      if (
        this.formObj.new_password &&
        this.formObj.confirm_password &&
        this.formObj.new_password != this.formObj.confirm_password
      ) {
        this.errors = [{ password: "password not matched" }];
        return;
      } else {
        return (this.errors = null);
      }
    },
    submit() {
      this.loader = true;
      usersApis.updatePassword(this.id, this.formObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;

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
        }).then(()=>{
          this.loader = false;
        });
    },
  },
  created() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>