import { Grid, TextField, FormControlLabel, Checkbox, Box, Button, FormHelperText, Snackbar, Alert, Typography, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import CryptoJS from 'crypto-js';
import { Padding, Visibility, VisibilityOff } from "@mui/icons-material";
import { DataEncrypt, DataDecrypt } from '../../../utils/encryption';
import ReCAPTCHA from 'react-google-recaptcha';
import { ArrowForward, Person, Lock } from "@mui/icons-material";
import styles from "./Login.module.css"; // Import styles

const UserName = ({ handleChange, onForgotPassword }) => {

    const route = useRouter();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    //const [term, setTerm] = useState(true);
    const [captchaToken, setCaptchaToken] = useState(null);

    const [alert, setAlert] = useState({ open: false, type: false, message: null });

    const [error, setError] = useState({
        username: false,
        password: false,
        captcha: false
    });

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Build error object
        const newError = {
            username: userName.trim() === "" ? "Username is required." : "",
            password: password.trim() === "" ? "Password is required." : "",
            captcha: !captchaToken ? "Please complete the CAPTCHA." : ""
        };

        setError(newError);

        // If any error message is not empty → stop here
        if (Object.values(newError).some((msg) => msg !== "")) {
            return;
        }

        // ✅ No errors → continue with API call
        try {
            const reqData = {
                username: userName,
                password: password,
                is_admin: 1,
                captchaToken
            };

            const response = await api.post('/api/users/admin_login', reqData);

            console.log("respomce is", response)
            if (response.status === 200) {
                setAlert({ open: true, type: true, message: 'SignIn successfully!' });
                const responseData = response.data.data;

                localStorage.setItem('role', 'user');
                localStorage.setItem('uid', responseData.id);
                localStorage.setItem('email', responseData.email);
                localStorage.setItem('name', `${responseData.first_name} ${responseData.last_name}`);
                localStorage.setItem('mobile', responseData.mobile);
                localStorage.setItem('employee_role', responseData.role_name);
                localStorage.setItem('menu', JSON.stringify(response.data.employeeMenu));

                Cookies.set('role', 'user', { expires: 1 });
                Cookies.set('uid', responseData.id, { expires: 1 });
                Cookies.set('name', `${responseData.first_name} ${responseData.last_name}`);
                Cookies.set('mobile', responseData.mobile);
                Cookies.set('employee_role', responseData.role_name, { expires: 1 });

                route.push('/dashboard');
            } else {
                setAlert({ open: true, type: false, message: response.data.message });
            }
        } catch (error) {
            // handle backend error same as before
            if (error?.response?.status === 401) {
                setAlert({ open: true, type: false, message: error.response.data.message });
            } else {
                setAlert({ open: true, type: false, message: error.message });
            }
        }
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ open: false, type: false, message: null });
    };


    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    const [otp, setOTP] = useState('');
    const [loginWithOtp, setLoginWithOtp] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [uid, setUid] = useState('');
    const [employeeRole, setRmployeeRole] = useState('');

    useEffect(() => {
        const getEmail = localStorage.getItem('email');
        const getName = localStorage.getItem('name');
        const getMobile = localStorage.getItem('mobile');
        const getUid = localStorage.getItem('uid');
        const getEmployeeRole = localStorage.getItem('employee_role');

        setUserEmail(getEmail);
        setName(getName);
        setMobile(getMobile);
        setUid(getUid);
        setRmployeeRole(getEmployeeRole);

        setOTP('');
        setPassword('');

    }, [loginWithOtp])

    const sendOtp = async () => {

        if (userName && userEmail && name) {

            const reqData = {
                mode: 'API',
                type: 'Admin',
                category: 'Login',
                mobile: mobile,
                email: userEmail,
                name: name,
            }

            const encryptedData = DataEncrypt(JSON.stringify(reqData));

            const encReqData = {
                encReq: encryptedData
            };

            try {

                const response = await api.post("/api/otp/get-otp", encReqData);
                const decryptedObject = DataDecrypt(response.data);

                if (response.status === 200) {
                    setLoginWithOtp(true);
                    setAlert({ open: true, type: true, message: "OTP sent to your register mobile no." });
                } else {
                    setAlert({ open: true, type: false, message: decryptedObject.data.message });
                }

            } catch (error) {

                if (error?.response?.status && error.response.status === 404) {
                    setAlert({ open: true, type: false, message: error.response.data });
                } else {

                    if (error?.response?.data?.error) {
                        setAlert({ open: true, type: false, message: error.response.data.error });
                    } else {
                        setAlert({ open: true, type: false, message: error.message });
                    }
                }

            }

        } else {
            setAlert({ open: true, type: false, message: "Please enter valid Mobile no." });
        }

    }

    const verifyOtp = async () => {

        if (userName && otp) {

            const reqData = {
                otp: otp,
                mode: 'API',
                type: 'Admin',
                category: 'Login',
                mobile: mobile
            }

            const encryptedData = DataEncrypt(JSON.stringify(reqData));

            const encReqData = {
                encReq: encryptedData
            };

            try {

                const response = await api.post("/api/otp/verify-otp", encReqData);

                if (response.status === 200) {
                    setAlert({ open: true, type: false, message: 'SignIn successfully!' });
                    Cookies.set('role', 'user', { expires: 1 });
                    Cookies.set('uid', uid, { expires: 1 });
                    Cookies.set('name', name);
                    Cookies.set('mobile', mobile);
                    Cookies.set('employee_role', employeeRole, { expires: 1 });
                    //localStorage.setItem('menu', JSON.stringify(response.data.employeeMenu));
                    route.push('/dashboard');
                } else {

                }


            } catch (error) {
                if (error?.response?.status && error.response.status === 404) {
                    setAlert({ open: true, type: false, message: error.response.data });
                } else if (error?.response?.status && error.response.status === 401) {
                    setAlert({ open: true, type: false, message: 'Invalid Otp' });
                } else {

                    if (error?.response?.data?.error) {
                        setAlert({ open: true, type: false, message: error.response.data.error });
                    } else {
                        setAlert({ open: true, type: false, message: error.message });
                    }
                }

            }

        } else {
            setAlert({ open: true, type: false, message: "Please enter valid otp" });
        }

    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container spacing={1} className={styles.container}>
            {/* Username */}
            <Grid item xs={12} >
                <Typography className={styles.label}>Username</Typography>
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={userName}
                    error={Boolean(error.username)}              // 🔹 highlights field
                    helperText={error.username}                  // 🔹 shows message
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter username"
                    InputProps={{
                        className: styles.textFieldRoot,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person className={styles.inputIcon} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            {/* Password */}
            <Grid item xs={12} >
                <Typography className={styles.label}>Password</Typography>
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    error={Boolean(error.password)}
                    helperText={error.password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    InputProps={{
                        className: styles.textFieldRoot,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock className={styles.inputIcon} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    className={styles.passwordToggle}
                                >
                                    {showPassword ? (
                                        <VisibilityOff className={styles.inputIcon} />
                                    ) : (
                                        <Visibility className={styles.inputIcon} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            {/* 🔹 reCAPTCHA right after password field */}
            <Grid item xs={12}>
                <Box sx={{ transform: "scale(0.85)", transformOrigin: "0 0" }}>
                    <ReCAPTCHA
                        sitekey="6LdHTbwrAAAAAGawIo2escUPr198m8cP3o_ZzZK1"
                        onChange={handleCaptchaChange}
                    />
                </Box>
                {error.captcha && (
                    <Typography variant="caption" color="error">
                        {error.captcha}
                    </Typography>
                )}
            </Grid>
            {/* Login Button + Forgot Password */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1px" }}>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={
                        <Box className={styles.arrowIconWrapper}>
                            <ArrowForward className={styles.arrowIcon} />
                        </Box>
                    }
                    className={styles.loginButton}
                    onClick={submitHandler}
                >
                    Login
                </Button>

                <Typography
                    className={styles.forgotPassword}
                    onClick={onForgotPassword}
                >
                    Forgot Password ?
                </Typography>
            </Grid>
            {/* Don’t have an account? Sign Up */}
            <Grid item xs={12}>
                <Typography variant="body2" className={styles.subText} sx={{ textAlign: "center", }}>
                    Don’t have an account?{" "}
                    <span
                        style={{ color: "#2198F3", cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => console.log("Sign Up clicked")} // replace with your navigation
                    >
                        Sign Up
                    </span>
                </Typography>
            </Grid>

        </Grid>
    );

};
export default UserName;