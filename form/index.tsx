import React from "react";
import { Formik } from "formik";
import Input from "../components/Input";
import NavigationButtons from "../components/NavigationButtons";
import { validationSchema } from "./consts";
import { FormFields, Steps } from "./enums";
import { useStepForm } from "./hooks";

export const Form = () => {
  const { formProps, step, isFirstStep, isLastStep, handleBack } =
    useStepForm();

  return (
    <Formik {...formProps}>
      {() => (
        <>
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
