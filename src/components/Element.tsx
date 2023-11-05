import React, {useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CheckIcon} from 'react-native-heroicons/outline';
import {Task} from '../types';

type Item = {
  item: Task;
  navigation?: any;
};

const Element = ({item, navigation}: Item) => {
  const [showCompletedIcon, setShowCompletedIcon] = useState(false);
  const updateCompleted = useCallback(() => {
    firestore()
      .collection('listas')
      .doc(item.id)
      .update({isCompleted: !item.isCompleted});
  }, []);

  return (
    <View className="bg-sky-300 h-11 mx-5 my-2 px-2 rounded-lg flex justify-between items-center flex-row shadow-md shadow-black">
      <Text className="text-black text-xl pl-5">{item.name}</Text>
      <TouchableOpacity
        onPressOut={() => {
          updateCompleted();
          setShowCompletedIcon(!showCompletedIcon);
        }}>
        <View className="bg-sky-950 h-7 w-7 rounded-full">
          {(item.isCompleted || showCompletedIcon) && (
            <CheckIcon size={30} color="#FFFFFF" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Element;
