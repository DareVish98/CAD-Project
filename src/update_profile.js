import  React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ( {
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    input_field: {
        display: 'block',
        margin: '10px 0 0 0'
    }
}));

export default function UpdateProfile()
{
    const classes = useStyles();

    return(
        <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                Details
            </Typography>
            <form>
                <TextField id="username" fullWidth variant="outlined" label="Username" className={classes.input_field}/>
                <TextField id="password" fullWidth variant="outlined" label="Password" className={classes.input_field}/>
                <TextField id="new_password" fullWidth variant="outlined" label="New Password" className={classes.input_field}/>
                <TextField id="email" fullWidth variant="outlined" label="Email" className={classes.input_field}/>
                <TextField id="phone_number" fullWidth variant="outlined" label="Phone Number" className={classes.input_field}/>
                <TextField id="agency" fullWidth variant="outlined" label="Agency" className={classes.input_field}/>
                <br/>
                <Button variant="contained" color="primary" style={{marginLeft: -550}}>
                    Upload Profile Picture
                </Button>
                <Button variant="contained" color="primary" style={{float: "right"}}>
                    Update Profile
                </Button>
            </form>
        </Paper>
    );
}