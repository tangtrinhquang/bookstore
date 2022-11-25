import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Image, Button, Container, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listBooks } from 'src/actions/bookActions';
import { Rating } from 'src/components/book';

const TopRatedBooks = () => {
    const dispatch = useDispatch();

    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, authors } = bookList;

    useEffect(() => {
        dispatch(listBooks());
    }, [dispatch]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : Object.keys(books).length === 0 ? <Loader/> : (
        <div className='bg-img-2 p-5'>
            <Container>
                <Carousel>
                    {books.data.data.slice(7, 10).map((book) => (
                        <Carousel.Item key={book.book_id}>
                            <Row>
                                <Col sm={12} md={6} lg={3}>
                                    <Link key={book.book_id} to={`/book/${book.book_id}`}>
                                        <Image style={{width: '657px'}} src={process.env.REACT_APP_API_URL+"/storage/"+book.image} alt={book.name} fluid />
                                    </Link>
                                </Col>
                                <Col sm={12} md={6} lg={9}>
                                <Link to={`/book/${book.book_id}`}>
                                    <h3 className="p-1">{book.name}</h3>
                               </Link>     
                                    <Rating
                                        value={Math.floor(Math.random() * 2) + 4}
                                        text={' ' + (Math.floor(Math.random() * 69) + 10) + ' reviews'}
                                    />
                                    {book.sales > 0 ? (
                                        <>
                                            <strike>
                                                ${book.price}
                                            </strike>

                                            <h2><strong>{book.sales}</strong></h2>
                                        </>
                                    ) : (
                                        <h2><strong>{numberWithCommas(book.price)} VND</strong></h2>
                                    )}
                                    <p>{book.description.length > 420 ? book.description.substr(0, book.description.substr(0, 300).lastIndexOf(' '))+'...' : book.description}</p>

                                    <Link to={`/book/${book.book_id}`}>
                                        <Button className="btn btn-theme">
                                            See more <i className="fas fa-forward"></i>
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </div>
    );
}

export default TopRatedBooks;
