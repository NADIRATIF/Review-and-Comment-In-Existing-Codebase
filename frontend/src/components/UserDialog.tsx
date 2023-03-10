import React, { useMemo, FC } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import {createUser, updateUser} from "../apis/user.api";
import {IUser, ICreateUser} from "../shared/types";

/**
 * validationSchema is a Yup schema that is used to validate the form
 */
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required."),
  lastName: Yup.string().required("last name is required."),
  email: Yup.string().required("Email is required.").email("Invalid email"),
});

/**
 * UserDialogProps is the type of the props
 */
type UserDialogProps = {
  user: IUser | null,
  open: boolean,
  onClose: () => void,
}

/**
 * UserDialog component is used to create and update user
 * @param user
 * @param open
 * @param onClose
 * @constructor
 */
export const UserDialog: FC<UserDialogProps> = (
  {
    user,
    open,
    onClose,
  }) => {

  /**
   * title is the title of the dialog
   */
  const title = useMemo<string>(() => {
    return user ? "Edit User" : "Create User";
  }, [user]);

  /**
   * initialValues is the initial values of the form
   */
  const initialValues = useMemo(() => ({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
  }), [user]);

  /**
   * handleSubmit is the handler of the form submit
   * @param values
   */
  const handleSubmit = (values: ICreateUser) => {
    if (user) {
      updateUser(user._id, values).then(() => {
        onClose();
      });
    } else {
      createUser(values).then(() => {
        onClose();
      });
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
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
              <Form
                onSubmit={handleSubmit}
              >
                <Box display="grid" gap={2}>
                  <TextField
                    name="firstName"
                    placeholder="First Name"
                    size="small"
                    value={values.firstName}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    onChange={handleChange}
                  />
                  <TextField
                    name="lastName"
                    placeholder="Last Name"
                    size="small"
                    value={values.lastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    onChange={handleChange}
                  />
                  <TextField
                    name="email"
                    placeholder="Email"
                    size="small"
                    value={values.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    onChange={handleChange}
                  />
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    color="warning"
                    variant="outlined"
                    size="small"
                    sx={{
                      mr: 1
                    }}
                    onClick={() => onClose()}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                  >
                    {user? "Edit" : "Create"}
                  </Button>
                </Box>
              </Form>
            )
          }
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
