import React from 'react'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    Button
} from 'react-native'
import { connect } from 'react-redux'
import * as DeckActions from '../actions/deck'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    deckList: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 100
    },
    deckStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        backgroundColor: '#dff2f7',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    deck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 65
    },
    title: {
        fontSize: 22,
        textAlign: 'center'
    },
    cardCount: {
        fontSize: 14,
        color: '#106fb6'
    }
})

class Home extends React.Component {
    state = {
        ready: false,
        refreshing: false
    }

    _onRefresh() {
        this.setState({ refreshing: true })
        this.props.getDecks().then(() => {
            this.setState({ refreshing: false, ready: true })
        })
    }

    componentDidMount() {
        this.props.getDecks().then(() => {
            this.setState({ ready: true })
        })
    }

    update = e => {
        this.props.getDecks().then(() => {
            this.setState({ ready: true })
        })
    }

    render() {
        const { decks } = this.props
        // console.log('render', decks)

        let flattenData
        if (decks) {
            flattenData = Object.keys(decks).map(id => {
                return {
                    key: id,
                    title: decks[id].title,
                    cardCount: decks[id].questions.length
                }
            })
        }
        return (
            <View>
                <View style={styles.deckList}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this._onRefresh()}
                            />
                        }
                        data={flattenData}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'DeckDetail',
                                            {
                                                deckId: item.key
                                            }
                                        )
                                    }
                                >
                                    <View style={styles.deckStyle}>
                                        <View style={styles.deck}>
                                            <Text style={styles.title}>
                                                {item.title}
                                            </Text>
                                            <Text style={styles.cardCount}>
                                                {item.cardCount} cards
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <Button onPress={this.update} title="Update list" />
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
        getDecks: () => dispatch(DeckActions.getDecks())
    }
}

Home.propTypes = {
    decks: PropTypes.object,
    getDecks: PropTypes.func
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
