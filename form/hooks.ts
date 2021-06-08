import { useCallback, useState } from "react";
import axios from "axios";
import { FormikHelpers } from "formik";
import { validationSchema } from "./consts";
import { Status, Steps } from "./enums";

export const useStepForm = () => {
  const [step, setStep] = useState(Steps.Step1);
  const lastStep = Steps.Step3;
  const steps = [...Array(lastStep).keys()].map((item) => item + 1);

  const isFirstStep = () => {
    return step === Steps.Step1;
  };

  const isLastStep = () => {
    return step === lastStep;
  };

  const handleNext = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step !== 0) {
      setStep(step - 1);
    }
  }, [step]);

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { setSubmitting, setErrors, setStatus } = formikHelpers;

    if (!isLastStep()) {
      setSubmitting(false);
      handleNext();
      return;
    }

    try {
      const response = await axios.post("/form", values);
      setStatus(Status.Done);
    } catch (e) {
      setErrors(e.response.data.errors);
    }
    setSubmitting(false);
  };

  const formProps = {
    initialValues: {} as FormValues,
    initialStatus: Status.Active,
    validationSchema: validationSchema[step],
    onSubmit: handleSubmit,
  };

  return {
    formProps,
    step,
    steps,
    lastStep,
    isFirstStep,
    isLastStep,
    handleBack,
    handleNext,
    handleSubmit,
  };
};
