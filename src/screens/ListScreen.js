import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { connect } from 'react-redux';
import { deleteItemList, selectItem, updateList } from '../store/actions/list';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';

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
});

class ListScreen extends Component {
	componentDidMount() {
		this.props.updateList();
	}
	
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
	
	renderHeader = () => (
		<View style={[styles.item, {borderBottomWidth: 1}]}>
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
	
	render() {
		return (
			<ScreenContainer>
				<View>
					<Button onPress={this.addItemHandler} title='Добавить'/>
				</View>
				<FlatList
					scrollEnabled
					keyExtractor={this.keyExtractor}
					data={this.props.list}
					renderItem={this.renderItem}
					horizontal={false}
					ListHeaderComponent={this.renderHeader}
					ItemSeparatorComponent={this.itemSeparator}
					contentContainerStyle={{borderWidth: 1}}
				/>
			</ScreenContainer>
		);
	}
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
