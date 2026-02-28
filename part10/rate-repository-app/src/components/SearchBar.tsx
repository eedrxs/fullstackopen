// Example SearchBar component
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder = 'Search...' }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing" // iOS only, harmless on Android
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 8,
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    // elevation for Android
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111',
    padding: 0, // container handles vertical padding
  },
});