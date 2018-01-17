import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { purple, white, gray, red } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'

class NewDeck extends Component {
    state = {
        title: '',
        showRequired: false
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'New deck'
        }
    }
    submitDeck = () => {
        const {title} = this.state
        if (title) {
            const id = Math.random().toString(36).substr(-8)
            // Redux dispatch
            this.props.dispatch(addDeck(id, title))
            // Async Storage
            saveDeck(id, title)
            // Clear state
            this.setState(() => ({
                title: '',
                showRequired: false
            }))
            // Navigate Back
            this.props.navigation.navigate('DeckDetail',{ deckId: id, title })
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
                <Text style={{fontSize: 25, color: gray, marginBottom: 10, textAlign: 'center'}}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                />
                {this.state.showRequired && (<Text style={{fontSize: 16, color: red, marginBottom: 10}}>Please enter a title for your deck.</Text>)}
                <TouchableOpacity onPress={this.submitDeck}>
                    <Text style={[styles.button, {color: white, backgroundColor: purple}]}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

export default connect()(NewDeck);

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