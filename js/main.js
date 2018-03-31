$(document).ready(function(){

    let ingredientsList = ["carrot"];


    function createList() {
        $('.js-list').empty();

        for (i = 0; i < ingredientsList.length; i++) {
            let newIngredient = $("<button>");

            newIngredient.attr("data-ingredient", ingredientsList[i]);

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
        });
    
    }

    $('.js-add').on('click', function(event) {
        event.preventDefault();
        let ingredient = $('.js-input').val().trim();
        ingredientsList.push(ingredient);
        createList();
        console.log('You clicked on the submit button');
        console.log(ingredient);
        showRecipes();
        $('.js-input').val('');
    });


    createList();
    //showRecipes();
});
