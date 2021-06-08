import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Formik } from "formik";

import Input from "../components/Input";
import NavigationButtons from "../components/NavigationButtons";
import { FormFields, Status, Steps } from "./enums";
import { useStepForm } from "./hooks";
import StepsBullets from "../components/Steps";

export const Form = () => {
  const { formProps, step, steps, isFirstStep, isLastStep, handleBack } =
    useStepForm();

  return (
    <Formik {...formProps} validateOnChange={false}>
      {({ status }) => {
        return status !== Status.Done ? (
          <>
            <StepsBullets {...{ steps }} activeStep={step} />
            <View style={styles.formContainer}>
              {step === Steps.Step1 && (
                <>
                  <Input fieldName={FormFields.FirstName} label="First name" />
                  <Input fieldName={FormFields.LastName} label="Last name" />
                  <Input fieldName={FormFields.Age} label="Age" />
                </>
              )}
              {step === Steps.Step2 && (
                <>
                  <Input fieldName={FormFields.Address} label="Adress" />
                  <Input fieldName={FormFields.City} label="City" />
                  <Input fieldName={FormFields.ZipCode} label="Zip Code" />
                </>
              )}
              {step === Steps.Step3 && (
                <>
                  <Input fieldName={FormFields.Email} label="Email" />
                  <Input fieldName={FormFields.Phone} label="Phone" />
                </>
              )}
            </View>
            <NavigationButtons
              isPrev={!isFirstStep()}
              isLastStep={isLastStep()}
              onBackPress={handleBack}
            />
          </>
        ) : (
          <Text>Sucessfully</Text>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 30,
  },
  formContainer: {
    width: "100%",
    marginBottom: 30,
    flex: 1,
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
