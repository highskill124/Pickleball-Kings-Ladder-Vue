<template>
  <div>
    <!-- <link rel="shortcut icon" href="/src/assets/images/favicon.png" type="image/x-icon">
  <link rel="icon" href="/src/assets/images/favicon.png" type="image/x-icon">
  <title>tennis-ladder-vue</title> -->

  <!--   Bootstrap CSS   -->
  <link href="/src/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">

  <!--    Font Awesome CSS   -->
  <!-- <link href="./src/assets/css/all.min.css" rel="stylesheet" type="text/css">  -->
<!--   Bx Slider CSS   -->
  <link href="/src/assets/css/jquery.bxslider.css" rel="stylesheet" type="text/css"> 
  <!--    Custome CSS   -->
  <link href="/src/assets/css/styles.css" rel="stylesheet" type="text/css">
    <!--  Header Start Here   -->
      <header>
      <div class="container_large">
        <nav class="navbar navbar-expand-lg">
         <router-link :to="{name:'home'}" class="navbar-brand transparent"><img src="/src/assets/images/logo.png" class="img-fluid logo" alt=""></router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="toggler-icon"></span>
            <span class="toggler-icon"></span>
            <span class="toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto nav-admin">
              <li class="active"><router-link :to="{name:'home'}">Home</router-link></li>
              <li><router-link :to="{name:'calendar'}">Calendar</router-link></li>
              <li><router-link :to="{name:'rules'}">Resources</router-link></li>
              <li><router-link :to="{name:'playoffs'}">Playoffs</router-link></li>
              <li><router-link :to="{name:'covid'}">COVID - 19</router-link></li>
            </ul>
          </div>
        </nav>
        <div class="top_right">
          <div class="top_social">
            <a :href="facebook_link" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a :href="instagram_link" target="_blank"><i class="fab fa-instagram"></i></a>
          </div>
          <!-- Login Links -->
          <div class="login_links" v-if="!user || !user.length">
            
            <router-link :to="{name:'login'}">Login</router-link>
            <router-link :to="{name:'signup'}">Sign Up</router-link>
            <!-- <a href="#">Sign Up</a> -->
          </div>
          <!-- User Menu -->
          <div class="user_menu"  v-if="user && full_name">
              <div id="profileImage">{{intials}}</div>
              <span id="fullName">{{full_name}}</span>
          </div>
        </div>
      </div>
    </header>
    <!--  Header Ends Here   -->
  </div>
</template>
<script>
import socialApis from '../../Apis/socialLinks';
export default {
  data(){
    return{
      full_name: null,
      intials: null,
      facebook_link: null,
       instagram_link: null,
    }
  },
  
   computed:{
    user(){
      if(this.$store.state.logedInUser){       
        if(this.$store.state.logedInUser[0] && this.$store.state.logedInUser[0].full_name){
           this.full_name = this.$store.state.logedInUser[0].full_name;
            const intials = this.full_name.split(' ').map(name => name[0]).join('').toUpperCase();
            this.intials = intials;
          }   
        return this.$store.state.logedInUser;
      }
       return null;
    }
  },
  async created(){
     const social_links = (await socialApis.requestSocials('get','')).data;
     if(social_links && social_links.length){
        social_links.forEach(element => {
        if(element.type=='instagram'){
          this.instagram_link = element.url;
        } else if(element.type=="facebook"){
          this.facebook_link = element.url;
        }
      });
      this.$store.dispatch('setSocials', social_links);
      if(localStorage.getItem('current_user') && localStorage.getItem('current_user').length){
          const user = JSON.parse(localStorage.getItem('current_user'));
          this.$store.dispatch('islogedIn', user);
        }
     }
  }
}
</script>