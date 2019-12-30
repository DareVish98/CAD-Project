import React, { Component } from 'react';
import SimpleMap from '../../components/map/map';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AmenitiesList from "../../components/amenitiesList/amenities";
import Listing_Details from "../../components/listingDetails/listing_details";
import RatingBox from "../../components/listingReviews/Rating";
import Listing_Pictures from "../../components/listingPictures/listing_pictures";

class Listing extends Component {

    constructor(props) {
        super(props);
    }

    //TODO: Maybe add LOG OUT / Main Page button

    render() {
        return (
            <div>
                <SimpleMap mapType={'SECONDARY'}/>
                <Paper style={{width: '400px', position: 'fixed', top: '2%', left: '2%', backgroundColor:'#404040'}}>
                    <Typography component={"p"} style={{margin: '2%', textAlign: "center", color:'#FFFFFF'}}>
                        Listing {this.props.match.params.id} - 450£/month
                    </Typography>
                </Paper>
                <AmenitiesList/>
                <Listing_Details/>
                <RatingBox/>
                <Listing_Pictures/>
            </div>
        );
    }
}


export default Listing