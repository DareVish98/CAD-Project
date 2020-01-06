import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  search_form: {
	margin: '14px 0 13px 4.7%',
	width: '90%',
  },
  search_container: {
    width: 350,
	position: 'fixed',
	top: '7%',
	left: '5%',
	backgroundColor: 'white',  
  },
}));

const display_list = (listings) => {
	return (
		listings.map( listing => {
			let label = listing.address + ', ' + listing.postcode;
			return (
				<ListItem button component={Link} to={'/listing=' + listing.address}>
				<ListItemText primary={label}/>
				</ListItem>
			);
		})
	);
};

export default function SearchField({listings}) {
  const classes = useStyles();
  const [values, setValues] = useState(listings);
  const [search, setSearch] = useState('');

	useEffect(() => { setValues(listings) }, [listings]);
  
  function handleSubmit(e) {
	  e.preventDefault();
	  let result = [];
	  if (search !== '') {
		  for (let i = 0; i < listings.length; i++) {
			  if (listings[i].postcode.includes(search) || listings[i].address.includes(search))
				  result.push(listings[i]);
		  }
		  setValues(result);
	  }
	  else {
	  	setValues(listings);
	  }
  }

  return (
	<Paper className={classes.search_container}>
    <form onSubmit={handleSubmit}>
      <TextField id="search_input" label="Postcode Or Address" variant="outlined" className={classes.search_form}
				 value={search} onChange={e => setSearch(e.target.value)}/>
    </form>
	<List className="list_item">
	{display_list(values)}
	</List>
	</Paper>
  );
};