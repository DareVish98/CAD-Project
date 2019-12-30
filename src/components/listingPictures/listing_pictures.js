import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles(theme => ({
    pictures_button: {
        position: 'fixed',
        right: '4%',
        top: '2%',
        float: 'right',
        backgroundColor: '#404040',
        color: '#FFFFFF'
    },
    pictures_box_container: {
        width: 600,
        height: 620,
        position: 'fixed',
        top: '10%',
        left: '30%',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    pictures_inner_container: {
        width: 2000,
        height: 570,
        overflow: 'auto',
        transition: '1s',
        display: 'flex',
        flexDirection: 'column',
        color: '#222222'
    }
}));

//TODO: load real images from backend
let sample = [{image: 'https://wickes.scene7.com/is/image/travisperkins/GPID_1100100003_02?wid=824&hei=618&fit=crop', tag: 'kitchen'},
    {image: 'https://s3-eu-west-2.amazonaws.com/homebuilding-assets/prodwebsite/content/uploads/2016/05/22100703/contemporary-bathroom-with-exposed-brick-wall.jpg', tag: 'bathroom'},
    {image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/minimalist-eclectic-living-room-1554401627.jpg', tag: 'living room'}];
const pictures = () => {
    return (
        sample.map( picture => {
            return (
                <Card style={{padding: '1%', margin: '1%', width: 530, minHeight: 400}}>
                    <CardMedia style={{width: '100%', height: '100%'}}
                        component="img"
                        alt = {picture.tag}
                        src = {picture.image}
                        title = {picture.tag}
                    />
                </Card>
            );
        })
    );
};

export default function Listing_Pictures() {
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
            <Button variant="contained" color="primary" className={classes.pictures_button} onClick={display_box}>
                Pictures
            </Button>
            {open? (
                <Paper className={classes.pictures_box_container}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{ fontSize: 20, paddingLeft: '5%'}}>Listing Pictures:</p>
                        <CloseIcon style={{ fontSize: 40, cursor: 'pointer', paddingLeft: '66.2%',color: 'grey'}} onClick={hide_box}/>
                    </div>
                    <div className={classes.pictures_inner_container}>
                        {pictures()}
                    </div>
                </Paper>
            ): null}
        </div>
    );
}