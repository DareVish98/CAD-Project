import React, { Component } from 'react';
import SimpleMap from './map';
import SearchField from './search';
import Login_Reg_Button from './login_register';

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
