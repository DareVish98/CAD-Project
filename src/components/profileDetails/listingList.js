import React from "react";
import Typography from "@material-ui/core/Typography";
import {TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import Edit_Listing_Button from "../editListing/editListing";
import axios from "axios";

export default class ListingList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            listings: props.list
        };
    }

    render()
    {
        return(
            <Paper style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", textAlign: 'center', width: 630, height: 562}}>
                <Typography variant="h6" gutterBottom>
                    Your listings
                </Typography>
                <TableContainer style={{overflowY: 'scroll', height: '500px'}}>
                    <Table>
                        <TableBody>
                            {this.state.listings.map(row => (
                                <TableRow key={row.address + ' ' + row.postcode}>
                                    <TableCell component={Link} to={'/listing=' + row.address}>
                                        {row.address + ' ' + row.postcode}
                                    </TableCell>
                                    <TableCell>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <Edit_Listing_Button details={row}/>
                                            <Button
                                                variant="contained"
                                                style={{backgroundColor: '#DC143C', color: '#FFFFFF', fontSize: 12}}
                                                onClick={
                                                    () => {
                                                        axios.delete("http://localhost:8000/listings/" + row.address)
                                                            .then(res => {
                                                                alert('Listing has been removed');
                                                            }).catch( (error) => {
                                                            if (error.response) {
                                                                alert(error.response.status + ' request failed: ' + error.response.data);
                                                            } else {
                                                                alert('Request failed: ' + error.message);
                                                            }
                                                        });
                                                    }
                                                }> Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
}