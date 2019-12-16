import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

var pos = {
	lat:59.95,
	lng:30.33
};
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;
	});
}

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 11
  };
  
  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: pos,
      map: map,
      title: 'Hello World!'
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDjey9xfdZk_i75f3HqX66p0UnJn-1JqSs' }}
          defaultCenter={pos}
		  defaultZoom={this.props.zoom}
		  options={{fullscreenControl: false}}
		  onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
		  yesIWantToUseGoogleMapApiInternals
        >
  
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;