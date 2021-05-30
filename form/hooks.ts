import axios from "axios";
import { FormikHelpers } from "formik";
import { useCallback, useMemo, useState } from "react";
import { validationSchema } from "./consts";
import { Steps } from "./enums";

export const useStepForm = () => {
  const [step, setStep] = useState(Steps.Step1);

  const isFirstStep = () => {
    return step === Steps.Step1;
  };

  const isLastStep = () => {
    return step === Steps.Step3;
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
    const { setSubmitting, setErrors } = formikHelpers;

    if (!isLastStep()) {
      setSubmitting(false);
      handleNext();
      return;
    }

    try {
      const response = await axios.post("/form", values);
    } catch (e) {
      setErrors(e.response.data.errors);
    }
    setSubmitting(false);
  };

  const formProps = {
    initialValues: {} as FormValues,
    validationSchema: validationSchema[step],
    onSubmit: handleSubmit,
  };

  return {
    formProps,
    step,
    isFirstStep,
    isLastStep,
    handleBack,
    handleNext,
    handleSubmit,
  };
};
