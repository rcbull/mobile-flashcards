import React from "react";
import { View, Text } from "react-native";
import Home from "./components/Home";
import DetailsScreen from "./components/DeckDetail";
import * as Api from "./utils/api";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

const HomeStack = createStackNavigator({
  Home: Home,
  DeckDetail: DetailsScreen
});

const SettingsStack = createStackNavigator({
  Home: Home,
  DeckDetail: DetailsScreen
});

export default createBottomTabNavigator(
  {
    Home: HomeStack,
    DeckDetail: DetailsScreen
  },
  {}
);
