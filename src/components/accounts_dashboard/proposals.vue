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
                <!-- event detail header component -->
                <div class="content_header">
                  <h1>{{ladder && ladder.title ? ladder.title :'' }}</h1>
                  <event-details-header></event-details-header>
                </div>
                <div class="content_body">
                  <div class="table_header">
                    <h3>Proposals</h3>
                    <div class="tables_filters">
                      <form method="" action="" @submit.prevent="search()">
                        <select v-model="searchForm.by">
                          <option value="">Proposer</option>
                          <option
                                v-for="data in users"
                                :key="data.id"
                                :value="data.user_id"
                              >
                                {{ data.user && data.user.full_name  ? data.user.full_name :''}}
                              </option>
                        </select>
                        <div class="checkbox_holder">
                          <div class="custom_checkbox">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                v-model="searchForm.pending_only"
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Pending Only
                              </label>
                            </div>
                          </div>
                        </div>
                        <button type="submit">Show</button>
                        <span v-if="is_shown">
                          <button type="button" data-bs-toggle="modal" data-bs-target="#purposeAll" >Purpose All</button>
                        <router-link :to="{name:'account-add-match', params:{season:$route.params.season, ladder:$route.params.ladder, type:'purpose', rank: ladder.match_rank_categories_id} }"><button type="button">Add</button></router-link>
                        </span>
                      </form>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Proposer</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Accepted By</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody v-if="proposals && proposals.length">
                        <tr v-for="data in proposals" :key="data.id">
                          <td><strong>{{data.by && data.by.full_name ? data.by.full_name :'' }}</strong></td>
                          <td>{{data.date ? data.date : ''}} {{data.date_time ? data.date_time : ''}}</td>
                          <td>{{data.location}}</td>
                          <td><span class="pending">{{data.status}}</span></td>
                          <td>{{data.to && data.to.full_name ? data.to.full_name :'' }}</td>
                          <td>
                            <span v-if="data.request_by != user_id && data.request_to != user_id && !data.matches_id && is_shown && (data.status=='pending' || data.status=='emailed' ) ">
                              <!-- actions for accept -->
                              <button class="btn btn-info" @click.prevent="purposalAccept(data.id)">Accept</button>
                            </span>
                            <span v-if="data.request_by == user_id && !data.match">
                              <button class="btn btn-danger" @click.prevent="purposalDelete(data.id)">Delete</button>
                            </span>
                             <!-- <span v-if="data.request_to == user_id"><button class="btn btn-primary">Accepted</button></span> -->
                              <span v-if="data.matches_id">
                                 <router-link :to="{name:'account-match', params:{type:$route.params.type,  category:$route.params.category, id: data.matches_id,  rank:ladder.match_rank_categories_id } }"><button class="btn btn-primary">Match</button></router-link>
                               
                                </span>
                          </td>
                        </tr>
                      </tbody>
                        <tbody v-if="!proposals || !proposals.length">
                          <tr>
                            <td colspan="6">
                              <div class="no_record">No proposals created yet in this category</div>
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

        <!-- Modal for purpose all -->
    <div
      class="modal fade"
      id="purposeAll"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal_content">
              <div class="close_modal">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <h2>Confirmation</h2>
              <p> Are you sure,you wants to purpose all participants?</p>
              <div class="modal_actions">
                <button type="button" class="close_btn" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  class="confirm_btn"
                  @click.prevent="purposeAll()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebarComponent from "./sidebar";
import eventDetailsHeader from "./event-details-header";
import userApis from '../../Apis/users';
import requestsApis from '../../Apis/requests';
import matchLaddersApis from '../../Apis/match-ladders'
import { getCurrentUserId, getCurrentUser } from "../../utils/auth";
export default {
  components: {
    sidebarComponent,
    eventDetailsHeader,
  },
  data() {
    return {
      loader: true,
       ladder: null,
      proposals: null,
      users: null,
      is_shown: false,
      user_id: getCurrentUserId(),
      searchForm:{
        by: "",
        pending_only: false,
      }
    };
  },
  methods:{
    async purposalAccept(purposalId){
      this.loader = true;
      const Objects={accepted_by:getCurrentUserId(),  purposal_id:purposalId};
        await requestsApis.acceptPurposal(Objects).then((response) => {
           if (response.status == 200 || response.status == 204) {
            this.getPurposals("get", "");
           }
        })
         .catch((error) => {
          this.loader = false;
        })
        .then(() => {
          this.loader = false;
        });
    },
    // async purposalCancel(purposalId){
    //     this.loader = true;
    //     const Objects={purposal_id:purposalId};
    //     await requestsApis.unacceptPurposal(Objects).then((response) => {
    //        if (response.status == 200 || response.status == 204) {
    //          this.getPurposals();
    //        }
    //     })
    //      .catch((error) => {
    //       this.loader = false;
    //     })
    //     .then(() => {
    //       this.loader = false;
    //     });;
    // },
    async purposalDelete(purposalId){
      this.loader = true;
      const Objects={id:purposalId};
        await requestsApis.sendRequests('delete',Objects).then((response) => {
            if (response.status == 200 || response.status == 204) {
                 this.getPurposals("get", "");
            }
        })
        .catch((error) => {
          this.loader = false;
        })
        .then(() => {
          this.loader = false;
        });
    },
    async purposeAll(){
      this.loader = true;
      const Objects={request_by:getCurrentUserId(), type:'purpose', ladder: this.ladder.id, category:this.ladder.match_rank_categories_id};
       await requestsApis.purposeAll(Objects).then((response) => {
          if (response.status == 200 || response.status == 204) {
             this.getPurposals("get", "");
            $("body").removeClass("modal-open");
            $(".fade").removeClass("show");
            $("body").css("padding-right", "0px");           
             this.loader = false;
          }
        })
        .catch((error) => {
          this.loader = false;
        })
        .then(() => {
          this.loader = false;
        });
    },
    async getPurposals(type, filters){
        this.loader = true;
        this.proposals = (await requestsApis.getByLadder('purpose',this.ladder.id, type, filters)).data;
        this.loader = false;
    },
    search(){
      if(this.searchForm.pending_only || this.searchForm.by!=""){
           this.getPurposals("post", this.searchForm);
      } else{
         this.getPurposals("get", "");
      }

    }
  },
  async created() {
     this.ladder=(await matchLaddersApis.getById(this.$route.params.ladder)).data;
    
       const gender = (getCurrentUser()).gender;
        if(this.ladder.gender==gender){
             const paidCategories = (getCurrentUser()).categories;
           if(paidCategories){
              // this.is_shown =  paidCategories.find(data => data.matchrankcategories.id==this.ladder.match_rank_categories_id);
              this.is_shown =  paidCategories.find(data => data.match_ladder_id==this.ladder.id);
              console.log(this.is_shown);
            }
        }
        // const user =  getCurrentUser();
      this.users  = (await userApis.PaidUserInLadderWithCurrent(gender, this.$route.params.ladder)).data;
      this.getPurposals("get", "");
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>