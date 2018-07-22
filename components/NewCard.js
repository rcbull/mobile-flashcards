import React from 'react'
import { Button, StyleSheet, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import * as DeckActions from '../actions/deck'
import uuidv1 from 'uuid/v1'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 150,
        height: 300
    },
    createDeckContainer: {
        flex: 1,
        justifyContent: 'space-around',
        height: 300
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 26,
        lineHeight: 50,
        textAlign: 'center'
    },
    deckTitleStyle: {
        fontSize: 22,
        lineHeight: 50,
        textAlign: 'center'
    },
    inputContainer: {
        flex: 1
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 40
    },
    buttonContainer: {
        height: 50
    }
})

class NewCardScreen extends React.Component {
    state = {
        question: '',
        answer: ''
    }

    handleCreateNewCard = e => {
        e.preventDefault()
        const { navigation } = this.props

        const newCard = {
            question: this.state.question,
            answer: this.state.answer
        }

        const { deckId } = this.props.navigation.state.params
        const deck = this.props.decks[deckId]
        deck.questions.push(newCard)

        this.props.addDeck(deck, deckId).then(this.props.getDecks())
        this.setState({ question: '', answer: '' })
    }

    render() {
        const { deckId } = this.props.navigation.state.params
        const deck = this.props.decks[deckId]

        return (
            <View style={styles.container}>
                <View style={styles.createDeckContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>
                            Add a new card to deck:
                        </Text>
                        <Text style={styles.deckTitleStyle}>{deck.title}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Question"
                            value={this.state.question}
                            onChangeText={question =>
                                this.setState({ question })
                            }
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Answer"
                            value={this.state.answer}
                            onChangeText={answer => this.setState({ answer })}
                        />
                    </View>
                    <Button title="Send" onPress={this.handleCreateNewCard} />
                </View>
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
)(NewCardScreen)
