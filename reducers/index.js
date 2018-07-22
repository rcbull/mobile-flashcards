import { combineReducers } from 'redux'
import * as DeckActions from '../actions/deck'
import * as Api from '../utils/api'

const initial = {
    decks: null,
    questions: null,
    deck: null
}

function decks(state = initial, action) {
    switch (action.type) {
        case DeckActions.RECEIVED_DECKS:
            //console.log('RECEIVE_DECKS', action)
            return {
                ...state,
                decks: action.decks
            }
        case DeckActions.SAVED_DECK:
            //console.log('SAVE_DECK', state.decks)
            const decks = Object.assign(state.decks, action.deck)
            return {
                ...state,
                decks: decks
            }
        case DeckActions.DELETED_DECK:
            console.log('DELETED_DECK', action)
            return {
                ...state,
                decks: state.decks.filter(item => item.key !== action.key),
                deck: null
            }
        default:
            return state
    }
}

export default decks
