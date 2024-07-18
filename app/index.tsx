import React from 'react';
import {  Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StyledImage, StyledLink, StyledText, StyledView } from '@/components/StyledView';

const HomeScreen = () => {





  return (
    <StyledView className="flex-1 bg-white relative">
      <StyledImage
        className="absolute bottom-1 left-0 w-full h-2/3"
        source={require('../assets/images/curve.svg')}
      />

      <StyledView className="flex-1 justify-center items-center p-4">
        <StyledText className="text-lg font-bold text-center">
          Evaluador Inteligente de Cultivos Hidropónicos
        </StyledText>

      </StyledView>

      <StyledView className="flex-3 items-center p-4 mb-32">
        <StyledImage
          className="w-52 h-52 object-contain"
          source={require('../assets/images/planta-en-una-maceta.svg')}
        />
        <StyledText className="text-2xl font-bold text-white text-center mb-2">
          Predice la Calidad de tus Cultivos 
          
        </StyledText>
        <StyledText className="text-base text-center text-white mb-8">
          Evaluador Inteligente de Cultivos Hidropónicos 
          es una innovadora aplicación impulsada por inteligencia artificial 

        </StyledText>
        <StyledLink
          href={'calculator'}
          className="bg-white py-4 px-8 w-1/2 items-center rounded-full">
          <StyledText className="text-green-600 text-sm font-bold">
            CONTINUAR
          </StyledText>
        </StyledLink>
      </StyledView>
    </StyledView>
  );
};


export default HomeScreen;
