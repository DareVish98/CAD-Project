import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import filterLogo from './icons/filter.png';
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtil from '@date-io/date-fns';
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
    filter_button: {
        position: 'fixed',
        left: '10%',
        bottom: '5.5%',
        float: 'right',
        borderRadius: '30%'
    },
    filter_icon: {
        width: 35,
        height: 35
    },
    filter_box_container: {
        width: 600,
        height: 560,
        position: 'fixed',
        top: '20%',
        left: '35%',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    filter_inner_container: {
        width: 600,
        height: 500,
        overflow: 'hidden',
        transition: '1s',
        display: 'flex',
        flexDirection: 'column'
    },
    input_field: {
        width: 80,
        height: 50,
        margin: 20
    }
}));

export default function Filter({onFilter}) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [priceMin, setPriceMin] = React.useState('');
    const [priceMax, setPriceMax] = React.useState('');
    const [bedMin, setBedMin] = React.useState('');
    const [bedMax, setBedMax] = React.useState('');
    const [contractMin, setContractMin] = React.useState('');
    const [contractMax, setContractMax] = React.useState('');
    const [validFrom, setValidFrom] = React.useState(new Date());
    const [energy, setEnergy] = React.useState(false);
    const [gas, setGas] = React.useState(false);
    const [internet, setInternet] = React.useState(false);
    const [water, setWater] = React.useState(false);
    const [address, setAddress] = React.useState('');


    const display_box = () => {
        setOpen(!open);
    };

    const hide_box = () => {
        setOpen(false);
    };

    function validate () {
        if ((priceMin !== '' && priceMax === '') || (priceMin === '' && priceMax !== '')) {
            return true;
        } else if ((bedMin !== '' && bedMax === '') || (bedMin === '' && bedMax !== '')) {
            return true;
        } else return ((contractMin !== '' && contractMax === '') || (contractMin === '' && contractMax !== ''));
    }

    function submitFilter() {
        let filter = {
            price: {
                min: priceMin,
                max: priceMax
            },
            bed: {
                min: bedMin,
                max: bedMax
            },
            contract: {
                min: contractMin,
                max: contractMax
            },
            validFrom: validFrom,
            address: address,
            energy: energy,
            gas: gas,
            internet: internet,
            water: water
        };
        onFilter(filter);
    }

    return (
        <div>
            <Button variant="contained" color="primary" className={classes.filter_button} onClick={display_box}>
                <img src={filterLogo} alt={'filter'} className={classes.filter_icon}/>
            </Button>
            {open? (
                <Paper className={classes.filter_box_container}>
                    <CloseIcon style={{ fontSize: 40, cursor: 'pointer', float: 'right', color: 'grey'}} onClick={hide_box}/>
                    <div className={classes.filter_inner_container}>
                        <div style={{display: 'flex', flexDirection: 'row', paddingTop: 20}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{fontSize: 23, paddingLeft: 50}}>
                                    <label>Price:</label>
                                </div>
                                <div style={{fontSize: 20, paddingLeft: 30}}>
                                    <TextField className={classes.input_field} id="priceMin" fullWidth variant="outlined" value={priceMin} onChange={e => setPriceMin(e.target.value)} label="Min"/>
                                    <TextField className={classes.input_field} id="priceMax" fullWidth variant="outlined" value={priceMax} onChange={e => setPriceMax(e.target.value)} label="Max"/>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{fontSize: 23, paddingLeft: 50}}>
                                    <label>Bedrooms:</label>
                                </div>
                                <div style={{fontSize: 20, paddingLeft: 30}}>
                                    <TextField className={classes.input_field} id="bedMin" fullWidth variant="outlined" value={bedMin} onChange={e => setBedMin(e.target.value)} label="Min"/>
                                    <TextField className={classes.input_field} id="bedMax" fullWidth variant="outlined" value={bedMax} onChange={e => setBedMax(e.target.value)} label="Max"/>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', paddingTop: 20}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{fontSize: 23, paddingLeft: 50}}>
                                    <label>Contract Length:</label>
                                </div>
                                <div style={{fontSize: 20, paddingLeft: 30}}>
                                    <TextField className={classes.input_field} id="contractMin" fullWidth variant="outlined" value={contractMin} onChange={e => setContractMin(e.target.value)} label="Min"/>
                                    <TextField className={classes.input_field} id="contractMax" fullWidth variant="outlined" value={contractMax} onChange={e => setContractMax(e.target.value)} label="Max"/>
                                </div>
                            </div>
                            <div style={{fontSize: 20, paddingLeft: 30, paddingTop: 20}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtil}>
                                    <KeyboardDatePicker id="available_from" disablePast disableToolbar fullWidth variant="inline" format="yyyy/MM/dd" label="Available From" value={validFrom} onChange={date => setValidFrom(date)}/>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <FormControl component="fieldset" style={{display: 'flex', flexDirection: 'column', paddingLeft: 50}}>
                                <FormLabel component="legend" style={{paddingTop: 20, paddingBottom: 20}}>Bills Included: </FormLabel>
                                <FormControlLabel control={<Checkbox checked={energy} onChange={() => setEnergy(!energy)} value="Energy" />} label="Energy"/>
                                <FormControlLabel control={<Checkbox checked={water} onChange={() => setWater(!water)} value="Water" />} label="Water"/>
                                <FormControlLabel control={<Checkbox checked={internet} onChange={() => setInternet(!internet)} value="Internet" />} label="Internet"/>
                                <FormControlLabel control={<Checkbox checked={gas} onChange={() => setGas(!gas)} value="Gas" />} label="Gas"/>
                            </FormControl>
                            <div>
                                <div style={{paddingTop: 20, marginLeft: 150, width: 230}}>
                                    <TextField id="address" fullWidth variant="outlined" value={address} onChange={e => setAddress(e.target.value)} label="Street"/>
                                </div>
                                <div style={{paddingTop: 70, marginLeft: 230}}>
                                    <Button variant="contained" disabled={validate()} color="secondary" style={{}}
                                            onClick={() => submitFilter}>
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            ): null}
        </div>
    );
};