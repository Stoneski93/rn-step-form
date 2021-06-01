import React from "react";
import { Formik } from "formik";
import Input from "../components/Input";
import NavigationButtons from "../components/NavigationButtons";
import { validationSchema } from "./consts";
import { FormFields, Steps } from "./enums";
import { useStepForm } from "./hooks";
import { Text, View } from "react-native";

export const Form = () => {
  const { formProps, step, steps, isFirstStep, isLastStep, handleBack } =
    useStepForm();

  return (
    <Formik {...formProps}>
      {() => (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: 30,
            }}
          >
            {steps.map(({ isValid }, index) => (
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderWidth: 3,
                  borderRadius: 30,
                  borderColor: isValid ? "black" : "red",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: step === index + 1 ? "#bafffc" : "white",
                }}
              >
                <Text>{index + 1}</Text>
              </View>
            ))}
          </View>
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
          <NavigationButtons<FormValues>
            isPrev={!isFirstStep()}
            isLastStep={isLastStep()}
            onBackPress={handleBack}
            schema={validationSchema[step]}
          />
        </>
      )}
    </Formik>
  );
};
