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
                  <h1 v-if="type!='purpose'">{{ type ? type + " a " : "" }}Match</h1>
                  <h1 v-if="type=='purpose'">Propose a Match</h1>
                </div>
                <div class="content_body">
                  <div
                    class="alert alert-success alert-dismissible fade show"
                    role="alert"
                    v-if="status && status == 200"
                  >
                    <strong>Success!</strong> info updated successfully.
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6" v-if="type!='purpose'">
                          <div class="form_group">
                            <label>{{ type ? type : "" }} To</label>
                            <select class="form-select" v-model="formObj.request_to" required  @change="getRequested()">
                              <option value="">Select</option>
                              <option
                                v-for="data in users"
                                :key="data.id"
                                :value="data.user"
                              >
                              <v-template v-if=" data.user">
                                     {{ data.user.full_name  ? data.user.full_name :''}} - {{ data.user.email  ? data.user.email :''}} - {{data.user.phone  ? data.user.phone :''}} 
                              </v-template>
                               
                              </option>
                            </select>
                            <v-errors
                              :errors="errorFor('request_to')"
                            ></v-errors>
                          </div>
                        </div>
                        <!-- <div class="col-md-6">
                          <div class="form_group">
                            <label>Category(ladder)</label>
                            
                            <select v-model="formObj.category">
                              <option value="">Select</option>
                                 <option
                                v-for="data in categories"
                                :key="data.id"
                                :value="data.id"
                              >
                                {{ data.matchrankcategories && data.matchrankcategories.title ? data.matchrankcategories.title :''  }}
                              </option>
                            </select>
                            <v-errors :errors="errorFor('category')"></v-errors>
                          </div>
                        </div> -->
                        <div class="col-md-5">
                          <div class="form_group">
                            <label>Preferred Area</label>
                            <input
                              type="text"
                              v-model="formObj.location"
                              required
                              placeholder="st. Lucia "
                            />
                            <v-errors :errors="errorFor('location')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-7">
                          <div class="form_group">
                            <label>Preferred Time</label>
                            <div class="row">
                              <div class="col-md-6">
                                <input type="date" required  v-model="date"/>
                              </div>
                              <div class="col-md-6">
                                <input type="time" :class="{'time_placeholder':time_placeholder}" @click="time_placeholder = false" required v-model="time" placeholder="HH:MM AM/PM" value="">
                              </div>
                              <!-- <div class="col-md-2">
                                <input type="text" placeholder="HH"  v-model="hours" @input.prevent="timeChanges()"/>
                              </div>
                              <div class="col-md-2">
                                <input type="text" placeholder="MM" v-model="minitues"  @input.prevent="timeChanges()"/>
                              </div>
                              <div class="col-md-3">
                                <select class="form-select" name="" id="">
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select>
                              </div> -->
                            </div>
                                <!-- <input
                              type="datetime-local"
                              v-model="formObj.time"
                            /> -->
                             <span v-if="errors && errors.time_error" class="invalid-feedback">{{errors.time_error}}</span>
                            <v-errors :errors="errorFor('time')"></v-errors>
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
import requestsApis from "../../Apis/requests";
import userApis from "../../Apis/users";
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import { getCurrentUserId, getCurrentUser } from "../../utils/auth";
import moment from 'moment';
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
      time_placeholder:true,
      date: '',
      time:'',
      hours: '',
      minitues: '',
      type: "",
      users: null,
      categories: null,
       lang: {
          formatLocale: {
            firstDayOfWeek: 1,
          },
          monthBeforeYear: false,
        },
      formObj: {
        id: null,
        request_to: "",
        challenge_to: null,
        requested_to_gender: null,
        request_by: getCurrentUserId(),
        request_by_gender: (getCurrentUser()).gender,
        type: null,
        season_id: this.$route.params.season,
        category: this.$route.params.rank,
        ladder: this.$route.params.ladder,
        location: "",
        time: null,
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
      this.loader = true;
      this.timeChanges();
      this.formObj.challenge_to = this.formObj.request_to && this.formObj.request_to.id ? this.formObj.request_to.id :'' ;
      this.formObj.type = this.type;
      await requestsApis
        .sendRequests("post", this.formObj)
        .then((response) => {
          this.loader = false;
          console.log(response);
          if (response.status == 200) {
            this.status = response.status;
            //   setCurrentUser(response.data);
            if(this.type!='purpose'){
                this.$router.push({ name: "account-challenges",  params:{type: this.$route.params.ladder, category:this.$route.params.category } });
            } else{
                this.$router.push({ name: "account-proposals",  params:{type: this.$route.params.ladder, category:this.$route.params.category }   });
            }
            
          }
        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
          if (is422(error)) {
            this.errors = error.response.data.errors;
          }
          this.status =
            error.response && error.response.status
              ? error.response.status
              : "";
        })
        .then((err) => {
          console.log(err)
          this.loader = false;
        });
    },
    getRequested(){
      this.formObj.requested_to_gender = this.formObj.request_to.gender;
    },

    timeChanges(){
      // console.log('ddddd');
      // console.log(this.time,"Selected time");
      // const timeString = this.hours + ':' + this.minitues ;
      // this.formObj.time = moment(`${this.date} ${timeString}`, 'YYYY-MM-DD HH:mm:s').format();
      this.formObj.time = moment(`${this.date} ${this.time}`, 'YYYY-MM-DD HH:mm:s').format();
    }
  },
  async created() {
    // this.categories = (getCurrentUser()).categories;
    if (this.$route.params.type) {
      this.type = this.$route.params.type;
    /* not sending requset if it is pupose */
      if(this.type!='purpose'){
        const user =  getCurrentUser();
          //  this.users = (await userApis.getByGenger(user.gender)).data;
          this.users  = (await userApis.PaidUserInLadder(user.gender, this.$route.params.ladder)).data;
           /* remove current user from users */
           
           if(this.users){
             const users = [];
             this.users.forEach((element) => {
               if(element.id != this.formObj.request_by){
                 users.push(element);
               }               
             });
             this.users = users;
           }
      }
    }
   
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    // this.formObj = getCurrentUser();
  },
};
</script>
<style scoped>
.time_placeholder{
  position: relative;
}
.time_placeholder::before{
  content: 'HH:MM AM/PM';
  position: absolute;
  top: 10px;
  /* border: 1px solid black; */
  background-color: #F8F8F8;
  width: 70%;
  /* height: 100%; */
  box-sizing: border-box;
  padding: 5px;
}
</style>