<template>
  <!--   Main Content Start Here   -->

  <main>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <section class="default_wraper">
      <div class="container_large">
        <div class="row">
          <div class="col-md-3">
            <!-- Sidebar Panel -->
            <sidebar-component></sidebar-component>
          </div>
          <!-- Content Panel -->
          <div class="col-md-9">
            <div class="content_column">
              <div class="content_header">
                <h1>{{season && season.title ? season.title :''}}</h1>
              </div>
              <div class="content_body">
                <h2>Please select a contest below</h2>
                <div class="events_categories">
                  <div class="row" v-if="ladders">
                    <div class="col-md-3" v-for="data in ladders" :key="data.id">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-rankings', params:{season:$route.params.season,ladder: data.id} }"
                          >{{data.title}}</router-link
                        >
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!--   Main Content End Here   -->
</template>
<script>
import sidebarComponent from "./sidebar";
import { getCurrentUser} from '../../utils/auth';
import matchLadderApis from '../../Apis/match-ladders'
import seasonsApis from '../../Apis/seasons'
export default {
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      ladders: null,
      season: null,
      current_user: getCurrentUser(),
    };
  },
  methods:{
    async getLadders(){
      this.loader = true;
          this.ladders =  (await matchLadderApis.getBySeason(this.$route.params.season)).data;
          // console.log("Leaders from events",this.ladders);
          this.season = (await seasonsApis.getById(this.$route.params.season)).data
          // console.log("Season = ",this.season);
          this.loader = false;
    }
    
  },
  watch: {
    '$route.params.season': function (id) {
      this.getLadders();
    }
  },
  async created() {
    if(this.$route.params.season){
      // alert("Season Id ="+this.$route.params.season);
      this.getLadders();
    }    
    // setTimeout(() => {
    //   this.loader = false;
    // }, 1000);
  },
};
</script>