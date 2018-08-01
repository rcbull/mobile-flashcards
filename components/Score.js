import React from 'react'
import { Button, StyleSheet, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    scoreStyle: {
        fontSize: 26,
        textAlign: 'center'
    }
})

class ScoreScreen extends React.Component {
    render() {
        const { deckId, score } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.scoreStyle}>Your Score is {score}</Text>
                <Button
                    title="Restart Quiz"
                    onPress={() =>
                        this.props.navigation.navigate('Quiz', {
                            deckId: deckId
                        })
                    }
                />

                <Button
                    title="Back to Deck"
                    onPress={() =>
                        this.props.navigation.navigate('DeckDetail', {
                            deckId: deckId
                        })
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        deckId: ownProps.navigation.state.params.deckId,
        score: ownProps.navigation.state.params.score
    }
}

export default connect(mapStateToProps)(ScoreScreen)
