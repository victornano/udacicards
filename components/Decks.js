import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'

import { receiveDecks } from '../actions'
import { purple, white, gray } from '../utils/colors'
import { getDecks } from '../utils/api'

class Decks extends Component {
    state = {
        ready: false,
    }
    componentDidMount () {
        const { dispatch } = this.props
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }
    render() {
        const {decks} = this.props
        if (this.state.ready === false) {
            return <AppLoading />
        }
        return (
        <View style={{flex: 1}} >
            { decks.length === 0 ? (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('NewDeck') }}>
                        <Text style={{color: purple, fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Create My First Deck</Text>
                    </TouchableOpacity>
                </View>
            )
            :(
                <FlatList style={{paddingBottom: 15}}
                    data={decks}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate(
                                'DeckDetail',
                                { deckId: item.id, title: item.title }
                                )}
                            >
                                <View style={styles.item}>
                                    <Text style={{color: purple, fontSize: 25}}>{item.title}</Text>
                                    <Text style={{fontSize: 16, color: gray}}>{item.cards.length} {item.cards.length !== 1 ? 'cards' : 'card'}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index}
                />
            )}
        </View>
        );
    }
}

function mapStateToProps (decks) {
    return {
      decks
    }
  }

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    }
})