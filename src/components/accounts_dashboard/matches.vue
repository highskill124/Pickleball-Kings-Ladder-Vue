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
                  <h1>{{ ladder && ladder.title ? ladder.title : "" }}</h1>
                  <event-details-header></event-details-header>
                </div>
                <div class="content_body">
                  <div class="table_header">
                    <h3>Matches</h3>
                    <div class="tables_filters">
                      <form method="" action="">
                        <select v-model="searchForm.match_rank_categories_id">
                          <option value="null">From</option>
                          <option
                            v-for="data in match_ladders"
                            :key="data"
                            :value="data.match_rank_categories_id"
                          >
                            {{ data.title }}
                          </option>
                        </select>
                        <select v-model="searchForm.for">
                          <option value="null">For</option>
                            <option
                                v-for="data in users"
                                :key="data.id"
                                :value="data.id"
                              >
                                {{ data.user && data.user.full_name  ? data.user.full_name :''}}
                              </option>
                        </select>
                        <button type="submit" @click.prevent="Submit()">
                          Show
                        </button>
                      </form>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Challenged</th>
                          <th>Played</th>
                          <th>Contestants</th>
                          <th>Scores</th>
                          <th>LP</th>
                          <th>WP</th>
                        </tr>
                      </thead>
                      <tbody v-if="matches && matches.length">
                        <tr v-for="data in matches" :key="data.id">
                          <td>
                            {{
                              data.request && data.request.date
                                ? data.request.date
                                : ""
                            }}
                            {{
                              data.request && data.request.date_time
                                ? data.request.date_time
                                : ""
                            }}
                          </td>
                          <td>
                            {{ data.played_date ? data.played_date : "" }}
                            {{ data.played_time ? data.played_time : "" }}
                          </td>
                          <td>
                            <strong
                              >{{
                                data.request &&
                                data.request.to &&
                                data.request.to.full_name
                                  ? data.request.to.full_name
                                  : ""
                              }}
                              vs.
                              {{
                                data.request &&
                                data.request.by &&
                                data.request.by.full_name
                                  ? data.request.by.full_name
                                  : ""
                              }}</strong
                            >
                          </td>
                          <td>{{data.point1_user1}}-{{data.point1_user2}}, {{data.point2_user1}}-{{data.point2_user2}}, {{data.point3_user1}}-{{data.point3_user2}}</td>
                          <td>{{data.WP ? data.WP :''}}</td>
                          <td>{{data.LP ? data.LP :''}}</td>
                        </tr>
                      </tbody>
                      <tbody v-if="!matches || !matches.length">
                        No match played in this category
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
import matchesApis from "../../Apis/matches";
import matchLaddersApis from "../../Apis/match-ladders";
import userApis from '../../Apis/users';
import { getCurrentUser } from "../../utils/auth";
// import manageAccess from '../../Apis/manage-access';
export default {
  components: {
    sidebarComponent,
    eventDetailsHeader,
  },
  data() {
    return {
      loader: false,
      ladder: null,
      users: null,
      match_ladders: null,
      matches: null,
      searchForm: {
        match_rank_categories_id: "null",
        for: "null",
      },
    };
  },
  methods: {
    async getMatches() {
      this.matches = (
        await matchesApis.getByRankCategory(
          this.ladder.match_rank_categories_id,
          null
        )
      ).data;
      this.loader = false;
    },
    async Submit() {
      this.loader = true;
      if (this.searchForm && this.searchForm.match_rank_categories_id != "null" || this.searchForm.for!='null') {
        console.log('in if');
        /*
        as seach button clicks and have match rank category then it will pass new match rank category for seachin
        */
        this.matches = (
          await matchesApis.filterMatches(
            this.searchForm
          )
        ).data;
        this.loader = false;
      } else {
        this.getMatches();
      }
    },
  },
  async created() {

    this.ladder = (
      await matchLaddersApis.getById(this.$route.params.ladder)
    ).data;
  
    const user =  getCurrentUser();
     this.users  = (await userApis.PaidUserInLadderWithCurrent(user.gender, this.ladder.match_rank_categories_id)).data;
    this.match_ladders = (
      await matchLaddersApis.getBySeason(this.$route.params.season)
    ).data;
      this.getMatches();
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>