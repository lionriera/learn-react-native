import * as React from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { Input, Button, Text } from 'native-base'

export default function Add({open, onClose, onAdd}){
  const [state, dispatch] = React.useReducer((data, {type, payload}) => {
    switch(type){
      case "input":
        return{...data, [payload.name]: payload.value}
        break
      default:
        return data
    }
  }, {
    title: '', description: ''
  })
  return(
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
    >
      <View style={styles.container}>
        <Input
          placeholder="Title"
          style={styles.input}
          multiline
          value={state.title}
          onChangeText={(e) => dispatch({type: 'input', payload: {name: 'title', value: e}})}
        />
        <Input
          placeholder="Description"
          style={styles.input}
          multiline
          value={state.description}
          onChangeText={(e) => dispatch({type: 'input', payload: {name: 'description', value: e}})}
        />
        <Text style={styles.saveBtn}></Text>
        <Button onPress={() => {
          onAdd(Object.assign({...state}, {id: Math.floor(Math.random() * 1000)}))
          onClose()
        }}>Save</Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    width: '100%'
  },
  container: {
    //display: 'flex',
    //flexWrap: 'wrap'
    padding: 12
  },
  saveBtn: {
    marginTop: 6,
  }
})