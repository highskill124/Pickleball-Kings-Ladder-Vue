<template>
  <!--   Main Content Start Here   -->

  <main>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <section class="default_wraper">
      <div class="container_large">
        <div class="row">
          <div class="col-md-3">
            <!-- Sidebar Panel -->
            <sidebar-component></sidebar-component>
          </div>
          <!-- Content Panel -->
          <div class="col-md-9">
            <div class="content_column">
              <div class="content_header">
                <h1>Winter Mixed Doubles</h1>
              </div>
              <div class="content_body">
                <h2>Please select a contest below</h2>
                <div class="events_categories">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="category_col">
                        <!-- <a href="#">Men's 3.0 Singles</a> -->
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'mens-3.0-singles'} }"
                          >Men's 3.0 Singles</router-link
                        >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'mens-3.5-singles'} }"
                          >Men's 3.5 Singles</router-link
                        >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'mens-4.0-singles'} }"
                          >Men's 4.0 Singles</router-link
                        >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'mens-4.5-singles'}}"
                          >Men's 4.5+ Singles</router-link
                        >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'womens-2.5-singles'} }"
                          >Women's 2.5 Singles</router-link
                        >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'womens-3.0-singles'} }"
                          >Women's 3.0 Singles</router-link
                        >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'womens-3.5-singles'} }"
                          >Women's 3.5 Singles</router-link
                        >
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="category_col">
                        <router-link :to="{ name: 'account-event_details', params:{type:$route.params.type,category:'womens-4.0-singles'} }"
                          >Women's 4.0+ Singles</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!--   Main Content End Here   -->
</template>
<script>
import sidebarComponent from "./sidebar";
import { getCurrentUser} from '../../utils/auth';
import manageAccess from '../../Apis/manage-access'
export default {
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      current_user: getCurrentUser(),
    };
  },
  methods:{
    ShowCategory(type, category){
     return manageAccess.isShowCategory(this.current_user, type, category)
    }
  },
  created() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>