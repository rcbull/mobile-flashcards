import React from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import Home from './components/Home'
import DetailsScreen from './components/DeckDetail'
import NewDeckScreen from './components/NewDeck'
import NewCardScreen from './components/NewCard'
import QuizScreen from './components/Quiz'
import * as Api from './utils/api'
import { setLocalNotification } from './utils/notification'
import {
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation'
import store from './utils/store'

const HomeStack = createStackNavigator({
    Home: Home,
    NewDeck: NewDeckScreen,
    DeckDetail: DetailsScreen,
    Quiz: QuizScreen,
    NewCard: NewCardScreen
})

const Navigation = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                title: 'Decks'
            }
        },
        NewDeck: {
            screen: NewDeckScreen,
            navigationOptions: {
                title: 'Add deck'
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            labelStyle: {
                fontSize: 18
            },
            style: {
                backgroundColor: '#cccccc',
                justifyContent: 'center',
                alignItems: 'center'
            }
        },
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false
    }
)

export default class App extends React.Component {
    componentDidMount() {
        //setting local notification - see file in utils/notifications.js
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <Navigation />
                </View>
            </Provider>
        )
    }
}
