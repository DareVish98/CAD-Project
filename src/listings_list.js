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

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    }
}));

function createData(name) {
    return {name};
}

const listings = [
    createData("listingOneeeeeeeeeeeee"),
    createData('listing2'),
    createData('listing3'),
    createData('listing4')
];

export default function ListingList()
{
    const classes = useStyles();

    return(
        <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                Your listings
            </Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {listings.map(row => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" style={{marginRight: 1}}>
                                        Edit details
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}