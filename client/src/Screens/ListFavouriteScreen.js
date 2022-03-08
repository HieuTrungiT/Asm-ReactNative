// In App.js in a new project

import * as React from 'react';
import { View, Text,Button } from 'react-native';

function ListFavouriteScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
    <Button
      title="Go to Details... again"
      onPress={() => navigation.navigate('Home')}
    />
  </View>
  );
}
export default ListFavouriteScreen;