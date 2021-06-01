import * as yup from "yup";
import { FormFields, Steps } from "./enums";

export const validationSchema = [
  yup.object({}),
  yup.object({
    [FormFields.FirstName]: yup.string().required("This field is required"),
  }),
  yup.object({
    [FormFields.ZipCode]: yup.string().required("This field is required"),
  }),
  yup.object({
    [FormFields.Email]: yup.string().required("This field is required"),
  }),
];

export const stepsFields = {
  [Steps.Step1]: [FormFields.FirstName, FormFields.LastName, FormFields.Age],
  [Steps.Step2]: [FormFields.Address, FormFields.City, FormFields.ZipCode],
  [Steps.Step3]: [FormFields.Email, FormFields.Phone],
};
