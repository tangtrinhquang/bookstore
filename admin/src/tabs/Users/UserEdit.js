import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetail, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../messages/userMessages'
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { listProvinces, listDistricts, listWards } from '../../actions/locationActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: 'none',
    },
}));

const UserEdit = () => { 
    const navigate = useNavigate()
    const classes = useStyles();
    const { id } = useParams();
    const userId = id;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [province, setProvince]= useState('');
    const [district, setDistrict]= useState('');
    const [ward, setWard]= useState('');
    const [address, setAddress] = useState('')
    // const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetail = useSelector((state) => state.userDetail)
    const { loading, error, user } = userDetail

    const provinceList = useSelector(state => state.provinceList);
    const { provinces } = provinceList;
    
    const districtList = useSelector(state => state.districtList);
    const { districts } = districtList;

    const wardList = useSelector(state => state.wardList);
    const { wards } = wardList;

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            window.location.href = "/users"
        } else {
            if (Object.keys(user).length === 0) {
                dispatch(getUserDetail(userId));
                dispatch(listProvinces());
            } else {
                setName(user.data.name)
                setEmail(user.data.email)
                setPhone(user.data.phone)
                setAddress(user.data.fullAddress)
            }
        }
    }, [dispatch, userId, user, successUpdate])

    // const addressCode = user.data.address.split(",", 3);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ user_id: userId, name: name, email: email, phone: phone, address: address, province_id: province, district_id: district, ward_id: ward }))
    }

    return (
        <MainLayout>
            <Link href='/users' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography style={{marginBottom: "25px"}} component="h1" variant="h5">
                    Edit User
                </Typography>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='error'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : Object.keys(user).length === 0 ? <Loader/> : (
                    <form onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={user.data.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Enter Name"
                                    name="name"
                                    defaultValue={user.data.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Enter Phone Number"
                                    name="phone"
                                    defaultValue={user.data.phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id='province-label'>Province</InputLabel>
                                <Select
                                    labelId='province-label'
                                    label="Select Province"
                                    variant="outlined"
                                    id="province"
                                    fullWidth
                                    defaultValue={user.data.province_id}
                                    onChange={(e) => {
                                                        setProvince(e.target.value);
                                                        dispatch(listDistricts(e.target.value))
                                    }}
                                >
                                    {provinces.map((province, index) => (
                                        <MenuItem key={index} value={province.ProvinceID}>{province.ProvinceName}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id='district-label'>District</InputLabel>
                                <Select
                                    labelId='district-label'
                                    label="Select District"
                                    variant="outlined"
                                    id="district"
                                    fullWidth
                                    defaultValue={user.data.address.split(",", 3)[2]}
                                    onChange={(e) => {
                                                        setDistrict(e.target.value);
                                                        dispatch(listWards(e.target.value))
                                    }}
                                >
                                    {districts.map((district, index) => (
                                        <MenuItem key={index} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id='ward-label'>Ward</InputLabel>
                                <Select
                                    labelId='ward-label'
                                    label="Select Ward"
                                    variant="outlined"
                                    id="ward"
                                    fullWidth
                                    defaultValue={user.data.address.split(",", 3)[1]}
                                    onChange={(e) => setWard(e.target.value)}
                                >
                                    {wards.map((ward, index) => (
                                        <MenuItem key={index} value={ward.WardID}>{ward.WardName}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    defaultValue={user.data.fullAddress}
                                    onChange={(e) => setAddress(e.target.value + ', '+ wards.find(item => item.WardID == ward)?.WardName + ', '
                                    + districts.find(item => item.DistrictID == district)?.DistrictName + ', '
                                    + provinces.find(item => item.ProvinceID == province)?.ProvinceName)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Checkbox
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </Grid> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Update
                            </Button>
                        </Grid>
                    </form>
                )}
            </div>
        </MainLayout>
    )
}

export default UserEdit;