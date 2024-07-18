import AnimatedCard from "@/components/AnimatedCard";
import { StyledImage, StyledText, StyledView } from "@/components/StyledView";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Button, Card, Checkbox } from "react-native-ui-lib";


const OptionsScreen = () => {

    const [checkNeuralNetworks, setCheckNeuralNetworks] = useState(false);
    const [checkRandomForest, setCheckRandomForest] = useState(false);
    const navigation = useNavigation();
    const handleNeuralNetworks = () => {
        // Lógica para predecir con redes neuronales
        setCheckNeuralNetworks(!checkNeuralNetworks);
        setCheckRandomForest(false);
    };

    const handleRandomForest = () => {
        // Lógica para predecir con Random Forest
        setCheckRandomForest(!checkRandomForest);
        setCheckNeuralNetworks(false);
    };

    const handleContinue = () => {
        // Lógica para continuar
    }

    return (
        <StyledView className="flex  flex-col justify-center items-center p-4">
            <StyledText className="text-3xl font-bold text-center mb-8 text-gray-800">
                Selecciona el método de predicción
            </StyledText>

        <StyledView className="grid  
        grid-cols-2 gap-4 p-4 w-full">
          
            <Card  center onPress={() => console.log('pressed')}>
                <StyledImage

                    source={require('../assets/images/red-neuronal.svg')}
                    className="w-32 h-32"
                    />

                    <Card.Section
                        bg-blue-500
                        content={[
                            { text: 'Redes Neuronales', text70: true, white: false }
                        ]}
                    />
                    
            </Card>
                <Checkbox
                    value={checkNeuralNetworks}
                    onValueChange={handleNeuralNetworks}
                    label="Seleccionar"
                />
            <Card center onPress={() => console.log('pressed')}>
                <StyledImage

                    source={require('../assets/images/random-forest.svg')}
                    className="w-32 h-32"
                />

                <Card.Section
                    bg-blue-500
                    content={[
                        { text: 'Random Forest', text70: true, white: false }
                    ]}
                />
                
            </Card>
                <Checkbox
                    value={checkRandomForest}
                    onValueChange={handleRandomForest}
                    label="Seleccionar"
                />
        </StyledView>
        <StyledView className="flex-1 justify-center items-center ">
            <Button
                label="Continuar"
                onPress={() => handleContinue()}
                backgroundColor="#4CAF50"
                style={{ width: '50%' }}
            />
        </StyledView>
        </StyledView>
    );
}

export default OptionsScreen;
