import React from "react";
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

export default function GameOverScreen(props) {
  const { roundsNumber, userNumber, onRestart } = props;

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/success.png")}
            // source={{ uri: "https://cdn.psychologytoday.com/sites/default/files/blogs/75174/2013/09/134259-134012.jpg" }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number{" "}
            <Text style={styles.highlight}>{userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height * 0.05
  },
  image: {
    width: "100%",
    height: "100%"
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold"
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height * 0.016
  }
});
