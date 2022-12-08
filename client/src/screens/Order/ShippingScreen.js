import React, { useState, useEffect } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from 'src/actions/cartActions'
import { Loader, Message, FormContainer } from 'src/components/shared'
import { CheckoutSteps } from 'src/components/order'
import { listProvinces, listDistricts, listWards } from 'src/actions/locationActions';
import { getUserDetail } from 'src/actions/userActions';

const ShippingScreen = ({ location, history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState("")
    const [ProvinceID, setProvinceID] = useState("")
    const [DistrictID, setDistrictID] = useState("")
    const [WardID, setWardID] = useState("")

    const provinceList = useSelector(state => state.provinceList);
    const { loading, error, provinces } = provinceList;
    
    const districtList = useSelector(state => state.districtList);
    const { districts } = districtList;

    const wardList = useSelector(state => state.wardList);
    const { wards } = wardList;

    const userDetail = useSelector(state => state.userDetail);
    const { user } = userDetail;

    const userData = JSON.parse(localStorage.getItem('userInfo'))

    const dispatch = useDispatch()
    const [selectedRadio, setSelectedRadio] = useState("default-address");
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userDetail.user?.address === undefined) {
            dispatch(getUserDetail(userData.data.user_id));
        }
    }, []);

    useEffect(() => {
        if(selectedRadio !== "default-address"){
            if(provinces.length === 0){
                dispatch(listProvinces());
            }   
        }
    }, [selectedRadio]);

    const submitHandler = (e) => {
        e.preventDefault()
        if(selectedRadio === "new-address") {
            dispatch(saveShippingAddress({ address: address, province: ProvinceID, district: DistrictID, ward: WardID })) 
        }else{
            dispatch(saveShippingAddress({ address: user.data.address, province: user.data.province_id, district: user.data.district_id, ward: user?.data.ward_id })) 
        }
        history.push('/payment')
    }
    
    const HandleChangeValue = (e) => {
            setSelectedRadio(e.target.value);
    };

    return (
        <>
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Check 
                        type='radio'
                        id='default-address'
                        name='address'
                        label={Object.keys(user).length === 0 ? "" : user?.data.address}
                        defaultChecked
                        value={'default-address'}
                        onChange={HandleChangeValue}
                    />
                    --------------------------------------------------
                    <Form.Check 
                        type='radio'
                        id='default-address'
                        name='address'
                        label={'Use a different address'}
                        value={'new-address'}
                        onChange={HandleChangeValue}
                    />
                <Row style={{marginLeft: '1px'}} className="mb-3">
                <Form.Group controlId='province'>
                    <Form.Label>Province</Form.Label>
                    <Form.Control 
                        disabled={selectedRadio === "default-address"}
                        as='select'
                        value={ProvinceID}
                        onChange={(e) => {  
                                            setProvinceID(e.target.value);
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
                        disabled={selectedRadio === "default-address"}
                        as='select'
                        value={DistrictID}
                        onChange={(e) => {
                                            setDistrictID(e.target.value);
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
                        disabled={selectedRadio === "default-address"}
                        as='select'
                        value={WardID}
                        onChange={(e) => setWardID(e.target.value)}
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
                            disabled={selectedRadio === "default-address"}
                            type='text'
                            placeholder='Enter address'
                            defaultValue={address}
                            required
                            onChange={(e) => setAddress(e.target.value + ', '+ wards.find(item => item.WardCode == WardID)?.WardName + ', '
                            + districts.find(item => item.DistrictID == DistrictID)?.DistrictName + ', '
                            + provinces.find(item => item.ProvinceID == ProvinceID)?.ProvinceName)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ShippingScreen