import React from "react";
import { Button, View, Text } from "react-native";

class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Deck"
          onPress={() => this.props.navigation.navigate("DeckDetail")}
        />
      </View>
    );
  }
}

export default Home;
