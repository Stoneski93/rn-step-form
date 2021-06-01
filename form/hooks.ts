import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FormikHelpers } from "formik";
import { stepsFields, validationSchema } from "./consts";
import { Steps } from "./enums";

export const useStepForm = () => {
  const [step, setStep] = useState(Steps.Step1);
  const [steps, setSteps] = useState<{ isValid: boolean }[]>([]);
  const lastStep = Steps.Step3;

  useEffect(() => {
    setSteps([...Array(lastStep).keys()].map(() => ({ isValid: true })));
  }, []);

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
    const { setSubmitting, setErrors } = formikHelpers;

    if (!isLastStep()) {
      setSubmitting(false);
      handleNext();
      return;
    }

    try {
      const response = await axios.post("/form", values);
    } catch (e) {
      const errorsSteps = Object.keys(e.response.data.errors).map((error) => {
        const invalidStep = Object.entries(stepsFields).reduce(
          (result, [currentStep, currentStepFields]) => {
            const isStepContainError = !!currentStepFields.find(
              (field) => field === error
            );
            if (isStepContainError) {
              return result > +currentStep ? +currentStep : result;
            }
            return result;
          },
          Object.keys(stepsFields).length
        );
        return invalidStep;
      });
      const newSteps = steps.map((item, index) => {
        if (errorsSteps.find((i) => i === index + 1)) {
          return { isValid: false };
        }
        return item;
      });
      setSteps(newSteps);
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
    steps,
    lastStep,
    isFirstStep,
    isLastStep,
    handleBack,
    handleNext,
    handleSubmit,
  };
};
