<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <div class="inner_banner">
      <div class="container_large">
        <h1>Kings Tennis Ladder Rules</h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="inner_wraper full_bg">
        <div class="container_large">
          <div class="rules_holder">
            <div class="form_group">
              <h3>Respect:</h3>
              <p>
                The #1 rule of this ladder is to have fun and be respectful.
                Disrespect will not be tolerated and Kings pickleball ladder
                reserves the right to remove any player from the ladder.
              </p>
            </div>
            <div class="form_group">
              <h3>How Do I Play?</h3>
              <p>
                Here are a couple of videos to help you with all things
                pickleball!
              </p>
              <p class="mt-3">
                 <a
                  href="https://www.youtube.com/watch?v=4vHhZ03O0PI&ab_channel=NinhLy" target="#"
                  ><b>Beginner’s Guide</b></a><br />
              </p>
              <p class="mt-3">
                <a
                  href="https://www.youtube.com/watch?v=-vdHeh3Tftk&t=203s&ab_channel=PickleballKitchen" target="#"
                  > <b>Common Pickleball Rules Questions ANSWERED!</b></a><br />
              </p>
            </div>
            <div class="form_group">
              <h3>Ratings:</h3>
              <p>
                If you are unsure which level rating to sign up for please refer
                to the following rating guide.<br />
                <span class="mt-3">
                  <a href="https://usapickleball.org/tournaments/tournament-player-ratings/player-skill-rating-definitions" target="#">Ratings Guide</a></span>
                <br />
                You are welcome to play on multiple ladders in one season if you
                feel the ladder you initially sign up for does not match your
                skill level. You cannot be moved out of a ladder (rating level)
                once you join, but are welcome to join an additional ladder if
                you wish.
              </p>
            </div>
            <div class="form_group">
              <h3>League format:</h3>
              <p>
                You accumulate points by playing matches. Your position on the
                ladder will be adjusted according to the points you accumulate.
                You may play as many or as few matches as you like. You may
                challenge any person on your ladder (within your same rating
                category). You are free to accept or decline any challenge.
              </p>
            </div>
            <div class="form_group">
              <h3>Points Algorithm:</h3>
              <p>
                The point accumulated will be calculated based on the following
                algorithm
              </p>
              <div class="mt-4">
                <b>Winner Points (WP)</b><br />
                <p>
                  If lower-ranked: 15 plus ((Difference in points in games won
                  times the Difference in rankings up to 7) divided by
                  <b>4</b>)<br />
                  If tied: 15 plus Difference in points in games won<br />
                  If higher-ranked: 10 plus Difference in points in games won
                </p>
              </div>
              <div class="mt-4">
                <b>Loser Points (LP)</b><br />
                <p>
                  Game points = Games won in all sets (maximum <b>12</b> points)
                </p>
              </div>
            </div>
            <div class="form_group">
              <h3>Communication:</h3>
              <p>
                Try to have your opponent’s phone number on you in case you need
                to reach them. It is advisable to reach out to your opponent via
                text/email prior to the match. If you choose to propose a match
                at a private club let your opponent know if there are any fees.
                They cannot be expected to pay fees if they were not made aware
                and agreed in advance.
              </p>
            </div>
            <div class="form_group">
              <h3>Match Play:</h3>
              <p>
                Each match will be the best 2 out of 3 sets. Each set will be
                first to 11 points, the winning team must win by two points or
                play continues until one team wins by 2.
              </p>
              <p>
                (If there is any confusion about scoring or how to enter match
                scores, email kingspickleballladder@gmail.com)
              </p>
            </div>

            <div class="form_group">
              <h3>Proposals:</h3>
              <p>
                You may propose a match at whatever time and location you
                choose. If you accept a proposal that has a time and location,
                you must show up at that location whether it is confirmed by
                your opponent or not. Likewise, if you put out a proposal with a
                time and location, and it is accepted, you must show up for the
                match or it is a forfeit. If you change your mind about playing
                a match, make sure you delete that proposal (so no one accepts
                it), and if it has been accepted, make sure to inform your
                opponent.
              </p>
            </div>
            <div class="form_group">
              <h3>Rescheduling:</h3>
              <p>
                Please communicate as early as possible with your opponent if a
                match needs to be rescheduled for any reach. If rain or darkness
                interrupts a match continue the match when you and your opponent
                decide to. Make a note of the score when you decide to pause.
              </p>
            </div>
            <div class="form_group">
              <h3>Forfeits:</h3>
              <p>
                A forfeit can be claimed if you are more than 15 minutes late
                for your match. The player giving the forfeit receives no credit
                for the match. The player receiving the forfeit is considered to
                have won the match (11-0, 11-0) and receives all credit.
                Emergencies come up, but please be respectful of each other’s
                time and situation. If you need to cancel your match, please
                reschedule it right away. And when canceling, please CALL your
                opponent instead of sending an email—some players do not check
                email that often. With any last-minute cancellation (the day of
                the scheduled match), your opponent has the right to accept a
                forfeit (please offer it). If you are a “no show”, you will
                automatically give your opponent a forfeit.
              </p>
              <p>
                If you are unable to complete a match due to injury/fatigue, the
                opponent “wins” the rest of the remaining games.
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