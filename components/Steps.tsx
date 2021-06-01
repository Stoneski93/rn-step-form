import { useFormikContext } from "formik";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { stepsFields } from "../form/consts";
import { Steps } from "../form/enums";

interface IStepsBullets {
  steps: Steps[];
  activeStep: Steps;
}

export const StepsBullets: React.FC<IStepsBullets> = ({
  steps,
  activeStep,
}) => {
  const { errors } = useFormikContext();
  return (
    <View style={styles.stepsContainer}>
      {steps.map((step) => {
        const isInvalid = stepsFields[step].find(
          (step) => !!Object.keys(errors).find((error) => step === error)
        );
        return (
          <View
            key={step}
            style={{
              ...styles.dot,
              borderColor: isInvalid ? "red" : "black",
              backgroundColor: activeStep === step ? "#bafffc" : "white",
            }}
          >
            <Text>{step}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 30,
  },
  dot: {
    height: 50,
    width: 50,
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StepsBullets;
