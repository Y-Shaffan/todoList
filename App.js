import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, ScrollView  } from 'react-native';
import Task from './components/Task'

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditingFromLongPress, setIsEditingFromLongPress] = useState(false);


  const handleAddTask = () => {
    Keyboard.dismiss();

    if (editingIndex !== null) {
      const updatedTasks = [...taskItems];
      updatedTasks[editingIndex] = task;
      setTaskItems(updatedTasks);
      setEditingIndex(null);
    } else {
      setTaskItems([...taskItems, task]);
    }
    
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
      <Text style={styles.sectionTitle}>To-do List</Text>

        <ScrollView style={styles.items} contentContainerStyle={{ paddingBottom: 100 }} >
          {/* Added tasks go here */}
          {
          taskItems.map((item, index) => (
            <Task
              key={index}
              text={item}
              onEdit={() => {
                setTask(item);
                setEditingIndex(index);
              }}
              onDelete={() => completeTask(index)}
            />
          ))
          

          }
        </ScrollView>

      </View>

      {/* Write tasks here */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder='Write a task' value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}> 
          <View style={styles.addWrapper}>
          <Text style={styles.addText}>{editingIndex !== null ? '✓' : '+'}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {},
});
