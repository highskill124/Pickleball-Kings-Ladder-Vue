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
                  <h1>User Profile</h1>
                </div>
                <div class="content_body">
                  <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="status && status==200">
                      <strong>Success!</strong> info updated successfully.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="submit()">
                    <div class="form_holder">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>First Name</label>
                            <input
                              type="text"
                              v-model="formObj.first_name" required
                              placeholder="John"
                            />
                            <v-errors :errors="errorFor('first_name')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Last Name</label>
                            <input
                              type="text"
                               v-model="formObj.last_name" required
                              placeholder="Deo"
                            />
                            <v-errors :errors="errorFor('last_name')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Email</label>
                            <input
                              type="email"
                               v-model="formObj.email" required
                              placeholder="example@domain.com"
                            />
                            <v-errors :errors="errorFor('email')"></v-errors>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Phone Number</label>
                            <input
                              type="number"
                              name=""
                              value="8646175102"
                               v-model="formObj.phone"
                              placeholder="XXXXXXXXXXX"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Address</label>
                            <input
                              type="text"
                              v-model="formObj.address"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>City</label>
                            <input
                              type="text"
                              v-model="formObj.city"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>State</label>
                            <input
                              type="text"
                              v-model="formObj.state"
                              placeholder="State"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Zip Code</label>
                            <input
                              type="text"
                              v-model="formObj.zip_code"
                              placeholder="XXXX"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Skill Level</label>
                            <input
                              type="text"
                              name=""
                              v-model="formObj.skill_level"
                              placeholder="0.0"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <label>Gender</label>
                            <select class="form-select" v-model="formObj.gender">
                              <option value="">Select</option>
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form_group">
                            <div class="custom_checkbox">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="proposal-email"
                                  v-model="formObj.get_proposal_emails"
                                />
                                <label
                                  class="form-check-label"
                                  for="proposal-email"
                                >
                                  Proposal Emails
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                         <div class="row">
                          <div class="col-md-6 browser-content">
                            <div class="form_group">
                              <label>Preview</label>
                              <div v-if="url && url.length">
                                <img
                                  :src="url ? url : '/images/avatar.png'"
                                  class="preview-image-width"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form_group">
                              <file-upload
                                class="btn-browser"
                                :post-action="postAction"
                                :extensions="extensions"
                                :accept="accept"
                                :multiple="multiple"
                                :directory="directory"
                                :size="size || 0"
                                :thread="
                                  thread < 1 ? 1 : thread > 5 ? 5 : thread
                                "
                                v-model="formObj.profile_picture"
                                @input-filter="inputFilter"
                                @input-file="inputFile"
                                ref="upload"
                                >BROWSER</file-upload
                              >
                            </div>
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
import axios from 'axios';
import sidebarComponent from "./sidebar";
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import { setCurrentUser, getCurrentUser } from "../../utils/auth";

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
      accept: "image/png,image/gif,image/jpeg,image/webp",
      extensions: "gif,jpg,jpeg,png,webp",
      minSize: 1024,
      size: 1024 * 1024 * 10,
      multiple: false,
      directory: false,
      thread: 3,
      name: "file",
      postAction: "/index.php/api/user",
      putAction: "/index.php/api/user",
      autoCompress: 1024 * 1024,
      uploadAuto: false,
       url: null,
      formObj: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        gender: "",
        address: null,
        city: null,
        state: null,
        zip_code: null,
        get_proposal_emails: true,
        skill_level: null,
        profile_picture: [],
      },
    };
  },
   watch: {
    "formObj.profile_picture": function(val, oldVal) {
      if (
        this.formObj.profile_picture &&
        this.formObj.profile_picture[0] &&
        this.formObj.profile_picture[0].blob
      ) {
        this.url = this.formObj.profile_picture[0].blob;
      }
    }
  },
   computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
  },
  methods: {
   async submit() {
     this.loader= true;
       const dataObj = new FormData();
      dataObj.append("id", this.formObj.id);
      dataObj.append("first_name", this.formObj.first_name);
      dataObj.append("last_name", this.formObj.last_name);
      dataObj.append("email", this.formObj.email);
      dataObj.append("phone", this.formObj.phone);
      dataObj.append("gender", this.formObj.gender);
      dataObj.append("address", this.formObj.address);
      dataObj.append("city", this.formObj.city);
      dataObj.append("state", this.formObj.state);
      dataObj.append("zip_code", this.formObj.zip_code);
      dataObj.append("get_proposal_emails", this.formObj.get_proposal_emails);
      dataObj.append("skill_level", this.formObj.skill_level);
      dataObj.append("_method", "PATCH");

      if (this.formObj.profile_picture[0] != null && this.formObj.profile_picture[0].file) {
        dataObj.append("profile_picture", this.formObj.profile_picture[0].file);
      }

      //  having issues in getting form data id in users apis file so thats why writing api here

      await axios
      .post(`${process.env.API_URL}/users/${this.formObj.id}`, dataObj)
      .then((response) => {
         this.loader= false;
        console.log(response);
          if (response.status == 200) {
            this.status = response.status;
              setCurrentUser(response.data);
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
    },


  // image upload
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Add file

        // Filter non-image file
        // Will not be added to files
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent();
        }
        // Create the 'blob' field for thumbnail preview
        newFile.blob = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
      }

      if (newFile && oldFile) {
        // Update file

        // Increase the version number
        if (!newFile.version) {
          newFile.version = 0;
        }
        newFile.version++;
      }

      if (!newFile && oldFile) {
        // Remove file
        // Refused to remove the file
        // return prevent()
      }
    },
    //
    // add, update, remove File Event
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (
            newFile.size >= 0 &&
            this.minSize > 0 &&
            newFile.size < this.minSize
          ) {
            this.$refs.upload.update(newFile, { error: "size" });
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // Automatically activate upload
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    }
    
  },
  created() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    this.formObj = getCurrentUser();
    if (this.formObj.profile_picture) {
      this.url = `${process.env.Backend_URL}/images/users/${this.formObj.profile_picture}`;
      this.formObj.profile_picture = [this.formObj.profile_picture];
    }
  },
};
</script>