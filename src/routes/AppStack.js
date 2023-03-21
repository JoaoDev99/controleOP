import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import AddOP from '../pages/AdicionarOP';
import Steps from '../pages/Passos';
import AddCSV from '../pages/AdicionarCSV';
import AddClient from '../pages/AdicionarClientes';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeDrawer" component={Home} options={{
            title: 'Ordem de Produção',
            headerTintColor:'#696969',
            headerStyle: {
              backgroundColor: '#FAFAFA',
            },
          }} />
      <Drawer.Screen name="Clientes" component={AddClient} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return(
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
)
}


const Stack = createNativeStackNavigator();

function AppStack() {
    return (
     
      <MyStack/>
    );
  }
  
  export default AppStack;