import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { listGenres, } from '../../actions/genreActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../shared/Message';
import Loader from '../shared/Loader';

const Filter = ({ history }) => {
    const [keyword, setKeyword] = useState('');
    const [genre, setGenres] = useState('');
    const [rate, setRate] = useState(0);
    const [price, setPrice] = useState([0, 120]);
    const dispatch = useDispatch();

    const genreList = useSelector(state => state.genreList);
    const { loading, error, genres, page, pages } = genreList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin; 

    useEffect(() => {
        dispatch(listGenres());
    }, [
        dispatch,
        userInfo,
    ]);

    const submitHandler = (e) => {
        e.preventDefault();
        history.push(
            `/search?keyword=${keyword}&genres=${genre}&rate=${rate}&bottom=${price[0]}&top=${price[1]}`
        );
    };

    const handleRange = (value) => {
        setPrice(value);
    }

    return (
        <Form onSubmit={submitHandler} className="filter">
            <Row>
                <Col sm={12} md={6} lg={3}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter names"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='error'>{error}</Message>
                    ) : genres.length === 0 ? <Loader/> : (
                        <Col sm={12} md={6} lg={3}>
                            <Form.Label>Genres</Form.Label>
                            <select
                                onChange={(e) => setGenres(e.target.value)}
                            >
                        {
                            genres.map((genre) => (
                                <option value={genre.genre_id}>{genre.name}</option>
                            ))
                        }
                            </select>
                        </Col>
                    )}
                <Col sm={12} md={6} lg={3}>
                    <Form.Label>Choose Price Range</Form.Label>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="button-tooltip-2">From ${price[0]} to ${price[1]}</Tooltip>}
                    >
                        <Range min={0} max={120} allowCross={false} onChange={handleRange} />
                    </OverlayTrigger>
                </Col>
                <Col sm={12} md={6} lg={2}>
                    <Form.Label>Rating</Form.Label>

                    <select
                        onChange={(e) => setRate(e.target.value)}
                    >
                        <option>Select rating</option>
                        <option value={0}>Zero</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        <option value={4}>Four</option>
                        <option value={5}>Five</option>
                    </select>
                </Col>
                <Col sm={12} md={6} lg={1} className="text-center mt-3">
                    <Button type='submit' className='p-2'>
                        <i className="fas fa-search"></i>
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Filter;
