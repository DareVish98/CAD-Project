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
import axios from "axios";

class Listing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amenities: [],
            listing: {},
            locations: [],
            pictures: []
        };
        this.getListing();
        this.getLocations();
    }

    handleAmenities = (amenities) => {
        this.setState({ amenities: amenities });
    };

    async getListing() {
        await axios.get('http://localhost:8000/api/listings/' + this.props.match.params.id + '/')
            .then((response) => {
                this.setState({listing: response.data});
                let location = {
                    pos: {
                        lat: response.data.lat,
                        lng: response.data.lng,
                    },
                    tag: response.data.address + ' ' + response.data.postcode,
                    address: response.data.address
                };
                this.setState({locations: [response.data]});
                let pictures = [
                    {
                        data: response.data.image1_data,
                        tag: response.data.image1_tag
                    },
                    {
                        data: response.data.image2_data,
                        tag: response.data.image2_tag
                    },
                    {
                        data: response.data.image3_data,
                        tag: response.data.image3_tag
                    }
                ];
                this.setState({ pictures: pictures } );
            }).catch((error) => {
                if (error.response) {
                    alert(error.response.status + ' request failed: ' + error.response.data);
                } else {
                    alert('Request failed: ' + error.message);
                }
            });
    }

    async getLocations() {
        await axios.get('http://localhost:8000/api/amenities/' + this.props.match.params.id + '/')
            .then((response) => {
                let aux = this.state.locations;
                aux.concat(response.data);
                this.setState({locations: aux});
            }).catch((error) => {
                if (error.response) {
                    alert(error.response.status + ' request failed: ' + error.response.data);
                } else {
                    alert('Request failed: ' + error.message);
                }
            });
    }

    render() {
        return (
            <div>
                <SimpleMap mapType={'SECONDARY'} routes={this.state.locations} onLoadAmenities={this.handleAmenities}/>
                <Paper
                    style={{width: '400px', position: 'fixed', top: '2%', left: '2%', backgroundColor: '#404040'}}>
                    <Typography component={"p"} style={{margin: '2%', textAlign: "center", color: '#FFFFFF'}}>
                        Listing {this.props.match.params.id} - 450£/month
                    </Typography>
                </Paper>
                <AmenitiesList amenities={this.state.amenities}/>
                <Listing_Details details={this.state.listing}/>
                <RatingBox name={this.state.locations[0].tag} address={this.state.listing.address}/>
                <Listing_Pictures images={this.state.pictures}/>
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