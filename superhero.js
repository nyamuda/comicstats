
let characterHeading = document.querySelectorAll(".character-head");
let characterDescription = document.querySelectorAll(".character-description");
let headCollapse = document.querySelectorAll(".collapse-head");


//THE COLLAPSE BUTTON EVENT LISTENER
function addListeners() {
    for (let val of characterHeading) {
        val.onclick = () => {
            if (val.firstChild.innerHTML == "+") {
                val.firstChild.innerHTML = "-";
                val.parentElement.lastElementChild.style.display = "block";
            } else {
                val.firstChild.innerHTML = "+";
                val.parentElement.lastElementChild.style.display = "none"
            }

        }
    }
}
addListeners();



//FETCHING DATA THAT THE USER SEARCHES FOR

let theResults = document.querySelector("#the-results");
let inputSearch = document.querySelector("#input-search");
let searchButton = document.querySelector("#search-button");

let infoAboutTheCharacter = document.querySelector("#all-information");

let searchPage = document.querySelector("#page-list");

let arrowsBlock = document.querySelector("#arrows-block");

let loader = document.querySelector("#loader");

let allResults = "";

let allSearchedResultsList = [];

let noSearchResultsFound = document.querySelector("#no-search-results");

function getHero(name) {
    //display the loader
    loader.style.visibility = "visible";

    fetch("https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2771979009559663/search/" + name)
        .then(result => {
            return result.json()
        })
        .then(data => {
            allResults = data.results;

            loader.style.visibility = "hidden";

            let searchResults = allResults;
            //searchResults is an array of objects
            searchResults.forEach(val => {
                let possibleResult = document.createElement("li");
                possibleResult.innerHTML = val.name;
                possibleResult.setAttribute("id", val.id);
                possibleResult.addEventListener("click", listenSearchResult);

                allSearchedResultsList.push(possibleResult);



            })


            groupSearchedResults()


            firstSearchPage.forEach(val => {

                theResults.appendChild(val);



            })

            arrowsBlock.style.visibility = "visible";

            searchPage.innerText = "Page 1";

            previousArrow.style.color = "grey";
            nextArrow.style.color = "grey";

            colorOfFirstPageArrow();

            //removing the 'results not found error' in case it was already there

            noSearchResultsFound.innerHTML = "";



        })
        .catch(err => {
            console.log(err);
            noSearchResultsFound.style.display = "block";
            loader.style.visibility = "hidden";
            //showing that the searched results were not found
            noSearchResultsFound.innerHTML = "Sorry, no search results found.";
        })


}

//GROUP THE LISTED SEARCH RESULTS INTO ONLY 5 PAGES

let firstSearchPage = "";

let secondSearchPage = "";

let thirdSearchPage = "";
let forthSearchPage = "";
let fifthSearchPage = "";

let groupSearchedResults = () => {
    for (var i = 0; i < allSearchedResultsList.length; i++) {

        allSearchedResultsList[i].classList.add(`${i}`);


    }

    firstSearchPage = allSearchedResultsList.filter(val => val.classList < 10);

    secondSearchPage = allSearchedResultsList.filter(val => val.classList >= 10 && val.classList < 20);

    thirdSearchPage = allSearchedResultsList.filter(val => val.classList >= 20 && val.classList < 30);

    forthSearchPage = allSearchedResultsList.filter(val => val.classList >= 30 && val.classList < 40);

    fifthSearchPage = allSearchedResultsList.filter(val => val.classList >= 40 && val.classList < 50);

}

//the color of the NEXT arrow of first page of the search results

let colorOfFirstPageArrow = () => {
    if (secondSearchPage.length > 0) {
        nextArrow.style.color = "white";
    }
}


//putting a grey color on the search results arrows in case we have more search results or a grey color in case we don't

let whiteColorOnArrows = () => {




    if (secondSearchPage.length > 0) {
        nextArrow.style.color = "white"
    }
}


//when the user clicks the arrows

let nextArrow = document.querySelector("#next-arrow");
let previousArrow = document.querySelector("#previous-arrow");

