import React from 'react';
import { Meta } from 'src/components/shared';
import { Container, Col, Row, Image, Breadcrumb, Form, Button } from 'react-bootstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import shop from 'src/assets/images/shop.jpg';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 10.760,
    lng: 106.682
};

const ContactScreen = () => {
    return (
        <Container>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Contact</Breadcrumb.Item>
            </Breadcrumb>
            <LoadScript
                googleMapsApiKey="AIzaSyAUGibHt4RprrUfqlUaE3FyMFj82zDAcrU"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </LoadScript>
            <Row className="mt-5">
                <Col sm={12} md={6}>
                    <Image src={shop} fluid />
                </Col>
                <Col sm={12} md={6}>
                    <div className="p-3">
                        <h2><strong>TANDYM BOOKSHOP</strong></h2>

                        <i className="fas fa-map-marker-alt"></i> <i> District 5, Ho Chi Minh City, VietNam </i><br /> <br />
                        <i className="fas fa-envelope"></i> <i> tandym@gmail.com </i> <br /> <br />
                        <i className="fas fa-phone"></i> <i>Call Us: 0931 917 ###</i>  <br /> <br />
                        <Form className="mt-3">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Control placeholder="Your name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridMessage">
                                <Form.Control className="border" as="textarea" rows={3} />
                            </Form.Group>

                            <Button className="btn-theme" fullWidth type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactScreen;