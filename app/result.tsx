import RocCurve from "@/components/CurvaRoc";
import { StyledText, StyledView } from "@/components/StyledView";
import { colorRbgValorNeutrosofico, colorTextValorNeutrosofico, getValorNeutrosofico, Predict, RandomForest, RedNeuronal, ResultPredict, RocData } from "@/core/predict";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native"
import { LineChart, ProgressChart } from "react-native-chart-kit"
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { Text, View } from "react-native-ui-lib"




const ResultHome = () => {

    const { temperature, humidity, tdsValue, phLevel } = useLocalSearchParams();


    const [predictData, setPredictData] = useState<ResultPredict>({
        data: {
            valor_neutrosófico: "em",
            calidad_final: 0,
            red_neuronal: {
                roc_data: {
                    fpr: [],
                    tpr: [],
                    thresholds: []
                },
                nueva_prediccion: 0,
                nueva_prediccion_probabilidad: []
            } as RedNeuronal,
            random_forest: {
                nueva_prediccion: [],
                nueva_prediccion_probabilidad: [],
                roc_data: {
                    fpr: [],
                    thresholds: [],
                    tpr: []
                } as RocData
            } as RandomForest
        },
        message: "",
        status: ""
    });
    const [rbga, setRbga] = useState<string>("");
    useEffect(() => {
        if (!temperature || !humidity || !tdsValue || !phLevel) {
            router.push({
                pathname: '/calculator',
            });
        }


        const _temperature = parseFloat(temperature as string);
        const _humidity = parseFloat(humidity as string);
        const _tdsValue = parseFloat(tdsValue as string);
        const _phLevel = parseFloat(phLevel as string);

        Predict({
            temperature: _temperature,
            humidity: _humidity,
            tds: _tdsValue,
            ph: _phLevel,
        }).then((result) => {
            setPredictData(result);
            setRbga(colorRbgValorNeutrosofico(result.data.valor_neutrosófico).replace("{opacity}", "0.5"));
        }).catch((error) => {
            console.error(error.message);
            setRbga(colorRbgValorNeutrosofico("em").replace("{opacity}", "0.5"));
        })


    }, []);


    return (
        <ScrollView>
            <StyledView className="container flex flex-col bg-white h-full">

                <StyledText className="text-sm text-center font-bold  mt-5 text-green-800">Resultados</StyledText>
                <StyledView className="flex flex-col items-center p-x-6">
                    <StyledText className="text-2xl text-center font-bold  text-gray-800">
                        Tu Cultivo tendría&nbsp;
                        <StyledText className={`text-2xl text-center font-bold  ${colorTextValorNeutrosofico(predictData?.data.valor_neutrosófico || "")}`}>
                            {getValorNeutrosofico(predictData?.data.valor_neutrosófico || "")}
                        </StyledText>
                    </StyledText>
                </StyledView>

                <StyledView className="flex flex-col items-center p-x-6">
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <ProgressChart
                            data={{
                                data: [

                                    predictData?.data.calidad_final || 0
                                ],
                                labels: ["Calidad"]

                            }}
                            hasLegend={false}

                            width={Dimensions.get("window").width - 20}
                            height={220}
                            strokeWidth={16}
                            radius={80}
                            chartConfig={{
                                backgroundGradientFrom: "#fff",
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: "#fff",
                                backgroundGradientToOpacity: 0.5,
                                color: (opacity = 1) => `${rbga.replace("{opacity}", opacity.toString())}`,
                                strokeWidth: 5, // optional, default 3
                                barPercentage: 0.5,

                            }}
                        />
                        <StyledText className={`text-2xl text-center font-bold  text-gray-800
                    absolute top-2/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2
                    ${colorTextValorNeutrosofico(predictData?.data.valor_neutrosófico || "")}
                    `}>
                            {`${Math.round(
                                (predictData?.data.calidad_final || 0) * 100
                            ) || 0}%`}
                        </StyledText>
                    </View>
                </StyledView>

                <StyledView className="flex flex-col items-center m-5">
                    <StyledText className="text-sm text-center font-bold  text-gray-800">
                        Curva de Roc (Red Neuronal)
                    </StyledText>
                    <RocCurve
                        data={predictData.data.red_neuronal.roc_data || { fpr: [], tpr: [], thresholds: [] }}
                    />
                </StyledView>
                <StyledView className="flex flex-col items-center m-5">
                    <StyledText className="text-sm text-center font-bold  text-gray-800">
                        Curva de Roc (Random Forest)
                    </StyledText>
                    <RocCurve
                        data={predictData.data.random_forest.roc_data || { fpr: [], tpr: [], thresholds: [] }}
                    />
                </StyledView>
            </StyledView>
        </ScrollView>

    )
}

export default ResultHome