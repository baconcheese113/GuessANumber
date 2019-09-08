import React from "react";
import { View, StyleSheet } from "react-native";
import TitleText from "./TitleText";

export default function Header(props) {
  const { title } = props;

  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#f7287b",
    alignItems: "center",
    justifyContent: "center"
  }
});
