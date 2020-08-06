$(window).on("load",function(){

    $('.fa-info-circle').on('click', function(){
       $('#results').empty();
        $('#results').append($('.intro'));
        getArticles();
    })

    function getArticles(){
        var api_key = config.SECRET_KEY;
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
                 localStorage.setItem('data', data.scholar_results);
                 data.scholar_results.map( res => {
                     const {title,link,snippet} = res;

                     var article = $('<div class=article>');
                     var articleTitle = $('<h2 class=article-title>').text(title);
                     var articleSnippet = $('<p class=snippet>').text(snippet);
                     var articleLink = link;
                     var articleButton = $('<a>').attr('href', articleLink);

                     $('.article').addClass('col-md-5')
                     $('.article').addClass('col-12')
                     $('.articles')
                     .append(article)
                     articleTitle.appendTo(article)
                     articleSnippet.appendTo(article)
                     articleButton.appendTo(article)
                    articleButton.text("Read More")

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
        var api_key = config.MY_API_KEY;
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

        localStorage.setItem('data', data.search_results);
        
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

    price = parseFloat(price); 

    message = "";

    consumption = price * Mdemand + Bdemand;
    supply = price * Msupply + Bsupply;

    if (consumption > supply) {
        consumption = supply;
        message = "Not enough supply.";
    }

    if (consumption <= 0) {
        consumption = 0;
        message = "Not quite. Choose a different price range";
    }

    /*
    if (maxRevenue) {
        message = "This is the equilibrium price"
    }
    */

    revenue = consumption * price;
    revenue = parseFloat(revenue);
    consumption = parseFloat(consumption);
    supply= parseFloat(supply);

    $(".message").text( "Product sold: "+consumption+"\n Revenue: "+revenue+"/month \n "+message);
}

$('.fa-times-circle').on('click', function(){
    $('.calculator-overlay').css('display','none');
})

})