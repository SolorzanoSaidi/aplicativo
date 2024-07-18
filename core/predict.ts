import { API_URL } from "@/constants/Api";
import axios from "axios";


export interface ResultPredict {
    status: string;
    message: string;
    data: Data;
}

export interface Data {
    red_neuronal: RedNeuronal;
    random_forest: RandomForest;
    calidad_final: number;
    valor_neutrosófico: string;
}

export interface RandomForest {
    roc_data: RocData;
    nueva_prediccion: number[];
    nueva_prediccion_probabilidad: number[];
}

export interface RocData {
    fpr: number[];
    tpr: number[];
    thresholds: number[];
}

export interface RedNeuronal {
    roc_data: RocData;
    nueva_prediccion: number;
    nueva_prediccion_probabilidad: number[];
}

/*{
    "temperature":33.4,
    "humidity":53,
    "tds":582,
    "ph":6.2
}*/


export interface InputPredict {
    temperature: number;
    humidity: number;
    tds: number;
    ph: number;
}

export const Predict = async (input: InputPredict): Promise<ResultPredict> => {
    console.log(JSON.stringify(input));
    const response = await axios.post<ResultPredict>(API_URL+"/predict", input);
    return response.data;

}

/*
Valor Neutrosófico	Descripción
em	Empezando (muy baja calidad)
mmm	Muy mala calidad
mm	Mala calidad
ma	Calidad media baja
mdm	Calidad media
m	Calidad media alta
mdb	Buena calidad
b	Calidad buena
mb	Muy buena calidad
mmb	Excelente calidad
eb	Excepcional (la mejor calidad)*/

export const getValorNeutrosofico = (value:String)=>{

    const values = {
        "em":"Empezando (muy baja calidad)",
        "mmm":"Muy mala calidad",
        "mm":"Mala calidad",
        "ma":"Calidad media baja",
        "mdm":"Calidad media",
        "m":"Calidad media alta",
        "mdb":"Buena calidad",
        "b":"Calidad buena",
        "mb":"Muy buena calidad",
        "mmb":"Excelente calidad",
        "eb":"Excepcional (la mejor calidad)"
    }

    return values[value as keyof typeof values];
}

export const colorValorNeutrosofico = (value:String)=>{
    if (value === "") {
        return "bg-red-500";
    }
    const values = {
        "em":"bg-red-500",
        "mmm":"bg-red-400",
        "mm":"bg-red-300",
        "ma":"bg-red-200",
        "mdm":"bg-yellow-300",
        "m":"bg-yellow-400",
        "mdb":"bg-yellow-500",
        "b":"bg-green-200",
        "mb":"bg-green-300",
        "mmb":"bg-green-400",
        "eb":"bg-green-500"
    }

    return values[value as keyof typeof values];
}

export const colorTextValorNeutrosofico = (value:String)=>{
    if (value === "") {
        return "text-red-500";
    }
    const values = {
        "em":"text-red-500",
        "mmm":"text-red-400",
        "mm":"text-red-300",
        "ma":"text-red-200",
        "mdm":"text-yellow-300",
        "m":"text-yellow-400",
        "mdb":"text-yellow-500",
        "b":"text-green-200",
        "mb":"text-green-300",
        "mmb":"text-green-400",
        "eb":"text-green-500"
    }

    return values[value as keyof typeof values];
}

export const colorRbgValorNeutrosofico = (value:String)=>{
    if (value === "") {
        return "rgba(239, 68, 68, 1)";
    }
    const values = {
        "em":"rgba(239, 68, 68, {opacity})",
        "mmm":"rgba(239, 68, 68, {opacity})",
        "mm":"rgba(239, 68, 68, {opacity})",
        "ma":"rgba(239, 68, 68, {opacity})",
        "mdm":"rgba(253, 230, 138, {opacity})",
        "m":"rgba(253, 230, 138, {opacity})",
        "mdb":"rgba(253, 230, 138, {opacity})",
        "b":"rgba(144, 238, 144, {opacity})",
        "mb":"rgba(144, 238, 144, {opacity})",
        "mmb":"rgba(144, 238, 144, {opacity})",
        "eb":"rgba(144, 238, 144, {opacity})"
    }

    return values[value as keyof typeof values]

}