import React, { Component } from 'react';
import SimpleMap from '../../components/map/map';
import SearchField from '../../components/searchBar/search';
import Login_Reg_Button from '../../components/login/login_register';

class App extends Component {
	render() {
		return(
    <div id="map_search">
        <SimpleMap />
		<SearchField />
		<Login_Reg_Button />
	</div>
		);
	}
}
export default App;
