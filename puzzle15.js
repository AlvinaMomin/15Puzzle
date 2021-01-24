//adding buttons for picture selection and a shuffle button
		const options = document.getElementById("buttons");

		const option1 = document.createElement("button");
		option1.setAttribute("id","mario1");
		option1.classList.add("buttons");
		option1.innerHTML = "Mario 1";
		
		const option2 = document.createElement("button");
		option2.classList.add("buttons");
		option2.setAttribute("id","mario2");
		option2.innerHTML = "Mario 2";

		const option3 = document.createElement("button");
		option3.setAttribute("id","luigi");
		option3.classList.add("buttons");
		option3.innerHTML = "Luigi";

		const option4 = document.createElement("button");
		option4.setAttribute("id","square");
		option4.classList.add("buttons");
		option4.innerHTML = "Square";

		const shufflebtn = document.getElementById("shufflebtn");
		const shuffle = document.createElement("button");
		shuffle.setAttribute("id","shuffle");
		shuffle.classList.add("buttons");
		shuffle.innerHTML = "Shuffle";


		options.appendChild(option1);
		options.appendChild(option2);
		options.appendChild(option3);
		options.appendChild(option4);
		shufflebtn.appendChild(shuffle);

		document.getElementById("mario1").addEventListener("click", mario1);
		document.getElementById("mario2").addEventListener("click", mario2);
		document.getElementById("luigi").addEventListener("click", luigi);
		document.getElementById("square").addEventListener("click", square);
		document.getElementById("shuffle").addEventListener("click", dissapear);

		function mario1() {
			var divs = document.getElementsByTagName('div');
			

			for (var i = 3; i < divs.length-2; i++){
				var divClass = divs[i].className;
				var divSplitClasses = divClass.split(" ");

				console.log(divSplitClasses[1]);

				divs[i].classList.add("bgMario1");
				if (divSplitClasses[1] != "blank") {
					divs[i].classList.remove(divSplitClasses[1]);
				}
			}

		}

		function mario2() {
			var divs = document.getElementsByTagName('div');

				for (var i = 3; i < divs.length-2; i++){

				var divClass = divs[i].className;
				var divSplitClasses = divClass.split(" ");

				console.log(divSplitClasses[1]);

				divs[i].classList.add("bgMario2");
				if (divSplitClasses[1] != "blank") {
					divs[i].classList.remove(divSplitClasses[1]);
				}
			}
		}

		function luigi() {
			var divs = document.getElementsByTagName('div');
				for (var i = 3; i < divs.length-2; i++){

				var divClass = divs[i].className;
				var divSplitClasses = divClass.split(" ");

				console.log(divSplitClasses[1]);

				divs[i].classList.add("bgLuigi");
				if (divSplitClasses[1] != "blank") {
					divs[i].classList.remove(divSplitClasses[1]);
				}
			}
		}

		function square() {
			var divs = document.getElementsByTagName('div');
				for (var i = 3; i < divs.length-2; i++){

				var divClass = divs[i].className;
				var divSplitClasses = divClass.split(" ");

				console.log(divSplitClasses[1]);
				divs[i].classList.add("bgSquare");
				if (divSplitClasses[1] != "blank") {
					divs[i].classList.remove(divSplitClasses [1]);
				}
			}
		}

		function dissapear() {
		
			document.getElementById("mario1").style.display = 'none';
			document.getElementById("mario2").style.display = 'none';
			document.getElementById("luigi").style.display = 'none';
			document.getElementById("square").style.display = 'none';
			document.getElementById("shuffle").style.display = 'none';
			clear();
			shuffleStart(15);
		}


		var winSound = new Audio('sound/win.mp3');
		var slideSound = new Audio('sound/stoneSlide.mp3');
		const backSound = new Audio('sound/mariobros.mp3');
		//keeps track of current positions of the squares
		//for example index 0 refers to the upper left square always, here initially the square with 1 on it is in that position
		var currentPositions = [1,2,3,4,
								5,6,7,8,
								9,10,11,12,
								13,14,15,-1];
		var blankPositionIndex = 15; //-1 is initially at index 15 of currentPositions array

		//shows what position touches what position
		var touchingArrays = {    
		  "1": [2,5], "2": [1,3,6], "3": [2,4,7], "4": [3,8],
		  "5": [1,6,9], "6": [2,5,7,10], "7": [3,6,8,11], "8": [4,7,12],
		  "9": [5,10,13], "10": [6,9,11,14], "11": [7,10,12,15], "12": [8,11,16],
		  "13": [9,14], "14": [10,13,15], "15": [11,14,16], "16": [12,15]
		}
		//prints the touching array by groups of 4 to console
		function printTouching(){
			var i;
			for(i =0; i < 4; i++){
				console.log("*******************");
				for(i =0; i < 4; i++){
					console.log(touchingArrays[i*4 + 1]+ ", " +touchingArrays[i*4 + 1 +1]+ ", " + touchingArrays[i*4 + 2 +1]+ ", " +  touchingArrays[i*4 + 3 +1]);
				}
				console.log("*******************");
			}
		}
		//prints the current positions array by groups of 4 to console
		function printCurPositions(){
			var i;
			console.log("*******************");
			for(i =0; i < 4; i++){
				console.log(currentPositions[i*4]+ ", " +currentPositions[i*4 + 1]+ ", " + currentPositions[i*4 + 2]+ ", " +  currentPositions[i*4 + 3]);
			}
			console.log("*******************");
		}



		
		var clickInProgress = true; //used below to return early in tdClick if the previous click process is taking place
		var playStatus = 0;//indicate the status of play, 0=beginning 1=already began, for some specific method use
		var steps = 0;//show the total steps of user
		//called when a cell of the table is clicked (td element)
		function tdClick(cell){ 
			if(clickInProgress) return; //doesn't do anything if the animations and swapping of squares is taking place
			
			clickInProgress = true;

			document.getElementById("winningDiv").innerHTML = ""; //will not be here when game has shuffle and time. just takes away "YOU WON!" text when user clicks after winning.

			var touching = false;
			
			//loops through the inner array of clicked squares posistion in the touching array above and sees if one of the positions touching contains the blank space square
			var i;
			for(i = 0; i < touchingArrays[cell].length; i++){
				//console.log(touchingArrays[cell][i]);
				if( touchingArrays[cell][i] == (blankPositionIndex+1) ){
					touching = true;
				}
			}

			if(touching){ //if the clicked square is touching the blank square
				for(i = 0; i < touchingArrays[blankPositionIndex+1].length; i++){ 
					var touchingDivID = "d"+touchingArrays[blankPositionIndex+1][i]; //neighboring div id of blank square
					//console.log("touching id "+ touchingDivID);
					document.getElementById(touchingDivID).classList.remove('movablepiece'); //get rid of the class with :hover
				}
				steps ++;
				if(playStatus == 0)//if the game has not started
				{
					backSound.play();
					timer();
					playStatus = 1;
				}
				startAnimation(cell);
			}
			else{
				clickInProgress = false;
			}
		}

		function startAnimation(cell){
			slideSound.play();
			var divID = "d"+ cell;   //the id of the clicked div(d and number)
			var clickedSquareClass = document.getElementById(divID).className;  //get the class of the clicked square 
			var blankDivID = "d"+(blankPositionIndex+1); //the id of the blank div
				
			//get x and y position of blank and clicked square. compare to see if animation should be up down left or right

			var clickedDivY = window.scrollY + document.getElementById(divID).getBoundingClientRect().top // Y
			var clickedDivX = window.scrollX + document.getElementById(divID).getBoundingClientRect().left // X
			//console.log("clickedDivX: " + clickedDivX + " ** clickedDivY: " + clickedDivY);
	
			var blankDivY = window.scrollY + document.getElementById(blankDivID).getBoundingClientRect().top // Y
			var blankDivX = window.scrollX + document.getElementById(blankDivID).getBoundingClientRect().left // X
			//console.log("blankDivX: " + blankDivX + " ** blankDivY: " + blankDivY);

			var differenceX = clickedDivX - blankDivX;
			var differenceY = clickedDivY - blankDivY;
			//console.log("difX: " + differenceX + " ** difY: " + differenceY);

				
			// When 2 squares are touching either their X or Y positions should be the same, while the other axis is different. but since the blank div has no borders, while the clicked does have a 
			//border, the x/y that should be the same can differ by a few pixels as can be demonstrated with the console.logs above. Since there will be a small pixel 
			//difference in the "unchanged axis", 20 is arbitrarily chosen since it will most definitely not apply to the small 2 or 4 pixel difference in the other axis
			//but only the axis with a significant change
				
			//here the correct class is added to the div. each class has a keyframe associated with it in the css. the keyframe translates ~ 100 px in the correct direction
			if(differenceY > 20){
				//direction = "up";
				document.getElementById(divID).classList.add('up'); 
			}
			else if(differenceY < -20){
				//direction = "down";
				document.getElementById(divID).classList.add('down');
			}

			if(differenceX > 20){
				//direction = "left";
				document.getElementById(divID).classList.add('left');
			}
			else if(differenceX < -20){
				//direction = "right";
				document.getElementById(divID).classList.add('right');
			}

			//the animation takes some time to finish(check keyframes for time). So wait that time to actually swap the 2 with the swapSquares function
			//What happens is that the animation moves the div for a time and then slips back to its original position(what normally happens with an animation)
			//but at that instant, the blank and clicked squares then have their classes changed with swapSquares(), giving the illusion that it slid and stayed in place
			setTimeout(function() {
				var splitClasses = clickedSquareClass.split(" ");
				swapSquares(cell, divID, blankDivID, splitClasses, true); 
			}, 1000); //number in milliseconds
		}

		function swapSquares(cell, divID, blankDivID, clickedSquareClass, makeNeighborsHoverable){
			
			//get rid of the "blank" class and give the blank square the clicked squares class
			document.getElementById(blankDivID).removeAttribute("class");
			document.getElementById(blankDivID).classList.add(clickedSquareClass[0]);
			document.getElementById(blankDivID).classList.add(clickedSquareClass[1]);

			//get rid of the clicked squares classes(the pic# class and the animation class added) and make the clicked square blank
			document.getElementById(divID).removeAttribute("class");
		    document.getElementById(divID).classList.add('blank');
				

			//swap cell-1 and blank index numbers in the currentPositions array(currentPositions is an array so starting with 0, cell is a number from 1 to 16 so -1 to match the array indexes)
			var temp = currentPositions[cell -1]; //temporary storage of position clicked
			currentPositions[cell -1] = -1;  //clicked position now contains the blank square(represented by -1)
			currentPositions[blankPositionIndex] = temp; //the previously blank position has the clicked position's number
			blankPositionIndex = cell -1;  //the variable keeping track of the blank position is updated
			
			//prints the array of positions in the console
			printCurPositions();
			if(makeNeighborsHoverable){  //dont care about making hoverable when shuffling
				for(i = 0; i < touchingArrays[blankPositionIndex+1].length; i++){
					var touchingDivID = "d"+touchingArrays[blankPositionIndex+1][i]; //get id of neighboring div
					//console.log("touching id "+ touchingDivID);
					document.getElementById(touchingDivID).classList.add('movablepiece'); //give class with :hover in css to new divs that hover the blank square
				}
			}
			clickInProgress = false;
			checkWin(); //see if the game is won
		}
		function shuffleStart(shuffleTimes){ //make shuffle button that calls this function
			var lastBlankPositionIndex = blankPositionIndex;
			var i;
			for(i = 0; i < shuffleTimes; i++){ //shuffles however many times
				//check touchingArray to see which positions are currently touching the blank square
				//get a random number between 0 and the size of the inner touching array-1
				//this random number will represent the index of one of the touching positions
				//for example, blank position is initially index 15 here (the -1)
								/*[1,2,3,4,
								5,6,7,8,
								9,10,11,12,
								13,14,15,-1];*/
				//here is the touchingArray for 16(touching array is an associative array not by index)
				//							"16": [12,15]
				//12 and15 is what touches the 16th position where the blank square is
				//the size is 2 so get a random number from 0 to 1(touchingArrays[16][0] =12 and touchingArrays[16][1] = 15 for example)
				//based on the random number choose that space with touchingArrays[16][random number]
				//call swapSquares(cell, divID, blankDivID, clickedSquareClass) with necessary parameters
				/*
				var cell = touchingArrays[16][random number];
				var divID = "d"+ cell;   //the id of the neighboring square div(d and number)
				var clickedSquareClass = document.getElementById(divID).className;  //get the class of the neighboring square 
				var blankDivID = "d"+(blankPositionIndex+1); //the id of the blank div
				*/
				//declare those in for loop here and pass them as parameters
				//the swap squares funciton calls printCurPositions which prints the changed positions to console so you can look at console and reverse steps to solve the puzzle
				
				
				var randomIndex;
				//makes sure that the one selected is not reversing the previous step
				do{
					randomIndex = Math.floor(Math.random() * (touchingArrays[blankPositionIndex+1].length) );
				}while(touchingArrays[blankPositionIndex+1][randomIndex] == lastBlankPositionIndex+1)
				console.log(randomIndex);
				//console.log(randomIndex);
				var cell = touchingArrays[blankPositionIndex+1][randomIndex];
				var divID = "d"+ cell;   //the id of the neighboring square div(d and number)
				//console.log(divID)
				var neighborSquareClass = document.getElementById(divID).className;  //get the class of the neighboring square. will need to split when adding alvinas part
				var neighborSquareClassSplit = neighborSquareClass.split(" ");
				var blankDivID = "d"+(blankPositionIndex+1); //the id of the blank div
				lastBlankPositionIndex = blankPositionIndex;
				if(i == shuffleTimes-1){ //true passed here. This parameter determines if the class for making a neighbor hoverable should be added(this is unnecessary when shuffling 
										//except the last time. The user is never going to be hovering when shuffling)
					swapSquares(cell, divID, blankDivID, neighborSquareClassSplit, true);
				}
				else{
					swapSquares(cell, divID, blankDivID, neighborSquareClassSplit, false);
				}
			}
			console.log("***********END SHUFFLE**************");
			clickInProgress = false;
		}
		
		var h2 = document.getElementsByTagName('h2')[0];
		function checkWin(){
			if(currentPositions[15] != -1) return; //didn't win if last position is not blank
				
			var i;
			for(i = 1; i < currentPositions.length -1; i++){  //goes through the array except the last(which should be blank)
				if( currentPositions[i] != (currentPositions[i-1]+1) ) return; //each index was not 1 value higher than last so the puzzle is not in order
			}
			clickInProgress = true;
			setTimeout(function(){winSound.play();}, 500);
			setTimeout(function(){document.getElementById("containerDiv").style.display = 'none';}, 500);
			setTimeout(function(){document.getElementById("top").style.display = 'none';}, 500);
			setTimeout(function(){document.getElementById("pTop").style.display = 'none';}, 500);
			setTimeout(function(){document.getElementById("pBottom").style.display = 'none';}, 500);
			setTimeout(function(){document.getElementById("winningDiv").style.display = 'block';}, 500);
			setTimeout(function(){document.getElementById("text").innerHTML = "Congratulations, you won!!";}, 500);
			playStatus = 0;//stop the timer
			/////////////Web storage part////////////////////////////////////////////
			if (typeof(Storage) !== "undefined") //if the browser is supported local storage
			{
				if(localStorage.globalPlayStatus)// if the browser has "globalPlayStatus" in local storage 
				{
					if(totalseconds < parseInt(localStorage.getItem("besttime")))
					{
						if(steps < parseInt(localStorage.getItem("besttime")))
						{
							localStorage.besttime = totalseconds;
							localStorage.beststep = steps;
						}
					}
				}
				else//no flag in browser, run initialization
				{
					localStorage.setItem("besttime",99999);
					localStorage.setItem("beststep",99999);
					if(totalseconds < parseInt(localStorage.getItem("besttime")))
					{
						if(steps < parseInt(localStorage.getItem("beststep")))
						{
							localStorage.setItem("besttime",totalseconds);
							localStorage.setItem("beststep",steps);
							localStorage.setItem("globalPlayStatus",1);// set up a flag in browser local storage
						}
					}
				}
				var localHours = 0, localMinutes = 0, localSeconds = 0;
				localHours = Math.trunc(parseInt(localStorage.getItem("besttime"))/3600);//get hours from totalseconds
				localMinutes = Math.trunc((parseInt(localStorage.getItem("besttime"))%3600)/60);//get minutes from totalseconds
				localSeconds = Math.trunc((parseInt(localStorage.getItem("besttime"))%3600)%60);//get seconds from totalseconds

				h2.textContent = "Best Time: "+((localHours ? (localHours > 9 ? localHours : "0" + localHours) : "00") + ":" + (localMinutes ? (localMinutes > 9 ? localMinutes : "0" + localMinutes) : "00") + ":" + (localSeconds > 9 ? localSeconds : "0" + localSeconds))+"\tBest steps: "+(parseInt(localStorage.getItem("beststep")));

			} 
			else
			{
				h2.textContent = "Sorry, your browser does not support Web Storage...";
			}
			////////////////////////////////////////////////////////////////////////////
			//document.getElementById("winningDiv").innerHTML = "YOU WON!<br>";
		}

		var t;
		var h1 = document.getElementsByTagName('h1')[0];
		//h1.style.display = "none"; //made block when shuffle is clicked
		var seconds = 0, minutes = 0, hours = 0, count = 0;
		var totalseconds = 0;//for statistic use

		function timer()//1 sec timer
		{
			t = setTimeout(timerandaudio,1000);
		}


		function clear()//reset the timer
		{
			h1.textContent="Time: 00:00:00	Steps: 0";
			seconds=0;
			minutes=0;
			hours=0;
			steps=0;
			totalseconds=0;
		}

		function timerandaudio()
		{
			if (count==123)//routine
			{
				backSound.play();
				count = 0;
			}
			
			if(playStatus == 1)//if game terminated, stop counting
			seconds ++;
			totalseconds ++;
			count ++;
			if (seconds >= 60) 
			{
				seconds = 0;
				minutes++;
				if (minutes >= 60) 
				{
					minutes = 0;
					hours++;
				}
			}
			h1.textContent = "Time: "+(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)+("\t Steps: "+steps);
			timer();
		}