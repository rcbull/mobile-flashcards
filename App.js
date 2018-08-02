import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { Navigation } from './utils/navigations'
import { setLocalNotification } from './utils/notification'
import store from './utils/store'

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
