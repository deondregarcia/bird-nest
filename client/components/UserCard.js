import { View, Text, StyleSheet, Image } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import React from "react";

const UserCard = (props) => {
  return (
    <View style={styles.card}>
      <Image style={styles.userImage} source={props.image} />
      <Header>{props.name}</Header>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    elevation: 2,
    paddingTop: 10,
    width: "100%",
  },
  userImage: {
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    borderRadius: 30,
    width: 350,
    height: 300,
    marginBottom: 20,
  },
});

export default UserCard;
