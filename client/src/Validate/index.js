import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema = yup.object().shape({
  Email: yup.string().email("Please enter a valid email").required("*Required"),
  Password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Password must contain at least 5 characters, including one uppercase letter, one lowercase letter, and one numeric digit" })
    .required("Password is required"),

});

export const signupSchema = yup.object().shape({
    Name: yup.string().min(3, "Username must be at least 3 characters long").required("*Required"),
    Email: yup.string().email("Please enter a valid email").required("*Required"),
    Phone: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    Password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .matches(passwordRules, { message: "Password must contain at least 5 characters, including one uppercase letter, one lowercase letter, and one numeric digit" })
      .required("Password is required"),
  });
  

  export const todoSchema = yup.object().shape({
    Title: yup.string().required("*Required"),
    Description: yup
      .string()  
      .required("Description is required"),
  
  });
  