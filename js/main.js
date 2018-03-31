$(document).ready(function(){

    let ingredientsList = ["carrot"];


    function createList() {
        $('.js-list').empty();

        for (i = 0; i < ingredientsList.length; i++) {
            let newIngredient = $("<button>");

            newIngredient.attr("data-ingredient", ingredientsList[i]);

            newIngredient.addClass('btn btn-info mr-sm-2');

            newIngredient.text(ingredientsList[i]);

            $('.js-list').append(newIngredient);
        }
    }

    // need to push all ingredients to an array
    function showRecipes(){

        // String version of our ingredient array
        let tempStrIngredientsList = ingredientsList.join(" ");
       // console.log(strIngredientsList);
      
       // spaces replaced with %20
        let strIngredientsList = encodeURIComponent(tempStrIngredientsList);
        //var queryURL = "https://api.edamam.com/search?q=peanut+butter%2C+bread&app_id=40511119&app_key=ef36201a4e68b398295a867bfcb3f89a";
        var queryURL = "https://api.edamam.com/search?q=" + strIngredientsList + "&app_id=40511119&app_key=ef36201a4e68b398295a867bfcb3f89a";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < response.hits.length; i++){
                let recipe = $("<div style='width: 18rem;'>");
                recipe.addClass('card');
                let img = $("<img>");
                img.addClass('card-img-top');
                img.attr('src', response.hits[i].recipe.image);
                let label = $("<div class='card-body'><p>");

                label.text(response.hits[i].recipe.label);
                recipe.append(img).append(label);
                $(".recipes").append(recipe);
                console.log(img);

            }
            // let recipe = $("<div>");
            // let img = $("<img>");
            

            // let gif = $('<img>');
            // let rating = $('<p>');
            // let section = $('<div class = "still-gif" >');

            // let stillGif = result.images.fixed_height_still.url;
            // let movingGif = result.images.fixed_height.url
            // let state = "still";
            // gif.attr("src",stillGif).attr("data-still", stillGif).attr("data-animate", movingGif).attr("data-state", state).addClass("gif-img");
            // rating.text("Rated: " + result.rating.toUpperCase());
            // section.append(rating).append(gif);
            // $('.js-gifs').append(section);
        });
    
    }

    $('.js-add').on('click', function(event) {
        event.preventDefault();
        let ingredient = $('.js-input').val().trim();
        ingredientsList.push(ingredient);
        createList();
        console.log('You clicked on the submit button');
        console.log(ingredient);
        $(".recipes").empty();
        showRecipes();
        $('.js-input').val('');

    });


    createList();
    //showRecipes();
});
