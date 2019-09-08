import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import TitleText from "./TitleText";
import colors from "../constants/colors";

export default function Header(props) {
  const { title } = props;

  return (
    <View style={{ ...styles.header, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: Platform.OS === "ios" ? colors.primary : "#fff"
  },
  headerIOS: {
    backgroundColor: colors.primary,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: colors.accent,
    borderBottomColor: "transparent",
    borderBottomWidth: 0
  }
});
