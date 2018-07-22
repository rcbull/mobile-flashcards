export const RECEIVED_DECKS = 'RECEIVED_DECKS'
export const SAVED_DECK = 'SAVED_DECK'
export const DELETED_DECK = 'DELETED_DECK'
import * as Api from '../utils/api'

export function receivedDecks(decks) {
    return {
        type: RECEIVED_DECKS,
        decks
    }
}

export function savedDeck(deck) {
    return {
        type: SAVED_DECK,
        deck
    }
}

export function deletedDeck(deck) {
    return {
        type: DELETED_DECK,
        deck
    }
}

export function getDecks() {
    return dispatch => {
        return Api.getDecks()
            .then(data => {
                dispatch(receivedDecks(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function addDeck(deck, key) {
    return dispatch => {
        return Api.saveDeck(deck, key)
            .then(() => {
                dispatch(savedDeck({ [key]: deck }))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function deleteDeck(deck, key) {
    return dispatch => {
        return Api.deleteDeck(deck, key)
            .then(() => {
                dispatch(deletedDeck({ [key]: deck }))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