nextArrow.addEventListener("click", () => {

    if (secondSearchPage.length > 0 && searchPage.innerText === "Page 1") {

        //clearing out the first page displayed search results
        theResults.innerHTML = "";

        //adding the second page search results
        secondSearchPage.forEach(val => {

            theResults.appendChild(val);



        })

        searchPage.innerText = "Page 2";


        nextArrow.style.color = "grey";

        previousArrow.style.color = "white"


        if (thirdSearchPage.length > 0) {

            nextArrow.style.color = "white"
        }


    } else if (thirdSearchPage.length > 0 && searchPage.innerText === "Page 2") {
        theResults.innerHTML = "";

        //adding the second page search results
        thirdSearchPage.forEach(val => {

            theResults.appendChild(val);



        })

        searchPage.innerText = "Page 3";

        nextArrow.style.color = "grey";

        if (forthSearchPage.length > 0) {
            previousArrow.style.color = "white";
            nextArrow.style.color = "white"
        }


    } else if (forthSearchPage.length > 0 && searchPage.innerText === "Page 3") {
        theResults.innerHTML = "";

        //adding the second page search results
        forthSearchPage.forEach(val => {

            theResults.appendChild(val);



        })

        searchPage.innerText = "Page 4";

        nextArrow.style.color = "grey";

        if (fifthSearchPage.length > 0) {
            previousArrow.style.color = "white";
            nextArrow.style.color = "white"
        }


    } else if (fifthSearchPage.length > 0 && searchPage.innerText === "Page 4") {
        theResults.innerHTML = "";

        //adding the second page search results
        fifthSearchPage.forEach(val => {

            theResults.appendChild(val);



        })

        searchPage.innerText = "Page 5";
        nextArrow.style.color = "grey"
    }

})



previousArrow.addEventListener("click", () => {

    if (searchPage.innerText === "Page 5") {

        theResults.innerHTML = "";

        forthSearchPage.forEach(val => {

            theResults.appendChild(val);

        })

        searchPage.innerText = "Page 4";
        nextArrow.style.color = "white";
    } else if (searchPage.innerText === "Page 4") {

        theResults.innerHTML = "";

        thirdSearchPage.forEach(val => {

            theResults.appendChild(val);



        })

        searchPage.innerText = "Page 3";

        nextArrow.style.color = "white";
    } else if (searchPage.innerText === "Page 3") {

        theResults.innerHTML = "";

        secondSearchPage.forEach(val => {

            theResults.appendChild(val);



        })

        searchPage.innerText = "Page 2";

        nextArrow.style.color = "white";
    } else if (searchPage.innerText === "Page 2") {

        theResults.innerHTML = "";

        firstSearchPage.forEach(val => {

            theResults.appendChild(val);



        })

        searchPage.innerText = "Page 1";

        previousArrow.style.color = "grey";

        nextArrow.style.color = "white";
    }
})






//user clicking the search button
let inputValue = "";
inputSearch.oninput = () => {
    inputValue = inputSearch.value;
}
searchButton.onclick = (event) => {

    if (inputValue != "") {
        firstSearchPage = "";

        secondSearchPage = "";

        theResults.innerHTML = "";

        allSearchedResultsList = [];

        arrowsBlock.style.visibility = "hidden";

        getHero(inputValue);

        inputSearch.value = "";

        event.preventDefault()
    }

}




//ADDING ALL THE INFORMATION ABOUT THE CHARACTER

let biographyBlock = document.querySelector("#biography-block");
let powerBlock = document.querySelector("#power-block");
let appearanceBlock = document.querySelector("#appearance-block");
let workBlock = document.querySelector("#work-block");
let connectionsBlock = document.querySelector("#connections-block");




let addCharacterInfo = (character, infoType, addToWhichBlock) => {
    /*the "character" parameter is an object containing all the information about the selected character. It has the properties such as  id, name, powerstats, appearance etc. Some of these properties have values that are also objects.*/

    //getting infomation type e.g powerstats, biography etc
    let informationObject = character[infoType];


    for (let val in informationObject) {

        //some of the properties of informationObject have  values that are arrays.
        if (typeof informationObject[val] != "object") {
            let newItem = document.createElement("p");
            newItem.innerHTML = `<span style="color:royalblue;font-weight:bold">${val}</span>: ${informationObject[val]}`
            addToWhichBlock.appendChild(newItem)

        } else {
            //changing the array into string using join()
            let changeToString = informationObject[val].join(", ");
            let newItem = document.createElement("p");
            newItem.innerHTML = `<span style="color:royalblue;font-weight:bold">${val}</span>: ${changeToString}`;
            addToWhichBlock.appendChild(newItem)

        }




    }

}

//ADDING THE NAME AND IMAGE OF THE CHARACTER;
let characterName = document.querySelector("#character-name");
let characterImg = document.querySelector("#character-img");


let addNameImg = character => {
    let nameOfCharacter = character.name;
    let imageURL = character.image.url;

    characterName.innerHTML = nameOfCharacter;
    characterImg.setAttribute("src", imageURL);

}

//CLEARING OUT THE THE OLD DATA ABOUT A CHARACTER BEFORE DISPLAYING DATA FOR A NEW CHARACTER
let characterContainer = document.querySelector("#character-container");

