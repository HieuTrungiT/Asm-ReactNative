import React, { useState } from 'react';
import { View, Button, Platform,Alert,Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function DetailsScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
const [dateFormat, setDateFormat] = useState();
 

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setDateFormat(fDate);
    console.log(dateFormat);

  };

 
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (

    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
      
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          dateFormat="DD-MM-YYYY"
        />
      )}
    </View>
  );
}
export default DetailsScreen;