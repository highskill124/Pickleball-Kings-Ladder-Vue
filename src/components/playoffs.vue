<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--  Banner Starts Here   -->
    <div class="inner_banner">
      <div class="container_large">
        <h1>Playoffs</h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="inner_wraper full_bg">
        <div class="container_large">
          <!-- Single Champions -->
          <div class="singles_champions">
            <div class="row justify-content-left" v-if="winners && winners.length">
              <div class="col-6 col-md-4 col-lg-3"  v-for="data in winners" :key="data.id">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      :src="data.winner && data.winner.user && data.winner.user.profile_picture ? backend_url + '/images/users/'+data.winner.user.profile_picture : backend_url+'/images/users/avatar.png'"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content" v-if="data.winner && data.winner.user">
                    <h2>{{data.winner && data.winner.user && data.winner.user.full_name ? data.winner.user.full_name :''}}</h2>
                    <div class="match_ver" v-if="data.match_ladder">{{ data.match_ladder && data.match_ladder.title ? data.match_ladder.title :''}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-left" v-if="!winners || !winners.length">
                <div class="playoffs_body"> 
                    <div class="alert alert-info" role="alert">
                       <h3><i class="fas fa-info-circle"></i> Stay Tuned</h3>
                      </div>
                  </div>
            </div>
          </div>

          <!-- Playoffs -->
          <div class="playoffs_holder">
            <div class="playoffs_header ">
              <h2>{{season && season.title ? season.title :''}}</h2>
              <div class="playoffs_dropdown d-none">
                <select name="">
                  <option>Select Season</option>
                  <option>Summer Playoffs 2020</option>
                  <option>Spring Playoffs 2020</option>
                  <option>Fall Playoffs 2019</option>
                  <option>Summer Playoffs 2019</option>
                  <option>Fall Playoffs 2018</option>
                </select>
              </div>
            </div>
            <div class="playoffs_body" v-if="playoffs && playoffs.length">
              <div class="playoff_row" v-for="data in playoffs" :key="data.id">
                <div class="playoff_category" v-if="data.match_ladder">{{data.match_ladder.title ? data.match_ladder.title :''}}</div>
                <div class="playoff_player1" v-if="data.winner && data.winner.user">
                  {{data.winner.user.full_name}} <span>W</span>
                </div>
                 <div class="playoff_player1" v-if="!data.winner">

                   <div class="alert alert-info" role="alert">
                       <h3><i class="fas fa-info-circle"></i> Stay Tuned</h3>
                      </div>
                 </div>

                <div class="playoff_vs" v-if="data.winner">VS</div>
                <div class="playoff_player2" v-if="data.loser && data.loser.user">{{data.loser.user.full_name}} <span>F</span></div>
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
import seasonApis from '../Apis/seasons';

export default {
    data() {
      return{
          loader:true,
          backend_url: process.env.Backend_URL,
          playoffs: null,
          winners:[],
          season: null,
      }
  },
  async created(){
   this.playoffs =  (await seasonApis.getRecentlyCompletedSeasonWithPlayers()).data;
   this.season = (await seasonApis.getRecentlyCompletedSeason()).data;
   if (this.playoffs) {
     this.playoffs.forEach(element => {
       if(element.winner){
         this.winners.push(element);
       }
       
     });
     
   }
      setTimeout(() => {
          this.loader = false
      }, 1000);
  }
}
</script>