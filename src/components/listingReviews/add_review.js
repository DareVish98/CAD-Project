import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

//TODO: create submit function that saves review to backend
let name = "Grand View House";
export default function AddReview() {
    const classes = useStyles();
    const [value, setValue] = React.useState(5);
    const [hoverValue, setHoverValue] = React.useState(-1);

    return (
        <div className={classes.inner_container}>
            <Typography variant='h5'>
                Rate {name}
            </Typography>
            <form>
                <Rating
                    name="rating"
                    id="rating"
                    value={value}
                    precision={0.5}
                    size='large'
                    style={{margin: '10px 0 10px 0'}}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    onChange={(e, newValue) => {setValue(newValue);}}
                    onChangeActive={(e, newhoverValue) => {setHoverValue(newhoverValue);}}
                />
                <Typography variant="overline" style={{marginLeft: 10}}>{hoverValue === -1 ? value : hoverValue}/5</Typography>
                <TextField
                    id="comment"
                    className={classes.input_field}
                    label="Your Comment"
                    multiline
                    variant="outlined"
                    fullWidth
                    rows={14}
                />
                <Button color="primary" variant="contained" style={{float:'right', margin: '18px 40px 0 0'}}>Submit</Button>
            </form>
        </div>
    );
}