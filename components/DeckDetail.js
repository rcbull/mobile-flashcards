import React from "react";
import { Button, View, Text } from "react-native";

class DeckDetail extends React.Component {
  render() {
    return (
      <View>
        <Text>Deck Detail</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

export default DeckDetail;
