import React, {useContext, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import {
  AccountCircleOutlined,
  ArrowForward,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

import {CustomForm} from "../../../components/Common";

import {signIn} from "../../../apis/user.api";
import {AppStoreContext} from "../../../contexts/AppStoreContext";
import {IContextActionType, ISignInUser} from "../../../shared/types";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required.").email('Invalid email'),
  password: Yup.string().required("Password is required.").min(5)
});

const SIgnInPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { dispatch } = useContext(AppStoreContext);

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (values: ISignInUser) => {
    signIn(values).then(res => {
      localStorage.setItem('token', res.token);
      dispatch({
        type: IContextActionType.SET_USER,
        payload: res.user
      });
      navigate('/dashboard')
    });
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
      <Typography variant="h4">Sign In</Typography>
      <Formik
        initialValues={{
          email: "",
          password: ""
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
              <FormControl>
                <TextField
                  id="username-input"
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
              </FormControl>
              <FormControl sx={{ my: 4}}>
                <TextField
                  id="user-password"
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
              </FormControl>
              <Box display='flex' justifyContent='space-between'>
                <NavLink to="/auth/sign-up">
                  <Button
                    variant="text"
                    endIcon={<ArrowForward />}
                  >
                    Sign Up
                  </Button>
                </NavLink>
                <Button
                  variant="contained"
                  type="submit"
                >
                  Sign In
                </Button>
              </Box>
            </CustomForm>
          )
        }
      </Formik>
    </Box>
  )
}

export default SIgnInPage;
