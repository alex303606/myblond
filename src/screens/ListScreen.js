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
		borderWidth: 1,
		minHeight: 50,
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
		paddingVertical: 5,
		paddingHorizontal: 2,
	},
	itemName: {
		width: '34%',
		justifyContent: 'flex-start',
		paddingHorizontal: 5,
	},
	itemBrand: {
		width: '18%',
	},
	itemAmount: {
		width: '12%',
	},
	itemMyPrice: {
		width: '18%',
	},
	itemClientPrice: {
		width: '18%',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 14,
	},
	text: {
		fontSize: 14,
	},
	header: {
		marginBottom: 20,
	},
	input: {
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 3,
		fontSize: 18,
		height: 40,
		flexGrow: 1,
		marginRight: 10,
	},
	clearBtn: {
		height: 40,
		width: 40,
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 3,
		paddingTop: 5,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 20,
	},
	headerItem: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const Header = () => (
	<View style={[styles.item, {borderWidth: 1, marginBottom: 10}]}>
		<View style={[styles.itemBorder, styles.itemName, styles.headerItem]}>
			<Text style={styles.headerText}>Название</Text>
		</View>
		<View style={[styles.itemBorder, styles.itemBrand, styles.headerItem]}>
			<Text style={styles.headerText}>Бренд</Text>
		</View>
		<View style={[styles.itemBorder, styles.itemAmount, styles.headerItem]}>
			<Text style={styles.headerText}>Кол-</Text>
			<Text style={styles.headerText}>во</Text>
		</View>
		<View style={[styles.itemBorder, styles.itemMyPrice, styles.headerItem]}>
			<Text style={styles.headerText}>Своя</Text>
			<Text style={styles.headerText}>цена</Text>
		</View>
		<View style={[styles.itemBorder, styles.headerItem, styles.itemClientPrice, {borderRightWidth: 0}]}>
			<Text style={styles.headerText}>Цена</Text>
			<Text style={styles.headerText}>клиента</Text>
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
		if (_.isEqual(this.props.list, prevProps.list)) {
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
				return !!x && (x.name && x.name.toLowerCase().includes(value.toLowerCase())) || (x.brand && x.brand.toLowerCase().includes(value.toLowerCase()));
			});
			this.setState({list});
		});
	};
	
	renderEmpty = () => (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={styles.title}>Пустой список</Text>
		</View>
	);
	
	openModal = item => () => {
		Alert.alert(
			`Что вы хотите сделать с ${item.name}?`,
			'',
			[
				{text: 'Отмена', style: 'cancel',},
				{text: 'Редактировать', onPress: () => this.editItem(item)},
				{text: 'Удалить', onPress: () => this.props.deleteItemList(item.id)},
			],
			{cancelable: false},
		);
	};
	
	renderItem = ({item}) => {
		return (
			<TouchableOpacity onPress={this.openModal(item)}>
				<View style={styles.item}>
					<View style={[styles.itemBorder, styles.itemName]}>
						<Text style={styles.text}>{item.name}</Text>
					</View>
					<View style={[styles.itemBorder, styles.itemBrand]}>
						<Text style={styles.text}>{item.brand}</Text>
					</View>
					<View style={[styles.itemBorder, styles.itemAmount]}>
						<Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>{item.amount}</Text>
					</View>
					<View style={[styles.itemBorder, styles.itemMyPrice]}>
						<Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>{`${item.myPrice} р`}</Text>
					</View>
					<View style={[styles.itemBorder, styles.itemClientPrice, {borderRightWidth: 0}]}>
						<Text style={styles.text} numberOfLines={1}
							  ellipsizeMode={'tail'}>{`${item.clientPrice} р`}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	
	itemSeparator = () => <View style={{height: 10}}/>;
	
	keyExtractor = item => {
		return item.id;
	};
	
	editItem = item => {
		this.props.selectItem(item);
		return this.props.navigation.navigate('Edit');
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
