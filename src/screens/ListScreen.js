import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity, Alert, TextInput, Keyboard } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { connect } from 'react-redux';
import { deleteItemList, selectItem, updateList } from '../store/actions/list';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import * as _ from 'lodash';

Icon.loadFont();
const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	itemBorder: {
		borderRightWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 5,
	},
	itemName: {
		width: '35%',
		justifyContent: 'flex-start',
	},
	itemAmount: {
		width: '13%',
	},
	itemMyPrice: {
		width: '16%',
	},
	itemClientPrice: {
		width: '16%',
	},
	itemButton: {
		width: '10%',
		borderRightWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 5,
	},
	button: {
		borderWidth: 1,
		borderRadius: 3,
		width: 28,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	header: {
		marginBottom: 10,
	},
	input: {
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 3,
		fontSize: 18,
		height: 35,
		flexGrow: 1,
		marginRight: 10,
	},
	clearBtn: {
		height: 35,
		width: 35,
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 3,
		paddingTop: 3,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 10,
	}
});

const Header = () => (
	<View style={[styles.item, {borderWidth: 1}]}>
		<View style={[styles.itemBorder, styles.itemName]}>
			<Text style={styles.headerText}>Название</Text>
		</View>
		<View style={[styles.itemBorder, styles.itemAmount]}>
			<Text style={styles.headerText}>Кол</Text>
		</View>
		<View style={[styles.itemBorder, styles.itemMyPrice]}>
			<Text style={styles.headerText}>СС</Text>
		</View>
		<View style={[styles.itemBorder, styles.itemClientPrice]}>
			<Text style={styles.headerText}>ЦК</Text>
		</View>
	</View>
);

class ListScreen extends Component {
	state = {
		searchValue: '',
		list: [],
		loading: false,
	};
	
	componentDidMount() {
		this.update();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if(_.isEqual(this.props.list, this.state.list)) {
			return;
		}
		this.setState({list: this.props.list});
	}
	
	handleRefresh = () => {
		this.update();
	};
	
	update = () => {
		this.setState({loading: true});
		this.props.updateList().then(() => {
			this.setState({loading: false, list: this.props.list});
		});
	};
	
	render() {
		return (
			<ScreenContainer>
				<View style={styles.header}>
					<Button onPress={this.addItemHandler} title='Добавить'/>
					<View style={styles.searchContainer}>
						<TextInput
							value={this.state.searchValue}
							placeholder='Поиск по название:'
							onChangeText={this.search}
							underlineColorAndroid='transparent'
							blurOnSubmit
							placeholderTextColor='rgba(56,63,67,1)'
							style={styles.input}
							maxLength={20}
						/>
						<View style={styles.clearBtn}>
							<TouchableOpacity style={{flex: 1}} onPress={this.clearSearch}>
								<Icon name="close" size={25} color="red"/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<Header/>
				<FlatList
					scrollEnabled={!!this.state.list.length}
					ListEmptyComponent={this.renderEmpty}
					keyExtractor={this.keyExtractor}
					data={this.state.list}
					renderItem={this.renderItem}
					horizontal={false}
					ItemSeparatorComponent={this.itemSeparator}
					onRefresh={this.handleRefresh}
					refreshing={this.state.loading}
					contentContainerStyle={{
						borderRightWidth: 1,
						borderLeftWidth: 1,
						borderBottomWidth: 1,
						flex: !!this.state.list.length ? 0 : 1
					}}
				/>
			</ScreenContainer>
		);
	}
	
	clearSearch = () => {
		this.setState({list: this.props.list, searchValue: ''});
		Keyboard.dismiss();
	};
	
	search = value => {
		this.setState({searchValue: value}, () => {
			const list = this.props.list.filter(x => {
				return !!x && x.name && x.name.toLowerCase().includes(value.toLowerCase());
			});
			this.setState({list});
		});
	};
	
	renderEmpty = () => (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={styles.title}>Пустой список</Text>
		</View>
	);
	
	renderItem = ({item}) => {
		return (
			<View style={styles.item}>
				<View style={[styles.itemBorder, styles.itemName]}>
					<Text>{item.name}</Text>
				</View>
				<View style={[styles.itemBorder, styles.itemAmount]}>
					<Text numberOfLines={1} ellipsizeMode={'tail'}>{item.amount}</Text>
				</View>
				<View style={[styles.itemBorder, styles.itemMyPrice]}>
					<Text numberOfLines={1} ellipsizeMode={'tail'}>{item.myPrice}</Text>
				</View>
				<View style={[styles.itemBorder, styles.itemClientPrice]}>
					<Text numberOfLines={1} ellipsizeMode={'tail'}>{item.clientPrice}</Text>
				</View>
				<View style={styles.itemButton}>
					<TouchableOpacity style={styles.button} onPress={this.deleteItem(item)}>
						<Icon name="trash" size={25} color="red"/>
					</TouchableOpacity>
				</View>
				<View style={[styles.itemButton, {borderRightWidth: 0}]}>
					<TouchableOpacity style={styles.button} onPress={this.editItem(item)}>
						<Icon name="pencil" size={25} color="blue"/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	
	itemSeparator = () => <View style={{borderBottomWidth: 1}}/>;
	
	keyExtractor = item => {
		return item.id;
	};
	
	editItem = item => () => {
		this.props.selectItem(item);
		return this.props.navigation.navigate('Edit');
	};
	
	deleteItem = item => () => {
		Alert.alert(
			`Уверены что хотите удалить`,
			item.name,
			[
				{
					text: 'Отмена',
					style: 'cancel',
				},
				{text: 'Удалить', onPress: () => this.props.deleteItemList(item.id)},
			],
			{cancelable: false},
		);
	};
	
	addItemHandler = () => this.props.navigation.navigate('Add');
}

const mapStateToProps = state => ({
	list: state.list.list,
});

const mapDispatchToProps = dispatch => (
	{
		updateList: () => dispatch(updateList()),
		deleteItemList: x => dispatch(deleteItemList(x)),
		selectItem: x => dispatch(selectItem(x)),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
