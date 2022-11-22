import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Pagination'
import {
    listBooks,
    deleteBook,
    createBook,
} from '../../actions/bookActions';
import { authorName } from '../../actions/authorActions';
import { BOOK_CREATE_RESET } from '../../messages/bookMessages';
import Typography from '@material-ui/core/Typography';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    createdButton: {
        marginTop: theme.spacing(3),
        position: 'fixed',
        bottom: 0,
        right: 0,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const BookList = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const { pgNumber } = useParams();
    const pageNumber = pgNumber || 1;

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, authors, genres, publishers } = bookList;

    const bookDelete = useSelector(state => state.bookDelete);
    const {
        loadingDelete,
        errorDelete,
        successDelete,
    } = bookDelete;

    const bookCreate = useSelector(state => state.bookCreate);
    const {
        loadingCreate,
        errorCreate,
        successCreate,
        createdBook,
    } = bookCreate;

    useEffect(() => {
        dispatch({ type: BOOK_CREATE_RESET })

        if (!userInfo) {
            navigate('/login')
        }
        if (successCreate) {
            navigate(`/books/${createdBook._id}/edit`)
        } else {
            dispatch(listBooks(pageNumber))
        }
    }, [
        dispatch,
        userInfo,
        successCreate,
        successDelete,
        createdBook,
        pageNumber,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteBook(id))
            window.location.reload(); 
        }
    }

    const createBookHandler = () => {
        dispatch(createBook())
    }

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                BOOK LIST ({books?.data?.length})
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {loadingDelete && <Loader />}
                        {errorDelete && <Message variant='error'>{errorDelete}</Message>}
                        {loadingCreate && <Loader />}
                        {errorCreate && <Message variant='error'>{errorCreate}</Message>}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='error'>{error}</Message> 
                        ) : books.length === 0 ? <Loader/> : (
                            <>
                                <Table size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>IMAGE</TableCell>
                                            <TableCell>NAME</TableCell>
                                            <TableCell>PRICE</TableCell>
                                            <TableCell>AUTHOR</TableCell>
                                            <TableCell>GENRE</TableCell>
                                            <TableCell>PUBLISHER</TableCell>
                                            <TableCell>ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {books.data.map((book, index) => (
                                            <TableRow key={book.book_id}>
                                                <TableCell>{index + 1 + Number(pageNumber-1)*12}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={process.env.REACT_APP_API_URL+"/storage/"+book.image}
                                                        alt="Paella dish"
                                                        width="80"
                                                    />
                                                </TableCell>
                                                <TableCell>{book.name}</TableCell>
                                                <TableCell>$ {book.price}</TableCell>
                                                <TableCell>{authors.find(author => author.author_id === book.author_id).name}</TableCell>
                                                <TableCell>{genres.find(genre => genre.genre_id === book.genre_id).name}</TableCell>
                                                <TableCell>{publishers.find(publisher => publisher.publisher_id === book.publisher_id).name}</TableCell>
                                                <TableCell>
                                                    <Link href={`/books/${book.book_id}/edit`} onClick={(e) => e.preventDefault}>
                                                        <Button style={{margin: "5px"}} variant="contained" color="secondary" href="">
                                                            <EditIcon />
                                                        </Button>
                                                    </Link>
                                                    <Button style={{margin: "5px"}} variant="contained" color="primary" onClick={() => deleteHandler(book.book_id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {/* <Paginate category='books' pages={pages} page={page} /> */}
                            </>
                        )}
                        <div className={classes.createdButton}>
                            <Button color="primary" href="/books/add" onClick={createBookHandler}>
                                <AddCircleIcon fontSize="large"/>
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default BookList;