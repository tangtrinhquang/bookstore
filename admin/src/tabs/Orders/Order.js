import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CropFreeIcon from '@material-ui/icons/CropFree';
import HomeIcon from '@material-ui/icons/Home';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import PaymentIcon from '@material-ui/icons/Payment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import {
    getOrderDetail,
    payOrder,
} from '../../actions/orderActions'
import * as types from '../../messages/orderMessages'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeightPaper: {
        minHeight: '69vh',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const Order = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const { id } = useParams();
    const orderId = id;

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const orderDetail = useSelector((state) => state.orderDetail)
    const { order, loading, error, user, books } = orderDetail

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [open, setOpen] = useState(true);

    const { success } = useSelector(state => state.orderPay)

    const userData = JSON.parse(localStorage.getItem('userInfo'))

    const handleClick = () => {
        setOpen(!open);
    };

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100)
        }

        order.data.price = addDecimals(
            order.data.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        const addPayPalScript = async () => {
            // const { data: clientId } = await axios.get(`/api/config/paypal`)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=sb`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }


        if (order === undefined) {
            dispatch({ type: types.ORDER_PAY_RESET })
            dispatch({ type: types.ORDER_DELIVER_RESET })
            dispatch(getOrderDetail(orderId, userData.data.user_id))
        } else if (order.data.status == "Unprocessed") {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, order])

    const successPaymentHandler = (paymentResult) => {
        // console.log(paymentResult)
        const userAddress = user?.data.address.split(",")
        dispatch(payOrder(orderId, paymentResult, user?.data.name, user?.data.phone, userAddress[0], userAddress[1], userAddress[2], userAddress[3]))
        order.data.status = "Processed" 
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='error'>{error}</Message>
    ) :
        (
            <MainLayout>
                <ListItem>
                    <Typography style={{ width: '33%' }} component="h1" variant="h5">
                        Order #{order.data.order_id}

                    </Typography>
                    {order.data.status == "Processed" ? (
                        <Message variant='success'>
                            Processed
                        </Message>
                    ) : (
                        <Message variant='error'>Unprocessed</Message>
                    )}
                </ListItem>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.fixedHeightPaper}>
                            <List
                                component="nav"
                                aria-labelledby="ship-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="ship-list-subheader">
                                        Shipping
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="User" src={""} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user?.data.name} secondary={user?.data.email} />
                                </ListItem>
                                <ListItem button onClick={handleClick}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Address" secondary={order.data.address} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <LocationCityIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={"Ho Chi Minh City"} />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <MarkunreadMailboxIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="700000" />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <PublicIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={"Vietnam"} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.fixedHeightPaper}>
                            <List
                                component="nav"
                                aria-labelledby="payment-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="payment-list-subheader">
                                        Payment Method
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PaymentIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Paypal" />
                                </ListItem>
                                <ListItem>
                                    {order.data.status == "Processed" ? (
                                        <Message variant='success'>Paid on {order.data.updatedAt}</Message>
                                    ) : (
                                        <Message variant='error'>Not Paid</Message>
                                    )}
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.fixedHeightPaper}>
                            <List
                                component="nav"
                                aria-labelledby="items-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="items-list-subheader">
                                        Order Items
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                {order.length === 0 ? (
                                    <Message>Order is empty</Message>
                                ) : (
                                    <List>
                                        {order.data.order_items.map((item, index) => (
                                            <ListItem key={index}>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <ButtonBase className={classes.image}>
                                                            <img className={classes.img} 
                                                            alt={books.data.find(book => book.book_id === item.book_id)?.name} 
                                                            src={process.env.REACT_APP_API_URL+"/storage/" + books.data.find(book => book.book_id === item.book_id)?.image} />
                                                        </ButtonBase>
                                                    </Grid>
                                                    <Grid item xs={12} sm container>
                                                        <Grid item xs container direction="column" spacing={2}>
                                                            <Grid item xs>
                                                                <Typography variant="body2" gutterBottom>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {item.quantity} x {numberWithCommas(item.price)} = {numberWithCommas(item.quantity * item.price)} VND
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.fixedHeightPaper}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Order Summary
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <MonetizationOnIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={numberWithCommas(order.data.productFee) + " VND"} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LocalShippingIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={numberWithCommas(order.data.shipFee) + " VND"} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PaymentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={numberWithCommas(order.data.productFee * 1.0 + order.data.shipFee * 1.0) + " VND"} />
                                </ListItem>
                                {order.data.status == "Unprocessed" && (
                                    <ListItem>
                                        {/* {loadingPay && <Loader />} */}
                                        {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={order.data.productFee + order.data.shipFee}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListItem>
                                )}
                                {/* {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListItem>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListItem>
                                )} */}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </MainLayout>
        );
}

export default Order;