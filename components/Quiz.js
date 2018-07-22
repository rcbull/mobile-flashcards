import React from 'react'
import { Button, StyleSheet, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import * as deckActions from '../actions/deck'

class QuizScreen extends React.Component {
    state = {
        card: 0,
        score: 0,
        totalCards: 0
    }

    handleCorrectPress = () => {
        this.setState(state => ({
            score: state.score + 1,
            currentCard: state.currentCard + 1
        }))
    }

    handleIncorrectPress = () => {
        this.setState(state => ({ currentCard: state.currentCard + 1 }))
    }

    handleResetPress = () => {
        this.setState({ currentCard: 0, score: 0, cardFlipped: false })
    }

    render() {
        const { deckId } = this.props.navigation.state.params
        const deck = this.props.decks[deckId]
        console.log(deck)

        this.setState({ totalCards: deck.questions.length, card: 1 })

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>QuizScreen</Text>
                <Text>{deck.questions[this.state.card].question}</Text>
                <Text>Answer</Text>
                <Button
                    title="Show answer"
                    onPress={() => this.props.navigation.navigate('NewCard')}
                />
                <Button
                    title="Correct"
                    onPress={() => this.props.navigation.navigate('Quiz')}
                />
                <Button
                    title="Incorrect"
                    onPress={() => this.props.navigation.navigate('Quiz')}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        decks: state.default.decks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDeck: (entry, key) => dispatch(DeckActions.addDeck(entry, key)),
        getDecks: () => dispatch(DeckActions.getDecks())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuizScreen)
