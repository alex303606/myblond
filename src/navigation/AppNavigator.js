import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListScreen from '../screens/ListScreen';
import EditScreen from '../screens/EditScreen';
import AddScreen from '../screens/AddScreen';

const AppNavigator = createStackNavigator({
		List: {
			screen: ListScreen,
			navigationOptions: {
				headerTitle: 'Список',
			}
		},
		Edit: {
			screen: EditScreen,
			navigationOptions: {
				headerTitle: 'Редактирование',
			}
		},
		Add: {
			screen: AddScreen,
			navigationOptions: {
				headerTitle: 'Добавление',
			}
		}
	},
	{
		initialRouteName: 'List',
		swipeEnabled: false,
		defaultNavigationOptions: {
			gesturesEnabled: false,
			headerBackTitle: 'Назад',
			headerTruncatedBackTitle: '',
			headerStyle: {
				backgroundColor: 'white',
				elevation: 0,
				shadowColor: 'transparent',
				borderBottomWidth: 0,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0,
				},
				shadowRadius: 0,
			},
			headerTitleStyle: {
				backgroundColor: 'white',
				fontSize: 22,
				fontWeight: 'bold',
			},
			headerTintColor: 'black',
		},
	});

export default createAppContainer(AppNavigator);
