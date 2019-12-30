import React from "react";
import Typography from "@material-ui/core/Typography";
import {TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import Edit_Listing_Button from "../editListing/editListing";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        width: 620,
        height: 540
    }
}));

function createData(name) {
    return {name};
}

//TODO: Link actual listings using axios
//TODO: Create Delete function and update backend with axios

const listings = [
    createData("listingOneeeeeeeeeeeee"),
    createData('listing2'),
    createData('listing3'),
    createData('listing4'),
    createData('listing3'),
    createData('listing3'),
    createData('listing3'),
    createData('listing3'),
    createData('listing3'),
    createData('listing3'),
    createData('listing3'),
    createData('listing3')
];

export default function ListingList()
{
    const classes = useStyles();

    return(
        <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                Your listings
            </Typography>
            <TableContainer style={{overflowY: 'scroll', height: '500px'}}>
                <Table>
                    <TableBody>
                        {listings.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component={Link} to={'/listing=' + row.name}>
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <Edit_Listing_Button/>
                                        <Button variant="contained" style={{backgroundColor: '#DC143C', color: '#FFFFFF', fontSize: 12}}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}