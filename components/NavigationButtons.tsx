import { useFormikContext, yupToFormErrors } from "formik";
import React from "react";
import { Button, View } from "react-native";
import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";

interface INavigationButtons {
  isPrev: boolean;
  isLastStep: boolean;
  schema: OptionalObjectSchema<{}, Record<string, any>, TypeOfShape<{}>>;
  onBackPress: () => void;
}

export const NavigationButtons = <T extends any>({
  isPrev,
  isLastStep,
  schema,
  onBackPress,
}: INavigationButtons) => {
  const { isValid, isSubmitting, handleSubmit, values, setErrors } =
    useFormikContext<T>();

  const isDisabled = !isValid || isSubmitting;

  const onPress = async () => {
    try {
      await schema.validate(values, { abortEarly: false });
      handleSubmit();
    } catch (error) {
      setErrors(yupToFormErrors(error));
    }
  };

  return (
    <View>
      {isPrev && (
        <Button
          title="Go back"
          onPress={() => {
            setErrors({});
            onBackPress();
          }}
        />
      )}
      <Button
        title={!isLastStep ? "Next" : "Submit"}
        onPress={onPress}
        disabled={isDisabled}
      />
    </View>
  );
};

export default NavigationButtons;
