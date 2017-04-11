$(document).ready(function(){
    
    console.log("hello1");
  
     $(".navbar-toggler-icon").click(function(){
        console.log("hello me1");
         $(this).addClass("hidden");
         var button = this.closest("button");
         var id = $(button).data("target");
         
         $(id).toggleClass("open");
    });
});