let showCharacterData = () => {
    characterContainer.style.display = "block";

    biographyBlock.innerHTML = "";
    powerBlock.innerHTML = "";
    workBlock.innerHTML = "";
    appearanceBlock.innerHTML = "";
    connectionsBlock.innerHTML = "";



    //clear out the entered value
    inputSearch.value = "";

    //clear out the displayed search results
    theResults.innerHTML = "";

    firstSearchPage = "";

    secondSearchPage = "";

}


//adding eventlisteners to the search results
function listenSearchResult() {

    let theID = this.id;


    let theCharacter = allResults.find(objVal => {
        return objVal.id === theID
    })

    arrowsBlock.style.visibility = "hidden";

    showCharacterData()

    //first adding the name and the image
    addNameImg(theCharacter);

    //then adding all the information about the character
    addCharacterInfo(theCharacter, "powerstats", powerBlock);
    addCharacterInfo(theCharacter, "biography", biographyBlock);
    addCharacterInfo(theCharacter, "appearance", appearanceBlock);
    addCharacterInfo(theCharacter, "work", workBlock);
    addCharacterInfo(theCharacter, "connections", connectionsBlock);


}






window.onload = () => {


    //RANDOMLY DISPLAYING A CHARACTER WHEN THE PAGE IS LOADED

    //first generating a random ID between 1 and 731


    let randomID = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;


    }

    //then using the generated ID to search for the character with that ID


    let randomCharacter = ID => {
        fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2771979009559663/${ID}`)
            .then(result => result.json())
            .then(data => {

                characterContainer.style.visibility = "visible";

                // adding the name and image of the random character

                addNameImg(data)

                //adding all the information about the random character

                addCharacterInfo(data, "powerstats", powerBlock);
                addCharacterInfo(data, "biography", biographyBlock);
                addCharacterInfo(data, "appearance", appearanceBlock);
                addCharacterInfo(data, "work", workBlock);
                addCharacterInfo(data, "connections", connectionsBlock);


                infoAboutTheCharacter.style.visibility = "visible"




            })
            .catch(err => {
                console.log(err)
            })

    }

    randomCharacter(randomID(1, 731))

}





//SUPERHERO QUOTES




let counter = 0;


let arrayOfQuotes = ['“A single individual who has the right heart and the right mind, that is consumed with a single purpose... that one man can win a war.” – Captain America', '“Our actions have reactions...consequences...things we can never take back.” – Batwoman', '“It’s not who I am underneath, but what I do that defines me.” – Batman', '“You don’t always need a plan. Sometimes you just need to breathe, trust, let go and see what happens.” – The Joker', ' “Everyone’s fighting their own battles, just as you are fighting yours.”  – Wonder Woman', '“If there is nothing but what we make in this world, brothers…let us make it good.” – Beta Ray Bill', '“If you make yourself more than just a man, if you devote yourself to an ideal, and if they can’t stop you, then you become something else entirely.” – Ra’s Al Ghul', ' “With great power, comes great responsibility.” – Spiderman', ' “Heroes are made by the path they choose, not the powers they are graced with.”– Iron Man', ' “Intelligence is a privilege, and it needs to be used for the greater good of people.”– Dr. Octopus', '“I think a hero is an ordinary individual who finds strength to persevere and endure in spite of overwhelming obstacles.” –Superman', ' “Life doesn’t give us purpose. We give life purpose.” – The Flash', ' “I know what it’s like. To not live up to expectations. To feel like nothing that you do will ever be good enough.” – Green Lantern', ' “Just because someone stumbles and loses their path, doesn’t mean they can’t be saved.”– Professor Charles Xavier', '“No matter how bad things get, something good is out there, over the horizon.” – Green Lantern', '“I stayed in and studied like a good little nerd. And fifteen years later, I’m one of the greatest minds of the 21st century.” – Mister Fantastic'];

let quote = "";

//looping through the letters of each quote
let typeWriter = () => {
    if (counter < quote.length) {
        document.getElementById("comic-quotes").innerHTML += quote.charAt(counter);
        counter++;
        setTimeout(typeWriter, 60);
    }
}





//looping through the quotes
let i = 0;


let selectQuote = () => {
    if (i === arrayOfQuotes.length) {
        i = 0
    }
    quote = arrayOfQuotes[i];


    typeWriter()

    if (i < arrayOfQuotes.length) {
        setTimeout(() => {
            i++;

            document.getElementById("comic-quotes").innerHTML = "";

            counter = 0;

            selectQuote()
        }, 12000)
    }
}


selectQuote();


