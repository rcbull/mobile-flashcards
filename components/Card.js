import React from 'react'
import { Button, View, Text } from 'react-native'

class CardScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>CardScreen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        )
    }
}

export default CardScreen
