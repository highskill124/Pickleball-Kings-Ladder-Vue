<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <div class="inner_banner">
      <div class="container_large">
        <h1>Kings Pickleball Ladder Ratings</h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="inner_wraper full_bg">
        <div class="container_large">
          <div class="rules_holder">
            <div class="form_group">
              <p>
              Players will determine their division level by self-rating their ability using the National Tennis Rating Program (NTRP) described below. A player may play above his or her level (if compuranked) but not below.
              </p>
            </div>
            <div class="form_group">
              <h3>2.5</h3>
              <p>
                This player is learning to judge where the ball is going although court coverage is weak. This player can sustain a short rally of slow pace with other players of the same ability.
              </p>
            </div>
            <div class="form_group">
              <h3>3.0</h3>
              <p>
                This player is fairly consistent when hitting medium-paced shots but is not comfortable with all strokes and lacks execution when trying for directional control, depth or power.
              </p>
            </div>
            <div class="form_group">
              <h3>3.5</h3>
              <p>
                This player has achieved improved stroke dependability with directional control on moderate shots but still lacks depth and variety. This player exhibits more aggressive net play and has improved court coverage.
              </p>
            </div>
            <div class="form_group">
              <h3>4.0</h3>
              <p>
                This player has dependable strokes, including directional control and depth on both forehand and backhand sides on moderate shots, plus the ability to use lobs, overheads, approach shots and volleys with some success. Rallies may be lost due to impatience.
              </p>
            </div>
            <div class="form_group">
              <h3>4.5</h3>
              <p>
                This player has begun to master the use of power and spins and is beginning to handle pace, has sound footwork, can control depth of shots, and beginning to vary game plan according to opponents. This player tends to over-hit on difficult shots.
              </p>
            </div>
            <div class="form_group">
              <h3>5.0</h3>
              <p>
               This player has good shot anticipation and frequently has an outstanding shot or attribute around which a game may be structured. This player can regularly hit winners or force errors off of short balls and can put away volleys, can successfully execute lobs, drop shots, half volleys, overhead smashes, and has good depth and spin on most 2nd serves.
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