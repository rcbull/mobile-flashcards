import React from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'
import { connect } from 'react-redux'

const style = StyleSheet.create({
    deckStyle: {
        flex: 1,
        justifyContent: 'space-around'
    },
    deckContainer: {
        flex: 1,
        height: 300,
        justifyContent: 'space-around'
    },
    startQuizContainer: {
        flex: 1,
        justifyContent: 'space-around',
        height: 80
    },
    titleContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 30,
        textAlign: 'center'
    },
    cardCountStyle: {
        fontSize: 16,
        color: '#757575'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quizButton: {
        backgroundColor: '#007aff',
        borderColor: '#007aff'
    },
    buttonText: {
        color: '#fff'
    },
    noCardsText: {
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#757575'
    }
})

class DeckDetail extends React.Component {
    render() {
        // console.log(this.props)
        const { deckId, deckTitle } = this.props.navigation.state.params
        const deck = this.props.decks[deckId]

        return (
            <View style={style.deckStyle}>
                <Text>Deck Detail</Text>
                <Text>{deckId}</Text>
                <Text>{deckTitle}</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckDetail)
