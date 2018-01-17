import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { purple, white, gray, red } from '../utils/colors'
import { addCard} from '../actions'
import { saveCard } from '../utils/api'

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        showRequired: false
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        }
    }
    submitCard = () => {
        const {question, answer} = this.state
        if (question, answer) {
            const {deck} = this.props
            const card = {
                question,
                answer,
            }
            // Redux dispatch
            this.props.dispatch(addCard(deck.id, card))
            // Async Storage
            saveCard(deck.id, card)
            // Clear state
            this.setState(() => ({
                question: '',
                answer: '',
                showRequired: false
            }))
            // Navigate Back
            this.props.navigation.goBack();
        }
        else{
            this.setState(() => ({
                showRequired: true
            }))
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={{fontSize: 16, color: gray, marginBottom: 5}}>Question</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />
                <Text style={{fontSize: 16, color: gray, marginBottom: 5}}>Answer</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                />
                {this.state.showRequired && (<Text style={{fontSize: 16, color: red, marginBottom: 10}}>Both fields are required.</Text>)}
                <TouchableOpacity onPress={this.submitCard}>
                    <Text style={[styles.button, {color: white, backgroundColor: purple}]}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(decks, {navigation}) {
    const { deckId } = navigation.state.params
    return {
        deck: decks.find(d => d.id === deckId)
    }
}

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
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
    input: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginBottom: 15,
        padding: 8,
    }
  })