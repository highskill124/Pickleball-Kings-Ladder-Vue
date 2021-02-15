<template>
  <div>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <!--  Banner Starts Here   -->
  <!--  Banner Starts Here   -->
    <div class="inner_banner">
      <div class="container_large">
        <h1>Clean cloud </h1>
      </div>
    </div>
    <!--  Banner Ends Here   -->
     <main>
      <section class="inner_wraper full_bg">
        <div class="container_large">
          <div class="row">
    welcome to vue js
    <button @click="submit()">add Customer</button> <br>
    <button @click="addCard()">add Card</button>
          </div>
        </div>
        </section>
     </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loader: true,
    };
  },
  methods:{
    submit(){
      console.log('dddddd');
       var request = new XMLHttpRequest();

            request.open('POST', 'https://cleancloudapp.com/api/addCustomer');

            request.setRequestHeader('Content-Type', 'application/json');

            request.onreadystatechange = function () {
            if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            }
            };

            var body = {
            'api_token': '0599e579740e49faa0d332555b5e7c15521f5c23',
            'customerName': 'John Doe',
            'customerTel': '5554432324',
            'customerEmail': 'emailexample@email.com',
            'customerAddress': '113 Street Avenue, New York, 10012',
            'customerNotes': 'Notes about the customer'
            };

            request.send(JSON.stringify(body));

    },
    addCard(){
      var request = new XMLHttpRequest();

       request.open('POST', 'https://cleancloudapp.com/api/addCard');

            request.setRequestHeader('Content-Type', 'application/json');

            request.onreadystatechange = function () {
            if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            }
            };

            var body = {
            'api_token': '0599e579740e49faa0d332555b5e7c15521f5c23',
            'customerID': 2,
            'type': 2,
            // 'stripe': 'sk_test_51HXClfG4VqFCCL7UiwHIt40iGYONBBjK0gGLYCEAl7kPz3PTNtKBDkW8r707Hkh4cAM0SAcitTDKvV6xt40GmI1V003WL57nvL',
            // 'SetupIntent': 'seti_1IEtVhG4VqFCCL7UNqpRA4lr',
            // 'paymentMethodID':'seti_1IEtbGG4VqFCCL7U1lnrciaL'
            // 'paymentMethodID': '4242424242424242'
            };

            request.send(JSON.stringify(body));

    }
  },
  created() {
   
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>