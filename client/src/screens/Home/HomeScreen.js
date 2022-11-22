import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Jumbotron, Button, Container } from 'react-bootstrap';
import { Genres, TopAuthors } from 'src/components/home';
import { Meta } from 'src/components/shared';

const HomeScreen = ({ match }) => {
    return (
        <>
            <Meta />
            <Jumbotron className="text-center bg-img-3">
                <Row>
                    <Col className="p-5">
                        <h1>The New Books Experience</h1>
                        <p>Welcome to Tandym Bookstore</p>
                        <Link>
                            <Button className="btn btn-theme">
                                Go to cart <i className="fas fa-shopping-cart"></i>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <h2 className="text-center p-3">Genres</h2>
                <Genres />
            </Container>
            <TopAuthors />
        </>
    );
}

export default HomeScreen;