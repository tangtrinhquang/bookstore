import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listUsers, deleteUser } from '../../actions/userActions'
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from '@material-ui/core/Avatar';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const UserList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete
    
    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        if(userInfo){
            dispatch(listUsers())
        }else{
            navigate('/login')
        }
    }, [dispatch, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }
    
    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USER LIST ({users?.data?.length})
            </Typography>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>{error}</Message>
            ) : users.length === 0 ? <Loader/> : (
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>AVATAR</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>PHONE NUMBER</TableCell>
                            <TableCell>ADMIN</TableCell>
                            <TableCell>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell>
                                    <Avatar alt="Avatar User" src={user.avatar} />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    {user.role ? (
                                        <CheckCircleIcon />
                                    ) : (
                                        <HighlightOffIcon />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/users/${user.user_id}/edit`} onClick={(e) => e.preventDefault}>
                                        <Button style={{margin: "5px"}} variant="contained" color="secondary" href="">
                                            <EditIcon />
                                        </Button>
                                    </Link>
                                    <Button style={{margin: "5px"}} variant="contained" color="primary" onClick={() => deleteHandler(user.user_id)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            )}
        </MainLayout>
    );
}

export default UserList;