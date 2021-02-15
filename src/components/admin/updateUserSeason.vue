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
                  <h1>Update user season</h1>
                </div>
                <div class="content_body">
                   <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="status && status==200">
                      <strong>Success!</strong>.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Season</label>
                             <select v-model="formObj.season_id" required>
                              <option value="">Select</option>
                               <option v-for="data in seasons" :key="data.id" :value="data.id">{{data.title}}</option>
                            </select>
                             <v-errors :errors="errorFor('season_id')"></v-errors>
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
import seasonsApis from '../../Apis/seasons';
import usersApis from '../../Apis/users';
import userPaidRankingsApis from '../../Apis/user-paid-rankings'
export default {
  mixins: [validationErrors],
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      seasons: null,
      paid_rank: null,
      formObj: {
        id: this.$route.params.id,
        season_id: '',
        rank_category: '',
      },
    };
  },
  methods: {
  
    submit() {
      this.loader = true;
      usersApis.adminUpdateSeason(this.formObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;
            setTimeout(() => {
              this.$router.push({name:'admin-users'});
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
        }).then(()=>{
          this.loader = false;
        });
    },
  },
 async created() {
    this.seasons = (await seasonsApis.requestSeasons("get","")).data;
    this.paid_rank = (await userPaidRankingsApis.getById(this.$route.params.id)).data;
    if(this.paid_rank){

      this.formObj.rank_category= this.paid_rank.matchladder && this.paid_rank.matchladder.match_rank_categories_id ?this.paid_rank.matchladder.match_rank_categories_id : '';
    }
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>