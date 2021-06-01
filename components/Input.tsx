import React from "react";
import { useField } from "formik";
import { Text, TextInput, StyleSheet, View } from "react-native";

interface IInupt {
  fieldName: string;
  label: string;
}

export const Input: React.FC<IInupt> = ({ fieldName, label, ...props }) => {
  const [field, meta, helpers] = useField(fieldName);
  const { value, onBlur, onChange } = field;
  const { setError, setTouched } = helpers;
  const { error } = meta;

  console.log({ error, fieldName });

  return (
    <View
      style={{ alignItems: "flex-start", width: "100%", marginVertical: 5 }}
    >
      <Text style={{ color: error ? "red" : "black" }}>{label}</Text>
      <TextInput
        {...props}
        value={value}
        onBlur={(event) => {
          setTouched(true, false);
          onBlur(fieldName);
        }}
        onChangeText={onChange(fieldName)}
        onSubmitEditing={onBlur(fieldName)}
        style={{
          ...styles.input,
          color: error ? "red" : "black",
          borderColor: error ? "red" : "black",
        }}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    marginVertical: 5,
    borderWidth: 1,
    padding: 5,
  },
});

export default Input;
