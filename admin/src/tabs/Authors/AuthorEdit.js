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
import { detailAuthor, updateAuthor } from '../../actions/authorActions'
import { AUTHOR_UPDATE_RESET } from '../../messages/authorMessages'
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

const AuthorEdit = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const { id } = useParams();
    const authorId = id;

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [portrait, setPortrait] = useState();
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const authorDetail = useSelector(state => state.authorDetail);
    const { loading, error, author } = authorDetail;

    const authorUpdate = useSelector(state => state.authorUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = authorUpdate;

console.log(author);

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: AUTHOR_UPDATE_RESET });
            navigate('/authors');
        } else {
            if (Object.keys(author).length === 0) {
                dispatch(detailAuthor(authorId));
            } else {
                setName(author.data.name);
                setAbout(author.data.description);
                setPortrait(author.data.portrait);
            }
        }
    }, [        
        dispatch,
        authorId,
        author,
        successUpdate
    ]);

    const [imgName, setImgName] = useState();
    const [imgSrc, setImgSrc] = useState();
    useEffect(() => {
        setImgSrc(process.env.REACT_APP_API_URL+"/storage/"+author?.data?.portrait)
        setImgName(author?.data?.portrait)
    }, [
        author?.data?.portrait
    ]) 

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        setUploading(true);

        reader.onloadend = () => {
            setImgSrc(reader.result);
            setImgName(file.name);
            console.log(reader.result);
        }

        reader.readAsDataURL(file);

        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // };

            setPortrait(file);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateAuthor({
            author_id: authorId,
            name: name,
            about: about,
            portrait: portrait,
        }));
    };

    return (
        <MainLayout>
            <Link href='/authors' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Author Details
                </Typography>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='error'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : Object.keys(author).length === 0 ? <Loader/> : (
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Author Name"
                                    name="name"
                                    defaultValue={author.data.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    disabled
                                    required
                                    fullWidth
                                    id="portrait"
                                    label="Portrait"
                                    name="portrait"
                                    value={imgName}
                                />
                                <input 
                                    accept="image/*" 
                                    className={classes.input} 
                                    id="icon-button-file" 
                                    type="file" 
                                    onChange={uploadFileHandler}
                                />
                                <img style={{margin: "5px"}}
                                    id="book-img"
                                    src={imgSrc}
                                    alt=""
                                    width="25%"
                                /> 
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                {uploading && <Loader />}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    minRows={4}
                                    id="about"
                                    label="Enter About"
                                    name="about"
                                    defaultValue={author.data.description}
                                    onChange={(e) => setAbout(e.target.value)}
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

export default AuthorEdit;