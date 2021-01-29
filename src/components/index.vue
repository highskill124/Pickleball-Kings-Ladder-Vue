<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--  Banner Starts Here   -->
    <div class="home_banner">
      <div class="bxslider">
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
              <h3>Welcome to Kings Tennis Ladder</h3>
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
              <h3>Welcome to Kings Tennis Ladder</h3>
              <h2>
                Want to Play Tennis in a <span>Super Fun</span> Super Flexible
                league?
              </h2>
              <h4>First Season Spring 2021!</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="about_wraper">
        <div class="container_large">
          <div class="about_holder">
            <div class="about_content">
              <h2><span>About</span>Kings Tennis Ladder</h2>
              <p>
                Kings Tennis ladder is a year-round tennis ladder open to Adult
                Men and Women of all skill levels in Upstate South Carolina.
                This league is based out of Greenville, SC but players from
                Anderson, Clemson, and any other surrounding areas in Upstate SC
                are welcome! This league will include Singles, Doubles, and
                Mixed Doubles.
              </p>
              <div class="read_more"><a href="#">Read More</a></div>
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
              Think you don’t have time to be in a tennis league or don’t have
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
                <h2>Kings Tennis Seasons</h2>
                <p>
                  There will be 4 seasons every year, each lasting 8 weeks. At
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
                <ul>
                  <li>Spring 2021 Dates</li>
                  <li>Monday March 15th- Sunday May 16th</li>
                  <li>
                    <strong>Deadline to register</strong> for $5 off March 10th
                  </li>
                  <li>
                    <strong>Playoff Tournament</strong> May 22nd and May 23rd
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
              Head to the <span>How it Works</span> tab or email
              <span>kings@tennis.com</span>
            </h3>
            <div class="read_more"><a href="#">Sign up Today! </a></div>
          </div>
        </div>
      </section>
    </main>
    <!--   Main Content End Here   -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loader: true,
    };
  },
  created() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>