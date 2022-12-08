import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message, FormContainer } from 'src/components/shared';
import { register } from 'src/actions/userActions';
import { listProvinces, listDistricts, listWards } from 'src/actions/locationActions';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail]= useState('');
    const [phone, setPhone]= useState('');
    const [province, setProvince]= useState('');
    const [district, setDistrict]= useState('');
    const [ward, setWard]= useState('');
    const [address, setAddress]= useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const provinceList = useSelector(state => state.provinceList);
    const { provinces } = provinceList;
    
    const districtList = useSelector(state => state.districtList);
    const { districts } = districtList;

    const wardList = useSelector(state => state.wardList);
    const { wards } = wardList;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
        if(provinces.length === 0){
            dispatch(listProvinces());
        }  
    }, [history, userInfo, redirect]);

    const submitHandler = (e)  => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password do not match');
        } else {
            dispatch(register(name, email, password, phone, address, province, district, ward));
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type='phone'
                        placeholder='Enter phone number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Row style={{marginLeft: '1px'}} className="mb-3">
                <Form.Group controlId='province'>
                    <Form.Label>Province</Form.Label>
                    <Form.Control 
                        as='select'
                        value={province}
                        onChange={(e) => {  
                                            setProvince(e.target.value);
                                            dispatch(listDistricts(e.target.value))
                                        }    
                                    }   
                    >
                        <option>--Select Province--</option>
                        {provinces.map((province, index) => (
                            <option key={index} value={province.ProvinceID}>{province.ProvinceName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group style={{marginLeft: '10px'}} controlId='district'>
                    <Form.Label>District</Form.Label>
                    <Form.Control
                        as='select'
                        value={district}
                        onChange={(e) => {
                                            setDistrict(e.target.value);
                                            dispatch(listWards(e.target.value))
                                        }
                                }
                    >
                        <option>--Select District--</option>
                        {districts.map((district, index) => (
                            <option key={index} value={district.DistrictID}>{district.DistrictName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>    

                <Form.Group style={{marginLeft: '10px'}} controlId='ward'>
                    <Form.Label>Ward</Form.Label>
                    <Form.Control
                        as='select'
                        value={ward}
                        onChange={(e) => setWard(e.target.value)}
                    >
                        <option>--Select Ward--</option>
                        {wards.map((ward, index) => (
                            <option key={index} value={ward.WardCode}>{ward.WardName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                </Row>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='Enter Address'
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value + ', '+ wards.find(item => item.WardCode == ward)?.WardName + ', '
                        + districts.find(item => item.DistrictID == district)?.DistrictName + ', '
                        + provinces.find(item => item.ProvinceID == province)?.ProvinceName)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;