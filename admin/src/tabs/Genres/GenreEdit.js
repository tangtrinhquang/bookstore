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
import { detailGenre, updateGenre, createGenre } from '../../actions/genreActions'
import { GENRE_UPDATE_RESET, GENRE_CREATE_RESET } from '../../messages/genreMessages'
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

const GenreEdit = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const { id } = useParams();
    const genreId = id;

    const { add } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const genreDetail = useSelector(state => state.genreDetail);
    const { loading, error, genre } = genreDetail;

    const genreUpdate = useSelector(state => state.genreUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = genreUpdate;

    const genreCreate = useSelector(state => state.genreCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = genreCreate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: GENRE_UPDATE_RESET });
            navigate('/genres');
        } else { if(successCreate) {
            dispatch({ type: GENRE_CREATE_RESET });
            navigate('/genres');
        } else {
            if (add != 'add') {
            if (Object.keys(genre).length === 0) {
                dispatch(detailGenre(genreId));
            } else {
                setName(genre.data.name);
                setDescription(genre.data.description);
            }
        }
    }
}
    }, [        
        dispatch,
        genreId,
        genre,
        successUpdate,
        successCreate
    ]);

    const submitHandler = (e) => {
        e.preventDefault();

        if(add != 'add') {
            dispatch(updateGenre({
                genre_id: genreId,
                name: name,
                description: description,
            }));
        }else{
            dispatch(createGenre({
                name: name,
                description: description,
        }));
        }
    };

    return (
        <MainLayout>
            <Link href='/genres' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Genre Details
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
                                    label="Genre Name"
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
                                    minRows={4}
                                    id="description"
                                    label="Description"
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
                ) : Object.keys(genre).length === 0 ? <Loader/> : (
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Genre Name"
                                    name="name"
                                    defaultValue={genre.data.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    minRows={4}
                                    id="description"
                                    label="Description"
                                    name="description"
                                    defaultValue={genre.data.description}
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

export default GenreEdit;