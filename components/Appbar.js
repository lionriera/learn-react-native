import * as React from 'react';
import {
  NativeBaseProvider, Box, VStack, HStack, Button, IconButton, Icon, Text, Center,
  StatusBar, Menu, Pressable, HamburgerIcon,
  Modal, FormControl, Input
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export const SignIn = ({open, onClose}) => {
  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Sign In</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  onClose()
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  onClose()
                }}
              >
                Submit
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

function MenuCustom({onOpenSignin}) {
  return (
      <Menu
        w="190"
        trigger={(triggerProps) => {
          return (
            <IconButton {...triggerProps} icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} />
          )
        }}
      >
        <Menu.Item>Portofolio</Menu.Item>
        <Menu.Item onPress={onOpenSignin}>Sign In</Menu.Item>
      </Menu>
  )
}

export default function AppBar(){
  const [state, dispatch] = React.useReducer((data, {type, payload}) => {
    switch(type){
      case "handleopensignin":
        return{...data, openSignin: !data.openSignin}
      default:
        return data
    }
  }, {
    openSignin: false
  })
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
        <Box safeAreaTop backgroundColor="#6200ee" />
        <HStack bg='#6200ee' px="1" py="3" justifyContent='space-between' alignItems='center'>
          <HStack space="4" alignItems='center'>
            <IconButton icon={<Icon size="sm" as={<MaterialIcons name='menu' />} color="white" />} />
            <Text color="white" fontSize="20" fontWeight='bold'>Ferdiansyah App</Text>
          </HStack>
          <HStack space="2">
            <IconButton icon={<Icon as={<MaterialIcons name='search' />}
            color="white" size='sm'  />} />
            <MenuCustom
              onOpenSignin={() => dispatch({type: 'handleopensignin'})}
            />
          </HStack>
        </HStack>
      <SignIn
        open={state.openSignin}
        onClose={() => dispatch({type: 'handleopensignin'})}
      />
    </>
  )
}