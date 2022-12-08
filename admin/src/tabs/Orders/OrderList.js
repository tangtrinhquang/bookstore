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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listOrders } from '../../actions/orderActions'
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
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

const OrderList = () => {
    const navigate = useNavigate()
    const classes = useStyles();

    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        if (orders.length === 0) {
            dispatch(listOrders());
        }
    }, [dispatch, userInfo]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                ORDER LIST ({orders?.data?.length})
            </Typography>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>{error}</Message>
            ) : orders.length === 0 ? <Loader /> : (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>USER</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell align="right">DETAIL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.data.map((order, index) => (
                            <TableRow key={order.order_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{order.user_id}</TableCell>
                                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                                <TableCell>{numberWithCommas(order.productFee)} VND</TableCell>
                                <TableCell>
                                    {order.status === "Processed" ? (
                                        <CheckCircleIcon />
                                    ) : (
                                        <HighlightOffIcon />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {order.status === "Processed" ? (
                                        <>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircleIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Processed" />
                                            </ListItem>
                                        </>
                                    ) : (
                                        <>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <HighlightOffIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Unprocessed" />
                                            </ListItem>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <Link href={`/orders/${order.order_id}`} onClick={(e) => e.preventDefault}>
                                        <Button variant="contained" color="primary" href="">
                                            <VisibilityIcon />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </MainLayout>
    );
}

export default OrderList;