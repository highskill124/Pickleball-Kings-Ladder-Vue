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
            <div class="col-md-12 col-lg-9">
              <div class="content_column">
                <div class="content_body">
                  <div class="table_header">
                    <h3>Manage Users</h3>
                    <div class="tables_filters">
                      <!-- <router-link :to="{ name: 'admin-add-socials' }"
                        ><button>Add</button></router-link
                      > -->
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>City</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in users" :key="data.id">
                          <td>{{ data.full_name }}</td>
                          <td>
                            <strong>{{ data.email }}</strong>
                          </td>
                          <td>{{ data.city }}</td>
                          <td>
                            <span  v-if="data.id != current_user.id">
                            <!-- <router-link
                              :to="{
                                name: 'admin-user-season',
                                params: { id: data.id},
                              }"
                              ><span class="btn btn-success"><i class="fa fa-eye"></i>Season</span>
                            </router-link> -->
                            <span
                              class="btn btn-success"
                              @click.prevent="viewSeason(data.id)"
                              ><i class="fa fa-eye"></i>Seasons</span
                            >
                            <router-link
                              :to="{
                                name: 'admin-user-password',
                                params: { id: data.id },
                              }"
                              ><span class="btn btn-info"
                                ><i class="fa fa-edit"></i>Password</span
                              >
                            </router-link>
                            <span
                              class="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                             
                              >Delete</span
                            >
                            </span>
                          </td>
                          <!-- Modal -->
                          <div
                            class="modal fade"
                            id="deleteModal"
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
                                    <h2>Are you sure?</h2>
                                    <p>
                                      Are you sure you wants to delete this
                                      item?
                                    </p>
                                    <div class="modal_actions">
                                      <button
                                        type="button"
                                        class="close_btn"
                                        data-bs-dismiss="modal"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="button"
                                        class="confirm_btn"
                                        @click.prevent="deleteObj(data)"
                                      >
                                        Confirm
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!--   Main Content End Here   -->

    <!-- Modal for viewing paid ladders of a user-->
    <div
      class="modal fade"
      id="viewLadders"
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
              <h2>User paid Ladders</h2>
              <table
                class="table"
                border="1"
                v-if="paid_ladders && paid_ladders.length"
              >
                <thead>
                  <tr>
                    <th>Ladder title</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in paid_ladders" :key="data.id">
                    <td>
                      {{
                        data.matchladder && data.matchladder.title
                          ? data.matchladder.title
                          : ""
                      }}
                    </td>
                    <td>
                      <strong>{{
                        data.matchladder && data.matchladder.gender
                          ? data.matchladder.gender
                          : ""
                      }}</strong>
                    </td>
                    <td>
                    <router-link
                      :to="{
                        name: 'admin-user-season',
                        params: { id: data.id },
                      }"
                      ><span class="btn btn-info"
                        ><i class="fa fa-edit"></i> Season</span
                      >
                    </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-if="!paid_ladders || !paid_ladders.length">
                No paid category for this user
              </p>
              <div class="modal_actions">
                <button type="button" class="close_btn" data-bs-dismiss="modal">
                  Cancel
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
import sidebarComponent from "./sidebar";
import usersApis from "../../Apis/users";
import userPaidRankingsApis from "../../Apis/user-paid-rankings";
import { getCurrentUser } from "../../utils/auth";
export default {
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      paid_ladders: null,
      get_id: "",
      users: null,
      current_user: "",
    };
  },
  methods: {
    // opening model for viewing paid ladder of a user

    async viewSeason(id) {
      this.loader = true;
      this.paid_ladders = (await userPaidRankingsApis.getByUserId(id)).data;
      var myModal = new bootstrap.Modal(
        document.getElementById("viewLadders"),
        {
          keyboard: false,
        }
      );
      this.loader = false;
      myModal.show();
    },

    /** deleting data */
    async deleteObj(data) {
      this.loader = true;
      await usersApis
        .requestUsers("delete", data)
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            this.getUsers();
            $("body").removeClass("modal-open");
            $(".fade").removeClass("modal-backdrop");
            $("body").css("padding-right", "0px");
            this.loader = false;
          }
        })
        .catch((error) => {
          this.loader = false;
        })
        .then(() => {
          this.loader = false;
        });
    },
    async getUsers() {
      this.users = (await usersApis.requestUsers("get", "")).data;
    },
  },
  beforeDestroy: function () {
    console.log("DESTROYYYY!!!");
    $("body").removeClass("modal-open");
    $(".fade").removeClass("modal-backdrop");
    $("body").css("padding-right", "0px");
  },
  async created() {
    this.current_user = getCurrentUser();
    this.getUsers();
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>