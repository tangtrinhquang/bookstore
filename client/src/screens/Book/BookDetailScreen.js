import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { Loader, Message, Meta } from 'src/components/shared';
import { Rating, ReleaseBooks } from 'src/components/book';
import { detailBook } from 'src/actions/bookActions';
import addToCart from 'src/assets/animations/addToCart.gif';
import starsRating from 'src/assets/animations/starsRating.gif';
import writeReview from 'src/assets/animations/writeReview.gif';
import "src/assets/styles/book.css";

const BookDetailScreen = ({ history, match }) => {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const bookDetail = useSelector(state => state.bookDetail);
    const { loading, error, book, authors, genres, publishers} = bookDetail;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (Object.keys(book).length === 0) {
            dispatch(detailBook(match.params.id));
        }
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`);
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/book'>
                <i className="fas fa-angle-left"></i> Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>{error}</Message>
            ) : (
                <>
                    <Meta title={book.name} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/book">
                            Book
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{book.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col md={4}>
                            <Image className="book-detail-img" src={book.image} alt={book.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3><strong>{book.name}</strong></h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={4}
                                        text={`42 reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: <strong>${book.price}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Author: {authors.find(author => author.author_id === book.author_id).name}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                In Stock
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                    >
                                                        <option key={1} value={1}> 1 </option>
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={book.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                        <Image src={addToCart} fluid/>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Tabs className="mt-3" defaultActiveKey="description" transition={false} id="noanim-tab-example">
                        <Tab eventKey="description" title="Description">
                            <p className="tab-description"><i>{book.description}</i></p>
                        </Tab>
                        <Tab eventKey="detail" title="Detail">
                            <ListGroup>
                                <ListGroup.Item>
                                    <strong>Genres</strong>: {genres.find(genre => genre.genre_id === book.genre_id).name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Pages</strong>: {book.page}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Publisher</strong>: {publishers.find(publisher => publisher.publisher_id === book.publisher_id).name}
                                </ListGroup.Item>
                            </ListGroup>
                        </Tab>
                    </Tabs>
                    <div className="my-5">
                        <h4><strong>New Releases</strong></h4>
                        <ReleaseBooks />
                    </div>
                </>
            )}
        </>
    );
}

export default BookDetailScreen;