import React from "react";
import UpdateProfile from './update_profile';
import ListingList from './listings_list';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    button_right: {
        float: 'right',
        marginRight: "1px"
    },
    title_page: {
        float: 'left'
    }
}));

export default function ProfilePage()
{
    const classes = useStyles();

    return(
            <Grid container spacing={3}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom className={classes.title_page}>
                        Profile
                    </Typography>
                    <Button variant="contained" color="secondary" className={classes.button_right}>
                        Log out
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_right}>
                        Main Page
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <UpdateProfile/>
                    <br/>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary">
                            Add Listing
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <ListingList/>
                </Grid>
            </Grid>
    )
}