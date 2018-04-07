$(document).ready(function(){

    let ingredientsList = [];

    let from = 0; 
    let to = 10;
    let random = -1;
     
    function createList() {
        $('.js-list').empty();

        for (i = 0; i < ingredientsList.length; i++) {
            // Create a new button element and set it equal to the newIngredient variable
            let newIngredient = $("<button>");

            // Add a new attribute to the button and set it equal to the name of the new ingredient
            newIngredient.attr("data-ingredient", ingredientsList[i]);

            // Add classes to the button

            newIngredient.addClass('btn btn-success button-border my-2 mr-sm-2 ingredient-btn');
    
            // Give the button text that is equal to the name of the ingredient
            newIngredient.text(ingredientsList[i] + " x");

            // Add the button to the element with the class of js-list
            $('.js-list').append(newIngredient);
        }
    }

    function removeBtn(){
        var removeIngr = $(this).attr("data-ingredient");
        console.log(removeIngr);
        let index = 0;
        for (let i = 0; i < ingredientsList.length; i++){
            if (ingredientsList[i] === removeIngr){
                index = i;
            }
        }
        var removed = ingredientsList.splice(index, 1);
        createList();
        $(".js-recipes").empty();
        from = 0;
        to = 10;
        showRecipes(from, to, random);
    }
    // need to push all ingredients to an array
    function showRecipes(from, to, random){

        // String version of our ingredient array
        let tempStrIngredientsList = ingredientsList.join(" ");
        // console.log(strIngredientsList);
      
        // spaces replaced with %20
        let start = "&from=" + from;
        let end = "&to=" + to;
        let strIngredientsList = encodeURIComponent(tempStrIngredientsList);
        var queryURL = "https://api.edamam.com/search?q=" + strIngredientsList + "&app_id=40511119&app_key=ef36201a4e68b398295a867bfcb3f89a" + start + end;
        $('#loading-image').removeClass('hide');
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $('#loading-image').addClass('hide');
            if (random == -1) {
                console.log('random equals -1');
    
            for (let i = 0; i < response.hits.length; i++){
                // Create a new div and save it to a variable called recipe
                let recipe = $("<div style='width: 18rem;'>");
                // Add a class to the recipe div and give it the class card and a margin
                recipe.addClass('hover-fade card col-md-3 m-2 bounceIn');
                // Create an empty image tag and save it in a variable called img
                let img = $("<img>");
                // Add classes to the img tag
                img.addClass('card-img-top');

                // Give each img tag a src attribute that contains the image url for each recipe
                img.attr('src', response.hits[i].recipe.image);
                let source = response.hits[i].recipe.source;
                img.attr('title', source);

                // Create a div with a class of card body AND a p tag and store it in a variable called label
                let label = $("<div class='card-body text-center'><p>");
                // Add text to the label that contains the name (or, as defined by the API, the label) from each recipe
                label.text(response.hits[i].recipe.label);

                // Add link to recipe image
                let link = $(`<a href = "${response.hits[i].recipe.url}" target = "_blank" >`); 
                // Append the image to the link
                link.append(img);

                // Create the div on the top of the card
                let cardTop = $('<div class = "cardTop">');
                // Create the icons
                let icons = $('<div class = "icons">');
                // These are for vegan and vegetarian
                for (let j = 0; j < response.hits[i].recipe.healthLabels.length; j++){
                    if (response.hits[i].recipe.healthLabels[j] == "Vegan"){
                        let vegan = $('<i class="fas fa-lg fa-seedling" title = "Vegan" style="color:#96E941; padding: 2px;"></i>');   
                        icons.append(vegan);
                    }
                    if (response.hits[i].recipe.healthLabels[j] == "Vegetarian"){
                        let vegetarian = $('<i class="fas fa-lg fa-leaf" title = "Vegetarian" style="color:#35BD78; padding: 2px;"></i>');
                        icons.append(vegetarian);
                    }
                }
                // These are for Low Fat
                for (let k = 0; k < response.hits[i].recipe.dietLabels.length; k++){
                    if(response.hits[i].recipe.dietLabels[k] == "Low-Fat"){
                        let lowFat = $('<i class="fas fa-lg fa-arrow-alt-circle-down" title = "Low-Fat" style="color:#FF7347; padding: 2px;"></i>');
                        icons.append(lowFat);
                    }
                }
                
                // Calculate the calories per serving
                let calories = parseInt(response.hits[i].recipe.calories);
                let amt = parseInt(response.hits[i].recipe.yield);
                let calPerServe = Math.floor(calories/amt);
                // Create a div to hold the calories
                let calTop = $('<div>');
                calTop.append("Cal: " + calPerServe);

                // Append the calories and icons to the card top
                cardTop.append(calTop).append(icons);

                // Hovering over the image displays the ingredients list
                let ingrHover = $('<div>');
                ingrHover.append('<p>Ingredients: </p>')
                // Append ingredients
                for (let l = 0; l < response.hits[i].recipe.ingredientLines.length; l++){
                    let ingre = $(`<p> ${response.hits[i].recipe.ingredientLines[l]}</p>`);
                    ingrHover.append(ingre);
                }
                // Allow users to scroll through ingredients list
                ingrHover.addClass('ingredient-scroll');
                // Allow users to link to recipe by clicking on the list
                let ingredientLink = $(`<a href = "${response.hits[i].recipe.url}" target = "_blank" >`); 
                ingredientLink.append(ingrHover);
                
                // Append all card elements to the div
                recipe.append(cardTop).append(link).append(label).append(ingredientLink);

                // Grab the js-recipes class and append the recipe div to it
                $(".js-recipes").append(recipe);

            }
        }

        // If a user clicks to generate a random recipe...
        else {
            console.log('it went to else');
            console.log('random is: ' + random);
            let recipe = $("<div style='width: 18rem;'>");
            recipe.addClass('hover-fade card col-md-3 m-2 position-absolute roll-in-bottom');
            let img = $("<img>");
            img.addClass('card-img-top');
            img.attr('src', response.hits[random].recipe.image);
            let source = response.hits[random].recipe.source;
            img.attr('title', source);

            // Create a div with a class of card body AND a p tag and store it in a variable called label
            let label = $("<div class='card-body text-center'><p>");
            // Add text to the label that contains the name (or, as defined by the API, the label) from each recipe
            label.text(response.hits[random].recipe.label);

            // Add link to recipe image
            let link = $(`<a href = "${response.hits[random].recipe.url}" target = "_blank" >`); 
            // Append the image to the link
            link.append(img);

            // Create the div on the top of the card
            let cardTop = $('<div class = "cardTop">');
            // Create the icons
            let icons = $('<div class = "icons">');
            
            // These are for vegan and vegetarian
            for (let j = 0; j < response.hits[random].recipe.healthLabels.length; j++){
                if (response.hits[random].recipe.healthLabels[j] == "Vegan"){
                    let vegan = $('<i class="fas fa-lg fa-seedling" title = "Vegan" style="color:#96E941; padding: 2px;"></i>');   
                    icons.append(vegan);
                }
                if (response.hits[random].recipe.healthLabels[j] == "Vegetarian"){
                    let vegetarian = $('<i class="fas fa-lg fa-leaf" title = "Vegetarian" style="color:#35BD78; padding: 2px;"></i>');
                    icons.append(vegetarian);
                }
            }
            // These are for Low Fat
            for (let k = 0; k < response.hits[random].recipe.dietLabels.length; k++){
                if(response.hits[random].recipe.dietLabels[k] == "Low-Fat"){
                    let lowFat = $('<i class="fas fa-lg fa-arrow-alt-circle-down" title = "Low-Fat" style="color:#FF7347; padding: 2px;"></i>');
                    icons.append(lowFat);
                }
            }
            
            // Calculate the calories per serving
            let calories = parseInt(response.hits[random].recipe.calories);
            let amt = parseInt(response.hits[random].recipe.yield);
            let calPerServe = Math.floor(calories/amt);
            // Create a div to hold the calories
            let calTop = $('<div>');
            calTop.append("Cal: " + calPerServe);

            // Append the calories and icons to the card top
            cardTop.append(calTop).append(icons);

            // Hovering over the image displays the ingredients list
            let ingrHover = $('<div>');
            ingrHover.append('<p>Ingredients: </p>')
            // Append ingredients
            for (let x = 0; x < response.hits[random].recipe.ingredientLines.length; x++){
                let ingre = $(`<p> ${response.hits[random].recipe.ingredientLines[x]}</p>`);
                ingrHover.append(ingre);
            }
            // Allow users to scroll through ingredients list
            ingrHover.addClass('ingredient-scroll');
            // Allow users to link to recipe by clicking on the list
            let ingredientLink = $(`<a href = "${response.hits[random].recipe.url}" target = "_blank" >`); 
            ingredientLink.append(ingrHover);
            
            // Append all card elements to the div
            recipe.append(cardTop).append(link).append(label).append(ingredientLink);

            // Grab the js-recipes class and append the recipe div to it
            $(".js-recipes").append(recipe);
        }
        });
    
    }
    // $('#loading-image').bind('ajaxStart', function(){
    //     $(this).show();
    //     }).bind('ajaxStop', function(){
    //         $(this).hide();
    // });

    $('.js-add').on('click', function(event) {
        // Prevent the default action / page refresh
        event.preventDefault();
        // Grab the text input from the js-input field and set it to the ingredient variable
        let ingredient = $('.js-input').val().trim();
        if (ingredient !== ""){
            // Add the text input of ingredient to our ingredientsList array
            ingredientsList.push(ingredient);
            // Run createList, which appends all our ingredient buttons to the sidebar
            createList();
            // Log the ingredient to the console
            console.log(ingredient);
            // Empty the all of the recipe divs/cards in the right side js-recipes section
            $(".js-recipes").empty();
            // Run showRecipes, which queries our API with all the ingredients in our ingredientsList array
            //showRecipes();
            // Empty the js-input field

            $('.js-input').val('');
        }
        
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('.js-you-decide').on('click', function(event) {
        event.preventDefault();
        $('.js-recipes').empty();
        let randomNumber = Math.floor(Math.random() * 10);
        // console.log('random number:' + randomNumber);
        showRecipes(from, to, randomNumber);
        $('.js-you-decide').addClass('hide');
        $('.js-results-back').removeClass('hide');
        $('.next').addClass('hide');
        console.log('clicked on you decide');
    });

    $('.js-results-back').on('click', function(event) {
        event.preventDefault();
        $('.js-recipes').empty();   
        $('.js-results-back').addClass('hide');
        $('.js-you-decide').removeClass('hide');
        $('.next').removeClass('hide');
        showRecipes(from, to, random);
    });

    $('.js-submit').on('click', function(event){
        event.preventDefault();
        $('.next').removeClass('hide');
        // Removing the instructions
        $('.instructions').addClass('hide');
        $(".recipehamster").addClass('hide');
        $(".peekinghamster").removeClass('hide');
        $('.js-you-decide').removeClass('hide');
        showRecipes(from, to, random);
    });

    $('.js-next-button').on('click', function(event){
        event.preventDefault();
        console.log('here');
        from += 10;
        to += 10;
        $(".js-recipes").empty();
        showRecipes(from, to, random);

    });

    $(document).on("click", ".ingredient-btn", removeBtn);

    createList();
    //showRecipes();
 
});