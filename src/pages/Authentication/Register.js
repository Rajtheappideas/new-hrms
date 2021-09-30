import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import "react-toastify/dist/ReactToastify.min.css"

import { useHistory } from "react-router"
import axios from "axios"
// material ui
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core"
import Container from "@material-ui/core/Container"

// reacticons
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri"
import { FiUserPlus } from "react-icons/fi"
// react toastify
import { toast, ToastContainer } from "react-toastify"

// Formik
import { FormikProvider, Form, useFormik } from "formik"

// yup
import * as yup from "yup"

// action
import { registerUser, apiError, registerUserFailed } from "../../store/actions"

// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// import images
import logoSm from "../../assets/images/logo-sm.png"

// phone validation
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Register = props => {
  const [showPassword, setshowPassword] = useState(false)
  
  const navigate = useHistory()
  // yup validation
  const RegistrationSchema = yup.object().shape({
    username: yup
      .string()
      .required("username is Required!")
      .min(2, "Too short!")
      .max(50, "Too Long!"),
    email: yup.string().email().required("Email is Required!"),
    designation: yup.string().required("Designation is Required!"),
    phone: yup
      .string()
      .min(10, "At least 10 digit required!")
      .max(10, "At least 10 digit required!")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone Number is Required!"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  })

  // formik values
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      designation: "",
      phone: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: async values => {
      const user = {
        email: values.email,
        password: values.password,
        username: values.username,
        phone: values.phone,
        designation: values.designation,
      }
      // ---------for heroku------------
      
      // await fetch("https://hrms-tai.herokuapp.com/register", {
      //   method: "POST",
      //   body: JSON.stringify(user),
      //   headers: {
      //     "access-control-allow-origin" : "*",
      //     "Content-type": "application/json;charset=UTF-8",
      //   },
      // })
      //   .then(response => {
      //     console.log(response.json())
      //   })
      //   .catch(err => console.log(err))
      //--------------------------fro json-----------------
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(response => {
          console.log("at jasonplacehplder", response.json())
        })

        .catch(err => console.log(err))
      toast.success("Sign up successfully")
      resetForm()
      // console.log(user)
      return user
    },
  })

  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   console.log(event);
  //   props.loginUser(values, props.history)
  // }

  const {
    errors,
    touched,
    resetForm,
    handleSubmit,
    isSubmitting,
    getFieldProps,
  } = formik

  const containerStyle = {
    padding: "30px 20px",
    width: 400,
    margin: "20px auto",
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Sign Up</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div>
      <ToastContainer position="top-center" />
      <Grid>
        <div className="account-pages pt-sm-5">
          <Container style={containerStyle} component="main">
            <Card className="overflow-hidden">
              <div className="bg-primary">
                <div className="text-primary text-center p-4">
                  <h5 className="text-white font-size-20">
                    <FiUserPlus size={30} /> <br />
                    Sign Up
                  </h5>
                  <div className="logo logo-admin">
                    <img src={logoSm} height="24" alt="logo" />
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="p-3">
                  <FormikProvider value={formik} className="mt-4">
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      <TextField
                        required
                        fullWidth
                        autoComplete="username"
                        className="mb-3"
                        id="username"
                        name="username"
                        label="username"
                        type="text"
                        {...getFieldProps("username")}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                      />
                      <TextField
                        required
                        fullWidth
                        autoComplete="email"
                        className="mb-3"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      <TextField
                        required
                        fullWidth
                        autoComplete="designation"
                        className="mb-3"
                        id="designation"
                        name="designation"
                        label="Designation"
                        type="text"
                        {...getFieldProps("designation")}
                        error={Boolean(
                          touched.designation && errors.designation
                        )}
                        helperText={touched.designation && errors.designation}
                      />

                      <TextField
                        required
                        fullWidth
                        autoComplete="phone"
                        className="mb-3"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="text"
                        {...getFieldProps("phone")}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                      <TextField
                        required
                        fullWidth
                        className="mb-3"
                        autoComplete="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={showPassword}
                        label="Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setshowPassword(prev => !prev)}
                              >
                                {showPassword ? (
                                  <RiEyeFill />
                                ) : (
                                  <RiEyeOffFill />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />

                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        className="mt-2"
                        // onClick={handlePostData}
                      >
                        {/* {isSubmitting ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null} */}
                        Sign In
                      </Button>

                      <div className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <p className="mb-0">
                            By registering you agree to The App Ideas{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                      </div>
                    </Form>
                  </FormikProvider>
                </div>
              </CardContent>
            </Card>
            <div className="mt-5 text-center">
              <p>
                Already have an account ?
                <Link to="/login" className="fw-medium text-primary">
                  Sign In
                </Link>
              </p>
              {/* <p>
                © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                <i className="mdi mdi-heart text-danger" /> by Themesbrand
              </p> */}
            </div>
          </Container>
        </div>
      </Grid>
    </React.Fragment>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account
  return { user, registrationError, loading }
}

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register)
