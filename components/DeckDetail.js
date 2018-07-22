import React from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    deckStyle: {
        flex: 1,
        justifyContent: 'space-around'
    },
    titleStyle: {
        fontSize: 22,
        textAlign: 'center'
    },
    cardCountStyle: {
        fontSize: 14,
        color: '#106fb6'
    }
})

class DeckDetail extends React.Component {
    render() {
        const { deckId } = this.props.navigation.state.params
        const deck = this.props.decks[deckId]

        let startQuizButton = true
        if (deck.questions.length > 0) {
            startQuizButton = false
        }

        return (
            <View style={styles.deckStyle}>
                <Text style={styles.titleStyle}>{deck.title}</Text>
                <Text style={styles.titleStyle}>
                    {deck.questions.length} cards
                </Text>
                <Button
                    title="Create New Question"
                    onPress={() =>
                        this.props.navigation.navigate('NewCard', {
                            deckId: deckId
                        })
                    }
                />
                <Button
                    title="Start a Quiz"
                    disabled={startQuizButton}
                    onPress={() =>
                        this.props.navigation.navigate('Quiz', {
                            deckId: deckId
                        })
                    }
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state.default.decks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDecks: () => dispatch(DeckActions.getDecks())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckDetail)
