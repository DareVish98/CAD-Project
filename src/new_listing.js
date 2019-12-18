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

const useStyles = makeStyles(theme => ({
  new_listing_button: {
    position: 'fixed',
    left: '5%',
    bottom: '5%',
  },
  new_listing_container: {
	  width: '90%',
	  height: '90%',
	  position: 'fixed',
	  top: '5%',
	  left: '5%',
	  overflow: 'auto',
	  backgroundColor: 'white',
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
  const [selectedFromDate, handleFromDateChange] = React.useState(new Date());
  const [selectedContractLength, setContractLength] = React.useState("12");
  const contractLengths = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24",">24"];
  const [selectedBedrooms, setBedrooms] = React.useState("1");
  const roomAmounts = ["1","2","3","4","5","6","7","8","9","10"];
  const [billsState, setBillsState] = React.useState({Energy:false,Water:false,Internet:false,TVLicense:false});
  const {Energy,Water,Internet,TVLicense} = billsState;

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

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.new_listing_button} onClick={display_box}>
        Add Listing
      </Button>
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
      			       <TextField id="owner_name" fullWidth variant="outlined" label="Owner Name" className={classes.input_field}/>
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                  <TextField id="address_line_one" fullWidth variant="outlined" label="Address Line One" className={classes.input_field}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="address_town" fullWidth variant="outlined" label="Town/City" className={classes.input_field}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="address_county" fullWidth variant="outlined" label="County" className={classes.input_field}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField id="address_postcode" fullWidth variant="outlined" label="Postcode" className={classes.input_field}/>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtil}>
                    <KeyboardDatePicker id="available_from" disablePast disableToolbar fullWidth variant="inline" format="dd/MM/yyyy" label="Available From" className={classes.input_field} value={selectedFromDate} onChange={date => handleFromDateChange(date)}/>
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
                  <TextField id="description" fullWidth variant="outlined" label="Description" multiline rows="5" className={classes.input_field}/>
                </Grid>
                <Grid item xs={4}>
                  <input id="imageupload" accept="image/*" multiple type="file" className={classes.input_field}/>
                  <label htmlFor="imageupload">
                    <Button variant="contained" color="primary" style={{height: '50px',width: '100%', margin: '40px 0 10px 0'}}>
                       Upload Images
                    </Button>
                  </label>
                </Grid>
              </Grid>
              <Grid container justify="space-evenly" alignItems="flex-start" spacing={2} xs={4}>
                <Grid item xs={12}>
                  <TextField id="price" fullWidth variant="outlined" label="Price PCM (£)" className={classes.input_field}/>
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
                    <FormControlLabel control={<Checkbox checked={TVLicense} onChange={handleBillsBoxChange('TVLicense')} value="TVLicense" />} label="TV License"/>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="agency" fullWidth variant="outlined" label="Agency Name" className={classes.input_field}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="phone" fullWidth variant="outlined" label="Phone" className={classes.input_field}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="email" fullWidth variant="outlined" label="Email" className={classes.input_field}/>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" style={{height: '50px',width: '100%', margin: '40px 0 10px 0'}}>
                     Add
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" style={{height: '50px',width: '100%', margin: '40px 0 10px 0'}} onClick={hide_box}>
            			   Cancel
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
