import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation'
import Home from '../components/Home'
import DetailsScreen from '../components/DeckDetail'
import NewDeckScreen from '../components/NewDeck'
import NewCardScreen from '../components/NewCard'
import QuizScreen from '../components/Quiz'
import ScoreScreen from '../components/Score'

const HomeStack = createStackNavigator({
    Home: Home,
    NewDeck: NewDeckScreen,
    DeckDetail: DetailsScreen,
    Quiz: QuizScreen,
    NewCard: NewCardScreen,
    Score: ScoreScreen
})

export const Navigation = createBottomTabNavigator(
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
