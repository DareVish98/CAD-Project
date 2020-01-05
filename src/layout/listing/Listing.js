import React, { Component } from 'react';
import SimpleMap from '../../components/map/map';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AmenitiesList from "../../components/amenitiesList/amenities";
import Listing_Details from "../../components/listingDetails/listing_details";
import RatingBox from "../../components/listingReviews/Rating";
import Listing_Pictures from "../../components/listingPictures/listing_pictures";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

//TODO: Load real locations from back end
let locations = [{pos: {lat: 50.909, lng: -1.397}, tag: "house1"},
    {pos: {lat: 50.9105, lng: -1.4}, tag: "house2"},
    {pos: {lat: 50.91, lng: -1.39}, tag: "house3"},
    {pos: {lat: 50.905, lng: -1.405}, tag: "house4"}];

class Listing extends Component {

    constructor(props) {
        super(props);
        this.state = { amenities: [] };
    }

    handleAmenities = (amenities) => {
        this.setState({ amenities: amenities });
    };

    render() {
        return (
            <div>
                <SimpleMap mapType={'SECONDARY'} routes={locations} onLoadAmenities={this.handleAmenities}/>
                <Paper
                    style={{width: '400px', position: 'fixed', top: '2%', left: '2%', backgroundColor: '#404040'}}>
                    <Typography component={"p"} style={{margin: '2%', textAlign: "center", color: '#FFFFFF'}}>
                        Listing {this.props.match.params.id} - 450£/month
                    </Typography>
                </Paper>
                <AmenitiesList amenities={this.state.amenities}/>
                <Listing_Details/>
                <RatingBox name={locations[0].tag}/>
                <Listing_Pictures/>
                <Paper>
                    <Link to={"/"}>
                        <Button variant="contained" color="primary" style={{position: 'fixed', top: '2%', right: '3%'}}>
                            Main Page
                        </Button>
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default Listing