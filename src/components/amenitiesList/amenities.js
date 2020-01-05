import React, {useEffect, useState} from 'react';
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

const display_list = (amenities) => {
    return (
        amenities.map( amenity => {
            return (
                <ListItem>
                    <ListItemText primary={amenity.tag + ' - ' + amenity.distance + 'm'}/>
                </ListItem>
            );
        })
    );
};

export default function AmenitiesList({amenities}) {
    const classes = useStyles();
    const [value, setValue] = useState(amenities);

    useEffect(() => { setValue(amenities) }, [amenities]);

    return (
        <Paper className={classes.amenities_container}>
            <div className={classes.title}>
                Amenities:
            </div>
            <List>
                {display_list(value)}
            </List>
        </Paper>
    );
};