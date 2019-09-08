import React from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from "react-native";
import { ScreenOrientation } from "expo";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const LOWER = "lower";
const GREATER = "greater";

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <Text>{itemData.item}</Text>
  </View>
);

export default function GameScreen(props) {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);
  const [pastGuesses, setPastGuesses] = React.useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = React.useState(Dimensions.get("window").width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = React.useState(Dimensions.get("window").height);

  const currentLow = React.useRef(1);
  const currentHigh = React.useRef(100);

  React.useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  React.useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const nextGuessHandler = direction => {
    if ((direction === LOWER && currentGuess < userChoice) || (direction === GREATER && currentGuess > userChoice)) {
      Alert.alert("Don't Lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
      return;
    }
    if (direction === LOWER) {
      currentHigh.current = currentGuess;
    } else if (direction === GREATER) {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(prevGuesses => [nextNumber.toString(), ...prevGuesses]);
  };

  const listContainerStyle = availableDeviceWidth < 350 ? styles.listContainerBig : styles.listContainer;

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler(LOWER)}>
            <Ionicons name="md-remove" size={24} color="#fff" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler(GREATER)}>
            <Ionicons name="md-add" size={24} color="#fff" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, idx) => renderListItem(guess, pastGuesses.length - idx))}
        </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler(LOWER)}>
          <Ionicons name="md-remove" size={24} color="#fff" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler(GREATER)}>
          <Ionicons name="md-add" size={24} color="#fff" />
        </MainButton>
      </Card>
      <View style={styles.listContainerBig}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, idx) => renderListItem(guess, pastGuesses.length - idx))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%"
  },
  listItem: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    width: "100%"
  },
  listContainer: {
    flex: 1,
    width: "60%"
  },
  listContainerBig: {
    flex: 1,
    width: "80%"
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end"
  }
});
