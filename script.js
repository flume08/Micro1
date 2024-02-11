let ROWS,COLS 
const MAX_NUM = 50; 
const MAX_TURNS = 25;
let currentPlayer = 1; 
let player1Card, player2Card,player3Card,player4Card;
let currentTurns = 0;
let generatedNumbers


function createPlayer(name){
	player ={
		name:name,
		points:0
	}
}
function getNames(){
	let names = [];
	const namesd = document.querySelectorAll('.input')
	for (L of namesd) {
		names.push(L.value)
	}return names}

function getSize(){
	let selectedSize;
	const radioButtons = document.querySelectorAll('input[name="boardSize"]');
	for (const radioButton of radioButtons) {
    if (radioButton.checked) {
        selectedSize = radioButton.value;
		selectedSize = parseInt(selectedSize)
        return selectedSize
    }
}	
}
function createBingoCard() { 
	const card = []; 
	const usedNumbers = new Set(); 

	while (usedNumbers.size < ROWS * COLS) { 
		const num = 
			Math 
				.floor(Math.random() * 
					MAX_NUM) + 1; 
		if (!usedNumbers.has(num)) { 
			usedNumbers.add(num); 
		} 
	} 

	const numbersArray = 
		Array.from(usedNumbers); 
	for (let i = 0; i < ROWS; i++) { 
		card.push(numbersArray 
			.slice(i * COLS, (i + 1) * COLS)); 
	} 

	return card; 
} 

function displayBingoCard(card, containerId) { 
	const container = 
		document.getElementById(containerId); 
	container.innerHTML = ''; 

	for (let i = 0; i < ROWS; i++) { 
		for (let j = 0; j < COLS; j++) { 
			const cell = 
				document.createElement('div'); 
			cell.textContent = card[i][j]; 
			if (card[i][j] === 'X') { 
				cell.classList.add('marked'); 
			} 
			container.appendChild(cell); 
		} 
	} 
} 
function generateNumber(){
	let number;
    do {
        number = Math.floor(Math.random() * 50) + 1;
    } while (generatedNumbers.has(number));
    generatedNumbers.add(number);
    return number;
}
function markNumber(card,number) {
	for (let i = 0; i < ROWS; i++) {
	  for (let j = 0; j < COLS; j++) {
		if (card[i][j] === number) {
		  card[i][j] = 'X';
		  return true;
		}
	  }
	}
	return false;
  } 
  function mostarNumero(number) {
	document.getElementById('numerberGenerated').innerText = `The number was ${number}`;
  }
  function countPointsDiagonal1(card, points) {
	let x = 0;
	for (let i = 0; i < ROWS; i++) {
	  if (card[i][i] === 'X') {
		x += 1;
	  }
	}
	if (x === ROWS) {
	  points += 3;
	}
  }
  
  function countPointsDiagonal2(card, points) {
	let x = 0;
	for (let i = 0; i < ROWS; i++) {
	  if (card[i][ROWS - i - 1] === 'X') {
		x += 1;
	  }
	}
	if (x === ROWS) {
	  points += 3;
	  }
	}
  function countPointsHorizontal(card,points){
	for (let i = 0; i < ROWS; i++) { 
		let x =0
		for (let j = 0; j < COLS; j++) {
			if(card[i][j]==='X'){
				x+=1
			}
	}
	if(x == ROWS){
		points+=1
	}
  }}
  function countPointsVertical(card,points){
	for (let i = 0; i < ROWS; i++) { 
		let x =0
		for (let j = 0; j < COLS; j++) {
			if(card[j][i]==='X'){
				x+=1
			}
	}
	if(x == ROWS){
		points+=1
	}}}
function checkWin(card) { 
  
		// Check rows and columns for a Bingo pattern 
		for (let i = 0; i < ROWS; i++) { 
			let rowFilled = true; 
			let colFilled = true; 
			for (let j = 0; j < COLS; j++) { 
				if (card[i][j] !== 'X') { 
					rowFilled = false; 
				} 
				if (card[j][i] !== 'X') { 
					colFilled = false; 
				} 
			} 
			if (rowFilled || colFilled) { 
				return true; 
			} 
  }}
  function checkGameOver() {
    // Check if maximum turns reached
    if (currentTurns >= MAX_TURNS) {
        return true;
    }

    // Check if any player has reached a winning number of points
    if (checkWin(player1Card)|| checkWin(player2Card)|| checkWin(player3Card)|| checkWin(player4Card)){
        return true;
    }

    // If neither condition is met, the game is not over
    return false;
}

