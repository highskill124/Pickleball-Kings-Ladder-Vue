<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--  Banner Starts Here   -->
    <div class="inner_banner">
      <div class="container_large">
        <h1>Disclaimer - COVID - 19</h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="inner_wraper full_bg">
        <div class="container_large">
          <div class="row">
            <div class="col-md-8">
              <div class="covid_content">
                <ol>
                  <li>
                    Kings Tennis (Or Pickleball) ladder cannot be held liable
                    for any illness (including but not limited to COVID-19) or
                    injury that may result from participation.
                  </li>
                  <li>
                    When any participant registers to play they also release
                    Kings Tennis ladder of any liability including but not
                    limited to injury or illness.
                  </li>
                  <li>
                    We want all our players to remain healthy and to keep
                    enjoying the game.
                  </li>
                  <li>
                    Please continue to follow CDC guidelines regarding
                    precautions for COVID-19 ( and all communicable diseases
                    including but not limited to flu and MRSA)
                  </li>
                  <li>
                    Please do not play if you exhibit any of the following
                    symptoms as we navigate the COVID-19 pandemic.
                    <ul>
                      <li>
                        Any symptoms of infection/illness including but not
                        limited to fever, cough, shortness of breath, loss of
                        taste, or loss of smell.
                      </li>
                      <li>
                        You have a suspected or diagnosed case of COVID-19
                      </li>
                      <li>
                        You have been exposed to anyone with a confirmed or
                        suspected case of COVID-19
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
            <div class="col-md-4">
              <div class="covid_img">
                <img
                  src="/src/assets/images/covid.png"
                  class="img-fluid"
                  alt=""
                />
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