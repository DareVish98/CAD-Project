import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Review from './review';
import AddReview from './add_review'
import axios from "axios";

const useStyles = makeStyles(theme => ({
    reviews_button: {
        position: 'fixed',
        right: '42%',
        top: '2%',
        float: 'right',
        backgroundColor: '#404040',
        color: '#FFFFFF'
    },
    review_container: {
        width: 600,
        height: 620,
        background: 'white',
        position: 'fixed',
        top: '10%',
        left: '30%',
        overflow: 'hidden',
    },
    inner_container: {
        width: 1500,
        height: 570,
        position: 'absolute',
        transition: '1s',
        zIndex: '-1'
    },
    close_button: {
        fontSize: 40,
        cursor: 'pointer',
        float: 'right',
        color: 'grey',
    },
}));

export default function RatingBox({listing}) {
    const classes = useStyles();
    const [isExpand, setIsExpand] = React.useState(false);
    const [isView, setIsView] = React.useState(true);
    const [reviews, setReviews] = React.useState({});
    let margin_x;
    const [value, setValue] = React.useState(listing);

    useEffect(() => { setValue(listing); getListings(); }, [listing]);

    const view = {
        margin: '0 0 0 0'
    };
    const add = {
        margin: '0 0 0 -700px'
    };

    if (isView) {
        margin_x = view;
    } else {
        margin_x = add;
    }

    const expand_collapse_box = () => {
        setIsExpand(!isExpand);
    };

    const jump = () => {
        setIsView(!isView);
    };

    const logged = () => {
        return localStorage.getItem("username") === '' && localStorage.getItem("password") === '';
    };

    async function getListings() {
        await axios.get('http://localhost:8000/reviews/' + listing.address + '/')
            .then((response) => {
                setReviews(response.data);
            }).catch( (error) => {
                if (error.response) {
                    alert(error.response.status + ' request failed: ' + error.response.data);
                } else {
                    alert('Request failed: ' + error.message);
                }
            });
    }

    let check = true;
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].reviewer === localStorage.getItem("username")) {
            let edit = reviews[i];
            check = false;
            return (
                <div>
                    <Button variant="contained" color="primary" className={classes.reviews_button}
                            onClick={expand_collapse_box}>Reviews</Button>
                    {isExpand ? (
                        <Paper className={classes.review_container}>
                            <CloseIcon className={classes.close_button} onClick={expand_collapse_box}/>
                            <div style={margin_x} className={classes.inner_container}>
                                <div style={{float: 'left'}}>
                                    <Review res={reviews}/>
                                    <Button color="primary" style={{margin: '18px 0 30px 450px'}} onClick={jump}>Edit
                                        Review</Button>
                                </div>
                                <div style={{float: 'left'}}>
                                    <AddReview review={edit} listing={value}/>
                                    <Button color="primary" style={{margin: '18px 0 30px 140px'}}
                                            onClick={jump}>Back</Button>
                                </div>

                            </div>
                        </Paper>
                    ) : null}
                </div>
            );
        }
    }
    if (check) {
        return (
            <div>
                <Button variant="contained" color="primary" className={classes.reviews_button}
                        onClick={expand_collapse_box}>Reviews</Button>
                {isExpand ? (
                    <Paper className={classes.review_container}>
                        <CloseIcon className={classes.close_button} onClick={expand_collapse_box}/>
                        <div style={margin_x} className={classes.inner_container}>
                            <div style={{float: 'left'}}>
                                <Review res={reviews}/>
                                <Button color="primary" disabled={logged()} style={{margin: '18px 0 30px 450px'}} onClick={jump}>Add Review</Button>
                            </div>
                            <div style={{float: 'left'}}>
                                <AddReview review={{username: '', rating: 5, description: ''}} listing={value}/>
                                <Button color="primary" style={{margin: '18px 0 30px 140px'}}
                                        onClick={jump}>Back</Button>
                            </div>

                        </div>
                    </Paper>
                ) : null}
            </div>
        );
    }
}