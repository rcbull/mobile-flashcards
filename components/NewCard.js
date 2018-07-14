import React from 'react'
import { Button, View, Text } from 'react-native'

class NewCardScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>NewCardScreen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        )
    }
}

export default NewCardScreen
