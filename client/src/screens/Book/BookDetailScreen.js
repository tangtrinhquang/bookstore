import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { Loader, Message, Meta } from 'src/components/shared';
import { Rating, ReleaseBooks } from 'src/components/book';
import { detailBook } from 'src/actions/bookActions';
import addToCart from 'src/assets/animations/addToCart.gif';
import starsRating from 'src/assets/animations/starsRating.gif';
import "src/assets/styles/book.css";

const BookDetailScreen = ({ history }) => {
    const { id } = useParams();
    const bookId = id;
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const bookDetail = useSelector(state => state.bookDetail);
    const { loading, error, book, authors, genres, publishers} = bookDetail;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(Object.keys(book).length === 0){
            dispatch(detailBook(bookId));
        }
    }, [dispatch, bookId]);

    const addToCartHandler = () => {
        history.push(`/cart/${bookId}?quantity=${quantity}`);
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/book'>
                <i className="fas fa-angle-left"></i> Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>{error}</Message>
            ) : Object.keys(book).length === 0 || authors.length === 0 || genres.length === 0 || publishers.length === 0 ? <Loader/> : (
                <>
                    <Meta title={book.data.name} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/book">
                            Book
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{book.data.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col md={4}>
                            <Image className="book-detail-img" src={process.env.REACT_APP_API_URL+"/storage/"+book.data.image} alt={book.data.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3><strong>{book.data.name}</strong></h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={Math.floor(Math.random() * 2) + 4}
                                        text={' 42 reviews'}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: <strong>{numberWithCommas(book.data.price)} VND</strong>
                                </ListGroup.Item>
                                <Link to={`/author/${book.data.author_id}`}>
                                    <ListGroup.Item>
                                        Author: {authors.find(author => author.author_id === book.data.author_id)?.name}
                                    </ListGroup.Item>
                                </Link>    
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {book.data.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    { book.data.countInStock > 0 ? (
                                        <>
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
                                                        <option key={2} value={2}> 2 </option>
                                                        <option key={3} value={3}> 3 </option>
                                                        <option key={4} value={4}> 4 </option>
                                                        <option key={5} value={5}> 5 </option>
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
                                    </>
                                ) : null }
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Tabs className="mt-3" defaultActiveKey="description" transition={false} id="noanim-tab-example">
                        <Tab eventKey="description" title="Description">
                            <p className="tab-description"><i>{book.data.description}</i></p>
                        </Tab>
                        <Tab eventKey="detail" title="Detail">
                            <ListGroup>
                                <ListGroup.Item>
                                    <strong>Genres</strong>: {genres.find(genre => genre.genre_id === book.data.genre_id)?.name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Pages</strong>: {book.data.page}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Publisher</strong>: {publishers.find(publisher => publisher.publisher_id === book.data.publisher_id)?.name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Dimensions</strong>: {book.data.height} X {book.data.length} X {book.data.width} | {book.data.weight}g
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