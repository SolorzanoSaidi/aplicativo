import { StyledText, StyledView } from '@/components/StyledView';
import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const FormScreen = () => {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [tdsValue, setTdsValue] = useState('');
    const [phLevel, setPhLevel] = useState('');
    const handleSubmit = (type:string) => {
        
        if (!temperature || !humidity || !tdsValue || !phLevel) {
            Alert.alert('Error', 'Todos los campos son requeridos');
            return;
        }

        if (parseFloat(temperature) < 18 || parseFloat(temperature) > 33.5) {
            Alert.alert('Error', 'La temperatura debe estar entre 18 y 33.5');
            return;
        }

        if (parseFloat(humidity) < 50 || parseFloat(humidity) > 80) {
            Alert.alert('Error', 'La humedad debe estar entre 50 y 80');
            return;
        }

        if (parseFloat(tdsValue) < 400 || parseFloat(tdsValue) > 800) {
            Alert.alert('Error', 'El valor de TDS debe estar entre 400 y 800');
            return;
        }

        if (parseFloat(phLevel) < 6 || parseFloat(phLevel) > 6.8) {
            Alert.alert('Error', 'El nivel de pH debe estar entre 6 y 6.8');
            return;
        }


        
        //redirect to the result screen
        router.push({
            pathname: '/result',
            params: {
                temperature,
                humidity,
                tdsValue,
                phLevel,
                type
            },
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Parámetros</Text>

            <StyledText
                className='text text-center text-2xl'
                
            >
                Temperatura (°C)
            </StyledText>
            <TextInput
                style={styles.input}
                placeholder="Temperature (°C)"
                keyboardType="numeric"
                value={temperature}
                onChangeText={setTemperature}
            />
            <StyledText
                className='text text-center text-2xl'
                >
                Humedad (%)
                </StyledText>
            <TextInput
                style={styles.input}
                placeholder="Humidity (%)"
                keyboardType="numeric"
                value={humidity}
                onChangeText={setHumidity}
            />

            <StyledText
                className='text text-center text-2xl'
                >
                TDS Value (ppm)
                </StyledText>

            <TextInput
                style={styles.input}
                placeholder="TDS Value (ppm)"
                keyboardType="numeric"
                value={tdsValue}
                onChangeText={setTdsValue}
            />

            <StyledText
                className='text text-center text-2xl'
                >
                pH Level
                </StyledText>
            <TextInput
                style={styles.input}
                placeholder="pH Level"
                keyboardType="numeric"
                value={phLevel}
                onChangeText={setPhLevel}
            />
            <StyledView className="flex flex-row justify-between gap-4">
                <StyledView className='w-1/3'>
                    <TouchableOpacity style={styles.button} onPress={()=>handleSubmit("RF")}>
                        <Text style={styles.buttonText}>
                            Random {"\n"} Forest
                        </Text>
                    </TouchableOpacity>
                </StyledView>
                <StyledView className='w-1/3'>
                
                
                <TouchableOpacity style={styles.button} onPress={()=>handleSubmit("RN")}>
                    <Text style={styles.buttonText}>
                        Redes Neuronales
                    </Text>
                </TouchableOpacity>
                </StyledView>
            </StyledView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FormScreen;
