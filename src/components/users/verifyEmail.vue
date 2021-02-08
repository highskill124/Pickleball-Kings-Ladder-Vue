<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--  Banner Starts Here   -->
    <div class="inner_banner">
      <div class="container_large">
        <h1>Verify Email</h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->

    <!--   Main Content Start Here   -->
    <main>
      <section class="inner_wraper full_bg">
        <div class="container_large"></div>
      </section>
    </main>
  </div>
</template>
<script>
import usersApis from '../../Apis/users'
export default {
    async created(){
       const data = await(usersApis.verifyEmail(this.$route.params.id));
       if(data && data.status && data.status==200){
           this.$router.push({name:'login'});
       }
    }
}
</script>