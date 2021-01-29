<template>
  <footer>
    <div class="container_large">
      <div class="row">
        <div class="col-md-5">
          <div class="footer_column">
            <div class="footer_logo mb-4">
              <img src="../../assets/images/logo.png" alt="" />
            </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="footer_column">
            <h2 class="mb-5">Quick Links</h2>
            <ul class="footer_list">
              <li><a href="#">Calendar</a></li>
              <li><a href="#">Rules</a></li>
              <li><a href="#">Faq's</a></li>
              <li><a href="#">News</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="footer_column">
            <h2 class="mb-5">Follow Us</h2>
            <ul class="footer_social">
              <li>
                <a :href="facebook_link" target="_blank"
                  ><i class="fab fa-facebook-f"></i
                ></a>
              </li>
              <li>
                <a :href="instagram_link" target="_blank"><i class="fab fa-instagram"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="copyright">© Copyright 2020 Kings Tennis Ladder</div>
    </div>
     <!-- JS   -->
  <script src="/src/assets/js/jquery-3.4.1.min.js" type="application/javascript"></script>
  <script src="/src/assets/js/popper.min.js" type="application/javascript"></script>
  <script src="/src/assets/js/bootstrap.min.js" type="application/javascript"></script>
  <script src="/src/assets/js/all.min.js" type="application/javascript"></script>
   <script src="/src/assets/js/jquery.bxslider.min.js" type="application/javascript"></script>
  <script src="/src/assets/js/custom-scripts.js" type="application/javascript"></script>
  </footer>
</template>
<script>
export default {
  data(){
    return{
       facebook_link: null,
       instagram_link: null,
    }
  },
  watch: {
    '$store.state.socials': function (social_links) {
       if(social_links && social_links.length){
       social_links.forEach(element => {
        if(element.type=='instagram'){
          this.instagram_link = element.url;
        } else if(element.type=="facebook"){
          this.facebook_link = element.url;
        }
      });
    }
    }
  },
}
</script>