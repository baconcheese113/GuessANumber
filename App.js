import React from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [userNumber, setUserNumber] = React.useState();
  const [guessRounds, setGuessRounds] = React.useState(0);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  const configureNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const getScreen = () => {
    if (guessRounds > 0)
      return <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />;
    if (userNumber) return <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
    return <StartGameScreen onStartGame={startGameHandler} />;
  };

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={err => console.log(err)} />
    );
  } else {
    return (
      <View style={styles.screen}>
        <Header title="Guess a Number" />
        {getScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: "100%"
  }
});
