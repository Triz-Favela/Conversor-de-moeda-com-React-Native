import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useCurrencyViewModel } from '../viewmodels/useCurrencyViewModel';

export default function HomeScreen() {
  const {
    currencies,
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedResult,
    displayAmount,
    exchangeRate,
    referenceDate,
    loading,
    error,
    handleConvert,
  } = useCurrencyViewModel();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Conversor de Moedas</Text>
        <Text style={styles.subtitle}>API Frankfurter (MVVM)</Text>

        <View style={styles.card}>
          {/* Campo de Valor */}
          <Text style={styles.label}>Valor a converter:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 100"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Dropdown da Moeda de Origem */}
          <Text style={styles.label}>Moeda de Origem:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fromCurrency}
              onValueChange={(itemValue) => setFromCurrency(itemValue)}
              style={styles.picker}
            >
              {currencies.map((c: any) => (
                <Picker.Item
                  key={c.iso_code}
                  label={`${c.iso_code} - ${c.name} - ${c.symbol} `}
                  value={c.iso_code}
                />
              ))}
            </Picker>
          </View>

          {/* Dropdown da Moeda de Destino */}
          <Text style={styles.label}>Moeda de Destino:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={toCurrency}
              onValueChange={(itemValue) => setToCurrency(itemValue)}
              style={styles.picker}
            >
              {currencies.map((c: any) => (
                <Picker.Item
                  key={c.iso_code}
                  label={`${c.iso_code} - ${c.name} - ${c.symbol} `}
                  value={c.iso_code}
                />
              ))}
            </Picker>
          </View>

          {/* Botão de Conversão */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleConvert}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Converter</Text>
            )}
          </TouchableOpacity>

          {/* Exibição de Erro */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Resultado */}
          {convertedResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Resultado da Conversão:</Text>
              <Text style={styles.resultValue}>
                {displayAmount} {fromCurrency} = {convertedResult} {toCurrency}
              </Text>
              {exchangeRate && (
                <Text style={styles.resultDetails}>
                  Taxa: 1 {fromCurrency} = {exchangeRate} {toCurrency}
                </Text>
              )}
              {referenceDate && (
                <Text style={styles.resultDetails}>
                  Data de referência: {referenceDate}
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2f3640',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#718093',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3640',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f1f2f6',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#2f3640',
  },
  pickerContainer: {
    backgroundColor: '#f1f2f6',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: Platform.OS === 'ios' ? 180 : 50,
  },
  button: {
    backgroundColor: '#44bd32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#84817a',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e84118',
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#44bd32',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#718093',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f3640',
    marginBottom: 8,
  },
  resultDetails: {
    fontSize: 13,
    color: '#718093',
  },
});