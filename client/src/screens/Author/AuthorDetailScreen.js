import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, Breadcrumb, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Meta, Loader, Message } from 'src/components/shared';
import { detailAuthor } from 'src/actions/authorActions';
import "src/assets/styles/author.css";


const AuthorDetailScreen = ({  }) => {
    const { id } = useParams();
    const authorId = id;
    const dispatch = useDispatch();

    const authorDetail = useSelector(state => state.authorDetail);
    const { loading, error, authors, books } = authorDetail;

    const authorBook = {};

    useEffect(() => {
        if(authors.length === 0){
            dispatch(detailAuthor(authorId));
        }
    }, [dispatch, authorId]);

    
    console.log(authorBook);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : authors.length === 0 ? <Loader /> : (
        <>
            <Meta title={authors.data.name} />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/author">
                    Author
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{authors.data.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm={12} md={3}>
                    <Image className="author" src={process.env.REACT_APP_API_URL+"/storage/"+authors.data.portrait} width="200" roundedCircle />
                </Col>
                <Col sm={12} md={9}>
                    <h3 className="p-2">                    
                        <strong>{authors.data.name}</strong>
                    </h3>
                    <p>{authors.data.description}</p>
                </Col>
            </Row>
            <h4 className="mt-4">Number of books ({books.length})</h4>
            <Row>
                {books.map((book) => (
                    <Col key={book.book_id} sm={12} md={6} lg={3}>
                        <Card className='my-3 p-3 rounded'>
                            <Link to={`/book/${book.book_id}`}>
                                <Card.Img className="book-img" src={process.env.REACT_APP_API_URL+"/storage/"+book.image} variant='top' />
                            </Link>

                            <Card.Body>
                                <Link to={`/book/${book.book_id}`}>
                                    <Card.Title as='h5' className="title">
                                        <strong>{book.name}</strong>
                                    </Card.Title>
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default AuthorDetailScreen;