import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';
import "src/assets/styles/book.css";

const Book = ({ book, authors }) => {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Card className='my-3 p-3 rounded'>
            <Card.Img className="book-img" src={process.env.REACT_APP_API_URL+"/storage/"+book.image} variant='top' height="350" />

            <Card.Body>
                <Link to={`/book/${book.book_id}`}>
                    <Card.Title as='h5' className="title">
                        <strong>{book.name}</strong>
                    </Card.Title>
                </Link>

                <Link to={`/author/${book.author_id}`}> 
                    <Card.Text as='div'>
                        <p>by {authors.find(author => author.author_id === book.author_id).name}</p>
                    </Card.Text>
                </Link>
                {book.sales > 0 ? (
                    <>
                        <Card.Text as='strike'>
                            {book.price}
                        </Card.Text>

                        <Card.Text className="mt-1" as='h4'><strong>${book.sales}</strong></Card.Text>
                    </>
                ) : (
                    <Card.Text as='h4'><strong>{numberWithCommas(book.price)} VND</strong></Card.Text>
                )}

                <Rating value={Math.floor(Math.random() * 2) + 4} />
                
            </Card.Body>

            <Link to={`/cart/${book.book_id}`}>
                    <Button className="btn btn-theme"><i className="fas fa-shopping-cart"></i> Add to Cart</Button>
                </Link>
        </Card>
    );
}

export default React.memo(Book);