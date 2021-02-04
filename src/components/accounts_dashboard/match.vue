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
              <sidebar-component></sidebar-component>
            </div>
            <div class="col-md-12 col-lg-9">
              <div class="content_column">
                <div class="content_header">
                  <h1>{{match && match.request && match.request.to && match.request.to.full_name ? match.request.to.full_name :''}} vs {{ match && match.request && match.request.by && match.request.by.full_name ? match.request.by.full_name :''}}</h1>
                </div>
                <div class="content_body">
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Challenged</label>
                            <input
                              type="datetime-local"
                              v-model="formObj.challenged" disabled
                            />
                          </div>                          
                      </div>
                       <div class="col-md-6">
                          <div class="form_group">
                            <label>Played</label>
                            <input
                              type="datetime-local"
                              v-model="formObj.played" required
                            />
                            <span v-if="errors && errors.played_error" class="invalid-feedback">{{errors.played_error}}</span>
                             <v-errors
                              :errors="errorFor('played')"
                            ></v-errors>
                          </div>
                        </div>

                         <div class="col-md-6">
                          <div class="form_group">
                            <label>Challenged By</label>
                            <select v-model="formObj.by" required disabled>
                              <option value="">Select</option>
                              <option
                                v-for="data in users"
                                :key="data.id"
                                :value="data.id"
                              >
                                {{ data.full_name }}
                              </option>
                            </select>
                          </div>                          
                      </div>

                       <div class="col-md-6">
                          <div class="form_group">
                            <label>Challenged To</label>
                           <select v-model="formObj.to" required disabled>
                              <option value="">Select</option>
                              <option
                                v-for="data in users"
                                :key="data.id"
                                :value="data.id"
                              >
                                {{ data.full_name }}
                              </option>
                            </select>
                          </div>                          
                      </div>

                       <div class="col-md-12">
                          <div class="form_group">
                            <label>Scores</label>
                          </div>                          
                      </div>
                      
                
                       <div class="col-md-4">
                          <div class="form_group">
                            <input
                              type="number"
                              v-model="formObj.point1_user1"
                            />
                          </div>                          
                      </div>

                      <div class="col-md-4 col-md-offset-4"></div>

                       <div class="col-md-4">
                          <div class="form_group">
                            <input
                              type="number"
                              v-model="formObj.point1_user2"
                            />
                          </div>                          
                      </div>

                       <div class="col-md-4">
                          <div class="form_group">
                            <input
                              type="number"
                              v-model="formObj.point2_user1"
                            />
                          </div>                          
                      </div>

                      <div class="col-md-4 col-md-offset-4"></div>

                       <div class="col-md-4">
                          <div class="form_group">
                            <input
                              type="number"
                              v-model="formObj.point2_user2"
                            />
                          </div>                          
                      </div>

                       <div class="col-md-4">
                          <div class="form_group">
                            <input
                              type="number"
                              v-model="formObj.point3_user1"
                            />
                            <v-errors
                              :errors="errorFor('point3_user1')"
                            ></v-errors>
                          </div>                          
                      </div>

                      <div class="col-md-4 col-md-offset-4"></div>

                       <div class="col-md-4">
                          <div class="form_group">
                            <input
                              type="number"
                              v-model="formObj.point3_user2"
                            />
                            <v-errors
                              :errors="errorFor('point3_user2')"
                            ></v-errors>
                          </div>                          
                      </div>
                      

                    <div class="col-md-12" v-if="match && match.request && match.request.to && match.request.to.id==user || match.request.by && match.request.by.id==user ">
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import sidebarComponent from "./sidebar";
import matchesApis from "../../Apis/matches";
import userApis from "../../Apis/users";
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import { getCurrentUserId } from "../../utils/auth";
import moment from "moment";

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
      match: null,
      user: getCurrentUserId(),
      users: null,
      formObj: {
        id: this.$route.params.id,
        season_id: this.$route.params.season,
        match_ladder: this.$route.params.ladder,
        match_rank: this.$route.params.rank,        
        by: null,
        to: null,
        played: null,
        challenged: null,
        point1_user1: 0,
        point2_user1: 0,
        point3_user1: 0,
        point1_user2: 0,
        point2_user2: 0,
        point3_user2: 0,
      },
    };
  },
  computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
  },
  methods: {
     async submit(){
       console.log(this.formObj)
           await matchesApis.requestMatches("put", this.formObj)
        .then((response) => {
          this.loader = false;
          console.log(response);
          if (response.status == 200) {
            this.status = response.status;
            //   setCurrentUser(response.data);
             this.$router.push({ name: "account-matches",  params:{type: this.$route.params.type, category:this.$route.params.category } });                     
          }
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.loader = false;
          if (is422(error)) {
            this.errors = error.response.data.errors;
          }
          this.status =
            error.response && error.response.status
              ? error.response.status
              : "";
              // if(this.status==406){
              //   this.errors = error.response.data.errors;
              // }
              // console.log(this.status);
        })
        .then((err) => {
          console.log(err)
          this.loader = false;
        });
      }
  },
  async created() {
    this.match = (await matchesApis.getById(this.$route.params.id)).data;
    // this.formObj = this.match;
    this.users = (await userApis.requestUsers("get", "")).data;
    if (this.match) {
      this.formObj.point1_user1 = this.match.point1_user1
      this.formObj.point1_user2 = this.match.point1_user2
      this.formObj.point2_user1 = this.match.point2_user1
      this.formObj.point2_user2 = this.match.point2_user2
      this.formObj.point3_user1 = this.match.point3_user1
      this.formObj.point3_user2 = this.match.point3_user2
      this.formObj.challenged =
        this.match && this.match.request && this.match.request.time
          ? moment(this.match.request.time).format("YYYY-MM-DDThh:mm:ss.SSS")
          : "";
          this.formObj.played =   this.match && this.match.played ? moment(this.match.played).format("YYYY-MM-DDThh:mm:ss.SSS")
          : "";
      this.formObj.to =
        this.match && this.match.request && this.match.request.to
          ? this.match.request.to.id
          : "";
      this.formObj.by =
        this.match && this.match.request && this.match.request.by
          ? this.match.request.by.id
          : "";
    }
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    // this.formObj = getCurrentUser();
  },
};
</script>