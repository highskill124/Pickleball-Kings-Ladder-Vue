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
            <div class="col-md-12 col-lg-9">
              <div class="content_column">
                <div class="content_header">
                  <h1>Season</h1>
                </div>
                <div class="content_body">
                  <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="status && status==200">
                      <strong>Success!</strong> action performed successfully.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Season title</label>
                             <input
                              type="text"
                              placeholder="season title" autofocus
                               v-model="formObj.title" required
                            />
                            <v-errors :errors="errorFor('title')"></v-errors>
                          </div>
                        </div>
                         <div class="col-md-6">
                          <div class="form_group">
                            <label>Type</label>
                             <select v-model="formObj.match_single_doubles_id" required>
                              <option value="">Select</option>
                              <option v-for="data in single_doubles" :key="data.id" :value="data.id">{{data.title}}</option>
                            </select>
                            <v-errors :errors="errorFor('match_single_doubles_id')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Start Date</label>
                             <input
                              type="date"
                               v-model="formObj.start_date" 
                            />
                            <v-errors :errors="errorFor('start_date')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>End date</label>
                            <input
                              type="date"
                               v-model="formObj.end_date" 
                            />
                            <v-errors :errors="errorFor('end_date')"></v-errors>
                          </div>
                        </div>
                       <div class="col-md-6">
                          <div class="form_group">
                            <label>Deadline for registration</label>
                             <input
                              type="date"
                               v-model="formObj.registration_deadline" 
                            />
                            <v-errors :errors="errorFor('registration_deadline')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Weeks in season</label>
                            <select v-model="formObj.number_of_weeks" required>
                              <option value="">Select</option>
                              <option v-for="index in 24" :key="index" :value="index">{{index}}</option>
                            </select>
                            <v-errors :errors="errorFor('number_of_weeks')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Playoff date</label>
                            <input
                              type="date"
                               v-model="formObj.playoff_date" 
                            />
                            <v-errors :errors="errorFor('playoff_date')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Playoff date2</label>
                            <input
                              type="date"
                               v-model="formObj.playoff_date2" 
                            />
                            <v-errors :errors="errorFor('playoff_date2')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Late registration fine</label>
                            <input
                              type="number"
                               v-model="formObj.late_fee" required
                            />
                            <v-errors :errors="errorFor('late_fee')"></v-errors>
                          </div>
                        </div>
                         <div class="col-md-6">
                          <div class="form_group">
                            <label>Dates not decided</label>
                            <div class="custom_checkbox">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                   v-model="formObj.dates_not_decided"
                                  id="date-finalized"
                                />
                                
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
import seasonsApis from '../../Apis/seasons';
import validationErrors from "../../mixins/validationErrors";
import singleDoubles from '../../Apis/matchSingleDoubles';
import { is422 } from "../../utils/response";
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
      single_doubles: null,
      formObj: {
        id: null,  
        title: null,   
        number_of_weeks: "",
        weeks: '',
        match_single_doubles_id: "",   
        start_date: "",
        end_date: "",
        registration_deadline:"",
        playoff_date: "",
        playoff_date2:"",
        dates_not_decided: false,
        late_fee: 10
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
     if(this.$route.params.id){
         await seasonsApis.requestSeasons("put", this.formObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;
            this.$router.push({name:'admin-seasons'});
          }
        })
        .catch((error) => {
          this.loader = false;
          console.log(error);
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
     } else{
         await seasonsApis.requestSeasons("post", this.formObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;
            this.$router.push({name:'admin-seasons'});
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
        }).then(()=>{
          this.loader = false;
        });
     }
     
     
    },
  },
  async created() {
    if(this.$route.params.id){
      const response = (await seasonsApis.getById(this.$route.params.id)).data;
        response['start_date'] = moment(response['start_date']).format('YYYY-MM-DD');
        response['end_date'] = moment(response['end_date']).format('YYYY-MM-DD');
        response['registration_deadline'] = moment(response['registration_deadline']).format('YYYY-MM-DD');
        response['playoff_date'] = moment(response['playoff_date']).format('YYYY-MM-DD');
        response['playoff_date2'] = moment(response['playoff_date2']).format('YYYY-MM-DD');
       this.formObj = response;
    }
    this.single_doubles = (await singleDoubles.requestSingleDoubles("get",'')).data;
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>