import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
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
      <View style={styles.buttonContainer}>
        <Button title="Convert" onPress={handleConversion} color="#fff" />
      </View>
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
    backgroundColor: '#f0f4f8', // Màu nền sáng hơn
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Màu chữ tối hơn
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5, // Bo tròn các góc
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff', // Nền input trắng
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#fff',
  },
  arrow: {
    fontSize: 30,
    paddingHorizontal: 10,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#007BFF', // Màu nút chuyển đổi
    borderRadius: 5,
    overflow: 'hidden', // Để bo tròn góc nút
    marginBottom: 20,
    width: '80%', // Đảm bảo nút có độ rộng tương ứng
  },
  result: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#007BFF', // Màu chữ kết quả
  },
});
