import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ActivityIndicator, Pressable, Text} from 'react-native';
import List from '../components/List';
import useTasks from '../hooks/useTasks';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}: any) => {
  const {tasks, loading} = useTasks();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'rgb(3 105 161)',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="PendingLists" options={{title: 'Tareas pendientes'}}>
        {props =>
          loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <List
                {...props}
                elements={tasks.filter(task => !task.isCompleted)}
              />
              <Pressable
                className="bg-sky-900 absolute bottom-20 right-10 py-3 px-5 flex flex-row justify-center items-center rounded-2xl shadow-lg shadow-black"
                onPress={() => navigation.navigate('NewList')}>
                <Text className="text-white text-3xl mr-3">+</Text>
                <Text className="text-white text-xl">Añadir tareas</Text>
              </Pressable>
            </>
          )
        }
      </Tab.Screen>
      <Tab.Screen
        name="CompletedLists"
        options={{
          title: 'Tareas completadas',
        }}>
        {props => (
          <List {...props} elements={tasks.filter(task => task.isCompleted)} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Home;
