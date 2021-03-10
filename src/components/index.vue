<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--  Banner Starts Here   -->
    <div class="home_banner">
      <VueSlickCarousel v-bind="settings">
        <div>
          <div class="slider_img">
            <img
              src="/src/assets/images/slider-1.png"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="slider_content">
            <div class="">
              <h3>Welcome to Kings Pickleball Ladder</h3>
              <h2>
                Want to Play Pickleball in a <span>Super Fun</span> Super Flexible
                league?
              </h2>
              <h4>{{ season && season.title ? season.title : "" }}</h4>
            </div>
          </div>
        </div>
        <!-- slide two -->
        <div>
          <div class="slider_img">
            <img
              src="/src/assets/images/slider-2.png"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="slider_content">
            <div class="">
              <h3>Welcome to Kings Pickleball Ladder</h3>
              <h2>
                Want to Play Pickleball in a <span>Super Fun</span> Super Flexible
                league?
              </h2>
              <h4>{{ season && season.title ? season.title : "" }}</h4>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
      <!-- <div class="bxslider">
        <div class="slider_item">
          <div class="slider_img">
            <img
              src="/src/assets/images/slider-1.png"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="slider_content">
            <div class="container_large">
              <h3>Welcome to Kings Pickleball Ladder</h3>
              <h2>
                Want to Play Tennis in a <span>Super Fun</span> Super Flexible
                league?
              </h2>
              <h4>First Season Spring 2021!</h4>
            </div>
          </div>
        </div>
        <div class="slider_item">
          <div class="slider_img">
            <img
              src="/src/assets/images/slider-1.png"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="slider_content">
            <div class="container_large">
              <h3>Welcome to Kings Pickleball Ladder</h3>
              <h2>
                Want to Play Tennis in a <span>Super Fun</span> Super Flexible
                league?
              </h2>
              <h4>First Season Spring 2021!</h4>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="about_wraper">
        <div class="container_large">
          <div class="about_holder">
            <div class="about_content">
              <h2><span>About</span>Kings Pickleball Ladder</h2>
              <p>
                Kings Pickleball ladder is a year-round pickleball ladder open to Adult
                Men and Women of all skill levels in Upstate South Carolina.
                This league is based out of Greenville, SC but players from
                Anderson, Clemson, and any other surrounding areas in Upstate SC
                are welcome! This league will include Singles and Doubles.
              </p>
              <div class="read_more d-none"><a href="#">Read More</a></div>
            </div>
            <div class="about_img">
              <img
                src="/src/assets/images/tennis-player.png"
                class="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section class="guess_wraper">
        <div class="container_large">
          <div class="guess_img">
            <img
              src="/src/assets/images/girl-playing-tennis.png"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="guess_content">
            <h2>Guess Again!</h2>
            <h4>
              Think you don’t have time to be in a pickleball league or don’t have
              enough experience?
            </h4>
            <p>
              You can play as few or as many matches as you like when it fits
              YOUR schedule. Also, this ladder is open to absolute beginners all
              the way to seasoned pros.
            </p>
          </div>
        </div>
      </section>
      <section class="seasons_wraper">
        <div class="container_large">
          <div class="row">
            <div class="col-md-12 col-lg-8">
              <div class="seasons_content">
                <h2>Kings Pickleball Seasons</h2>
                <p>
                  There will be 4 seasons every year, each lasting 8-10 weeks. At
                  the end of each season, there will be a special tournament
                  with prizes and free registration for the next season awarded
                  to the winner of each division.
                </p>
                <ul>
                  <li>Spring Season</li>
                  <li>Summer Season</li>
                  <li>Fall Season</li>
                  <li>Winter Season</li>
                </ul>
              </div>
            </div>
            <div class="col-md-12 col-lg-4">
              <div class="current_season">
                <h3>Current Season</h3>
                <ul v-if="season">
                  <li>{{ season.title ? season.title : "" }} Dates</li>
                  <li>
                    {{
                      season.start_date_formated
                        ? season.start_date_formated
                        : ""
                    }}-
                    {{
                      season.end_date_formated ? season.end_date_formated : ""
                    }}
                  </li>
                  <li>
                    <strong>Deadline to register</strong> for $30 off
                    {{
                      season.registration_deadline_formated
                        ? season.registration_deadline_formated
                        : ""
                    }}
                  </li>
                  <li>
                    <strong>Playoff Tournament</strong>
                    {{
                      season.playoff1_formated ? season.playoff1_formated : ""
                    }}
                    and
                    {{
                      season.playoff2_formated ? season.playoff2_formated : ""
                    }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="question_wraper">
        <div class="container_large">
          <div class="question_holder">
            <h2>More Questions?</h2>
            <h3>
              Head to the <router-link :to="{name:'how-it-works'}"><span>How it Works</span></router-link> tab or email
              <span>{{admin_email && admin_email.url ? admin_email.url:''}}</span>
            </h3>
            <div class="read_more"><router-link :to="{name:'signup'}">Sign up Today! </router-link></div>
          </div>
        </div>
      </section>
    </main>
    <!--   Main Content End Here   -->
  </div>
</template>
<script>
import seasonsApis from "../Apis/seasons";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import socialLinksApis from '../Apis/socialLinks';
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      loader: true,
      season: null,
      admin_email: null,
      settings: {
        dots: true,
        arrows: true,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    };
  },
  async created() {
    this.season = (await seasonsApis.getNextUpcomingSeason()).data;
    this.admin_email = (await socialLinksApis.getByType({type : 'admin_email'})).data
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>