import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtil from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    new_listing_button: {
        position: 'fixed',
        left: '5%',
        bottom: '5%',
        float: 'right'
    },
    new_listing_container: {
        width: '90%',
        height: '90%',
        position: 'fixed',
        top: '5%',
        left: '5%',
        overflow: 'auto',
        backgroundColor: 'white',
        zIndex: '1',
    },
    new_listing_box: {
        width: '90%',
        height: '90%',
        margin: '10px 60px 10px 60px',
        float: 'left',
    },
    input_field: {
        display: 'block',
        margin: '20px 0 0 0',
        width: '100%',
    },
}));

export default function New_Listing_Button() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [owner, setOwner] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [town, setTown] = React.useState('');
    const [county, setCounty] = React.useState('');
    const [postcode, setPostcode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [lng, setLng] = React.useState('');
    const [selectedFromDate, handleFromDateChange] = React.useState(new Date());
    const [selectedContractLength, setContractLength] = React.useState("12");
    const contractLengths = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","24+"];
    const [selectedBedrooms, setBedrooms] = React.useState("1");
    const roomAmounts = ["1","2","3","4","5","6","7","8","9","10"];
    const [billsState, setBillsState] = React.useState({Energy:false,Water:false,Internet:false,TVLicense:false});
    const {Energy,Water,Internet,Gas} = billsState;
    const [files, setFiles] = React.useState([]);

    const display_box = () => {
        setOpen(!open);
    };

    const hide_box = () => {
        setOpen(false);
    };

    const handleContractLengthChange = event => {
        setContractLength(event.target.value);
    };

    const handleRoomsChange = event => {
        setBedrooms(event.target.value);
    };

    const handleBillsBoxChange = name => event => {
        setBillsState({ ...billsState, [name]: event.target.checked });
    };

    const getBaseImages = () => {

        let images = [];
        while (files.length > 3) {
            files.pop();
        }
        for (let i = 0; i < files.length; i++) {

            let reader = new FileReader();
            reader.readAsDataURL(files[i]);

            reader.onload = () => {

                let imageInfo = {
                    tag: files[i].name,
                    data: reader.result
                };

                images.push(imageInfo);
                if (images.length === files.length) {
                    setFiles(images);
                }
            };
        }
    };

    async function submitListing() {

        let tag1,tag2,tag3,data1,data2,data3;
        if (files.length === 3) {
            tag1 = files[0].tag;
            tag2 = files[1].tag;
            tag3 = files[2].tag;
            data1 = files[0].data;
            data2 = files[1].data;
            data3 = files[2].data;
        } else if (files.length === 2) {
            tag1 = files[0].tag;
            tag2 = files[1].tag;
            tag3 = 'EMPTY';
            data1 = files[0].data;
            data2 = files[1].data;
            data3 = ' ';
        } else if (files.length === 1) {
            tag1 = files[0].tag;
            tag2 = 'EMPTY';
            tag3 = 'EMPTY';
            data1 = files[0].data;
            data2 = ' ';
            data3 = ' ';
        } else {
            tag1 = 'EMPTY';
            tag2 = 'EMPTY';
            tag3 = 'EMPTY';
            data1 = ' ';
            data2 = ' ';
            data3 = ' ';
        }

        await axios.post(
            'http://localhost:8000/api/listings/',
            {username: localStorage.getItem("username"), owner: owner, address: address, town: town,
                county: county, postcode: postcode, description: description, price: price, phone: phone,
                email: email, selectedFromDate: selectedFromDate, selectedBedrooms: selectedBedrooms, selectedContractLength: selectedContractLength,
                energy: Energy, water: Water, internet: Internet, gas: Gas, image1_tag: tag1, image1_data: data1, image2_tag: tag2,
                image2_data: data2, image3_tag: tag3, image3_data: data3, lat: lat, lng: lng
            },
            {headers: {'Content-Type': 'application/json'}}
        ).then( (response) => {
            alert("Listing was added");
            hide_box();
        }).catch( (error) => {
            if (error.response) {
                alert(error.response.status + ' request failed: ' + error.response.data);
            } else {
                alert('Request failed: ' + error.message);
            }
        });
    }

    return (
        <div>
            <Paper>
                <Fab color="primary" aria-label="add" className={classes.new_listing_button} onClick={display_box}>
                    <AddIcon />
                </Fab>
            </Paper>
            {open? (
                <Paper className={classes.new_listing_container}>
                    <CloseIcon style={{ fontSize: 40, cursor: 'pointer', float: 'right', color: 'grey'}} onClick={hide_box}/>
                    <form className={classes.new_listing_box}>
                        <Typography variant="h4" gutterBottom>
                            Listing Details
                        </Typography>
                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={2}>
                            <Grid container justify="space-evenly" alignItems="flex-start" spacing={2} xs={8}>
                                <Grid item xs={6}>
                                    <TextField id="owner_name" fullWidth variant="outlined" value={owner} onChange={e => setOwner(e.target.value)} label="Owner Name" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="email" fullWidth variant="outlined" value={email} onChange={e => setEmail(e.target.value)} label="Email" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="address_line_one" fullWidth variant="outlined" value={address} onChange={e => setAddress(e.target.value)} label="Address Line One" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="address_town" fullWidth variant="outlined" value={town} onChange={e => setTown(e.target.value)} label="Town/City" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="address_county" fullWidth variant="outlined" value={county} onChange={e => setCounty(e.target.value)} label="County" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="address_postcode" fullWidth variant="outlined" value={postcode} onChange={e => setPostcode(e.target.value)} label="Postcode" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtil}>
                                        <KeyboardDatePicker id="available_from" disablePast disableToolbar fullWidth variant="inline" format="yyyy-MM-dd" label="Available From" className={classes.input_field} value={selectedFromDate} onChange={date => handleFromDateChange(date)}/>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="contract_length" select fullWidth variant="outlined" label="Contract Length (Months)" className={classes.input_field} value={selectedContractLength} onChange={length => handleContractLengthChange(length)}>
                                        {contractLengths.map(option => (
                                            <MenuItem value={option}>{option}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="description" fullWidth variant="outlined" label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline rows="5" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <div style={{position: 'absolute', left: '5%', marginTop: 20}}>
                                            <input id="imageupload" accept="image/*" multiple type="file" className={classes.input_field}
                                                   onChange={e => setFiles(e.target.files)}/>
                                        </div>
                                        <div style={{marginLeft: 80, marginTop: -10}}>
                                            <label htmlFor="imageupload">
                                                <Button variant="contained" color="primary" style={{height: '50px',width: '100%', margin: '40px 0 10px 0'}}
                                                        onClick={getBaseImages}>
                                                    Upload Images
                                                </Button>
                                            </label>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container justify="space-evenly" alignItems="flex-start" spacing={2} xs={4}>
                                <Grid item xs={12}>
                                    <TextField id="price" fullWidth variant="outlined" value={price} onChange={e => setPrice(e.target.value)} label="Price PCM (£)" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="bedrooms" select fullWidth variant="outlined" label="Bedrooms" className={classes.input_field} value={selectedBedrooms} onChange={rooms => handleRoomsChange(rooms)}>
                                        {roomAmounts.map(option => (
                                            <MenuItem value={option}>{option}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" className={classes.input_field}>
                                        <FormLabel component="legend">Bills Included</FormLabel>
                                        <FormControlLabel control={<Checkbox checked={Energy} onChange={handleBillsBoxChange('Energy')} value="Energy" />} label="Energy"/>
                                        <FormControlLabel control={<Checkbox checked={Water} onChange={handleBillsBoxChange('Water')} value="Water" />} label="Water"/>
                                        <FormControlLabel control={<Checkbox checked={Internet} onChange={handleBillsBoxChange('Internet')} value="Internet" />} label="Internet"/>
                                        <FormControlLabel control={<Checkbox checked={Gas} onChange={handleBillsBoxChange('Gas')} value="Gas" />} label="Gas"/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="lat" fullWidth variant="outlined" value={lat} onChange={e => setLat(e.target.value)} label="Latitude" className={classes.input_field}/>
                                    <TextField id="lng" fullWidth variant="outlined" value={lng} onChange={e => setLng(e.target.value)} label="Longitude" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="phone" fullWidth variant="outlined" value={phone} onChange={e => setPhone(e.target.value)} label="Phone" className={classes.input_field}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" style={{height: '50px',width: '100%', margin: '20px 0 10px 0'}}
                                            onClick={() => submitListing()}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            ): null}
        </div>
    );
}