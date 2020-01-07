import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListScreen from '../screens/ListScreen';

const AppNavigator = createStackNavigator({
		List: {
			screen: ListScreen,
		},
	},
	{
		initialRouteName: 'List',
		swipeEnabled: false,
		defaultNavigationOptions: {
			header: null,
			gesturesEnabled: false,
		},
	});

export default createAppContainer(AppNavigator);
