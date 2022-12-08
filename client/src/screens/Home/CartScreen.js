import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Message } from 'src/components/shared';
import { addToCart, removeFromCart } from 'src/actions/cartActions';

const CartScreen = ({ location, history }) => {
    const { id } = useParams();
    const bookId = id;
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (bookId) {
            dispatch(addToCart(bookId, quantity));
        }
    }, [dispatch, bookId, quantity]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.book}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={process.env.REACT_APP_API_URL+"/storage/"+item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/book/${item.book_id}`} className="title">{item.name}</Link>
                                        </Col>
                                        <Col md={2}>{numberWithCommas(item.price)} VND</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as='select'
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.book_id, Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.book)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                                items
                            </h2>
                            {numberWithCommas(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0))} VND
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                            </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CartScreen;