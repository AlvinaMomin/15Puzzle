function shuffle(shuffleTimes){ //make shuffle button that calls this function
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
	}
}