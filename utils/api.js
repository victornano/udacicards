import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

//return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        return results ? JSON.parse(results) : []
    })
    .catch((err) => console.log(err))
}
// take in a single title argument and add it to the decks.
export function saveDeck (title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const newDeck = {
                id: Math.random().toString(36).substr(-8),
                title: title,
                cards: []
            }
            if (results) {
                const data = JSON.parse(results)
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify([...data, newDeck]))
            }
            else {
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify([newDeck]))
            }

        })
        .catch((err) => console.log(err))
}

export function saveCard (deckId, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            const deck = data.find(d => d.id === deckId)
            deck.cards.push(card)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
        .catch((err) => console.log(err))
}
