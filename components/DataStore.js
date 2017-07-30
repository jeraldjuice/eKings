export default class DataStore {
	constructor() {
		this.deck = null;
	}

	generateDeck() {
		this.deck.length = 0;
		this.cardsDiscarded = 0;

	    // Make a deck
	    for(let x = 0; x < 52; x ++) {
	      suitChar = x < 13 ? 'd' : x < 26 ? 'c' : x < 39 ? 'h' : 's';
	      faceNum = x % 14; // Corresponds to the 14 card types
	      this.deck.push(new CardData({ id: x, suit: suitChar, faceNumber: faceNum }));
	    }

	    // Shuffle that deck, ala Fisher-Yates
	    for(let i = this.deck.length; i > 0; i--) {
	      y = Math.floor(Math.random() * (i + 1));
	      if(i > -1 && i < 52 && y > -1 && y < 52) { // Figure out why this is needed to fix that bug
	        let currentCard = this.deck[i];
	        this.deck[i] = this.deck[y];
	        this.deck[y] = currentCard;
	      }
	    }
	}

	/* Return top three cards, return all cards if less than three remaining, end game if no cards remain. */

	drawThree() {
		return this.deck.splice(0,3);
	}

	seeIfBottleOpens() {
		if ((Math.random * this.cardsDiscarded) > 11) {
			this.cardsDiscarded = 0;
			return true;
		} else {
			return false;
		}
	}

	getDeck() {
		return this.deck;
	}

	removeCard(currentCard) {
		this.deck = this.deck.filter((value) => { return value.id != currentCard.id });
		currentCard = null;
		this.cardsDiscarded = this.cardsDiscarded + 1;
	}
}

export class CardData {
	constructor(jsonObj) {
		this.suits = {'h': '\u2665','c': '\u2663','d': '\u2666','s': '\u2660'};
		this.id = jsonObj.id;
		this.suit = jsonObj.suit;
		this.faceNumber = jsonObj.faceNumber;
	}

	getSuit() {
		return this.suits[this.suit];
	}

	getFaceNumber() {
		return this.faceNumber == 0 ? "A" :
      this.faceNumber < 11 ? this.faceNumber :
      this.faceNumber == 11 ? "J" :
      this.faceNumber == 12 ? "Q" :
      this.faceNumber == 13 ? "K" :
      "X";
	}

	getColor() {
		return this.suit == 'h' | this.suit ==  'd' ? "#f44242" : "#333333";
	}

	toJson() {
		return {
			id: this.id,
			suit: this.suit,
			faceNumber: this.faceNumber
		}
	}
}