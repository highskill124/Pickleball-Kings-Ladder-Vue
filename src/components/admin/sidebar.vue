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
          <span>Dasboard</span></a
        >
      </li>
     <li>
       <router-link :to="{ name: 'admin-seasons' }"
          ><img src="/src/assets/images/support.svg" alt="" />
          <span>Seasons</span></router-link>
     </li>
     <li>
       <router-link :to="{ name: 'admin-socials' }"
          ><img src="/src/assets/images/support.svg" alt="" />
          <span>Socials</span></router-link>
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
              <router-link :to="{ name: 'admin-profile-settings' }"
                >Settings</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'admin-reset-password' }"
                >Reset Password</router-link
              >
            </li>
          </ul>
        </div>
      </li>
      <li>
        <router-link :to="{ name: 'admin-users' }"
          ><img src="/src/assets/images/support.svg" alt="" />
          <span>Users</span></router-link
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
              <h2>Are you sure you want to logout?</h2>
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
export default {
  data() {
    return {
      loader: false,
    };
  },
  async created() {
    if (!getCurrentUser()) {
      await userApis.getCurrentUser().then((response) => {
        this.$store.dispatch("islogedIn", response.data);
        setCurrentUser(response.data);
      });
    }
  },
  methods: {
    async logout() {
      this.loader = true;
      await userApis
        .logout()
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            this.$store.dispatch("islogut", []);
            logOut();
            $("body").removeClass("modal-open");
            $(".fade").removeClass("modal-backdrop");
            $("body").css("padding-right", "0px");

            this.loader = false;
            // window.location.href = "/";
            this.$router.push({ name: "login" });
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