function endGame() {
	points1 = calculatePoints(player1Card);
	console.log(points1);
    points2 = calculatePoints(player2Card);
    points3 = calculatePoints(player3Card);
    points4 = calculatePoints(player4Card);

    // Create player objects
    let player1 = {name: names[0], points: points1};
    let player2 = {name: names[1], points: points2};
    let player3 = {name: names[2], points: points3};
    let player4 = {name: names[3], points: points4};

    // Store player objects in local storage
    localStorage.setItem('player1', JSON.stringify(player1));
    localStorage.setItem('player2', JSON.stringify(player2));
    localStorage.setItem('player3', JSON.stringify(player3));
    localStorage.setItem('player4', JSON.stringify(player4));
    // Disable game buttons
    document.getElementById('markButton').disabled = true; 
    document.getElementById('startButton').disabled = true; 
    document.getElementById('resetButton').disabled = true; 
    document.getElementById('numberInput').disabled = true;

    // Display game over message
    alert('Game Over!');
	updateScoreTable();

}
function calculatePoints(card) {
    let points = 0;
    countPointsHorizontal(card, points);
    countPointsVertical(card, points);
    countPointsDiagonal1(card, points);
    countPointsDiagonal2(card, points);
    return points;
}
function updateScoreTable() {
    // Get player objects from local storage
    let player1 = JSON.parse(localStorage.getItem('player1'));
    let player2 = JSON.parse(localStorage.getItem('player2'));
    let player3 = JSON.parse(localStorage.getItem('player3'));
    let player4 = JSON.parse(localStorage.getItem('player4'));

    // Get table body element
    let tableBody = document.querySelector('#scoreTable tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Create new table rows for each player
    let players = [player1, player2, player3, player4];
    for (let player of players) {
        let row = document.createElement('tr');
        let nameCell = document.createElement('td');
        let pointsCell = document.createElement('td');

        nameCell.textContent = player.name;
        pointsCell.textContent = player.points;

        row.appendChild(nameCell);
        row.appendChild(pointsCell);

        tableBody.appendChild(row);
    }
}
document 
	.getElementById('startButton') 
	.addEventListener('click', () => {
		generatedNumbers = new Set()
		names = getNames();
		console.log(names[0])
		if(names[0] === ''){
			alert('Please enter the names');
			return false;
		}
		console.log(names);
		ROWS = getSize();
		COLS = getSize();
		player1Card = createBingoCard(); 
		player2Card = createBingoCard(); 
        player3Card = createBingoCard(); 
		player4Card = createBingoCard();
		var grid = document.querySelectorAll('.player-card');
		grid.forEach(function(card) {
			card.style.gridTemplateColumns = `repeat(${ROWS}, 1fr)`;
		});
		displayBingoCard(player1Card, 'player1Card'); 
		displayBingoCard(player2Card, 'player2Card');
        displayBingoCard(player3Card, 'player3Card'); 
		displayBingoCard(player4Card, 'player4Card');

		document 
			.getElementById('markButton') 
			.disabled = false; 
		document 
			.getElementById('startButton') 
			.disabled = true; 
		document 
			.getElementById('resetButton') 
			.disabled = false; 
		document 
			.getElementById('numberInput') 
			.disabled = false; 
	}); 

document 
	.getElementById('resetButton') 
	.addEventListener('click', () => { 
		player1Card = createBingoCard(); 
		player2Card = createBingoCard();
        player3Card = createBingoCard(); 
		player4Card = createBingoCard(); 
		displayBingoCard(player1Card, 'player1Card'); 
		displayBingoCard(player2Card, 'player2Card');
        displayBingoCard(player3Card, 'player3Card'); 
		displayBingoCard(player4Card, 'player4Card');    
		document 
			.getElementById('markButton') 
			.disabled = false; 
		document 
			.getElementById('startButton') 
			.disabled = true; 
		document 
			.getElementById('resetButton') 
			.disabled = false; 
		document 
			.getElementById('numberInput') 
			.disabled = false; 
	}); 

document.getElementById('markButton').addEventListener('click', () => {
	if (checkGameOver()) {
        endGame();
		console.log(points1)
		alert('Game Over')
    }
		const number = generateNumber();
		currentTurns += 1;
		mostarNumero(number)
	 	if (markNumber(player1Card,number) || 
				markNumber(player2Card,number) || markNumber(player3Card,number) || 
				markNumber(player4Card,number)) { 
				displayBingoCard(player1Card, 'player1Card'); 
				displayBingoCard(player2Card, 'player2Card');
                displayBingoCard(player3Card, 'player3Card'); 
				displayBingoCard(player4Card, 'player4Card');


				
				} 
			
			} 
	);
