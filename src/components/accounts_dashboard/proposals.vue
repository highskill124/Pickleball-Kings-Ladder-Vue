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
                      <form method="" action="">
                        <select>
                          <option>Proposer</option>
                          <option>Men's 3.0 Singles</option>
                          <option>Men's 3.5 Singles</option>
                          <option>Men's 4.0 Singles</option>
                          <option>Men's 4.5+ Singles</option>
                          <option>Women's 2.5 Singles</option>
                          <option>Women's 3.0 Singles</option>
                          <option>Women's 3.5 Singles</option>
                          <option>Women's 4.0+ Singles</option>
                        </select>
                        <div class="checkbox_holder">
                          <div class="custom_checkbox">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
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
                            <span v-if="data.request_by != user_id && data.request_to != user_id && data.status=='pending'  && !data.matches_id && is_shown">
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
                          No proposals created yet in this category
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
import manageAccess from '../../Apis/manage-access';
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
      is_shown: false,
      user_id: getCurrentUserId(),
    };
  },
  methods:{
    async purposalAccept(purposalId){
      this.loader = true;
      const Objects={accepted_by:getCurrentUserId(),  purposal_id:purposalId};
        await requestsApis.acceptPurposal(Objects).then((response) => {
           if (response.status == 200 || response.status == 204) {
             this.getPurposals();
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
                 this.getPurposals();
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
      console.log('ssssss');
      const Objects={request_by:getCurrentUserId(), type:'purpose', category:'3.5'};
       await requestsApis.purposeAll(Objects).then((response) => {
          if (response.status == 200 || response.status == 204) {
             this.getPurposals();
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
    async getPurposals(){
        this.proposals = (await requestsApis.getByRankCategory('purpose',this.ladder.match_rank_categories_id)).data;
        this.loader = false;
    }
  },
  async created() {
     this.ladder=(await matchLaddersApis.getById(this.$route.params.ladder)).data;
    
       const gender = (getCurrentUser()).gender;
        if(this.ladder.gender==gender){
             const paidCategories = (getCurrentUser()).categories;
          if(paidCategories){
           this.is_shown =  paidCategories.find(data => data.matchrankcategories.id==this.ladder.match_rank_categories_id);
            console.log(this.is_shown);
          }
    

        // console.log(obj);
        }
      this.getPurposals();
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>