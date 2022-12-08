import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { ORDER_CREATE_RESET } from 'src/messages/orderMessages'
import { USER_DETAILS_RESET } from 'src/messages/userMessages'
import { createOrder } from 'src/actions/orderActions'
import { CheckoutSteps } from 'src/components/order'
import { Message } from 'src/components/shared'
import { getUserDetail } from 'src/actions/userActions';
import { calculateFee } from 'src/actions/locationActions'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const userDetail = useSelector(state => state.userDetail);
    const { user } = userDetail;

    const shipFee = useSelector(state => state.calcFee);
    const { fees } = shipFee;

    const userData = JSON.parse(localStorage.getItem('userInfo'))

    if (!cart.shippingAddress.address) {
        history.push('/shipping')
    } else if (!cart.paymentMethod) {
        history.push('/payment')
    }

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    )

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const shipAddress = JSON.parse(localStorage.getItem('shippingAddress'))

    useEffect(() => {
        if (success) {
            history.push(`/order/${order.data.order_id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [history, success])

    useEffect(() => {
        dispatch(calculateFee(shipAddress.district, shipAddress.ward))
    }, []);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                items: cart.cartItems,
                address: shipAddress.address,
                shipFee: fees.total,
                productFee: cart.totalPrice,
                service_id: 53320,
                service_type_id: 2,
                user_id: userData.data.user_id,
                name: user.data.name,
                phone: user.data.phone,
                status: "Unprocessed"
            })
        )
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {shipAddress.address}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={process.env.REACT_APP_API_URL+"/storage/"+item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/book/${item.book_id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
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
                                    <Col>{numberWithCommas(cart.itemsPrice)} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{numberWithCommas(fees?.total === undefined ? 0 : fees.total)} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax (5%)</Col>
                                    <Col>{numberWithCommas(cart.taxPrice)} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>{numberWithCommas(fees?.total === undefined ? cart.totalPrice : fees.total*1.0 + cart.totalPrice*1.0 )} VND</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen