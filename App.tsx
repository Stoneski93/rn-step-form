import { StatusBar } from "expo-status-bar";

import React from "react";
import { StyleSheet, View } from "react-native";

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Form } from "./form";

const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

// mock.onPost("/form").reply(200);
mock.onPost("/form").reply(400, {
  errors: {
    firstName: "Field is required",
    email: "Field is required",
    // zipCode: "Field is required",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Form />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
