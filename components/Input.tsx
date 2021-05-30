import React from "react";
import { useField } from "formik";
import { Text, TextInput, StyleSheet } from "react-native";

interface IInupt {
  fieldName: string;
  label: string;
}

export const Input: React.FC<IInupt> = ({ fieldName, label, ...props }) => {
  const [field, meta, helpers] = useField(fieldName);
  const { value, onBlur, onChange } = field;
  const { setError, setTouched } = helpers;
  const { error } = meta;

  return (
    <>
      <Text style={{ color: error ? "red" : "black" }}>{label}</Text>
      <TextInput
        {...props}
        value={value}
        onBlur={(event) => {
          setTouched(true, false);
          onBlur(fieldName);
        }}
        onChangeText={onChange(fieldName)}
        onFocus={() => {
          setError(undefined);
        }}
        onSubmitEditing={onBlur(fieldName)}
        style={{
          ...styles.input,
          color: error ? "red" : "black",
          borderColor: error ? "red" : "black",
        }}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
});

export default Input;
