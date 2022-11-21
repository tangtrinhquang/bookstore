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
import Paginate from '../../components/Pagination';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    listGenres,
    deleteGenre,
    createGenre,
} from '../../actions/genreActions';
import { GENRE_CREATE_RESET } from '../../messages/genreMessages';
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

const GenreList = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const { pgNumber } = useParams();
    const pageNumber = pgNumber || 1;
    const dispatch = useDispatch();

    const genreList = useSelector(state => state.genreList);
    const { loading, error, genres, page, pages, count } = genreList;

    const genreDelete = useSelector(state => state.genreDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = genreDelete;

    const genreCreate = useSelector(state => state.genreCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        genre: createdGenre,
    } = genreCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: GENRE_CREATE_RESET });

        if (!userInfo) {
            navigate('/login');
        }
        if (successCreate) {
            navigate(`/genre/${createdGenre._id}/edit`);
        } else {
            dispatch(listGenres(pageNumber));
        }
    }, [
        dispatch,
        userInfo,
        successCreate,
        successDelete,
        createdGenre,
        pageNumber,
    ]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteGenre(id));
        }
    }

    const createGenreHandler = () => {
        dispatch(createGenre());
    }

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                GENRE LIST ({genres?.length})
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
                        ) : (
                            <>
                                <Table size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>NAME</TableCell>
                                            <TableCell>DESC</TableCell>
                                            <TableCell>EDIT</TableCell>
                                            <TableCell>DELETE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {genres.map((genre, index) => (
                                            <TableRow key={genre.genre_id}>
                                                <TableCell>{index + 1 + Number(pageNumber-1)*12}</TableCell>
                                                <TableCell>{genre.name}</TableCell>
                                                <TableCell>{genre.description}</TableCell>
                                                <TableCell>
                                                    <Link href={`/genres/${genre.genre_id}/edit`} onClick={(e) => e.preventDefault}>
                                                        <Button variant="contained" color="secondary" href="">
                                                            <EditIcon />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={() => deleteHandler(genre.genre_id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Paginate category='genres' pages={pages} page={page} />
                            </>
                        )}
                        <div className={classes.createdButton}>
                            <Button color="primary" href="/genres/add" onClick={createGenreHandler}>
                                <AddCircleIcon fontSize="large"/>
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default GenreList;