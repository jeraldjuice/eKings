import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import CardContainer from './components/card.js';
import DataStore from './components/DataStore.js';

export default class eKings extends Component {
	constructor(props){
		super(props);
		this.gameData = new DataStore;
		this.gameData.generateDeck();
		this.state = {
			currentCard: null,
			bottleOpened: false
		}
	}

	resetGame() {
		this.gameData.generateDeck();
		this.setState({currentCard: null});
	}

	flipCard(card) {
		this.setState({currentCard: card});
	}

	finishTurn() {
		this.gameData.removeCard(this.state.currentCard);
		let bottleOpened = this.gameData.seeIfBottleOpens();
		this.setState({currentCard: null, bottleOpened: bottleOpened});
	}

	render() {
		if(this.state.bottleOpened) {
			<View style={styles.container}>
				<Text>Drink!</Text>
			</View>
		} else {
			return (
				<View style={styles.container}>
					<CardContainer 
					currentCard={this.state.currentCard} 
					deck={this.gameData.drawThree()}
					cardCallback={this.flipCard.bind(this)}
					finishTurn={this.finishTurn.bind(this)} />
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('eKings', () => eKings);
