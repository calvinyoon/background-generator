//Variables
//Capture everything you want to interact with or change
var color1 = document.querySelector(".color1");	//capture color wheel input #1 element
var color2 = document.querySelector(".color2"); //capture color wheel input #2 element
var body = document.querySelector("#gradient"); //capture body element
var css = document.querySelector("h3");			//capture blank h3 element
var generateButton = document.querySelector(".generatebutton");	//capture gen button
var copyButton = document.querySelector(".copybutton");			//capture copy button

//Display Code
function displayCode() {
	//This function retrieves global var element color 1 and color2
	//and links their values to a string stored as outputText
	//then it changes textContent of global var element css
	const outputText = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";
	css.textContent = outputText;
};

//Function to setBodyProperty
function setBodyProperty() {
	//On the CSS file, body bkgd prop has --color1 and --color2 vars
	//Using style.setProperty, we can access and edit this property
	//so we edit to the values of global var elements color 1 and color2
	body.style.setProperty("--color1", color1.value);
	body.style.setProperty("--color2", color2.value);
	//The gen button calls setBodyProperty function so let's also
	//display the code here as a result of clicking gen button
	displayCode();
};

//Set background to default values
body.style.setProperty("--color1", color1.value);
body.style.setProperty("--color2", color2.value);
displayCode();

//Respond to the manual color input
color1.addEventListener("input", setBodyProperty);
color2.addEventListener("input", setBodyProperty);

//Random Color Generator
function randomGenerator() {
	//Generate hex b/w 00 and ff
	const randomHex = () =>
	Math.floor(Math.random()*256)
	.toString(16)
	.padStart(2, "0");

	//Generate a color string
	const randomColor = () => `#${[...Array(3)].map(randomHex).join("")}`;

	body.style.setProperty("--color1", randomColor());
	body.style.setProperty("--color2", randomColor());

	const bodyColor1 = body.style.getPropertyValue("--color1");	//body..style list..#00ff00
	const bodyColor2 = body.style.getPropertyValue("--color2"); //body..style list..#00ff00

	css.textContent = "linear-gradient(to right, " + bodyColor1 + ", " + bodyColor2 + ")";

	color1.value = bodyColor1;
	color2.value = bodyColor2;
};

function copyCodeText() {
	navigator.clipboard.writeText(css.textContent);
	alert("text was copied");
};

//Respond to Generate Button click
generateButton.addEventListener("click", randomGenerator);

//Repond to Copy Button click
copyButton.addEventListener("click", copyCodeText);
