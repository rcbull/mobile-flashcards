import React from 'react'
import { Button, StyleSheet, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import * as deckActions from '../actions/deck'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'ghostwhite',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    box: {
        width: 100,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'darkslategray'
    },
    title: {
        color: 'darkslategray',
        fontWeight: 'bold',
        fontSize: 14
    },
    question: {
        color: 'darkslategray',
        fontWeight: 'bold',
        fontSize: 18
    }
})

class QuizScreen extends React.Component {
    state = {
        score: 0,
        showQuestion: true,
        card: 0
    }

    handleCorrectPress = () => {
        const { card } = this.state
        const { totalCards } = this.props
        if (card < totalCards) {
            this.setState(state => ({
                score: state.score + 1,
                card: state.card + 1
            }))
        }
    }

    handleIncorrectPress = () => {
        const { card } = this.state
        const { totalCards } = this.props
        if (card < totalCards) {
            this.setState(state => ({ card: state.card + 1 }))
        }
    }

    handleQuestionOrAnswer = () => {
        this.setState(() => {
            if (this.state.showQuestion === true) {
                return { showQuestion: false }
            } else {
                return { showQuestion: true }
            }
        })
    }

    handleResetPress = () => {
        this.setState({
            score: 0,
            showQuestion: true,
            card: 0
        })
    }

    render() {
        const { score, card, showQuestion } = this.state
        const { deck, totalCards, deckId } = this.props

        //console.log(card, totalCards, deckId, score)

        //navigate to score, if last card
        if (card == totalCards) {
            this.props.navigation.navigate('Score', {
                score: score,
                deckId: deckId
            })
            this.setState({
                score: 0,
                showQuestion: true,
                card: 0
            })
        }

        return card < totalCards ? (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Answer {card + 1} of {totalCards}
                </Text>
                <Text style={styles.question}>
                    {showQuestion === true
                        ? deck.questions[card].question
                        : deck.questions[card].answer}
                </Text>
                <Button
                    title={
                        showQuestion === true ? 'SHOW ANSWER' : 'SHOW QUESTION'
                    }
                    onPress={this.handleQuestionOrAnswer}
                />
                <Button title="Correct" onPress={this.handleCorrectPress} />
                <Button title="Incorrect" onPress={this.handleIncorrectPress} />
            </View>
        ) : (
            <View />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    deck = state.default.decks[ownProps.navigation.state.params.deckId]
    return {
        deckId: ownProps.navigation.state.params.deckId,
        decks: state.default.decks,
        deck: deck,
        totalCards: deck.questions.length > 0 ? deck.questions.length : 0
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
