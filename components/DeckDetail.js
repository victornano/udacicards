import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { purple, white, gray, black } from '../utils/colors'

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title
        }
    }
    render() {
        const {deck} = this.props
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: purple, fontSize: 35, marginBottom: 5}}>{deck.title}</Text>
                    <Text style={{fontSize: 16, color: gray}}>{deck.cards.length} {deck.cards.length !== 1 ? 'cards' : 'card'}</Text>
                </View>
                <View style={{marginTop: 40}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            { deckId: deck.id }
                            )}>
                        <Text style={[styles.button, {color: black, borderColor: black, borderWidth: 1}]}>Add Card</Text>
                    </TouchableOpacity>
                    { deck.cards.length > 0 && (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'Quiz',
                                { deckId: deck.id }
                                )}>
                            <Text style={[styles.button, {backgroundColor: black, color: white}]}>Start Quiz</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }
}
function mapStateToProps(decks, {navigation}) {
    const { deckId } = navigation.state.params
    return {
        deck: decks.find(d => d.id === deckId)
    }
}
export default connect(mapStateToProps)(DeckDetail);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
      justifyContent: 'center',
    },
    button: {
        borderRadius: Platform.OS === 'ios' ? 6 : 2,
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
  })