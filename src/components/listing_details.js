import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Checkbox, FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    listing_details_button: {
        position: 'fixed',
        right: '20%',
        top: '2%',
        float: 'right',
        backgroundColor: '#404040',
        color: '#FFFFFF'
    },
    listing_details_box_container: {
        width: 600,
        height: 620,
        position: 'fixed',
        top: '10%',
        left: '30%',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    listing_details_inner_container: {
        width: 2000,
        height: 570,
        overflow: 'hidden',
        transition: '1s',
        display: 'flex',
        flexDirection: 'column',
        color: '#222222'
    },
    field: {
        fontSize: 15,
        paddingLeft: '2%',
        paddingTop: '0.5%'
    },
    textArea: {
        width: 500,
        overflow: 'hidden',
    }
}));

let utilities = [{entry: 'electric bill', check: true}, {entry: 'water bill', check: false}, {entry: 'gas bill', check: true}, {entry: 'wifi', check: false}];
const utilities_list = () => {
    return (
        utilities.map( utility => {
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked = {utility.check}
                            value = {utility.check}
                            disabled = {true}
                        />
                    }
                    label={utility.entry}
                />
            );
        })
    );
};

let installments = [{entry: 'every month', check: true}, {entry: 'every three months', check: false}, {entry: 'every six months', check: false}, {entry: 'one time payment', check: false}];
const installments_list = () => {
    return (
        installments.map( installment => {
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked = {installment.check}
                            value = {installment.check}
                            disabled = {true}
                        />
                    }
                    label={installment.entry}
                />
            );
        })
    );
};

export default function Listing_Details() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const display_box = () => {
        setOpen(!open);
    };

    const hide_box = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" className={classes.listing_details_button} onClick={display_box}>
                Details
            </Button>
            {open? (
                <Paper className={classes.listing_details_box_container}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{ fontSize: 20, paddingLeft: '5%'}}>Listing Details:</p>
                        <CloseIcon style={{ fontSize: 25, cursor: 'pointer', paddingLeft: '70%',color: '#222222'}} onClick={hide_box}/>
                    </div>
                    <div className={classes.listing_details_inner_container}>
                        <Typography className={classes.field}>Owner: John S. Park</Typography>
                        <Typography className={classes.field}>Price: 450£/month</Typography>
                        <Typography className={classes.field}>Contract Length: 12 months</Typography>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Typography className={classes.field}>Included Facilities:</Typography>
                            <Typography className={classes.field}>Installments:</Typography>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '2%'}}>
                                {utilities_list()}
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '2%'}}>
                                {installments_list()}
                            </div>
                        </div>
                        <Typography className={classes.field}>Description:</Typography>
                        <div style={{paddingLeft: '2%'}}>
                            <TextField multiline={true} rowsMin={8} rowsMax={8} className={classes.textArea} disabled={true}
                                defaultValue={
                                    'This is a new 4 bedroom house. Fully furnished kitchen.' +
                                    'Brand new bathrooms. Large living room. ' +
                                    'Plenty parking space and bike shed outside.'
                                }
                            />
                        </div>
                        <div style={{ position: 'absolute', top: '93%', left: '5%', display: 'flex', flexDirection: 'row'}}>
                            <div style={{width: 230}}>
                                <Typography className={classes.field}>Phone: 02343549298428</Typography>
                            </div>
                            <div style={{width: 280}}>
                                <Typography className={classes.field}>Email: company@email.co.uk</Typography>
                            </div>
                        </div>
                    </div>
                </Paper>
            ): null}
        </div>
    );
}