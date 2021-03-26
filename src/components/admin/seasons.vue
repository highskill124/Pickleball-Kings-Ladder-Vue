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
                    <h3>Manage Seasons</h3>
                    <div class="tables_filters">
                      <router-link :to="{ name: 'admin-add-seasons' }"
                        ><button>Add</button></router-link
                      >
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Start date</th>
                          <th>End date</th>
                          <th>Registraion deadline</th>
                          <th>Playoff date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in seasons" :key="data.id">
                          <td>{{data.title}}</td>
                          <td>{{ data.start_date ? data.start_date  :'Not decided yet' }}</td>
                          <td>
                            <strong>{{ data.end_date ? data.end_date  :'Not decided yet'  }}</strong>
                          </td>
                          <td>
                            {{ data.registration_deadline ? data.registration_deadline  :'Not decided yet' }}
                          </td>
                          <td>
                            {{ data.playoff_date ? data.playoff_date  :'Not decided yet' }}
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'admin-update-seasons',
                                params: { id: data.id },
                              }"
                              ><span class="btn btn-info">Edit</span>
                            </router-link>
                            <span
                              class="btn btn-danger"
                              @click.prevent="openModal(data.id)"
                              >Delete</span
                            >
                          </td>
                          
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
                                        @click.prevent="deleteObj()"
                                        data-bs-dismiss="modal"
                                      >
                                        Confirm
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- end modal -->
    <!--   Main Content End Here   -->
  </div>
</template>
<script>
import sidebarComponent from "./sidebar";
import seasonApis from "../../Apis/seasons";
export default {
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      seasons: null,
      delete_id: null,
    };
  },
  methods: {
    openModal(id){
      this.delete_id = id
      let myModal = new bootstrap.Modal(
        document.getElementById("deleteModal")
      );
       myModal.show();
    },
    async deleteObj() {
      this.loader = true;
       let myModal = new bootstrap.Modal(
        document.getElementById("deleteModal")
      );
      await seasonApis
        .requestSeasons("delete", this.delete_id)
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
             myModal.hide();
            this.getSeasons();
            $("body").removeClass("modal-open");
            $(".fade").removeClass("modal-backdrop");
            $("body").css("padding-right", "0px");
            
            this.delete_id =null;
            this.loader = false;
          }
        })
        .catch((error) => {
          this.loader = false;
           myModal.hide();
        })
        .then(() => {
          this.loader = false;
           myModal.hide();
        });
         myModal.hide();
    },
    async getSeasons() {
      this.seasons = (await seasonApis.requestSeasons("get", "")).data;
    },
  },
  async created() {
    this.getSeasons();
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>