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
                    <h3>Manage Social links</h3>
                    <div class="tables_filters">
                      <router-link :to="{ name: 'admin-add-socials' }"
                        ><button>Add</button></router-link
                      >
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>URL</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in socials" :key="data.id">
                          <td>{{ data.type }}</td>
                          <td>
                            <strong>{{ data.url }}</strong>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'admin-update-socials',
                                params: { id: data.id, obj: data },
                              }"
                              ><span class="btn btn-info">Edit</span>
                            </router-link>
                            <span
                              class="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                              >Delete</span
                            >
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
                                      Are you sure you want to delete this
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
  </div>
</template>
<script>
import sidebarComponent from "./sidebar";
import socialApis from "../../Apis/socialLinks";
export default {
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      socials: null,
    };
  },
  methods: {
    async deleteObj(data) {
      this.loader = true;
      await socialApis
        .requestSocials("delete", data)
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            this.getSocials();
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
    async getSocials() {
      this.socials = (await socialApis.requestSocials("get", "")).data;
      console.log(this.socials);
    },
  },
  async created() {
    this.getSocials();
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>