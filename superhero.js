let characterHeading = document.querySelectorAll(".character-head");
let characterDescription = document.querySelectorAll(".character-description");
let headCollapse = document.querySelectorAll(".collapse-head");


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


let theResults = document.querySelector("#the-results");
let inputSearch = document.querySelector("#input-search");
let searchButton = document.querySelector("#search-button");

let allResults = "";

function getHero(name) {

	fetch("https://superheroapi.com/api/2771979009559663/search/" + name)
		.then(result => {
			return result.json()
		})
		.then(data => {
			allResults = data.results;

			let searchResults = allResults;
			console.log(searchResults)
			//searchResults is an array of objects
			searchResults.forEach(val => {
				let possibleResult = document.createElement("li");
				possibleResult.innerHTML = val.name;
				possibleResult.setAttribute("id", val.id);
				possibleResult.addEventListener("click", listenSearchResult);
				theResults.appendChild(possibleResult);

			})

			console.log(theResults)

			//


		})
		.catch(err => {
			console.log(err)
		})


}

//user clicking the search button
let inputValue = "";
inputSearch.oninput = () => {
	inputValue = inputSearch.value;
}
searchButton.onclick = () => {
	if (inputValue != "") {
		getHero(inputValue);
	}

}


/*

//adding the powerStats information

let powers= character => {
	let powerObject=character.powerstats;
	for(let val in powerObject) {
		let newItem=document.createElement("p");
		newItem.innerHTML=`${val}: ${powerObject[val]}`
		powerBlock.appendChild(newItem)
	}
	
}

//adding the biography information
*/



let biographyBlock = document.querySelector("#biography-block");
let powerBlock = document.querySelector("#power-block");
let appearanceBlock=document.querySelector("#appearance-block");
let workBlock=document.querySelector("#work-block");
let connectionsBlock=document.querySelector("#connections-block");




let addCharacterInfo = (character, infoType, addToWhichBlock) => {
	
	
	
	
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

//the name and image of the character;
let characterName=document.querySelector("#character-name");
let characterImg=document.querySelector("#character-img");


let addNameImg=character => {
	let nameOfCharacter=character.name;
	let imageURL=character.image.url;
	
	characterName.innerHTML=nameOfCharacter;
	characterImg.setAttribute("src",imageURL);
	
}

//clearing out everything before displaying the whole data about the character.
let characterContainer=document.querySelector("#character-container");

let showCharacterData=() => {
	characterContainer.style.display="block";
	
	biographyBlock.innerHTML="";
	powerBlock.innerHTML="";
	workBlock.innerHTML="";
	appearanceBlock.innerHTML="";
	connectionsBlock.innerHTML="";
	
	
	
	//clear out the entered value
	inputSearch.value="";
	
	//clear out the displayed search results
	theResults.innerHTML="";
	
}


//adding eventlisteners to the search results
function listenSearchResult() {

	let theID = this.id;
	let theCharacter = allResults.find(objVal => {
		return objVal.id === theID
	})
	
	showCharacterData()
	
	//first adding the name and the image
	addNameImg(theCharacter);

	//then adding all the information about the character
	addCharacterInfo(theCharacter,"powerstats",powerBlock);
	addCharacterInfo(theCharacter,"biography",biographyBlock);
	addCharacterInfo(theCharacter,"appearance",appearanceBlock);
	addCharacterInfo(theCharacter,"work",workBlock);
	addCharacterInfo(theCharacter,"connections",connectionsBlock);
	

}
