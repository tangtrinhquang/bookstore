import React, { useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Dropdown } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { Book } from 'src/components/book';
import { listBooks } from 'src/actions/bookActions';
import Filter from 'src/components/core/Filter';
import { useQuery } from 'src/hooks/useQuery';

const BookHomeScreen = () => {
    const query = useQuery();
    const { pgNumber } = useParams();
    const pageNumber = pgNumber || 1;
    const sort = query.get('sort');

    const dispatch = useDispatch();
    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, page, pages, authors } = bookList;

    useEffect(() => {
        dispatch(listBooks(pageNumber, sort));
    }, [dispatch, pageNumber, sort]);

    return (    
        <>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/book" active>
                    Book
                </Breadcrumb.Item>
            </Breadcrumb>

            <Route render={({ history }) => <Filter history={history} />} />
            <h1 className="mt-2 text-center">Latest Book</h1>
            <div>
                <Dropdown className="text-left">
                    <Dropdown.Toggle className="btn-theme" id="dropdown-basic">
                        Select Sort
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/book">Sort by latest</Dropdown.Item>
                        <Dropdown.Item href="/book?sort=-sales">Sort by sales</Dropdown.Item>
                        <Dropdown.Item href="/book?sort=name">Sort by A-Z</Dropdown.Item>
                        <Dropdown.Item href="/book?sort=-rating">Sort by rating</Dropdown.Item>
                        <Dropdown.Item href="/book?sort=price">Sort by price : low to high </Dropdown.Item>
                        <Dropdown.Item href="/book?sort=-price">Sort by price : high to low </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h6 className="align-right text-right">Showing {1 + Number(pageNumber - 1) * 12} - {pageNumber * 12} of {books?.data?.total} result</h6>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>{error}</Message>
            ) : Object.keys(books).length === 0 ? <Loader/> : (
                <>
                    <Row>
                        {books.data.data.map((book) => (
                            <Col key={book.book_id} sm={12} md={6} lg={3}>
                                <Book book={book} authors={authors} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        category="books"
                        pages={books.data.last_page}
                        page={books.data.current_page}
                        query={`sort=${sort}`}
                    />
                </>
            )}
        </>
    );
}

export default BookHomeScreen;