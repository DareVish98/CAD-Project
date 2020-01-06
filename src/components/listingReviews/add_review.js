import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    inner_container: {
        margin: '70px 0 0 150px',
        width: 550,
    },
    input_field: {
        width: 520,
        display: 'block',
        margin: '20px 0 0 0',
    }
}));

export default function AddReview({review, listing}) {
    const classes = useStyles();

    const [value, setValue] = React.useState(review.rating);
    const [hoverValue, setHoverValue] = React.useState(-1);
    const [comment, setComment] = React.useState(review.description);
    const [data, setData] = React.useState(listing);

    useEffect(() => { setData(listing) }, [listing]);

    async function submitReview() {
        await axios.post(
            'http://localhost:8000/api/postreview/',
            {username: localStorage.getItem('username'), address: data.address, rating: value, description: comment},
            {headers: {'Content-Type': 'application/json'}}
        ).then( () => {
            alert("Your review has been submitted");
        }).catch( (error) => {
            if (error.response) {
                alert(error.response.status + ' request failed: ' + error.response.data);
            } else {
                alert('Request failed: ' + error.message);
            }
        });
    }

    return (
        <div className={classes.inner_container}>
            <Typography variant='h5'>
                Rate {data.address + ', ' + data.postcode}
            </Typography>
            <form>
                <Rating
                    name="rating"
                    id="rating"
                    value={value}
                    precision={0.5}
                    size='large'
                    style={{margin: '10px 0 10px 0'}}
                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    onChange={(e, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(e, newhoverValue) => {
                        setHoverValue(newhoverValue);
                    }}
                />
                <Typography variant="overline"
                            style={{marginLeft: 10}}>{hoverValue === -1 ? value : hoverValue}/5</Typography>
                <TextField
                    id="comment"
                    value={comment}
                    className={classes.input_field}
                    onChange={e => setComment(e.target.value)}
                    label="Your Comment"
                    multiline
                    variant="outlined"
                    fullWidth
                    rows={14}
                />
                <Button color="primary" variant="contained" style={{float: 'right', margin: '18px 40px 0 0'}}
                        onClick={() => submitReview()}>Submit</Button>
            </form>
        </div>
    );
}