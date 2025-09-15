import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Switch, Alert } from 'react-native';

export default function App() {
  const [txtWordFocused, setTxtWordFocused] = useState(false);
  const [txtWord, setTxtWord] = useState('');
  const [btnFetchPressed, setBtnFetchPressed] = useState(false);
  const [displayData, setDisplayData] = useState(null);

  function updateDisplay(data) {

  }

  async function fetchDef() {
    const word = txtWord.trim()

    if (!word) {
        alert("Please enter a word.");
        return;
    }

    try {
      const resp = await fetch(`https://easydefine-service.onrender.com/define?word=${encodeURIComponent(word)}`);

      if (!resp.ok) {

      }
    } catch (err) {
      
    }
}

  return (
    <View style={styles.container}>
      <View>
        <Text style = {styles.header}>easy define</Text>
      </View>

      <View style = {styles.inputGroup}>
        <TextInput
          style = {[styles.textInput, txtWordFocused && styles.textInputFocused]}
          onFocus = {(() => setTxtWordFocused(true))}
          onBlur = {(() => setTxtWordFocused(false))}
          placeholder = "Enter a word..."
          value = {txtWord}
          onChangeText = {setTxtWord}
        />

        <TouchableOpacity
          style = {[styles.button, btnFetchPressed && styles.buttonPressed]}
          onPressIn = {(() => setBtnFetchPressed(true))}
          onPressOut = {(() => setBtnFetchPressed(false))}
          >

        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: '#2b3e50', // fallback solid color if no gradient
  },

  header: {
    fontSize: 48,
    marginBottom: 40,
    color: 'rgba(255, 255, 255, 0.47)', // #ffffff78 alpha
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  inputGroup: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },

  textInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 25,
    borderRadius: 10,
    fontSize: 16,
    width: 260,
    maxWidth: '100%',
    backgroundColor: '#fff',

    //shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  textInputFocused: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },

  button: {
    backgroundColor: '#667eb6ff',
    minWidth: 140,
    paddingVertical: 15,
    paddingHorizontal: 20, // increase horizontal padding
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',  // add vertical centering
    alignSelf: 'center',
    flexGrow: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  copyButton: {
    backgroundColor: '#667eb6ff',
    minWidth: 140,
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 20, // increase horizontal padding
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',  // add vertical centering
    alignSelf: 'center',
    flexGrow: 0,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  buttonPressed: {
    borderWidth: 1,
    borderColor: 'yellow',
    shadowColor: 'yellow',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // or whatever spacing you want
  },

  toggleLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },

  result: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 40,

    // shadows:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },

  resultText: {
    color: 'rgba(255, 255, 255, 0.87)',
    textAlign: 'center',
    fontSize: 19,
  }
});
