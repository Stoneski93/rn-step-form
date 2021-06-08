import { useFormikContext } from "formik";
import React from "react";
import { Button, View, StyleSheet } from "react-native";

interface INavigationButtons {
  isPrev: boolean;
  isLastStep: boolean;
  onBackPress: () => void;
}

export const NavigationButtons = ({
  isPrev,
  isLastStep,
  onBackPress,
}: INavigationButtons) => {
  const { isValid, isSubmitting, handleSubmit } = useFormikContext();

  const isDisabled = !isValid || isSubmitting;

  return (
    <View style={styles.container}>
      {isPrev && <Button title="Go back" onPress={onBackPress} />}
      <Button
        title={!isLastStep ? "Next" : "Submit"}
        onPress={() => handleSubmit()}
        disabled={isDisabled}
      />
    </View>
  );
};

export default NavigationButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
