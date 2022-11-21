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
    listPublisher,
    deletePublisher,
    createPublisher,
} from '../../actions/publisherActions';
import { PUBLISHER_CREATE_RESET } from '../../messages/publisherMessages';
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

const PublisherList = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const { pgNumber } = useParams();
    const pageNumber = pgNumber || 1;
    const dispatch = useDispatch();

    const publisherList = useSelector(state => state.publisherList);
    const { loading, error, publishers, page, pages, count } = publisherList;

    const publisherDelete = useSelector(state => state.publisherDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = publisherDelete;

    const publisherCreate = useSelector(state => state.publisherCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        publisher: createdPublisher,
    } = publisherCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PUBLISHER_CREATE_RESET });

        if (!userInfo) {
            navigate('/login');
        }
        if (successCreate) {
            navigate(`/publisher/${createdPublisher.publisher_id}/edit`);
        } else {
            dispatch(listPublisher('', pageNumber));
        }
    }, [
        dispatch,
        userInfo,
        successCreate,
        successDelete,
        createdPublisher,
        pageNumber,
    ]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deletePublisher(id));
        }
    }

    const createPublisherHandler = () => {
        dispatch(createPublisher());
    }

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                PUBLISHER LIST ({publishers?.length})
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
                                            <TableCell>ADDRESS</TableCell>
                                            <TableCell>PHONE NUMBER</TableCell>
                                            <TableCell>DESC</TableCell>
                                            <TableCell>EDIT</TableCell>
                                            <TableCell>DELETE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {publishers.map((publisher, index) => (
                                            <TableRow key={publisher.publisher_id}>
                                                <TableCell>{index + 1 + Number(pageNumber-1)*12}</TableCell>
                                                <TableCell>{publisher.name}</TableCell>
                                                <TableCell>{publisher.address}</TableCell>
                                                <TableCell>{publisher.phone}</TableCell>
                                                <TableCell>{publisher.description}</TableCell>
                                                <TableCell>
                                                    <Link href={`/publishers/${publisher.publisher_id}/edit`} onClick={(e) => e.preventDefault}>
                                                        <Button variant="contained" color="secondary" href="">
                                                            <EditIcon />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={() => deleteHandler(publisher.publisher_id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Paginate category='publishers' pages={pages} page={page} />
                            </>
                        )}
                        <div className={classes.createdButton}>
                            <Button color="primary" href="/publishers/add" onClick={createPublisherHandler}>
                                <AddCircleIcon fontSize="large"/>
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default PublisherList;