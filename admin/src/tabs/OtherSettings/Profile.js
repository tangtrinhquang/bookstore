import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_PROFILE_RESET } from '../../messages/userMessages';
import { getUserDetail, updateUserProfile } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Typography } from '@material-ui/core';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: 'none',
    },
}));

const Profile = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    // const [avatar, setAvatar] = useState('');
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, user } = userDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const userData = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (Object.keys(user).length === 0) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetail(userData.data.user_id));
            } else {
                setName(user.data.name);
                setEmail(user.data.email);
                setPhone(user.data.phone)
                setAddress(user.data.address)
                // setAvatar(user.avatar);
            }
        }
    }, [dispatch, userInfo, user, success])

    // const uploadFileHandler = async (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     setUploading(true);

    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         };

    //         const { data } = await axios.post(`/api/upload`, formData, config);

    //         // setAvatar(data);
    //         setUploading(false);
    //     } catch (error) {
    //         console.error(error);
    //         setUploading(false);
    //     };
    // };

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ user_id: userData.data.user_id, name: name, email: email, phone: phone, address: address, password: password }));
        }
    };

    return (
        <MainLayout>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography>User Profile</Typography>
                {message && <Message variant='error'>{message}</Message>}
                { }
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : Object.keys(user).length === 0 ? <Loader/> : (
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="User Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    defaultValue={user.data.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    disabled
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    defaultValue={user.data.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Enter Phone Number"
                                    name="phone"
                                    defaultValue={user.data.phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Enter Address"
                                    name="address"
                                    defaultValue={user.data.address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="avatar"
                                    label="Enter Image Url"
                                    name="avatar"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                />
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="icon-button-file"
                                    type="file"
                                    onChange={uploadFileHandler}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                {uploading && <Loader />}
                            </Grid> */}
                            <Typography>Change Password</Typography>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="New Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </div>
        </MainLayout>
    );
};

export default Profile;