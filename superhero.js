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
			console.log(searchResults)
			//searchResults is an array of objects
			searchResults.forEach(val => {
				let possibleResult = document.createElement("li");
				possibleResult.innerHTML = val.name;
				possibleResult.setAttribute("id", val.id);
				possibleResult.addEventListener("click", listenSearchResult);

				allSearchedResultsList.push(possibleResult);



			})

			console.log(theResults);

			groupSearchedResults()

			console.log(allSearchedResultsList)

			console.log(firstSearchPage);


			console.log(fifthSearchPage);

			firstSearchPage.forEach(val => {

				theResults.appendChild(val);



			})

			arrowsBlock.style.visibility = "visible";

			searchPage.innerText = "Page 1";

			previousArrow.style.color = "grey";
		nextArrow.style.color="white";




		})
		.catch(err => {
			console.log(err)
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

		previousArrow.style.color = "white";
	} else if (thirdSearchPage.length > 0 && searchPage.innerText === "Page 2") {
		theResults.innerHTML = "";

		//adding the second page search results
		thirdSearchPage.forEach(val => {

			theResults.appendChild(val);



		})

		searchPage.innerText = "Page 3"


	} else if (forthSearchPage.length > 0 && searchPage.innerText === "Page 3") {
		theResults.innerHTML = "";

		//adding the second page search results
		forthSearchPage.forEach(val => {

			theResults.appendChild(val);



		})

		searchPage.innerText = "Page 4"


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

		searchPage.innerText = "Page 3"
	} else if (searchPage.innerText === "Page 3") {

		theResults.innerHTML = "";

		secondSearchPage.forEach(val => {

			theResults.appendChild(val);



		})

		searchPage.innerText = "Page 2"
	} else {

		theResults.innerHTML = "";

		firstSearchPage.forEach(val => {

			theResults.appendChild(val);



		})

		searchPage.innerText = "Page 1";

		previousArrow.style.color = "grey";
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
				console.log(data);
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



//RANDOMLY SHOWING THE INTRODUCTION BACKGROUND IMAGES
let comicImage = document.querySelector("#comic-image");

let randomNum = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;


}

let randomImage = () => {
	setInterval(() => {
		let num = randomNum(5, 10);
		comicImage.src = `image/img%20(${num}).jpg`;

	}, 60000)

}

randomImage();
