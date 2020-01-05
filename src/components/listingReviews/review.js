import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    inner_container: {
        margin: '40px 0 0 40px',
        width: 550,
    },
    comment_container: {
        width: 520,
        height: 350,
        margin: '10px 0 0 0',
        overflowY: 'auto'
    },
}));

export default function Review({res}) {
    const classes = useStyles();
    const [isAdd, setIsOpen] = React.useState(false);

    const close_box = () => {
        setIsOpen(false);
    };

    let overall_rating = () => {
        let overall_rating = 0;
        for (let i = 0; i < res.length; i++) {
            overall_rating = overall_rating + res[i].rating;
        }
        return (parseFloat(overall_rating/res.length).toFixed(1));
    };

    const display_comment = () => {
        return (
            res.map( (item, index) => {
                return (
                    <div>
                        <Grid>
                            <Typography variant="subtitle1" style={{display:'block'}}>
                                {item.reviewer}: {item.rating}/5 stars
                            </Typography>
                            <Typography variant="body2" style={{display:'block',padding:'10px 0 20px 20px'}}>
                                {item.comment}
                            </Typography>
                        </Grid>
                        <Divider light />
                    </div>
                )
            })
        );
    };

    return (
        <div>
            {!isAdd? (
                <div className={classes.inner_container}>
                    <Typography variant="h5">
                        Rating
                    </Typography>
                    <div style={{display:'block', margin:'10px 0 10px 0'}}>
                        <Rating name="overall"
                                value={overall_rating()}
                                precision={0.1}
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                size="large"
                                readOnly />
                    </div>
                    <Typography variant="h6">
                        {overall_rating()}/5.0
                    </Typography>

                    <List className={classes.comment_container}>
                        {display_comment()}
                    </List>
                </div>
            ): null}
        </div>
    );
}