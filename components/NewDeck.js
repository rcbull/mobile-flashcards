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
        marginBottom: 100,
        height: 300
    },
    newDeckContainer: {
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
        fontSize: 30,
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
        fontSize: 16,
        lineHeight: 20,
        height: 40
    }
})

class NewDeckScreen extends React.Component {
    state = {
        title: ''
    }

    handleCreateNewDeck = e => {
        e.preventDefault()

        const newDeck = {
            key: uuidv1(),
            entry: {
                title: this.state.title,
                questions: []
            }
        }

        this.props
            .addDeck(newDeck.entry, newDeck.key)
            .then(this.props.getDecks())

        this.setState({ title: '' })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.newDeckContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>Deck title:</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Deck title"
                            value={this.state.title}
                            onChangeText={title => this.setState({ title })}
                        />
                    </View>

                    <View>
                        <Button
                            title="Create Deck"
                            color="#4d4dff"
                            disabled={this.state.title.length ? false : true}
                            onPress={this.handleCreateNewDeck}
                        />
                    </View>
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
)(NewDeckScreen)
