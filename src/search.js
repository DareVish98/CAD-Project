import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

//unfinished, for handling response from server
var words = [{content: 'word1'},{content: 'word2'}]
const display_list = () => {
	return (
		words.map( word => {
			return (
				<ListItem button>
				<ListItemText primary={word.content} />
				</ListItem>
			);
		})
	);
};

function handleSubmit() {
	
}

export default function SearchField() {
  const classes = useStyles();
  
  function handleSubmit(e) {
	  e.preventDefault();
  }
  return (
	<Paper className={classes.search_container}>
    <form onSubmit={handleSubmit}>
      <TextField id="search_input" label="Postcode Or Address" variant="outlined" className={classes.search_form}/>
    </form>
	<List className="list_item">
	{display_list()}
	</List>
	</Paper>
  );
};