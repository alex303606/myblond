import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateList } from '../store/actions/list';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	itemBorder: {
		borderRightWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 5,
	},
	itemName: {
		width: '30%',
		justifyContent: 'flex-start',
	},
	itemAmount: {
		width: '15%',
	},
	itemMyPrice: {
		width: '15%',
	},
	itemClientPrice: {
		width: '15%',
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
	
	keyExtractor = item => {
		return item.name + item.brand + item.myPrice + item.clientPrice;
	};
	
	editItem = () => null;
	
	renderItem = ({item}) => {
		return (
			<View style={styles.item}>
				<View style={[styles.itemBorder, styles.itemName]}>
					<Text>{item.name}</Text>
				</View>
				<View style={[styles.itemBorder, styles.itemAmount]}>
					<Text>{item.amount}</Text>
				</View>
				<View style={[styles.itemBorder, styles.itemMyPrice]}>
					<Text>{item.myPrice}</Text>
				</View>
				<View style={[styles.itemBorder, styles.itemClientPrice]}>
					<Text>{item.clientPrice}</Text>
				</View>
				<TouchableOpacity onPress={this.editItem}>
					<Icon name="rocket" size={30} color="#900" />
				</TouchableOpacity>
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
	
	itemSeparator = () => <View style={{borderBottomWidth: 1}}/>
	
	render() {
		return (
			<ScreenContainer>
				<Text style={styles.title}>Список</Text>
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

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			updateList,
		},
		dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
