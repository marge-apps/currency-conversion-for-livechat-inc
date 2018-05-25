import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	largeField: {
		fontSize: '2.5rem',
		'&:before': {
			borderBottomColor: 'white'
		},
	},
})

export const LargeInput = withStyles(styles)(
	({classes}) => <TextField
		id="name"
		label="Name"
		// value="50.30"
		// onChange={this.handleChange('name')}
		margin="normal"
		autoComplete="false"
		fullWidth={true}
		label="USD $"
		defaultValue={0.00}
		InputProps={{
			classes: {
				input: classes.largeField,
				underline: classes.largeField
			}
		}}
	/>
)
