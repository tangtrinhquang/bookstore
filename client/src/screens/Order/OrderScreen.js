import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader } from 'src/components/shared'
import {
    getOrderDetail,
    payOrder,
} from 'src/actions/orderActions'
import { getUserDetail } from 'src/actions/userActions';
import { calculateFee } from 'src/actions/locationActions'
import * as types from 'src/messages/orderMessages'

const OrderScreen = ({ match, history }) => {
    const { id } = useParams();
    const orderId = id;

    const shipAddress = JSON.parse(localStorage.getItem('shippingAddress'))
    const userData = JSON.parse(localStorage.getItem('userInfo'))

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const orderDetail = useSelector((state) => state.orderDetail)
    const { order, loading, error, books } = orderDetail

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userDetail = useSelector(state => state.userDetail);
    const { user } = userDetail;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const shipFee = useSelector(state => state.calcFee);
    const { fees } = shipFee;

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100)
        }

        order.itemsPrice = addDecimals(
            order.data.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
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
            dispatch(getOrderDetail(orderId))
        } else if (!order?.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, order])

    useEffect(() => {
        if(Object.keys(user).length === 0){
            dispatch(getUserDetail(userData.data.user_id));
        }
    }, [])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <h1>Order #{order.data.order_id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {user?.data === undefined ? "" : user.data.name }
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${user?.data === undefined ? "" : user.data.email}`}>{user?.data === undefined ? "" :user.data.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {shipAddress === null ? (user?.data === undefined ? "" : user?.data.address) : shipAddress.address}
                            </p>
                            {order.data.status === "Processed" ? (
                                <Message variant='success'>
                                    Processed
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Processed</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                PayPal
                            </p>
                            {order.data.status === "Processed" ? (
                                <Message variant='success'>Paid on {order.data.updatedAt}</Message>
                            ) : (
                                <Message variant='danger'>Waiting payment</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.data.order_items.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.data.order_items.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={process.env.REACT_APP_API_URL+"/storage/" + books.data.find(book => book.book_id === item.book_id)?.image}
                                                        alt={books.data.find(book => book.book_id === item.book_id)?.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/book/${item.book_id}`}>
                                                        {books.data.find(book => book.book_id === item.book_id)?.name}
                                                    </Link>
                                                </Col>
                                                <Col md={5}>
                                                    {item.quantity} x {numberWithCommas(item.price)} = {numberWithCommas(item.quantity * item.price)} VND
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{numberWithCommas(order.itemsPrice)} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{numberWithCommas(order.data.shipFee)} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax (5%)</Col>
                                    <Col>{numberWithCommas(order.data.productFee * 0.05)} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>{numberWithCommas(order.data.productFee)} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            {order.data.status === "Unprocessed" && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen