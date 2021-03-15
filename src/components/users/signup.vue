<template>
  <div class="container_large">
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <div class="login_holder">
      <h2>Kings Pickleball Ladder</h2>
      <p>
        To register for Kings’s Pickleball Ladder, please fill out the information
        below. After completing, the button at the bottom will take you to
        PayPal’s secure payment site where you can either log in to your
        existing PayPal account or pay with credit card.
      </p>
      <p><strong>$30 for singles, $30 for doubles by the deadline</strong></p>
      <p>
        <strong>$30 for singles, $30 for doubles after the deadline with additional ${{upcoming_season && upcoming_season.late_fee ? upcoming_season.late_fee :''}} for late fee</strong>
      </p>
      <p>
        Unsure what level to register for? please visit the
        <router-link :to="{name:'ratings'}">Ratings</router-link> page for reference
      </p>
      <div class="register_form">
        <form method="post" @submit.prevent="submit()" >
          <div class="form_holder">
            <div class="row">
              <div class="col-md-6 pe-sm-0 pe-md-5 pe-lg-5 pe-xl-5">
                <h3 class="mb-5">Personal Info</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>First Name <span>*</span></label>
                      <input
                        type="text"
                        name=""
                        placeholder="John"
                        v-model="signUpobj.first_name"
                        autofocus required
                      />
                      <v-errors :errors="errorFor('first_name')"></v-errors>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>Last Name <span>*</span></label>
                      <input
                        type="text"
                        name=""
                        placeholder="Deo"
                        v-model="signUpobj.last_name" required
                      />
                      <v-errors :errors="errorFor('last_name')"></v-errors>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>Email <span>*</span></label>
                      <input
                        type="email"
                        name=""
                        placeholder="example@domain.com"
                        v-model="signUpobj.email" required
                      />
                      <v-errors :errors="errorFor('email')"></v-errors>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>Phone</label>
                      <input
                        type="number"
                        name=""
                        placeholder="XXXXXXXXXX"
                        v-model="signUpobj.phone"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>Password <span>*</span></label>
                      <input
                        type="password"
                        name=""
                        placeholder="xxxxxxx"
                         @input="matchPassword()"
                        v-model="signUpobj.password" required
                      />
                      <v-errors :errors="errorFor('password')"></v-errors>
                      <transition-group name="fade" v-if="errors">
                        <p v-for="(error, keyIndex) in errors" :key="keyIndex+'from'">
                          <span v-if="error.password" style="color:#b22222">{{ error.password }}</span>
                        </p>
                      </transition-group>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>Confirm Password <span>*</span></label>
                      <input
                        type="password"
                        name=""
                        placeholder="xxxxxxx"
                         @input="matchPassword()"
                        v-model="signUpobj.confirm_password" required
                      />
                      <v-errors
                        :errors="errorFor('confirm_password')"
                      ></v-errors>
                      <transition-group name="fade" v-if="errors">
                        <p v-for="(error, keyIndex) in errors" :key="keyIndex+'from'">
                          <span v-if="error.password" style="color:#b22222">{{ error.password }}</span>
                        </p>
                      </transition-group>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 browser-content">
                    <div class="form_group">
                      <label>Preview</label>
                      <div v-if="url && url.length">
                        <img :src="url?url:'/images/avatar.png'" class="preview-image-width" />
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
                        :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                        v-model="signUpobj.profile_picture"
                        @input-filter="inputFilter"
                        @input-file="inputFile"
                        ref="upload"
                      >BROWSER</file-upload>
                     
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form_group">
                      <label>Gender</label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form_group">
                      <div class="custom_radio">
                        <input
                          type="radio"
                          id="male"
                          value="M"
                          name="gender"
                          checked
                          v-model="signUpobj.gender"
                        />
                        <label for="male">Male</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form_group">
                      <div class="custom_radio">
                        <input
                          type="radio"
                          id="female"
                          value="F"
                          name="gender"
                          v-model="signUpobj.gender"
                        />
                        <label for="female">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                  <div class="row">
                  <div class="col-md-3">
                    <div class="form_group">
                      <label>Get proposals</label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form_group">
                      <div class="custom_radio">
                        <input
                          type="radio"
                          id="Yes"
                          value="true"
                          name="get_proposal_emails"
                          v-model="signUpobj.get_proposal_emails"
                        />
                        <label for="Yes">Yes</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form_group">
                      <div class="custom_radio">
                        <input
                          type="radio"
                          id="No"
                          value="false"
                          name="get_proposal_emails"
                          v-model="signUpobj.get_proposal_emails"
                        />
                        <label for="No">No</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form_group">
                      <label>Skill Level</label>
                      <input
                        type="text"
                        name=""
                        placeholder="0.0"
                        v-model="signUpobj.skill_level"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form_group">
                      <label>Address</label>
                      <input
                        type="text"
                        name=""
                        placeholder="Address line 1"
                        v-model="signUpobj.address"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>City</label>
                      <input
                        type="text"
                        name=""
                        placeholder="Enter City"
                        v-model="signUpobj.city"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>State</label>
                      <input
                        type="text"
                        name=""
                        placeholder="Enter State"
                        v-model="signUpobj.state"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        name=""
                        placeholder="XXXX"
                        v-model="signUpobj.zip_code"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form_group">
                      <label>How did you hear about the ladder?</label>
                      <textarea
                        name=""
                        placeholder="Type here..."
                        v-model="signUpobj.source"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <h3 class="mb-5">Match Info</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>Singles</label>
                      <select name="" v-model="singles" @change.prevent="amountDue('Singles','singles', singles, 30)">
                        <option value="">Select</option>
                       <option v-for="data in single_rankings" :key="data.id" :value="data">{{data.title}} - $30.00</option>
                        <!-- <option value="2.5">2.5 - $30.00</option>
                        <option value="3.0">>3.0 - $30.00</option>
                        <option value="2.5">>3.5 - $30.00</option>
                        <option value="4.0">4.0 - $30.00</option>
                        <option value="4.5">4.5 - $30.00</option>
                        <option value="5.0">5.0 - $30.00</option> -->
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form_group">
                      <label>Additional Singles</label>
                      <select name="" v-model="additional_singles" @change.prevent="amountDue('Additional Singles','additional_singles', additional_singles, 30)">
                        <option value="">Select</option>
                        <option v-for="data in single_rankings" :key="data.id" :value="data">{{data.title}} - $30.00</option>
                        <!-- <option value="2.5">2.5 - $30.00</option>
                        <option value="3.0">3.0 - $30.00</option>
                        <option value="3.5">3.5 - $30.00</option>
                        <option value="4.0">4.0 - $30.00</option>
                        <option value="5.5">4.5 - $30.00</option>
                        <option value="5.0">5.0 - $30.00</option> -->
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Doubles</label>
                      <select name="" v-model="doubles" @change.prevent="amountDue('Doubles','doubles', doubles, 30)">
                        <option value="">Select</option>
                        <option v-for="data in double_rankings" :key="data.id" :value="data">{{data.title}} - $30.00</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Partner</label>
                      <input
                        type="text"
                        name=""
                        placeholder="Partner"
                        v-model="signUpobj.double_partner"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label
                        >2nd Partner
                        <span class="optional">(optional)</span></label
                      >
                      <input
                        type="text"
                        name=""
                        placeholder="2nd Partner"
                        v-model="signUpobj.double_second_partner"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Additional Doubles</label>
                      <select name="" v-model="additional_doubles" @change.prevent="amountDue('Additional Doubles','additional_doubles', additional_doubles, 30)">
                        <option value="">Select</option>
                        <option v-for="data in double_rankings" :key="data.id" :value="data">{{data.title}} - $30.00</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Partner</label>
                      <input
                        type="text"
                        name=""
                        placeholder="Partner"
                        v-model="signUpobj.additional_double_partner"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label
                        >2nd Partner
                        <span class="optional">(optional)</span></label
                      >
                      <input
                        type="text"
                        name=""
                        placeholder="2nd Partner"
                        v-model="signUpobj.additional_double_second_partner"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Mixed Doubles</label>
                      <select name="" v-model="mixed_doubles" @change.prevent="amountDue('Mixed Doubles','mixed_doubles', mixed_doubles, 25)">
                        <option value="">Select</option>
                         <option v-for="data in mixed_rankings" :key="data.id" :value="data">{{data.title}} - $25.00</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Partner</label>
                      <input
                        type="text"
                        name=""
                        placeholder="Partner"
                        v-model="signUpobj.mixed_doubles_partner"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label
                        >2nd Partner
                        <span class="optional">(optional)</span></label
                      >
                      <input
                        type="text"
                        name=""
                        placeholder="2nd Partner"
                        v-model="signUpobj.mixed_doubles_second_partner"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Additional Mixed Doubles</label>
                      <select
                        name=""
                        v-model="additional_mixed_doubles" @change.prevent="amountDue('Additional Mixed Doubles','additional_mixed_doubles', additional_mixed_doubles, 25)"
                      >
                        <option value="">Select</option>
                      <option v-for="data in mixed_rankings" :key="data.id" :value="data">{{data.title}} - $25.00</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label>Partner</label>
                      <input
                        type="text"
                        name=""
                        placeholder="Partner"
                        v-model="signUpobj.additional_mixed_doubles_partner"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form_group">
                      <label
                        >2nd Partner
                        <span class="optional">(optional)</span></label
                      >
                      <input
                        type="text"
                        name=""
                        placeholder="2nd Partner"
                        v-model="
                          signUpobj.additional_mixed_doubles_second_partner
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="payment_info">
                  <h3 class="mb-5">Payment</h3>
                  <ul>
                    <div v-if="total_amount && total_amount.length">
                     <li v-for="item in total_amount" :key="item.key">                       
                      <span>{{ item.label }} -  {{ item.value }}</span>
                      <span>${{ item.price }}.00</span>
                    </li>
                    </div>
                  </ul>
                  <hr />
                  <ul class="sub_total" >
                    <li>
                      <span>Subtotal</span>
                      <span>${{total}}</span>
                    </li>
                    <li>
                      <span>Amount Due</span>
                      <span>${{total}}</span>
                    </li> 
                  </ul>
                  <div class="paypal_btn">
                    <div class="w-100">
                        <div class="mx-auto w-50" ref="paypal"></div>
                    </div>
                     <!-- <a href="#"
                       @click.prevent="setLoaded()"><img src="../../assets/images/checkoutpaypal.png" alt=""
                    /></a>  -->
                    <p>
                      ***Note: By Registering, you agree to the Terms of
                      Participation in King's Pickleball Ladder
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form_group mb-4">
              <!--:disabled="!paidFor"  -->
              <input type="submit" value="Signup" class="signup_btn"  />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="terms_of_participation">
      <h2>Terms of Participation</h2>
      <p>
        Participation in any/all pickleball ladders is at the player’s own risk. By
        registering on the website, you agree to the following Liability Release
        Statement:
      </p>
      <p>
        I do hereby agree to indemnify and hold King’s Pickleball Ladder, LLC,
        kingspickleballladder.com, from and against
        any and all liability for any injuries which may be incurred by me
        arising out of, or in any way connected with, my participation on the
        ladder.
      </p>
    </div>

     <!-- <div class="w-100">
         <div class="mx-auto w-50" ref="paypal"></div>
     </div> -->
  </div>
