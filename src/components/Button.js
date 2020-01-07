import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		height: 35,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const Button = props => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[styles.button, props.buttonStyle]}
			onPress={props.onPress}>
			<Text style={props.textStyle}>{props.title}</Text>
		</TouchableOpacity>
	);
};

Button.propTypes = {
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	buttonStyle: PropTypes.object,
	textStyle: PropTypes.object,
};

export default Button;
