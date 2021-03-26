<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <div class="inner_banner">
      <div class="container_large">
        <h1>Kings Pickleball Ladder Rules</h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="inner_wraper full_bg">
        <div class="container_large">
          <div class="rules_holder">
            <div class="form_group">
              <h3>Your Profile</h3>
              <p>
                Once you log in, you can access your dashboard by clicking your name  (located at the top right of your screen.  You can modify any information in your profile under the “profile” tab. To access your ladder, go to the “events” tab. From there, you can select your season and ladder division.
              </p>
            </div>
            <div class="form_group">
              <h3>Proposing or Challenging a Match</h3>
              <p>
                There are two ways to initiate match play. You can either challenge a specific player/team on the ladder, who can either accept or deny your challenge. The best and recommended way to initiate match play is to propose a match. This proposal can be seen by all the players on the ladder, and anyone can accept your proposed location/time.
              </p>
            </div>
            <div class="form_group">
              <h3>Accepting a Proposed Match or Challenge</h3>
              <p>
                If a player directly challenges you, you are free to accept or deny their challenge. <br>
                Once you accept a proposed match, you are agreeing to the proposed time and location. If you do need to cancel, please do so as soon as possible.
              </p>
            </div>
            <div class="form_group">
              <h3>Entering Match Scores</h3>
              <p>
                You can enter the match scores in the “Matches” tab. Please try to enter the score immediately after the match is completed. Rankings will be updated automatically based on the scores entered.
              </p>
            </div>
            <div class="form_group">
              <h3>Forfeits or Retiring From a Match</h3>
              <p>
                If a player does not show up at the accepted time/location then they “lose” all games for the match and the score is entered as 11-0 11-0.<br>
                If a player has to retire from an active match then the opponent wins the rest of the games. For example, if a player is fatigued as wishes to retire in the first set at 3-5, the opponent would win the rest of the games. The score would become 11-3 11-0. 
              </p>
            </div>
            <div class="form_group">
              <h3>Incomplete Matches</h3>
              <p>
                In the event both players agree to postpone an active match (due to darkness/weather, etc.), then the match can be completed when both players agree. Please do not enter incomplete match scores. Wait till the match is completed and enter the final score.
              </p>
            </div>
            <div class="form_group">
              <h3>Have Another Question?</h3>
              <p>
                 <span v-if="admin_email && admin_email.url">
                     <a :href="'mailto:'+ admin_email.url"><span>{{admin_email && admin_email.url ? admin_email.url:''}}</span></a>
                  </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!--   Main Content End Here   -->
  </div>
</template>
<script>
import socialLinksApis from '../Apis/socialLinks';
export default {
  data() {
    return {
      loader: true,
      admin_email: null,
    };
  },
 async created() {
    this.admin_email = (await socialLinksApis.getByType({type : 'admin_email'})).data
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>