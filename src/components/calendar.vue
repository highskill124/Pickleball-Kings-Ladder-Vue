<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--  Banner Starts Here   -->
    <div class="inner_banner">
      <div class="container_large">
        <h1>Pickleball Ladder Calendar</h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="inner_wraper">
        <div class="container_large">
          <div class="row" v-if="seasons && seasons.length">
            
            <div class="col-md-6" v-for="data in seasons" :key="data.id">
              <div class="calendar_column">
                <h2>{{ data.title}}</h2>
                <ul>
                  <li>
                    <span>Start Date</span>
                    <span>{{data.start_date}}</span>
                  </li>
                  <li>
                    <span>Deadline to Register</span>
                    <span>{{data.registration_deadline}}</span>
                  </li>
                  <li>
                    <span>End Date</span>
                    <span>{{data.end_date}}</span>
                  </li>
                  <li>
                    <span>Playoff Date</span>
                    <span>{{data.playoff_date}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row" v-if="!seasons || !seasons.length">
              <div class="col-md-12">
                <div class="calendar_column">
                  No seasons exits yet, please contact your admin.
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
    return {
      loader: true,
      seasons: null,
    };
  },
  async created() {
     this.seasons = (await seasonApis.requestSeasons("get", "")).data;
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>