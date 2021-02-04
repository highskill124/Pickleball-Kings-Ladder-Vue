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
                          <option value="null">Select week</option>
                          <option
                            v-for="index in weeks"
                            :key="index"
                            :value="index"
                          >
                            Week {{ index }} of {{weeks}}
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
                      <tbody v-if="rankings && rankings.data && rankings.data.length">
                        <tr v-for="(data, index) in rankings.data" :key="index">
                          <td>
                            {{
                              data.user && data.user.full_name
                                ? data.user.full_name
                                : ""
                            }}
                          </td>
                          <td><strong>{{data.rank ? data.rank :'' }}</strong></td>
                         <td>{{data.WP ? data.WP :'0'}}</td>
                          <td>{{data.LP ? data.LP :'0'}}</td>
                          <td>
                            {{ data.rank_points ? data.rank_points : "" }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="!rankings || !rankings.data || !rankings.data.length">
                        <tr>
                          <td colspan="6">
                            <div class="no_record">No Ranking Exists</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="pagination_holder">
                   
                    <nav aria-label="Page navigation example">
                      <pagination :data="rankings" :limit="2" @pagination-change-page="getRankings"></pagination>
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
import seasonsApis from '../../Apis/seasons';
export default {
  components: {
    sidebarComponent,
    eventDetailsHeader,
  },
  data() {
    return {
      loader: true,
      weeks: 24,
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
    async getRankings(page = 1) {
      this.loader = true;
      this.rankings = (
        await matchLaddersApis.getUserRankingsByLadder(
          this.$route.params.ladder, null, page
        )
      ).data;
      this.loader = false;
    },
  },
   mounted() {
    // Fetch initial results
    this.getRankings();
  },
  async created() {
    this.ladder = (
      await matchLaddersApis.getById(this.$route.params.ladder)
    ).data;

    // get season to show its weeks on search filters
      this.weeks = parseInt(((await seasonsApis.getById(this.$route.params.season)).data).number_of_weeks);

    this.getRankings();

    // setTimeout(() => {
    //   this.loader = false;
    // }, 1000);
  },
};
</script>