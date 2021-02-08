<template>
  <div id="app">
    <header-component></header-component>
    <main>
      <section class="account_wraper">
        <router-view></router-view>
      </section>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>

import headerComponent from "./components/layouts/header";
import footerComponent from "./components/layouts/footer";
export default {
  name: "app",
  components: {
    headerComponent,
    footerComponent,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    console.log(`Working api url '${process.env.NODE_ENV}'`);
  },
};
</script>

<style>
.invalid-feedback{
  display: block !important;
}
.spinner {
  /* border: 1px solid; */
  position: fixed;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background: #dcdcdc
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='2' viewBox='0 0 50 50'%3E%3Cpath d='M28.43 6.378C18.27 4.586 8.58 11.37 6.788 21.533c-1.791 10.161 4.994 19.851 15.155 21.643l.707-4.006C14.7 37.768 9.392 30.189 10.794 22.24c1.401-7.95 8.981-13.258 16.93-11.856l.707-4.006z'%3E%3CanimateTransform attributeType='xml' attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='0.6s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E")
    center / contain no-repeat;
  opacity: 0.8;
}
.event-top-header ul li a:hover,
.event-top-header ul li .active{
    background: #6C63FF;
    color: #fff;
}
.router-link-exact-active{
    border-radius: 10px;
    /* padding: 10px 15px; */
    position: relative;
    color: #fff !important;
}
.nav-admin .router-link-exact-active{
    padding: 10px 15px;
}
.menu_sidebar .router-link-exact-active img{
    filter: invert(1);
}
.router-link-exact-active{
    background: #355947;
}
.transparent{
  background: transparent !important;
  filter: none !important;
}
input[type="date"], input[type="datetime-local"], input[type="number"]{
        padding: 10px 15px;
          width: 100%;
    display: block;
    background: #F8F8F8;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 15px 20px;
    }

.user_menu_route .router-link-exact-active{
    background: none !important;
}
</style>
