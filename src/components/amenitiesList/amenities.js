import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    amenities_container: {
        width: 200,
        position: 'fixed',
        top: '15%',
        left: '2%',
        backgroundColor: '#404040',
        color: '#FFFFFF',
    },
    title: {
        margin: '5%',
        fontSize: '120%',
        padding: '2%',
    }
}));

//TODO: load real amenities from backend
let amenities = [{content: 'Shop - 800m'},{content: 'Gym - 1km'},{content: 'University - 500m'}];
const display_list = () => {
    return (
        amenities.map( amenity => {
            return (
                <ListItem>
                    <ListItemText primary={amenity.content}/>
                </ListItem>
            );
        })
    );
};

export default function AmenitiesList() {
    const classes = useStyles();

    return (
        <Paper className={classes.amenities_container}>
            <div className={classes.title}>
                Amenities:
            </div>
            <List>
                {display_list()}
            </List>
        </Paper>
    );
};