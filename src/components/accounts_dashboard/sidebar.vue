<template>
  <!-- Sidebar Panel -->
  <div class="menu_sidebar">
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <ul>
      <li>
        <a href="#"
          ><img src="/src/assets/images/dashboard.svg" alt="" />
          <span>Dasboard</span></a>
      </li>
      <li>
       <button
          data-bs-toggle="collapse"
          href="#events"
          role="button"
          aria-expanded="false"
          aria-controls="events"
        >
          <img src="/src/assets/images/events.svg" alt="" /> <span>Events</span>
        </button>
        <div class="collapse" id="events">
          <ul class="submenu">
            <!-- <li>
              <router-link :to="{ name: 'account-events',  params:{type:'winter-singles'}  }"
                >Winter Singles</router-link
              >
            </li> -->
            <li v-for="data in seasons" :key="data.id">
             
                <router-link :to="{ name: 'account-events',  params:{season: data.id}  }"
                > {{data.title}}</router-link
              >
            </li>
            <!-- <li>
              <router-link :to="{ name: 'account-events_doubles',  params:{type:'winter-doubles'} }"
                >Winter Doubles</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'account-events_mixed',  params:{type:'winter-mixed-doubles'} }"
                >Winter Mixed Doubles</router-link
              >
            </li> -->
          </ul>
        </div>
      </li>
      <li>
         <button
          data-bs-toggle="collapse"
          href="#profile"
          role="button"
          aria-expanded="false"
          aria-controls="profile">
        <img src="/src/assets/images/user.svg" alt="" />
          <span>Profile</span></button>
        <div class="collapse" id="profile">
          <ul class="submenu">
            <li>
              <router-link :to="{ name: 'account-profile-settings' }"
                >Settings</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'account-reset-password' }"
                >Reset Password</router-link
              >
            </li>
          </ul>
        </div>
      </li>
      <li>
        <router-link :to="{ name: 'account-support' }"
          ><img src="/src/assets/images/support.svg" alt="" />
          <span>Support</span></router-link
        >
      </li>
      <li>
        <a href="#" data-bs-toggle="modal" data-bs-target="#confirmation"
          ><img src="/src/assets/images/logout.svg" alt="" />
          <span>Logout</span></a
        >
      </li>
    </ul>

    <!-- Modal -->
    <div
      class="modal fade"
      id="confirmation"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal_content">
              <div class="close_modal">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <h2>Are you sure you wants to logout?</h2>
              <!-- <p>I will not close if you click outside me. Don't even try to press escape key.</p> -->
              <div class="modal_actions">
                <button type="button" class="close_btn" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  class="confirm_btn"
                  @click.prevent="logout()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { logOut, setCurrentUser, getCurrentUser } from "../../utils/auth";
import userApis from "../../Apis/users";
import seasonApis from '../../Apis/seasons';
export default {
  data() {
    return {
      loader: false,
      seasons: null,
    };
  },
  async created() {
      this.seasons = (await seasonApis.requestSeasons("get","")).data;
    if (!getCurrentUser()) {
      
      // await userApis.getCurrentUser().then((response) => {
      //   // this.$store.dispatch('islogedIn', response.data);
      //   // setCurrentUser(response.data);
      // });
      const user =  (await userApis.getCurrentUser()).data;
       const categories = (await userApis.getUserCategories(user.id)).data;
        delete categories.id;
       let merged = {...user, ...categories};
       this.$store.dispatch('islogedIn', merged);
        setCurrentUser(merged);
    }
  },
  methods: {
    async logout() {
      this.loader = true;
      await userApis
        .logout()
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            this.$store.dispatch('islogut', []);
            logOut();
            $("body").removeClass("modal-open");
            $(".fade").removeClass("modal-backdrop");
            $("body").css("padding-right", "0px");
           
             this.loader = false;
             window.location.href ='/';
            // this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          this.loader = false;
        })
        .then(() => {
          this.loader = false;
        });
    },
  },
};
</script>