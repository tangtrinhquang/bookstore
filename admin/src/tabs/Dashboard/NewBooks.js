import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listBooks } from '../../actions/bookActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const NewBooks = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const bookList = useSelector(state => state.bookList);
    const { loading, error, books } = bookList;

    useEffect(() => {
        dispatch(listBooks(''));
    }, [dispatch])
    return (
        <div className={classes.root}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>{error}</Message>
            ) : books.length === 0 ? <Loader/> : (
                <List subheader={<ListSubheader>New Books</ListSubheader>}>
                    <Divider variant="inset" component="li" />
                    {
                        books.data.slice(0, 5).map((book) => (
                            <Link key={book.book_id} color="inherit" href={`/books/${book.book_id}/edit`}>
                                <ListItem button alignItems="flex-start">
                                    <ListItemAvatar>
                                        <img alt="Image" src={process.env.REACT_APP_API_URL+"/storage/"+book.image} width="45" />
                                    </ListItemAvatar>
                                    <ListItemText primary={book.name} />
                                </ListItem>
                            </Link>
                        ))
                    }
                    <Link color="inherit" href="/books">
                        <ListItem button>
                            <ListItemText primary="See full books" />
                        </ListItem>
                    </Link>
                </List>
            )}
        </div>
    );
}

export default NewBooks;