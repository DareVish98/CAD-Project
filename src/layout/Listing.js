import React, { Component } from 'react';
import SimpleMap from '../components/map';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AmenitiesList from "../components/amenities";
import Listing_Details from "../components/listing_details";

class Listing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SimpleMap />
                <Paper style={{width: '400px', position: 'fixed', top: '2%', left: '2%', backgroundColor:'#404040'}}>
                    <Typography component={"p"} style={{margin: '2%', textAlign: "center", color:'#FFFFFF'}}>
                        Listing {this.props.match.params.id} - 450£/month
                    </Typography>
                </Paper>
                <AmenitiesList/>
                <Listing_Details/>
            </div>
        );
    }
}


export default Listing