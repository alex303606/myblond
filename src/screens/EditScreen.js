import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { editItemList, selectItem } from '../store/actions/list';
import { connect } from 'react-redux';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 3,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: 'white',
		flexGrow: 1,
	},
	row: {
		marginBottom: 20,
	},
	textStyle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	}
});

class EditScreen extends Component {
	static propTypes = {
		editItemList: PropTypes.func.isRequired,
		selectItem: PropTypes.func.isRequired,
		item: PropTypes.object.isRequired,
	};
	
	state = {
		id: 0,
		name: '',
		amount: '0',
		brand: '',
		clientPrice: '0',
		myPrice: '0',
	};
	
	
	componentDidMount() {
		if (!this.props.item) {
			return;
		}
		
		this.setState({...this.props.item});
	}
	
	
	changeValue = (field) => (value) => {
		this.setState({[field]: value});
	};
	
	render() {
		if (!this.props.item) {
			return <View/>;
		}
		const {name, amount, brand, clientPrice, myPrice} = this.state;
		
		return (
			<ScreenContainer>
				<KeyboardAwareScrollView
					enableOnAndroid={true}
					extraScrollHeight={30}
					contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}
				>
					<View style={styles.row}>
						<Text style={styles.label}>Название:</Text>
						<TextInput
							multiline
							value={name}
							placeholder='Введите название:'
							onChangeText={this.changeValue('name')}
							underlineColorAndroid='transparent'
							blurOnSubmit
							placeholderTextColor='rgba(56,63,67,1)'
							style={styles.input}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Бренд:</Text>
						<TextInput
							value={brand}
							placeholder='Введите бренд:'
							onChangeText={this.changeValue('brand')}
							underlineColorAndroid='transparent'
							blurOnSubmit
							placeholderTextColor='rgba(56,63,67,1)'
							style={styles.input}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Количество:</Text>
						<TextInput
							multiline
							value={amount}
							placeholder='Введите количество:'
							onChangeText={this.changeValue('amount')}
							underlineColorAndroid='transparent'
							blurOnSubmit
							placeholderTextColor='rgba(56,63,67,1)'
							style={styles.input}
							keyboardType={'numeric'}
							maxLength={3}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Своя цена:</Text>
						<TextInput
							multiline
							value={myPrice}
							placeholder='Введите своя цену:'
							onChangeText={this.changeValue('myPrice')}
							underlineColorAndroid='transparent'
							blurOnSubmit
							placeholderTextColor='rgba(56,63,67,1)'
							style={styles.input}
							keyboardType={'numeric'}
							maxLength={4}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Продажная цена:</Text>
						<TextInput
							multiline
							value={clientPrice}
							placeholder='Введите продажную цену:'
							onChangeText={this.changeValue('clientPrice')}
							underlineColorAndroid='transparent'
							blurOnSubmit
							placeholderTextColor='rgba(56,63,67,1)'
							style={styles.input}
							keyboardType={'numeric'}
							maxLength={4}
						/>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<Button
							title='Отмена'
							onPress={this.navigationBackHandler}
							buttonStyle={{
								backgroundColor: 'red',
								width: '45%',
							}}
							textStyle={styles.textStyle}
						/>
						<Button title='Сохранить'
								onPress={this.saveItem}
								buttonStyle={{
									backgroundColor: 'green',
									width: '45%',
								}}
								textStyle={styles.textStyle}
						/>
					</View>
				</KeyboardAwareScrollView>
			</ScreenContainer>
		);
	};
	
	navigationBackHandler = () => {
		this.props.navigation.navigate('List');
		return this.props.selectItem({});
	};
	
	saveItem = () => {
		const {id, name, amount, brand, clientPrice, myPrice} = this.state;
		this.props.editItemList(id, {name, amount, brand, clientPrice, myPrice});
		this.navigationBackHandler();
	};
}

const mapStateToProps = state => ({
	item: state.list.selectedItem,
});

const mapDispatchToProps = dispatch => ({
	editItemList: (index, item) => dispatch(editItemList(index, item)),
	selectItem: (item) => dispatch(selectItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);
