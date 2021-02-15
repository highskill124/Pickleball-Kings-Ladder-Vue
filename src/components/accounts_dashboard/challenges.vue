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
                <!-- event detail header component -->
                <div class="content_header">
                  <h1>{{ladder && ladder.title ? ladder.title :'' }}</h1>
                  <event-details-header></event-details-header>
                </div>
                <div class="content_body">
                  <div class="table_header">
                    <h3>Challenges</h3>
                    <div class="tables_filters">
                      <form method="" action="" @submit.prevent="search()">
                        <select class="form-select" v-model="searchForm.by">
                              <option value="">Challenge by</option>
                              <option
                                v-for="data in users"
                                :key="data.id"
                                :value="data.user_id"
                              >
                                {{ data.user && data.user.full_name  ? data.user.full_name :''}}
                              </option>
                            </select>
                        <select class="form-select" v-model="searchForm.to">
                          <option value="">Challenge to</option>
                          <option
                                v-for="data in users"
                                :key="data.id"
                                :value="data.user_id"
                              >
                                {{ data.user && data.user.full_name  ? data.user.full_name :''}}
                              </option>
                        </select>
                        <button type="submit">Show</button>
                        <span v-if="is_shown">
                           <router-link :to="{name:'account-add-match', params:{season:$route.params.season, ladder:$route.params.ladder, type:'challenge', rank: ladder.match_rank_categories_id} }"><button type="button">Add</button></router-link>
                        </span>
                      </form>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Challenge</th>
                          <th>Status</th>
                          <th>Responded</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody  v-if="matches && matches.length">
                        <tr v-for="data in matches" :key="data.id">
                          <td>{{data.date}} {{data.date_time}}</td>
                          <td>
                            <strong>{{data.by && data.by.full_name ? data.by.full_name :'' }} challenged {{data.to && data.to.full_name ? data.to.full_name :'' }}</strong>
                          </td>
                          <td><span class="pending">{{data.status}}</span></td>
                          <td>{{data.responded_at}}</td>
                          <td>
                            <span v-if="data.request_to == user_id && data.status=='pending' && !data.matches_id && is_shown">
                               <button class="btn btn-info" @click.prevent="challengeAccept(data.id)">Accept</button>
                            </span>
                             <span v-if="data.matches_id">
                               <!-- <button class="btn btn-primary">Match</button> -->
                               <router-link :to="{name:'account-match', params:{type:$route.params.type,  category:$route.params.category, id: data.matches_id, rank:ladder.match_rank_categories_id } }"><button class="btn btn-primary">Match</button></router-link>
                               </span>
                              <span v-if="data.request_by == user_id && !data.matches_id"><button class="btn btn-danger" @click.prevent="challengeDelete(data.id)">Delete</button></span>
                          </td>
                        </tr>
                      </tbody>
                       <tbody v-if="!matches || !matches.length">
                         <tr>
                            <td colspan="5">
                              <div class="no_record">No challenge created yet in this category</div>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                  </div>
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
import eventDetailsHeader from "./event-details-header";
import requestsApis from '../../Apis/requests';
import { getCurrentUserId, getCurrentUser} from "../../utils/auth";
import userApis from '../../Apis/users';
import matchLaddersApis from '../../Apis/match-ladders';
export default {
  components: {
    sidebarComponent,
    eventDetailsHeader,
  },
   data() {
      return{
          loader:true,
          matches: null,
          users: null,
          is_shown: false,
          ladder: null,
          user_id: getCurrentUserId(),
          searchForm:{
            by: "",
            to: "",
          }
      }
  },
  methods:{
    async challengeDelete(cid){
      this.loader = true;
      const Objects={id:cid};
        await requestsApis.sendRequests('delete',Objects).then((response) => {
            if (response.status == 200 || response.status == 204) {
                 this.getChallenges("get", "");
            }
        })
        .catch((error) => {
          this.loader = false;
        })
        .then(() => {
          this.loader = false;
        });

    },
   async challengeAccept(cid){
        this.loader = true;
      const Objects={accepted_by:getCurrentUserId(),  purposal_id:cid};
        await requestsApis.acceptPurposal(Objects).then((response) => {
           if (response.status == 200 || response.status == 204) {
               this.getChallenges("get", "");
           }
        })
         .catch((error) => {
          this.loader = false;
        })
        .then(() => {
          this.loader = false;
        });

    },
   async getChallenges(type, filters){
     this.loader = true
      this.matches = (await requestsApis.getByLadder('challenge',this.ladder.id, type,filters)).data;
       this.loader = false
    },
    search(){
     
      if(this.searchForm.by!="" || this.searchForm.to!=""){
          console.log(this.searchForm);
          this.getChallenges("post", this.searchForm);
      } else{
        this.getChallenges("get", "");
      }
    }
  },
 async created(){
 this.ladder=(await matchLaddersApis.getById(this.$route.params.ladder)).data;
 const gender = (getCurrentUser()).gender;
 if(this.ladder.gender==gender){
  const paidCategories = (getCurrentUser()).categories;
  console.log(paidCategories);
  if(paidCategories){
    this.is_shown =  paidCategories.find(data => data.match_ladder_id==this.$route.params.ladder);
   }
 }
        this.users  = (await userApis.PaidUserInLadderWithCurrent(gender, this.$route.params.ladder)).data;
          
  this.getChallenges("get", "");

      setTimeout(() => {
          this.loader = false
      }, 1000);
  }
};
</script>