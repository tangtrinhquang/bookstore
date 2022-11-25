import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listBooks } from 'src/actions/bookActions';
import "src/assets/styles/sales.css";

const SaleBooks = () => {
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
        <Message variant='error'>{error}</Message>
    ) : Object.keys(books).length === 0 ? <Loader/> : (
        <ul className="align">
            {books.data.data.slice(2, 6).map((book) => (
                <li className="mt-0" key={book.book_id}>
                    <figure className="sales_book">
                        <ul className="hardcover_front">
                            <li>
                                <img src={process.env.REACT_APP_API_URL+"/storage/"+book.image} alt="Images" width="100%" height="100%" />
                            </li>
                            <li />
                        </ul>
                        {/* Pages */}
                        <ul className="page">
                            <li />
                            <li>
                                <a className="btn-sale" href= {"/book/"+book.book_id}>See more</a>
                            </li>
                            <li />
                            <li />
                            <li />
                        </ul>
                        {/* Back */}
                        <ul className="hardcover_back">
                            <li />
                            <li />
                        </ul>
                        <ul className="book_spine">
                            <li />
                            <li />
                        </ul>
                        <figcaption>
                            <Link to={`/book/${book.book_id}`}>
                                <h4 className="title"><strong>{book.name}</strong></h4>
                            </Link>
                            <Link to={`/author/${book.author_id}`}>
                                <span>By {authors.find(author => author.author_id === book.author_id).name}</span>
                            </Link>
                            {book.sales > 0 ? (
                                <>
                                    <strike>
                                        ${book.price}
                                    </strike>

                                    <h4 className="mt-1"><strong>${book.sales}</strong></h4>
                                </>
                            ) : (
                                <h4 className="mt-1"><strong>{numberWithCommas(book.price)} VND</strong></h4>
                            )}
                        </figcaption>
                    </figure>
                </li>
            ))}
        </ul>
    );
}

export default SaleBooks;