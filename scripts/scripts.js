// VARIABLES
var squares = document.getElementsByClassName("square");

var correct_rgb =  new rgb();

var rgb_code = document.getElementById("rgb_code");

var reset_button = document.getElementById("reset_button");
var easy_button = document.getElementById("easy_button");
var medium_button = document.getElementById("medium_button");
var hard_button = document.getElementById("hard_button");

var title = document.getElementsByClassName("title")[0];
var display_message = document.getElementById("display_message");

var fields_to_change = 3;

// ADD EVENT LISTENERS
reset_button.addEventListener("click", startGame);  

easy_button.addEventListener("click", function() {
    
    fields_to_change = 3; 
    startGame();
    
    easy_button.classList.add("selected");
    medium_button.classList.remove("selected");
    hard_button.classList.remove("selected");
});

medium_button.addEventListener("click", function() {
    fields_to_change = 2; 
    startGame();
    
    easy_button.classList.remove("selected");
    medium_button.classList.add("selected");
    hard_button.classList.remove("selected");
});   
hard_button.addEventListener("click", function() {
    fields_to_change = 1; 
    startGame();
    
    easy_button.classList.remove("selected");
    medium_button.classList.remove("selected");
    hard_button.classList.add("selected");
});  

for(var i = 0; i < squares.length; i++){           
    squares[i].addEventListener("click", compareRGB);    
}

// START THE GAME
startGame();

function startGame() {
    
    var correct_square = getRandomInt(0, squares.length - 1); // Get a random square the be right (0 to length of squares -1)
    
    title.style.backgroundColor = "#a0a0a0";    
    display_message.innerHTML = ""; // Clear games display message   
    reset_button.innerHTML = "New Colours";
    
    var array = createRandomRgbArray(squares.length, fields_to_change);
    
    // Set each square to
    for(var i = 0; i < squares.length; i++){           
       
        squares[i].classList.remove("hidden");       
        squares[i].style.backgroundColor = array[i].backgroundColor();  //Change the square color

        // If the square to be made correct
        if(i === correct_square) {
            correct_rgb = array[i]; // Set the right square
            rgb_code.innerHTML = array[i].backgroundColor(); // Set header to show right rgb
        }
    }
};

// Compare square div background color to correct background color
function compareRGB() {
    
    if(this.style.backgroundColor === correct_rgb.backgroundColor()) {
        
        display_message.innerHTML = "Winner!!";
         reset_button.innerHTML = "Play Again?";
        
        for(var i = 0; i < squares.length; i++){    
            squares[i].style.backgroundColor = correct_rgb.backgroundColor();
            squares[i].classList.remove("hidden");
        }
        
        var title = document.getElementsByClassName("title")[0];
        title.style.backgroundColor = correct_rgb.backgroundColor("red");
        
    } else {
        console.log("not right");
        this.classList.add("hidden");
    }
};

// RGB Object
function rgb(r, g, b) {
    
    this.r = r;
    this.g = g;
    this.b = b;
    
    // Randomizes the rgb values
    this.randomize = function() {
        this.r = getRandomInt(0, 255);
        this.b = getRandomInt(0, 255);
        this.g = getRandomInt(0, 255);
    };
    
    // Outputs to background-color attribute
    this.backgroundColor = function() {
       return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    };
    
};

// Creates an array given an rgb object, length of array, and and number or fields ro randomize
function createRandomRgbArray(length, fields = 3) {
    
    var random_rgb_array = [];
    var random_rgb =  new rgb(0, 0, 0);
    random_rgb.randomize();
    
    // Alter one rgb value
    if(fields == 1){        
        
        var rand = getRandomInt(1, 3)
        
        for(var i = 0; i < length; i++){
            
            if(rand === 1)
                random_rgb_array.push(new rgb(random_rgb.r, random_rgb.g, getRandomInt(0, 255)));
            else if(rand === 2)
                random_rgb_array.push(new rgb(getRandomInt(0, 255), random_rgb.g, random_rgb.b));
            else
                 random_rgb_array.push(new rgb(random_rgb.r, getRandomInt(0, 255), random_rgb.b ));
        }   
    }
    
   // Alter two rgb values
    else if(fields == 2){
             
        var rand = getRandomInt(1, 3)
        
        for(var i = 0; i < length; i++){
            
            if(rand == 1)
                random_rgb_array.push(new rgb(random_rgb.r, getRandomInt(0, 255), getRandomInt(0, 255)));
            else if(rand == 2)
                random_rgb_array.push(new rgb(getRandomInt(0, 255), random_rgb.g, getRandomInt(0, 255)));
            else
                 random_rgb_array.push(new rgb(getRandomInt(0, 255), getRandomInt(0, 255), random_rgb.b ));
        } 
    } 
    
    // Alter all rgb values
    else {
        
        for(var i = 0; i < length; i++){
            random_rgb_array.push(new rgb(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)));
        }
    }
        
    return random_rgb_array;
}

// Returns a random value between two numbers inclusivly
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}