import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const unitFactors = {
  Metre: 1,
  Millimetre: 1000,
  Mile: 0.000621371,
  Foot: 3.28084,
} as const;

type Unit = keyof typeof unitFactors;

const App: React.FC = () => {
  const [value, setValue] = useState<string>('0');
  const [fromUnit, setFromUnit] = useState<Unit>('Metre');
  const [toUnit, setToUnit] = useState<Unit>('Foot');
  const [result, setResult] = useState<string>('0');

  const handleConversion = () => {
    const input = parseFloat(value);
    if (!isNaN(input)) {
      const inMetres = input / unitFactors[fromUnit];
      const convertedValue = inMetres * unitFactors[toUnit];
      setResult(convertedValue.toFixed(4));
    } else {
      setResult('0');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter value"
        placeholderTextColor="#888"
        value={value}
        onChangeText={setValue}
      />
      <View style={styles.row}>
        <Picker
          selectedValue={fromUnit}
          style={styles.picker}
          onValueChange={itemValue => setFromUnit(itemValue as Unit)}>
          {Object.keys(unitFactors).map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
        <Text style={styles.arrow}>→</Text>
        <Picker
          selectedValue={toUnit}
          style={styles.picker}
          onValueChange={itemValue => setToUnit(itemValue as Unit)}>
          {Object.keys(unitFactors).map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConversion}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
      <Text style={styles.result}>{result}</Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa', // Light background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b', // Dark teal color
  },
  input: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#b2dfdb', // Lighter border color
    borderRadius: 10, // More rounded corners
    padding: 15,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#ffffff', // White background
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 120,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b2dfdb', // Lighter border color
    borderRadius: 10,
  },
  arrow: {
    fontSize: 30,
    paddingHorizontal: 10,
    color: '#00796b', // Dark teal color
  },
  button: {
    backgroundColor: '#007BFF', // Button color
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff', // White text color for button
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#007BFF', // Color for result text
  },
});
