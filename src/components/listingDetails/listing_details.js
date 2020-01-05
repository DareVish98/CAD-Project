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
        right: '50%',
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

const utilities_list = (details) => {

    let utilities = [
        {entry: 'electric bill', check: details.energy},
        {entry: 'water bill', check: details.water},
        {entry: 'gas bill', check: details.gas},
        {entry: 'wifi', check: details.internet}
    ];

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

export default function Listing_Details({details}) {
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
            <Button variant="contained" color="primary" className={classes.listing_details_button} onClick={display_box}>
                Details
            </Button>
            {open? (
                <Paper className={classes.listing_details_box_container}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{ fontSize: 20, paddingLeft: '5%'}}>Listing Details:</p>
                        <CloseIcon style={{ fontSize: 40, cursor: 'pointer', paddingLeft: '67.5%',color: 'grey'}} onClick={hide_box}/>
                    </div>
                    <div className={classes.listing_details_inner_container}>
                        <Typography className={classes.field}>Owner: {details.owner}</Typography>
                        <Typography className={classes.field}>Price: {details.price}</Typography>
                        <Typography className={classes.field}>Contract Length: {details.contract_length}</Typography>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Typography className={classes.field}>Included Facilities:</Typography>
                            <Typography className={classes.field}>Installments:</Typography>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '2%'}}>
                                {utilities_list(details)}
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Typography className={classes.field}>Start Date: {details.valid_from}</Typography>
                                <Typography className={classes.field}>Bedrooms: {details.bedrooms}</Typography>
                            </div>
                        </div>
                        <Typography className={classes.field}>Description:</Typography>
                        <div style={{paddingLeft: '2%'}}>
                            <TextField multiline={true} rowsMin={8} rowsMax={8} className={classes.textArea} disabled={true}
                                defaultValue={details.description}
                            />
                        </div>
                        <div style={{ position: 'absolute', top: '93%', left: '5%', display: 'flex', flexDirection: 'row'}}>
                            <div style={{width: 230}}>
                                <Typography className={classes.field}>Phone: {details.phone}</Typography>
                            </div>
                            <div style={{width: 280}}>
                                <Typography className={classes.field}>Email: {details.email}</Typography>
                            </div>
                        </div>
                    </div>
                </Paper>
            ): null}
        </div>
    );
}