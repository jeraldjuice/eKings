import React, { Component } from 'react';
import { StyleSheet,AppRegistry, View, Text, TouchableNativeFeedback} from 'react-native';

export class Card extends Component {

  constructor(props) {
    super(props);

    this.faceColor = this.props.dataObject.getColor();
    this.faceNumber = this.props.dataObject.getFaceNumber();
    this.suit = this.props.dataObject.getSuit();

    this.randomRotate = (Math.floor(Math.random() * 20) * Math.round(Math.random()) * 2 - 1) + 'deg';

    // Some fancy styles
    this.cardStyle = {
      backgroundColor: 'white',
      width: 130,
      height: 200,
      borderRadius: 5,
      borderColor: '#cccccc',
      borderWidth: 1,
      borderStyle: 'solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{rotateZ: this.randomRotate}]
    }

    this.flippedCardStyle = {
      backgroundColor: 'white',
      width: 130 * 2.5,
      height: 200 * 2.5,
      borderRadius: 5 * 2.5,
      borderColor: '#cccccc',
      borderWidth: 1 * 2.5,
      borderStyle: 'solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    this.innerStyle = {
      backgroundColor: 'transparent',
      width: '85%',
      height: '85%',
      borderRadius: 0,
      borderColor: this.faceColor,
      borderWidth: 10,
      borderStyle: 'solid'
    };

    this.labelStyle = {
      color: this.faceColor,
      fontSize: 70,
      textAlign: 'center'
    };

    this.symbolStyle = {
      color: this.faceColor,
      fontSize: 30,
      textAlign: 'center'
    };

    this.flippedLabelStyle = {
      color: this.faceColor,
      fontSize: 70 * 2.5,
      textAlign: 'center'
    };

    this.flippedSymbolStyle = {
      color: this.faceColor,
      fontSize: 30 * 2.5,
      textAlign: 'center'
    };

    this.backStyle = {
      backgroundColor: '#3b40db',
      borderRadius: 5,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    this.backDetailStyle = {
      backgroundColor: 'transparent',
      borderTopColor: '#0080ff',
      borderBottomColor: '#0080ff',
      borderRightColor: 'transparent',
      borderLeftColor: 'transparent',
      borderWidth: 50,
    };
  }

	render() {
    // Show back or front of the card
    if (this.props.isFlipped) {
      cardContents = (
        <View style={this.innerStyle}>
          <Text style={this.flippedLabelStyle}>{this.faceNumber}</Text>
          <Text style={this.flippedSymbolStyle}>{this.suit}</Text>
        </View>
      );
    } else {
      cardContents = (
        <View style={this.backStyle}>
          <View style={this.backDetailStyle}>
          </View>
          <View style={this.backDetailStyle}>
          </View>
        </View>
      );
    }

		return (
      <TouchableNativeFeedback onPress={this.props.cardCallback}>
  			<View style={this.props.isFlipped ? this.flippedCardStyle : this.cardStyle}>
          {cardContents}
        </View>
      </TouchableNativeFeedback>
		);
	}
}

export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.deck = this.props.deck;

    this.containerStyle = {
      display: 'flex',
      flexDirection: 'row'
    }

    this.flippedContainerStyle = {
      display: 'flex'
    }

    this.buttonStyle = {
      backgroundColor: '#cccccc',
      borderRadius: 5,
      padding: 10,
      marginTop: 30
    }

    this.buttonTextStyle = {
      color: 'white',
      textAlign: 'right'
    }
  }

  render() {
      let isFlipped = true;
    if(this.props.currentCard != null) {
      return (
        <View style={this.flippedContainerStyle}>
          <Card dataObject={this.props.currentCard} cardCallback={this.props.cardCallback} isFlipped={isFlipped} />
          <TouchableNativeFeedback onPress={this.props.finishTurn}>
            <View style={this.buttonStyle}><Text style={this.buttonTextStyle}>Next</Text></View>
          </TouchableNativeFeedback>
        </View>
      );
    }

    return (
      <View style={this.containerStyle}>
        {this.props.deck.map((item) => { return (<Card dataObject={item} cardCallback={() => this.props.cardCallback(item)} />) })}
      </View>
    );
  }
}

AppRegistry.registerComponent('eKings', () => CardContainer);