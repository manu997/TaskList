import firestore from '@react-native-firebase/firestore';
import {Task} from '../types';
import {useEffect, useState} from 'react';

const useTasks = () => {
  const ref = firestore().collection('listas');

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list: Task[] = [];
      querySnapshot.forEach(doc => {
        const {name, isCompleted} = doc.data();
        list.push({
          id: doc.id,
          name,
          isCompleted
        });
      });

      setTasks(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);
  return {tasks, loading};
};

export default useTasks;
