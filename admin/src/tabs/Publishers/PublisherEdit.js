import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { detailPublisher, updatePublisher, createPublisher } from '../../actions/publisherActions'
import { PUBLISHER_UPDATE_RESET, PUBLISHER_CREATE_RESET } from '../../messages/publisherMessages'
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';

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

const PublisherEdit = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const { id } = useParams();
    const publisherId = id;

    const { add } = useParams();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const publisherDetail = useSelector(state => state.publisherDetail);
    const { loading, error, publisher } = publisherDetail;

    const publisherUpdate = useSelector(state => state.publisherUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = publisherUpdate;

    const publisherCreate = useSelector(state => state.publisherCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = publisherCreate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PUBLISHER_UPDATE_RESET });
            navigate('/publishers');
        } else { if(successCreate) {
            dispatch({ type: PUBLISHER_CREATE_RESET });
            navigate('/publishers');
        } else {
            if (add != 'add') {
                if (Object.keys(publisher).length === 0) {
                    dispatch(detailPublisher(publisherId));
                } else {
                    setName(publisher.data.name);
                    setAddress(publisher.data.address);
                    setPhone(publisher.data.phone);
                    setDescription(publisher.data.description);
                }
            }
        }
            
        }
    }, [        
        dispatch,
        publisherId,
        publisher,
        successUpdate,
        successCreate
    ]);

    const submitHandler = (e) => {
        e.preventDefault();

        if(add != 'add') {
        dispatch(updatePublisher({
            publisher_id: publisherId,
            name: name,
            address: address,
            phone: phone,
            description: description,
        }));
        }else{
            dispatch(createPublisher({
                name: name,
                address: address,
                phone: phone,
                description: description,
            }));
        } 
    };

    return (
        <MainLayout>
            <Link href='/publishers' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Publisher Details
                </Typography>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='error'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : add === 'add' ? (
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Publisher Name"
                                    name="name"
                                    defaultValue={""}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Enter Address"
                                    name="address"
                                    defaultValue={""}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    defaultValue={""}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid> 
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Enter Desc"
                                    name="description"
                                    defaultValue={""}
                                    onChange={(e) => setDescription(e.target.value)}
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
                ) : Object.keys(publisher).length === 0 ? <Loader/> : (
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Publisher Name"
                                    name="name"
                                    defaultValue={publisher.data.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Enter Address"
                                    name="address"
                                    defaultValue={publisher.data.address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    defaultValue={publisher.data.phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid> 
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Enter Desc"
                                    name="description"
                                    defaultValue={publisher.data.description}
                                    onChange={(e) => setDescription(e.target.value)}
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

export default PublisherEdit;