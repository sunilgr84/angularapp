/* eslint-disable linebreak-style */

document.addEventListener("DOMContentLoaded", function() {

   
    var lazyloadImages = document.querySelectorAll(". lazy");    
    for (var i = 0; i < lazyloadImages.length; i++) {
        var image = lazyloadImages[i];
        alert(image.getAttribute(src));
    }
    alert(lazyloadImages.length);
    var lazyloadThrottleTimeout;
    alert(lazyloadImages);
    function lazyload () {
        alert('ok')
        if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }
          lazyloadThrottleTimeout = setTimeout(function() {
            
            var scrollTop = window.pageYOffset;
           
            lazyloadImages.forEach(function(img) {
                alert('my');
               // if(img.offsetTop < (window.innerHeight + scrollTop)) {
                   alert(img.dataset.src);
                  
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                  alert('sk');
              //  }
            });
            if(lazyloadImages.length == 0) { 
              document.removeEventListener("scroll", lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});
