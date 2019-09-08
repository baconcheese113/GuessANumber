import React from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

export default function StartGameScreen(props) {
  const { onStartGame } = props;
  const [enteredValue, setEnteredValue] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = React.useState(0);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (!chosenNumber || chosenNumber < 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to e a number between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler }
      ]);
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(chosenNumber);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            value={enteredValue}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} color={colors.accent} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmHandler} color={colors.primary} />
            </View>
          </View>
        </Card>
        {confirmed && (
          <Card style={styles.chosenNumberContainer}>
            <BodyText>Chosen Number:</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => onStartGame(selectedNumber)}>START GAME</MainButton>
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: Dimensions.get("window").width / 3.5,
    maxWidth: 100
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  chosenNumberContainer: {
    margin: 50,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
