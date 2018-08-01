import { AsyncStorage } from 'react-native'

// key to save decks in storage
const STORAGE_KEY = 'MobileFlashcards:deck'

export const getDecks = async () =>
    await AsyncStorage.getItem(STORAGE_KEY)
        .then(results => {
            // mock data to first deck
            const initialData = {
                1: {
                    title: 'My First Deck - React',
                    questions: [
                        {
                            question: 'What is React?',
                            answer: 'A great library to development UI'
                        }
                    ]
                }
            }

            // using mock data, if not exist decks in storage
            if (results === null) {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
            }

            return results === null ? initialData : JSON.parse(results)
        })
        .catch(error => console.log(error))

export const saveDeck = async (deck, key) => {
    await AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({
            [key]: deck
        })
    ).catch(error => console.log(error))
}

export const deleteDeck = async key => {
    await AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({
            [key]: deck
        })
    ).catch(error => console.log(error))
}

export function arrayToObject(arr, key) {
    return arr.reduce(function(map, obj) {
        map[obj[key]] = obj
        return map
    }, {})
}

export function mergeArrays(arrays, prop) {
    const merged = {}

    arrays.forEach(arr => {
        arr.forEach(item => {
            merged[item[prop]] = Object.assign({}, merged[item[prop]], item)
        })
    })

    return Object.values(merged)
}
