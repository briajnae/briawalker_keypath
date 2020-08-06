$(window).on("load",function(){

    function getArticles(){
        var api_key = "926CEB575CC04A38BEF9C10A416D8AC8";
        var q = "equilibrium price";
        var search_type = "scholar";
        $.ajax({
            url: "https://api.scaleserp.com/search?api_key="+api_key+"&q="+q+"&search_type="+search_type+"",
            type: 'GET',
            data: {
                format: 'json'
             },   
             dataType: 'json',
             success: function(data){
                 console.log(data);

                 data.scholar_results.map( res => {
                     const {title,link,snippet} = res;

                     var article = $('<div class=article>');
                     var articleTitle = $('<h2 class=article-title>').text(title);
                     var articleSnippet = $('<p class=snippet>').text(snippet);
                     var articleLink = link;
                     var articleButton = $('<button>').attr('src', articleLink);

                     $('.article').addClass('col-md-5')
                     $('.article').addClass('col-12')
                     $('.articles')
                     .append(article)
                     articleTitle.appendTo(article)
                     articleSnippet.appendTo(article)
                     articleButton.appendTo(article)




                     console.log(title);
                     console.log(link);
                     console.log(snippet);
                 })

                 
             }
        })
    }

    getArticles();
 

    $('.header button').on('click', function() {
        var userSearch = $('.user-input').val();
        var api_key = "61332891FFE04218957D8FA697D3E1A4";
        var type = "search";
        var amazon_domain = "amazon.com";
        var search_term = userSearch;

        $('#results').empty();
 
       var loading = $('<p class=loading>').text("One sec, we're looking for products that match: " + userSearch );
        loading.appendTo('#results');


$.ajax({
    
   url: "https://api.rainforestapi.com/request?api_key=" +api_key+"&type="+type+"&amazon_domain="+amazon_domain+"&search_term="+search_term,
   type: 'GET',
   data: {
      format: 'json'
   },   
   dataType: 'json',
   success: function(data) {   
     loading.css('display','none');
       
     data.search_results.map(res => {
        
        var {title, image, price} = res;
       
        if( price === undefined){
            price = 0;
            $('.product').css('display', 'none');
        } 
        if(price != undefined){
            var productContainer = $('<div class=product>');
            var titleComponent = $('<h1>').text(title);
            var img = $('<div class=product-img>');
            var amount = $('<h3 class=product-price>').text(price.value);
            var select = $('<button class=userSelect>').text('Select');
              
            $('.product').addClass('col-12');
            $('.product').addClass('col-md-3');

            $('#results')
            .append(productContainer)
               titleComponent.appendTo(productContainer)
               img.appendTo(productContainer).css('background-image', 'url('+image+')')
               amount.appendTo(productContainer).prepend("$")
               select.appendTo(productContainer)

               $('.userSelect').on('click',function(){
                    $('.calculator-overlay').css('display', 'flex');
                    $('.product-details h2').text(title);
                    $('.calc-product-price').text(price.value);  
                })
        }                      
       })
   },
   error: function() {
    
    $('#results').text('An error has occurred. Try another search term.');
    
    },

});
})



$('.calculator-overlay button').on("click", calculateOutput);

function calculateOutput() {


  var Mdemand = $('.dm').val();
  var Bdemand = $('.db').val();
  var Msupply = $('.sm').val(); 
  var Bsupply = $('.sb').val();
  var consumption;
  var supply;
  var message;

  Qsupply = Msupply * price + Bsupply
  Qdemand = Mdemand * price + Bdemand
   
  var price = $('.calc-product-price').text();
    console.log("A: "+price);
    price = parseFloat(price); 
    console.log("B:"+price);
    message = "";

    consumption = price * Mdemand + Bdemand;
    supply = price * Msupply + Bsupply;

    if (consumption > supply) {
        consumption = supply;
        message = "ABC Company canot make enough XYZ Widgets";
    }

    if (consumption <= 0) {
        consumption = 0;
        message = "No one will buy XYZ Widgets at this price";
    }

    /*
    if (maxRevenue) {
        message = "This is the equilibrium price"
    }
    */

    revenue = consumption * price;
    // console.log(consumption);
    // console.log(supply);
    // console.log(revenue);
    // console.log(message);
    $(".message").text( "Product sold: "+consumption+"\n Revenue: "+revenue+"/month \n "+message);
}

$('.fa-times-circle').on('click', function(){
    $('.calculator-overlay').css('display','none');
})

})