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
                  <h1>Social links</h1>
                </div>
                <div class="content_body">
                  <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="status && status==200">
                      <strong>Success!</strong> action performed successfully.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Type</label>
                             <select v-model="formObj.type" required>
                              <option value="">Select</option>
                              <option value="facebook">Facebook</option>
                              <option value="instagram">Instagram</option>
                            </select>
                            <v-errors :errors="errorFor('type')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Link</label>
                            <input
                              type="text"
                               v-model="formObj.url" required
                              placeholder="https://google.com/"
                            />
                            <v-errors :errors="errorFor('url')"></v-errors>
                          </div>
                        </div>
                       
                        
                        <div class="col-md-12">
                          <div class="form_group">
                            <input
                              type="submit"
                              name=""
                              class="save_btn"
                              value="Save"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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
import socialApis from '../../Apis/socialLinks';
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";

export default {
   mixins: [validationErrors],
  components: {
    sidebarComponent,
  },
  data() {
    return {
      loader: true,
      errors: null,
      status: null,
      formObj: {
        id: null,        
        type: "",
        url: null,
      },
    };
  },
   computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
  },
  methods: {
   async submit() {
     this.loader= true;
     if(this.$route.params.id){
         await socialApis.requestSocials("put", this.formObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;
            this.$router.push({name:'admin-socials'});
              // setCurrentUser(response.data);
          }
        })
        .catch((error) => {
          this.loader = false;
          if (is422(error)) {
            this.errors = error.response.data.errors;
          }
          this.status =
            error.response && error.response.status
              ? error.response.status
              : "";
        }).then(()=>{
          this.loader = false;
        });
     } else{
         await socialApis.requestSocials("post", this.formObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;
            this.$router.push({name:'admin-socials'});
              // setCurrentUser(response.data);
          }
        })
        .catch((error) => {
          this.loader = false;
          if (is422(error)) {
            this.errors = error.response.data.errors;
          }
          this.status =
            error.response && error.response.status
              ? error.response.status
              : "";
        }).then(()=>{
          this.loader = false;
        });
     }
     
     
    },
  },
  async created() {
    if(this.$route.params.id){
      this.formObj = (await socialApis.getById(this.$route.params.id)).data;
    }
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    // this.formObj = getCurrentUser();
  },
};
</script>