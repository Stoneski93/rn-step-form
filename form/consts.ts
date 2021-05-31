import * as yup from "yup";
import { FormFields } from "./enums";

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
