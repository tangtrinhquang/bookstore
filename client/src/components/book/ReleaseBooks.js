import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Figure } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listBooks } from 'src/actions/bookActions';
import Book from './Book';

const settings = {
    className: "center",
    centerMode: false,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 500,
    dots: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const ReleaseBooks = () => {
    const dispatch = useDispatch();

    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, authors } = bookList;

    useEffect(() => {
        dispatch(listBooks());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='error'>{error}</Message>
    ) : Object.keys(books).length === 0 ? <Loader/> : (
        <Slider {...settings}>
            {books.data.data.slice(0, 5).map((book) => (
                <Figure key={book.book_id}>
                    <Book book={book} authors={authors} />
                </Figure>
            ))} 
        </Slider>
    );
}

export default ReleaseBooks;