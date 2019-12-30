import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

let pos = {
	lat:59.95,
	lng:30.33
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;
	});
}

//TODO: create custom markers for 'SECONDARY' map and maybe edit the way the routes look (also figure out zoom and center issue after routes load)
//TODO: display real locations

let locations = [{pos: {lat: 51, lng: -1.35}, tag: "house1"}, {pos: {lat: 50.97, lng: -1.4}, tag: "house2"}, {pos: {lat: 50.94, lng: -1.33}, tag: "house3"}];
let routes = [{lat: 50.96, lng: -1.35}, {lat: 50.97, lng: -1.36}, {lat: 50.965, lng: -1.34}, {lat: 50.95, lng: -1.365}];

class SimpleMap extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        zoom: 11
    };

    renderMap(map, maps) {
        if (this.props.mapType === 'MAIN') {
            for (let i = 0; i < locations.length; i++) {
                let marker = new maps.Marker({
                    position: locations[i].pos,
                    map: map,
                    title: locations[i].tag
                });
            }
        }
        else {
            if (this.props.mapType === 'SECONDARY') {
                let directionsService = new maps.DirectionsService();
                map.origin = routes[0];
                for (let i = 0; i < routes.length; i++) {
                    let directionsRenderer = new maps.DirectionsRenderer();
                    directionsRenderer.setMap(map);
                    let request = {
                        origin: routes[0],
                        destination: routes[i],
                        travelMode: "WALKING"
                    };
                    directionsService.route(request, (result, status) => {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(result);
                        }
                    });
                }
            }
        }
    }

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyDjey9xfdZk_i75f3HqX66p0UnJn-1JqSs'}}
                    defaultCenter={pos}
                    defaultZoom={this.props.zoom}
                    options={{fullscreenControl: false}}
                    onGoogleApiLoaded={({map, maps}) => this.renderMap(map, maps)}
                    yesIWantToUseGoogleMapApiInternals
                />
            </div>
        );
    }
}

export default SimpleMap;