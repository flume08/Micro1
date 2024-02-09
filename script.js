const ROWS = 5; 
const COLS = 5; 
const MAX_NUM = 50; 
const MAX_TURNs = 25;
let currentPlayer = 1; 
let player1Card, player2Card,player3Card,player4Card; 

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
	return Math.floor(Math.random() * 50) + 1;
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
  function countPoints(card){
	
  }

document 
	.getElementById('startButton') 
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
			.getElementById('numberInput') 
			.value = ''; 
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
		const number = generateNumber();
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
