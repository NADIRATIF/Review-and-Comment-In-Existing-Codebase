import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import {
  AccountCircleOutlined,
  ArrowBack,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

import { CustomForm } from "../../../components/Common";

import { createUser } from "../../../apis/user.api";
import { ICreateUser } from "../../../shared/types";

/**
 * SignUp page
 * @returns {JSX.Element}
 */
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required."),
  lastName: Yup.string().required("last name is required."),
  email: Yup.string().required("Username is required.").email('Invalid email'),
  password: Yup.string().required("Password is required.").min(5)
});

const SIgnUpPage: React.FC = () => {
  /**
   * state to handle password visibility
   */
  const [passwordVisible, setPasswordVisible] = useState(false);

  /**
   * function to handle form submission
   */
  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };
  /**
   * function to be called when the form is submitted
   * @param values
   */
  const handleSubmit = (values: ICreateUser) => {
    createUser(values).then();
  }

  return (
    <Box
      p={4}
      width={400}
      marginX='auto'
      borderRadius={2}
      sx={{
        backgroundColor: '#FFF'
      }}
    >
      <Typography variant="h4">Sign Up</Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {
          ({
             handleSubmit,
             handleChange,
             values,
             errors
           }) => (
            <CustomForm
              sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              className="form-area"
              onSubmit={handleSubmit}
            >
              <Box display='grid' gap={2}>
                <TextField
                  name="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  onChange={handleChange}
                />
                <TextField
                  name="lastName"
                  placeholder="Last Name"
                  value={values.lastName}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  onChange={handleChange}
                />
                <TextField
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircleOutlined/>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={values.password}
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisible}
                          edge="end"
                        >
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              <Box mt={2} display='flex' justifyContent='space-between'>
                <NavLink to="/auth/sign-in">
                  <Button
                    variant="text"
                    startIcon={<ArrowBack />}
                  >
                    Sign In
                  </Button>
                </NavLink>
                <Button
                  variant="contained"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Box>
            </CustomForm>
          )
        }
      </Formik>
    </Box>
  )
}

export default SIgnUpPage;
