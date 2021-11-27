import * as React from 'react';
import { View, StyleSheet, Modal, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

import { NativeBaseProvider, Box, VStack, HStack, Button, IconButton, Icon, Text, Center,   StatusBar,
  Heading,
  AspectRatio,
  Image,
  Stack,
  ScrollView
} from 'native-base'

import AppBar from './components/Appbar'
import CardCustom from './components/CardCustom'

export default function App() {
  const [state, setState] = React.useState(0)
  const [redux, dispatch] = React.useReducer((data, {type, payload}) => {
    switch(type){
      case "setNews":
        return{...data, news: payload}
        break
      default:
        return data
    }
  }, {
    list: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Item 1',
        description: 'Hello World'
      },
    ],
    news: []
  })
  React.useEffect(async() => {
    var data = await fetch('https://newsapi.org/v2/everything?q=apple&from=2021-11-26&to=2021-11-26&sortBy=popularity&apiKey=df3da34a7b1f4418b9c1c4eecd15927c').then(res => res.json())
    dispatch({type: 'setNews', payload: data.articles})
  }, [])
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <AppBar/>
        <ScrollView>
          <Center style={styles.body} flex={1} px="3">
            <VStack alignItems="center" space={4} justifyContent="space-between">
            {
              redux.news.map((data, key) => (
                <CardCustom key={key} data={data}/>
              ))
            }
            </VStack>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  body: {
    paddingTop: 10,
    paddingBottom: 10
  },
});
