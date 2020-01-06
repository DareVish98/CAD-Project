import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import houseLogo from './icons/house.png';
import facilityLogo from './icons/facility.png';

//Set to central location in Southampton
let pos = {
	lat:50.925593,
	lng:-1.407550
};

class SimpleMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes,
            mapType: this.props.mapType
        }
    }

    static defaultProps = {
        zoomMain: 13,
        zoomSec: 15
    };

    componentDidUpdate(prevProps) {
        const routes = this.props.routes;

        if (routes !== prevProps.routes) {
            this.setState({routes: routes});
            this.setState({mapType: this.props.mapType});
        }
    }

    renderMap(map, maps) {
        setTimeout(() => {
            if (this.state.mapType === 'MAIN') {
                for (let i = 0; i < this.state.routes.length; i++) {
                    let title = this.state.routes[i].address + ' ' + this.state.routes[i].postcode;
                    let marker = new maps.Marker({
                        position: {
                            lat: this.state.routes[i].lat,
                            lng: this.state.routes[i].lng,
                        },
                        map: map,
                        title: title,
                        icon: {
                            url: houseLogo,
                            scaledSize: {
                                width: 40,
                                height: 40
                            }
                        }
                    });
                }
            } else {
                let amenities = [];
                if (this.state.mapType === 'SECONDARY') {
                    let directionsService = new maps.DirectionsService();
                    for (let i = 1; i < this.state.routes.length; i++) {
                        let directionsRenderer = new maps.DirectionsRenderer();
                        directionsRenderer.setOptions({
                            preserveViewport: true,
                            markerOptions: {
                                visible: false
                            },
                            polylineOptions: {
                                strokeColor: 'purple',
                                strokeOpacity: 0.6,
                                strokeWeight: 8
                            }
                        });
                        map.setCenter(this.state.routes[0].pos);
                        directionsRenderer.setMap(map);
                        let request = {
                            origin: this.state.routes[0].pos,
                            destination: {
                                lat: this.state.routes[i].lat,
                                lng: this.state.routes[i].lng
                            },
                            travelMode: "WALKING"
                        };
                        directionsService.route(request, (result, status) => {
                            if (status === 'OK') {
                                //Limiting the radius to 1500 m
                                if (result.routes[0].legs[0].distance.value < 1500) {
                                    directionsRenderer.setDirections(result);
                                    amenities.push({
                                        tag: this.state.routes[i].tag,
                                        distance: result.routes[0].legs[0].distance.value
                                    });
                                }
                            }
                        });
                    }
                    let marker = new maps.Marker({
                        position: this.state.routes[0].pos,
                        map: map,
                        title: this.state.routes[0].tag,
                        icon: {
                            url: houseLogo,
                            scaledSize: {
                                width: 40,
                                height: 40
                            }
                        }
                    });
                    for (let i = 1; i < this.state.routes.length; i++) {
                        let marker = new maps.Marker({
                            position: {
                                lat: this.state.routes[i].lat,
                                lng: this.state.routes[i].lng
                            },
                            map: map,
                            title: this.state.routes[i].tag,
                            icon: {
                                url: facilityLogo,
                                scaledSize: {
                                    width: 40,
                                    height: 40
                                }
                            }
                        });
                    }
                    setTimeout(() => {
                        this.props.onLoadAmenities(amenities);
                    }, 500);
                }
            }
        }, 1000);
    }


    render() {
        if (this.state.mapType === 'MAIN') {
            return (
                // Important! Always set the container height explicitly
                <div style={{height: '100vh', width: '100%'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: 'AIzaSyCEiD8oRAMONUJGI9OAgPNYwa7x7oR5uGc'}}
                        defaultCenter={pos}
                        defaultZoom={this.props.zoomMain}
                        options={{fullscreenControl: false}}
                        onGoogleApiLoaded={({map, maps}) => this.renderMap(map, maps)}
                        yesIWantToUseGoogleMapApiInternals
                    />
                </div>
            );
        } else {
            if (this.state.mapType === 'SECONDARY') {
                return (
                    // Important! Always set the container height explicitly
                    <div style={{height: '100vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyCEiD8oRAMONUJGI9OAgPNYwa7x7oR5uGc'}}
                            defaultCenter={pos}
                            defaultZoom={this.props.zoomSec}
                            options={{fullscreenControl: false}}
                            onGoogleApiLoaded={({map, maps}) => this.renderMap(map, maps)}
                            yesIWantToUseGoogleMapApiInternals
                        />
                    </div>
                );
            }
        }
    }
}

export default SimpleMap;