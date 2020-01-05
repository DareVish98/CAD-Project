import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import houseLogo from './icons/house.png';
import facilityLogo from './icons/facility.png';

//Set to central location in Southampton
let pos = {
	lat:50.925593,
	lng:-1.407550
};

//TODO: create custom markers for 'SECONDARY' map and maybe edit the way the routes look (also figure out zoom and center issue after routes load)
//TODO: display real locations

class SimpleMap extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        zoomMain: 13,
        zoomSec: 15
    };

    renderMap(map, maps) {
        if (this.props.mapType === 'MAIN') {
            for (let i = 0; i < this.props.routes.length; i++) {
                let marker = new maps.Marker({
                    position: this.props.routes[i].pos,
                    map: map,
                    title: this.props.routes[i].tag,
                    icon: {
                        url: houseLogo,
                        scaledSize: {
                            width: 40,
                            height: 40
                        }
                    }
                });
            }
        }
        else {
            let amenities = [];
            if (this.props.mapType === 'SECONDARY') {
                let directionsService = new maps.DirectionsService();
                for (let i = 1; i < this.props.routes.length; i++) {
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
                    directionsRenderer.setMap(map);
                    let request = {
                        origin: this.props.routes[0].pos,
                        destination: this.props.routes[i].pos,
                        travelMode: "WALKING"
                    };
                    directionsService.route(request, (result, status) => {
                        if (status === 'OK') {
                            //Limiting the radius to 1500 m
                            if (result.routes[0].legs[0].distance.value < 1500) {
                                directionsRenderer.setDirections(result);
                                amenities.push({
                                    tag: this.props.routes[i].tag,
                                    distance: result.routes[0].legs[0].distance.value
                                });
                            }
                        }
                    });
                }
                let marker = new maps.Marker({
                    position: this.props.routes[0].pos,
                    map: map,
                    title: this.props.routes[0].tag,
                    icon: {
                        url: houseLogo,
                        scaledSize: {
                            width: 40,
                            height: 40
                        }
                    }
                });
                for (let i = 1; i < this.props.routes.length; i++) {
                    let marker = new maps.Marker({
                        position: this.props.routes[i].pos,
                        map: map,
                        title: this.props.routes[i].tag,
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
                },500);
            }
        }
    }

    render() {
        if (this.props.mapType === 'MAIN') {
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
            if (this.props.mapType === 'SECONDARY') {
                return (
                    // Important! Always set the container height explicitly
                    <div style={{height: '100vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyDjey9xfdZk_i75f3HqX66p0UnJn-1JqSs'}}
                            defaultCenter={this.props.routes[0].pos}
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