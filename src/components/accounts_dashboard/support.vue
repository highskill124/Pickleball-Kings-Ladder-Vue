<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--   Main Content Start Here   -->
    <main>
      <section class="default_wraper">
        <div class="container_large">
          <div class="row">
            <div class="col-md-12 col-lg-3">
              <!-- Sidebar Panel -->
              <sidebar-component></sidebar-component>
            </div>
            <!-- Content Panel -->
            <!-- Content Panel -->
            <div class="col-md-12 col-lg-9">
              <div class="content_column">
                <div class="content_header">
                  <h1>Support</h1>
                </div>
                <div class="content_body">
                  <div class="support_content">
                      <p v-if="admin_email && admin_email.url">Click <a v-bind:href="'mailto:' +  admin_email.url">here</a> to email your coordinator</p>
                    <!-- <p>
                      Click <a href="#">here</a> to return to your home website
                    </p> -->
                    <p>
                      This interactive service and all its pages are Copyright ©
                      2021 <span>Portable Databases LLC.</span>
                    </p>
                    <p>All rights reserved.</p>
                  </div>
                </div>
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
import socialLinksApis from '../../Apis/socialLinks';
import sidebarComponent from "./sidebar";

export default {
  components: {
    sidebarComponent,
  },
  data() {
      return{
          loader:true,
          admin_email: null,
      }
  },
 async created(){
    this.admin_email = (await socialLinksApis.getByType({type : 'admin_email'})).data
      setTimeout(() => {
          this.loader = false
      }, 1000);
  }
};
</script>