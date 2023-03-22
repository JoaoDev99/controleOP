import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './AuthProvider';
import Home from '../pages/Home';
import AddOP from '../pages/AdicionarOP';
import Steps from '../pages/Passos';
import AddCSV from '../pages/AdicionarCSV';
import AddClient from '../pages/AdicionarClientes';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 10,
          backgroundColor: '#F6F6F6',
          padding: 20,
        }} onPress={() => logout()}>
        <View style={{flexDirection: 'row', alignContent:'center'}}>
          <Text style={{fontSize: 14, flexBasis:'15%'}}>Sair</Text>
          <Icon name="logout" size={17} color={'#000'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeDrawer"
        component={Home}
        options={{
          title: 'Ordem de Produção',
          headerTintColor: '#696969',
          headerStyle: {
            backgroundColor: '#FAFAFA',
          },
          headerTitle: '',
        }}
      />
      <Drawer.Screen name="Clientes" component={AddClient} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MyDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddOP"
        component={AddOP}
        options={{
          title: 'Adicionar OP',
        }}
      />
      <Stack.Screen
        name="Steps"
        component={Steps}
        options={{
          title: 'Passos',
        }}
      />
      <Stack.Screen
        name="AddCSV"
        component={AddCSV}
        options={{
          title: 'Adicionar CSV',
        }}
      />
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function AppStack() {
  return <MyStack />;
}

export default AppStack;
