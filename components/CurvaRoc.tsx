import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { LoaderScreen } from 'react-native-ui-lib';

interface RocCurveProps {
    data: {
        fpr: number[];
        tpr: number[];
        thresholds: number[];
    },
}

const RocCurve = ({ data }: RocCurveProps) => {
    const [dataChart, setDataChart] = useState<LineChartData>({
        labels: [
            "0", "1", "2"
        ],
        datasets: [
            {
                data: [0, 0, 0],
            }
        ],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data.fpr.length > 0 && data.tpr.length > 0 && data.thresholds.length > 0) {
            setLoading(false);
        }

        try {
            const _data: LineChartData = {
                labels: data.fpr.length > 0 ? data.fpr.map((_, i) => i.toString()) : [],
                datasets: [
                    {
                        data: data.tpr || [],
                        strokeWidth: 2,
                        color: (opacity = 1) => `rgba(19, 86, 126, ${opacity})`,
                    },
                    {
                        data: data.fpr.length > 0 ? data.fpr.map(() => data.fpr[data.fpr.length - 1]) : [],
                        strokeWidth: 2,
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    },
                ],
            };
            setDataChart(_data);

        } catch (e) {
            console.log(e);
            setDataChart({
                labels: [
                    "0", "1", "2"
                ],
                datasets: [
                    {
                        data: [0, 0, 0],
                    }
                ],
            });
            setLoading(false);

        }

    }, [data]);

    return (
        loading ?
            <LoaderScreen></LoaderScreen> :
            <LineChart
                data={{
                    labels: dataChart.labels,
                    datasets: dataChart.datasets,

                }}
                width={Dimensions.get("window").width - 20} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(19, 86, 126, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(19, 86, 126, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "blue",
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
    );
};

export default RocCurve;
