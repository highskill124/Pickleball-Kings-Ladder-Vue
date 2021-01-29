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
                  <h1>{{ ladder && ladder.title ? ladder.title : "" }}</h1>
                  <event-details-header></event-details-header>
                </div>
                <div class="content_body">
                  <div class="table_header ranking_table">
                    <h3>Rankings</h3>
                    <div class="tables_filters">
                      <form method="" action="">
                        <select
                          v-model="filter_week"
                          @change.prevent="WeekFilter()"
                        >
                          <option value="null">Select</option>
                          <option
                            v-for="index in 24"
                            :key="index"
                            :value="index"
                          >
                            Week {{ index }} of 24
                          </option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>R</th>
                          <th>W</th>
                          <th>L</th>
                          <th>Pts</th>
                        </tr>
                      </thead>
                      <tbody v-if="rankings && rankings.length">
                        <tr v-for="(data, index) in rankings" :key="index">
                          <td>
                            {{
                              data.user && data.user.full_name
                                ? data.user.full_name
                                : ""
                            }}
                          </td>
                          <td><strong>{{data.rank ? data.rank :'' }}</strong></td>
                         <td>{{data.WP ? data.WP :''}}</td>
                          <td>{{data.LP ? data.LP :''}}</td>
                          <td>
                            {{ data.rank_points ? data.rank_points : "" }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="!rankings || !rankings.length">
                        No ranking exists
                      </tbody>
                    </table>
                  </div>
                  <div class="pagination_holder">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination">
                        <li class="page-item">
                          <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li class="page-item active">
                          <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
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
import matchLaddersApis from "../../Apis/match-ladders";
export default {
  components: {
    sidebarComponent,
    eventDetailsHeader,
  },
  data() {
    return {
      loader: true,
      ladder: null,
      rankings: null,
      filter_week: 'null',
    };
  },
  methods: {
   async WeekFilter() {
      this.loader = true;
      if (this.filter_week &&  this.filter_week!='null') {
        const filter= {filter_week: this.filter_week};
        this.rankings = (
        await matchLaddersApis.getUserRankingsByLadder( this.$route.params.ladder, filter)
      ).data;
      this.loader = false;
      } else {
         console.log('in else');
        this.getRankings();
      }
    },
    async getRankings() {
      this.rankings = (
        await matchLaddersApis.getUserRankingsByLadder(
          this.$route.params.ladder, null
        )
      ).data;
      this.loader = false;
    },
  },
  async created() {
    this.ladder = (
      await matchLaddersApis.getById(this.$route.params.ladder)
    ).data;
    this.getRankings();

    // setTimeout(() => {
    //   this.loader = false;
    // }, 1000);
  },
};
</script>