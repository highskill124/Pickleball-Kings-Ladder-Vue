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
            <div class="row justify-content-left" v-if="playoffs && playoffs.length">
              <div class="col-6 col-md-4 col-lg-3" v-for="data in playoffs" :key="data.id">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      :src="data.user && data.user.profile_picture ? backend_url + '/images/users/'+data.user.profile_picture : backend_url+'/images/users/avatar.png'"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>{{data.user && data.user.full_name ? data.user.full_name :''}}</h2>
                    <div class="match_ver">{{data.match_ladder && data.match_ladder.title ? data.match_ladder.title :''}}</div>
                  </div>
                </div>
              </div>
              <!-- <div class="col-6 col-md-4 col-lg-3">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      src="/src/assets/images/champion-2.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>Gary Dastin</h2>
                    <div class="match_ver">M3.5</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      src="/src/assets/images/champion-3.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>Chris Love</h2>
                    <div class="match_ver">M4.0</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      src="/src/assets/images/champion-4.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>Chip Wintringham</h2>
                    <div class="match_ver">M4.5+</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      src="/src/assets/images/champion-5.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>Olanike A-M</h2>
                    <div class="match_ver">W2.5</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      src="/src/assets/images/champion-6.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>Diane Bach</h2>
                    <div class="match_ver">W3.0</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      src="/src/assets/images/champion-7.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>Olivia Beasley</h2>
                    <div class="match_ver">W3.5</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-3">
                <div class="single_col">
                  <div class="single_col_img">
                    <img
                      src="/src/assets/images/champion-8.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="single_content">
                    <h2>Amanda</h2>
                    <div class="match_ver">W4.0+</div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>

          <!-- Playoffs -->
          <div class="playoffs_holder">
            <div class="playoffs_header d-none">
              <h2>Fall Playoffs 2020</h2>
              <div class="playoffs_dropdown">
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
            <div class="playoffs_body">
              <div class="playoff_row">
                <div class="playoff_category">Men 3.0</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Men 3.5</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Men 4.0</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Men 4.5+</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Women 2.5</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Women 3.0</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Women 3.5</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Women 4.0+</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">Men Doubles</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">W 3.0 Doubles</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
              </div>
              <div class="playoff_row">
                <div class="playoff_category">W 3.5 Doubles</div>
                <div class="playoff_player1">
                  Alfredo Henriques <span>W</span>
                </div>
                <div class="playoff_vs">VS</div>
                <div class="playoff_player2">Gary Leavitt <span>F</span></div>
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
      }
  },
  async created(){
   this.playoffs =  (await seasonApis.getRecentlyCompletedSeasonWithPlayers()).data;
      setTimeout(() => {
          this.loader = false
      }, 1000);
  }
}
</script>