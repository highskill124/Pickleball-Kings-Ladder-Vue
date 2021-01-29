
// Sticky header
// $(window).scroll(function(){   

//     var scroll = $(window).scrollTop();
//     if (scroll >= 90) {
//         $("header").addClass("sticky_header");
//     } else {
//         $("header").removeClass("sticky_header");
//     }
// });



$(document).ready(function () {
	$('.bxslider').bxSlider({
	  auto: true,
	  pager: false,
	  responsive: true,
      touchEnabled:false
	  // mode: 'fade'
	});
});

// const fullName = document.getElementById('fullName').textContent;
// const intials = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
// document.getElementById('profileImage').innerHTML = intials;