</template>
<script>
import validationErrors from "../../mixins/validationErrors";
import { is422 } from "../../utils/response";
import userApis from '../../Apis/users';
import matchRankingApis from '../../Apis/match-ranks';
import seasonsApis from './../../Apis/seasons';
import moment from 'moment';
export default {
  mixins: [validationErrors],
  watch: {
    "signUpobj.profile_picture": function (val, oldVal) {
      if (
        this.signUpobj.profile_picture &&
        this.signUpobj.profile_picture[0] &&
        this.signUpobj.profile_picture[0].blob
      ) {
        this.url = this.signUpobj.profile_picture[0].blob;
      }
    },
  },
  data() {
    return {
      status: null,
       url: null,
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
      is_deadline_passed: null,
      paidFor: false,
      total_amount:[],
      errors: null,
      loader: true,
      total:0,
      singles: '',
      additional_singles: '',
      doubles: '',
      additional_doubles:'',
      mixed_doubles: '',
      additional_mixed_doubles: '',
      single_rankings: [],
      double_rankings: [],
      mixed_rankings: [],
      upcoming_season: null,
      signUpobj: {
        first_name: null,
        larst_name: null,
        email: null,
        phone: null,
        password: null,
        confirm_password: null,
        profile_picture: [],
        get_proposal_emails: true,
        skill_level: null,
        gender: 'M',
        address: null,
        city: null,
        state: null,
        zip_code: null,
        source: null,
        season_id: '',
        singles: '',
        additional_singles: '',
        doubles: '',
        double_partner: '',
        double_second_partner: '',
        additional_doubles: '',
        additional_double_partner: '',
        additional_double_second_partner: '',
        mixed_doubles: '',
        mixed_doubles_partner: '',
        mixed_doubles_second_partner: '',
        additional_mixed_doubles: '',
        additional_mixed_doubles_partner: '',
        additional_mixed_doubles_second_partner: '',
      },
    };
  },
    mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AXtcvKvb-iR-7BYXv6BZktLuGsTWcjPbPkT73Fk5ryuEM9gu81PiJPBvhusquo4PcE2WdaBWpSUEKRrj";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
//  method which check season deadline date is after today
 isAfterToday(date) {
    return new Date(date).valueOf() > new Date().valueOf();
  },
// calculating total amount due able
  amountDue(label,key, value, price){

    const item={label:label,key:key,value:value.title, price:price};
    var index =  this.total_amount.findIndex(it => it.key===key);
    if(value){
      if (index === -1) {
          this.total_amount.push(item);
          this.total += item.price;
      } else {
          this.total_amount[index] = item;
      }
    } else{
      if (index != -1) {
        this.total_amount.splice(index, 1);
        this.total -= item.price;
      }

    }
  },

// paypal integration
     setLoaded: function(resp) {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'testing',
                  amount: {
                    currency_code: "USD",
                    value: this.total
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions, resp) => {
            console.log(resp);
            this.loader = true;
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            this.loader = false;
            // window.location.href = "./paymentsuccess/" +this.resp;
          },
          style: {
          layout:  'horizontal',
          color:   'gold',
          size: 'responsive',
          shape:   'pill',
          label:   'pay'
        },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    // matching passwords
        matchPassword() {
          if (
            this.signUpobj.password &&
            this.signUpobj.confirm_password &&
            this.signUpobj.password != this.signUpobj.confirm_password
          ) {
            this.errors = [{ password: "password not matched" }];
            return;
          } else {
            return (this.errors = null);
          }
        },
    async submit() {
      this.loader = true;

  /*patch value */
      this.signUpobj.singles= this.singles.id;
      this.signUpobj.additional_singles= this.additional_singles.id;
      this.signUpobj.doubles= this.doubles.id;
      this.signUpobj.additional_doubles= this.additional_doubles.id;
      this.signUpobj.mixed_doubles= this.mixed_doubles.id;
      this.signUpobj.additional_mixed_doubles= this.additional_mixed_doubles.id;


      // await this.$axios.get("/index.php/sanctum/csrf-cookie");
       await userApis.requestUsers('post', this.signUpobj)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ name: "login" });
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
    },
  },
 async created() {
 
   const rankings = (await matchRankingApis.requestRankings("get","")).data;
    const season = (await seasonsApis.getNextUpcomingSeason()).data;
    this.upcoming_season = season;
    if(season){
        this.signUpobj.season_id = season.id;
        this.is_deadline_passed = moment(new Date()).isSameOrBefore(season.registration_deadline , "day");
        // it will return false if current date is after deadline
        // console.log(this.is_deadline_passed);
        if(!this.is_deadline_passed){
          const item={label:'late registration',key:'late_registration',value:'fee', price: season.late_fee};
          this.total_amount.push(item);
          this.total += season.late_fee;
        }
    }
 
  
   rankings.forEach(element => {
     if(element.type=='singles'){
       this.single_rankings.push(element);
     }
     if(element.type=='doubles'){
       this.double_rankings.push(element);
     }
     if(element.type=='mixed_doubles'){
       this.mixed_rankings.push(element);
     }
   });

   /** sort rankings  */
   if(this.single_rankings){
     this.single_rankings= this.single_rankings.sort((a, b) => (a.title > b.title) ? 1 : -1)
   }
   if(this.double_rankings){
     this.double_rankings= this.double_rankings.sort((a, b) => (a.title > b.title) ? 1 : -1)
   }
   if(this.mixed_rankings){
     this.mixed_rankings= this.mixed_rankings.sort((a, b) => (a.title > b.title) ? 1 : -1)
   }
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
  computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
  },
};
</script>