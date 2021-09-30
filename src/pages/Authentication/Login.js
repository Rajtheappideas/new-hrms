import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

// reactstrap
import { Alert } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// Formik
import { FormikProvider, Form, useFormik } from "formik"

// yup
import * as yup from "yup"

// react-icons
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri"
import { FiUser } from "react-icons/fi"

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

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import logoSm from "../../assets/images/logo-sm.png"
import { toast, ToastContainer } from "react-toastify"

const Login = props => {
  console.log(props)
  // const [user, setUser] = useState({
  //   userEmail: "admin@gmail.com",
  //   password: 12345,
  // })
  const [showPassword, setshowPassword] = useState(false)

  const navigate = useHistory()
  console.log(navigate)
  // yup validation
  const RegistrationSchema = yup.object().shape({
    userEmail: yup.string().email().required("Email is required!"),
    password: yup.string().required("No password provided."),
    // .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  })

  // formik values
  const formik = useFormik({
    initialValues: {
      userEmail: "",
      password: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: values => {
      const user = {
        userEmail: values.userEmail,
        password: values.password,
      }
      fetch("https://hrms-tai.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(response => {
          console.log(response.json())
        })
        .catch(err => console.log(err))
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
  console.log(formik)

  const containerStyle = {
    padding: "30px 20px",
    width: 400,
    margin: "20px auto",
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      {/* <ToastContainer position='top-center'/> */}
      <Grid>
        <div className="account-pages pt-sm-5">
          <Container style={containerStyle} component="main">
            <Card className="overflow-hidden">
              <div className="bg-primary">
                <div className="text-primary text-center p-4">
                  <h5 className="text-white font-size-20">
                    <FiUser size={30} /> <br />
                    Welcome Back !
                  </h5>
                  <p className="text-white-50">
                    Sign in to continue to The App Ideas.
                  </p>
                  <Link to="/" className="logo logo-admin">
                    <img src={logoSm} height="24" alt="logo" />
                  </Link>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="p-3">
                  <FormikProvider
                    value={formik}
                    className="form-horizontal mt-4"
                  >
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <TextField
                        fullWidth
                        autoComplete="userEmail"
                        className="mb-3"
                        id="email"
                        name="email"
                        required
                        // value={user.uerEmail}
                        label="Email"
                        type="email"
                        {...getFieldProps("userEmail")}
                        error={Boolean(touched.userEmail && errors.userEmail)}
                        helperText={touched.userEmail && errors.userEmail}
                      />

                      <TextField
                        fullWidth
                        required
                        className="mb-3"
                        // value={user.password}
                        autoComplete="password"
                        name="password"
                        // value="123456"
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
                        // onClick=
                        // {() => {navigate.push("/dashboard")}}
                      >
                        {/* {isSubmitting ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null} */}
                        Sign In
                      </Button>

                      <div className="col-12 mt-4">
                        <Link to="/forgot-password">
                          <i className="mdi mdi-lock"></i> Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </FormikProvider>
                </div>
              </CardContent>
            </Card>
            <div className="mt-5 text-center">
              <p>
                Don&#39;t have an account ?{" "}
                <Link to="register" className="fw-medium text-primary">
                  {" "}
                  Signup now{" "}
                </Link>{" "}
              </p>
            </div>
          </Container>
        </div>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
