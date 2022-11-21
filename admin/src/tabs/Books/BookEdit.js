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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getDetailBook, updateBook } from '../../actions/bookActions'
import { BOOK_UPDATE_RESET } from '../../messages/bookMessages'
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { InputLabel } from '@material-ui/core';

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

const BookEdit = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams()
    const bookId = id;
    const { pgNumber } = useParams();
    const pageNumber = pgNumber || 1;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState();
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    // const [publishedAt, setPublishedAt] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pages, setPages] = useState(0);
    // const [sales, setSales] = useState(0);
    // const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const bookDetail = useSelector(state => state.bookDetail);
    const { loading, error, book, authors, genres, publishers } = bookDetail;

    const bookUpdate = useSelector(state => state.bookUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = bookUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: BOOK_UPDATE_RESET })
            navigate('/books');
        } else {
            if (Object.keys(book).length === 0) {
                dispatch(getDetailBook(bookId)); 
            } else {
                setName(book.name);
                setPrice(book.price);
                setImage(book.image);
                setAuthor(book.author_id);
                setGenre(book.genre_id);
                setPages(book.page);
                // setSales(book.sales);
                // setPublishedAt(book.publishedAt);
                setPublisher(book.publisher_id);
                // setCountInStock(book.countInStock);
                setDescription(book.description)
            }
        }
    }, [
        dispatch,
        bookId,
        book,
        genre,
        publishers,
        successUpdate
    ]);

    const [imgName, setImgName] = useState();
    const [imgSrc, setImgSrc] = useState();
    useEffect(() => {
        setImgSrc(process.env.REACT_APP_API_URL+"/storage/"+book?.image)
        setImgName(book?.image)
    }, [
        book?.image
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
            setImage(file);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateBook({
            book_id: bookId,
            name: name,
            price: price,
            image: image,
            author_id: author,
            page: pages,
            genre_id: genre,
            publisher_id: publisher,
            description: description,
        }));
    };

    return (
        <MainLayout>
            <Link href='/books' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Book Details
                </Typography>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='error'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : Object.keys(book).length === 0 || genres.length === 0 || publishers.length === 0 ? <Loader/> : (
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Book Name"
                                    name="name"
                                    defaultValue={book.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Enter Price"
                                    name="price"
                                    defaultValue={book.price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    disabled
                                    required
                                    fullWidth
                                    id="image"
                                    label="Cover Art"
                                    name="image"
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
                                <InputLabel id='author-label'>Select Author</InputLabel>
                                <Select
                                    labelId='author-label'
                                    label="Select Auhor"
                                    variant="outlined"
                                    id="author"
                                    value={book.author_id}
                                    fullWidth
                                    onChange={(e) => setAuthor(e.target.value)}
                                >
                                    {authors.map((author, index) => (
                                        <MenuItem key={index} value={author.author_id}>{author.name}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="pages"
                                    label="Enter Pages"
                                    name="pages"
                                    defaultValue={book.page}
                                    onChange={(e) => setPages(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <InputLabel id='genre-label'>Select Genre</InputLabel>
                                <Select
                                    labelId='genre-label'
                                    label="Select Genre"
                                    variant="outlined"
                                    id="genres"
                                    value={book.genre_id}
                                    fullWidth
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    {genres.map((genreType, index) => (
                                        <MenuItem key={index} value={genreType.genre_id}>{genreType.name}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="publishedAt"
                                    label="Enter Published At"
                                    name="publishedAt"
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                            <InputLabel id='publisher-label'>Select Publisher</InputLabel>
                                <Select
                                    labelId='publisher-label'
                                    label="Select Publisher"
                                    variant="outlined"
                                    id="publishers"
                                    value={book.publisher_id}
                                    fullWidth
                                    onChange={(e) => setPublisher(e.target.value)}
                                >
                                    {publishers.map((publisher, index) => (
                                        <MenuItem key={index} value={publisher.publisher_id}>{publisher.name}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="countInStock"
                                    label="Enter Count In Stock"
                                    name="number"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    id="description"
                                    label="Enter Description"
                                    name="description"
                                    defaultValue={book.description}
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
}

export default BookEdit;