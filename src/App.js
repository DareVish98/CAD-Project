import React, { Component } from 'react';
import SimpleMap from './map';
import SearchField from './search';
import Login_Reg_Button from './login_register';
import New_Listing_Button from './new_listing'; //------------------------------

class App extends Component {
	render() {
		return(
    <div id="map_search">
        <SimpleMap />
		<SearchField />
		<Login_Reg_Button />
		<New_Listing_Button /> //-------------------------------------------------
	</div>
		);
	}
}
export default App;
