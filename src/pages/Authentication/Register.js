 import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import "react-toastify/dist/ReactToastify.min.css"

import { useHistory } from "react-router"

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
  // // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   props.registerUser(values)
  // }
  useEffect(() => {
    props.apiError("")
  }, [])

  const navigate = useHistory()
  // yup validation
  const RegistrationSchema = yup.object().shape({
    userName: yup
      .string()
      .required("UserName is Required!")
      .min(2, "Too short!")
      .max(50, "Too Long!"),
    userEmail: yup.string().email().required("Email is Required!"),
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
      userName: "",
      userEmail: "",
      password: "",
      designation: "",
      phone: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: values => {
      const user = {
        userEmail: values.userEmail,
        password: values.password,
        userName: values.userName,
        phone: values.phone,
        designation: values.designation,
      }
      toast.success("Sign up successfully")
      // localStorage.setItem("username",userName)
      resetForm()
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
                        autoComplete="userName"
                        className="mb-3"
                        id="username"
                        name="username"
                        label="UserName"
                        type="text"
                        {...getFieldProps("userName")}
                        error={Boolean(touched.userName && errors.userName)}
                        helperText={touched.userName && errors.userName}
                      />
                      <TextField
                        required
                        fullWidth
                        autoComplete="userEmail"
                        className="mb-3"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        {...getFieldProps("userEmail")}
                        error={Boolean(touched.userEmail && errors.userEmail)}
                        helperText={touched.userEmail && errors.userEmail}
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
                        onClick={() => {navigate.push("/dashboard")}}
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
