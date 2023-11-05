import React, {useState} from 'react';
import {Pressable, FlatList, Text, TextInput, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CheckIcon, TrashIcon} from 'react-native-heroicons/outline';

const NewList = ({navigation}: any) => {
  const [elementItem, setElementItem] = useState<string>('');
  const [elements, setElements] = useState<any[]>([]);

  const newList = () => {
    const db = firestore();
    const batch = db.batch();

    elements.forEach(item => {
      var docRef = db.collection('listas').doc(); //automatically generate unique id
      batch.set(docRef, item);
    });

    batch.commit();

    navigation.navigate('Home');
  };

  const newElement = () => {
    if (elementItem !== '') {
      setElements([
        ...elements,
        {
          name: elementItem,
          isCompleted: false,
        },
      ]);
      setElementItem('');
    }
  };

  return (
    <View className="flex flex-col w-screen h-full text-left items-center">
      <Text className="text-sky-900 text-xl my-3 font-medium">
        Añade todas las tareas que quieras
      </Text>
      <View className="flex flex-row justify-center items-center mb-5 w-[70vw]">
        <TextInput
          className="p-3 border-sky-900 border text-sky-900 rounded-lg text-lg mr-3 w-full"
          placeholder="Nombre de la tarea"
          placeholderTextColor="#374151"
          onChangeText={text => setElementItem(text)}
          value={elementItem}
        />
        <Pressable
          className="bg-sky-900 w-12 h-12 flex justify-center items-center rounded-full"
          onPress={() => newElement()}>
          <Text className="text-white text-4xl pt-1">+</Text>
        </Pressable>
      </View>
      <View className=" border border-black/30 w-[100vw]" />
      {elements.length === 0 ? (
        <Text className="text-sky-900 text-xl my-3 font-medium">
          Ninguna tarea añadida
        </Text>
      ) : (
        <View className="flex align-middle flex-1">
          <FlatList
            className="w-full flex-1"
            data={elements}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                key={index}
                className="bg-sky-300 h-11 my-2 pr-3 rounded-lg flex items-center justify-between flex-row w-80">
                <Text className="text-sky-950 text-xl pl-5">{item.name}</Text>
                <TrashIcon
                  size={30}
                  color="black"
                  onPressOut={() => {
                    const newElements = [...elements];
                    newElements.splice(index, 1);
                    setElements(newElements);
                  }}
                />
              </View>
            )}
          />
        </View>
      )}
      <Pressable
        className="bg-sky-900 flex flex-row absolute bottom-0 justify-center items-center rounded-2xl py-2 px-4 mb-10 shadow-xl shadow-black"
        onPress={() => newList()}
        >
        <CheckIcon size={30} color="#FFFFFF" />
        <Text className="text-white text-xl ml-2">Crear todas las tareas</Text>
      </Pressable>
    </View>
  );
};

export default NewList;
