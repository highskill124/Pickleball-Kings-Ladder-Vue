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
                  <h1>Admin Profile</h1>
                </div>
                <div class="content_body">
                  <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="status && status==200">
                      <strong>Success!</strong> info updated successfully.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>First Name</label>
                            <input
                              type="text"
                              v-model="formObj.first_name" required
                              placeholder="John"
                            />
                            <v-errors :errors="errorFor('first_name')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Last Name</label>
                            <input
                              type="text"
                               v-model="formObj.last_name" required
                              placeholder="Deo"
                            />
                            <v-errors :errors="errorFor('last_name')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Email</label>
                            <input
                              type="email"
                               v-model="formObj.email" required
                              placeholder="example@domain.com"
                            />
                            <v-errors :errors="errorFor('email')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              name=""
                              value="8646175102"
                               v-model="formObj.phone"
                              placeholder="XXXXXXXXXXX"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Address</label>
                            <input
                              type="text"
                              v-model="formObj.address"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>City</label>
                            <input
                              type="text"
                              v-model="formObj.city"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>State</label>
                            <input
                              type="text"
                              v-model="formObj.state"
                              placeholder="State"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Zip Code</label>
                            <input
                              type="text"
                              v-model="formObj.zip_code"
                              placeholder="XXXX"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Skill Level</label>
                            <input
                              type="text"
                              name=""
                              v-model="formObj.skill_level"
                              placeholder="0.0"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Gender</label>
                            <select v-model="formObj.gender">
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <div class="custom_checkbox">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="proposal-email"
                                  v-model="formObj.get_proposal_emails"
                                />
                                <label
                                  class="form-check-label"
                                  for="proposal-email"
                                >
                                  Proposal Emails
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <div class="custom_checkbox">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="seicolons-email"
                                />
                                <label
                                  class="form-check-label"
                                  for="seicolons-email"
                                >
                                  Email with semicolons
                                </label>
                              </div>
                            </div>
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
import userApis from '../../Apis/users';
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import { setCurrentUser, getCurrentUser } from "../../utils/auth";

export default {
   mixins: [validationErrors],
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      errors: null,
      status: null,
      formObj: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        gender: "",
        address: null,
        city: null,
        state: null,
        zip_code: null,
        get_proposal_emails: true,
        skill_level: null,
      },
    };
  },
   computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
  },
  methods: {
   async submit() {
     this.loader= true;
      await userApis.requestUsers("put", this.formObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;
              setCurrentUser(response.data);
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
    this.formObj = getCurrentUser();
  },
};
</script>