import {
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Element from '../components/Element';
import {Task} from '../types';
import {useCallback, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {PencilIcon, TrashIcon} from 'react-native-heroicons/outline';
import ReactNativeModal from 'react-native-modal';

type List = {
  elements: Task[];
  navigation?: any;
  route?: any;
};

const optionsStyles = {
  optionWrapper: {
    display: 'flex' as any,
    flexBasis: 1,
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    height: 50,
  },
  optionsContainer: {
    marginLeft: 20,
    marginTop: 50,
    borderRadius: 10,
  },
};

const List = ({elements, navigation}: List) => {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');

  const deleteTask = useCallback((id: string) => {
    firestore().collection('listas').doc(id).delete();
  }, []);

  const updateName = useCallback((id: string, name: string) => {
    firestore().collection('listas').doc(id).update({name: name});
    setShowModal(false);
  }, []);

  return (
    <FlatList
      data={elements}
      className="h-[70vh] w-screen mr-6"
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <>
          <Menu>
            <MenuTrigger triggerOnLongPress>
              <Element item={item} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={() => deleteTask(item.id)}>
                <TrashIcon
                  color="black"
                  size={25}
                  style={{marginHorizontal: 10}}
                />
                <Text className="text-sky-950 text-xl">Eliminar</Text>
              </MenuOption>
              {!item.isCompleted && (
                <MenuOption onSelect={() => setShowModal(true)}>
                  <PencilIcon
                    color="black"
                    size={25}
                    style={{marginHorizontal: 10}}
                  />
                  <Text className="text-sky-950 text-xl">Editar</Text>
                </MenuOption>
              )}
            </MenuOptions>
          </Menu>
          <TouchableWithoutFeedback onPressOut={() => setShowModal(false)}>
            <ReactNativeModal
              testID={'modal'}
              isVisible={showModal}
              hardwareAccelerated
              onBackdropPress={() => setShowModal(false)}>
              <View className="flex-1 items-center mt-40">
                <View className="bg-white rounded-2xl p-5 w-[80vw] items-center shadow-xl shadow-black">
                  <Text className="text-sky-950 text-xl self-baseline place-self-start ">
                    Editar tarea
                  </Text>
                  <TextInput
                    className="border-sky-900 border text-sky-900 rounded-lg text-lg pl-3 my-5 w-full"
                    placeholder="Nombre de la tarea"
                    placeholderTextColor="#374151"
                    onChangeText={text => setNewTask(text)}
                    defaultValue={item.name}
                  />
                  <Pressable
                    testID={'close-button'}
                    onPress={() => updateName(item.id, newTask ?? item.name)}
                    className="p-2 bg-sky-900 rounded-lg">
                    <Text className="text-white text-xl px-5">Aceptar</Text>
                  </Pressable>
                </View>
              </View>
            </ReactNativeModal>
          </TouchableWithoutFeedback>
        </>
      )}
    />
  );
};

export default List;
