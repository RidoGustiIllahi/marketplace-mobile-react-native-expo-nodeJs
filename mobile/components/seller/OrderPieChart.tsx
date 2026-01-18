import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function OrderPieChart({ stats }: any) {
    // Definisi data dengan warna yang lebih modern (Soft UI)
    const data = [
        {
            name: "Baru",
            population: stats.ordered,
            color: "#007AFF", // Blue
            legendFontColor: "#555",
            legendFontSize: 13
        },
        {
            name: "Proses",
            population: stats.shipped,
            color: "#FF9500", // Orange
            legendFontColor: "#555",
            legendFontSize: 13
        },
        {
            name: "Selesai",
            population: stats.completed,
            color: "#34C759", // Green
            legendFontColor: "#555",
            legendFontSize: 13
        },
        {
            name: "Batal",
            population: stats.cancelled,
            color: "#FF3B30", // Red
            legendFontColor: "#555",
            legendFontSize: 13
        }
    ].filter(item => item.population > 0);

    if (stats.total === 0) {
        return (
            <View style={[styles.container, styles.emptyContainer]}>
                <Ionicons name="bar-chart-outline" size={40} color="#CCC" />
                <Text style={styles.emptyText}>Belum ada data untuk dianalisa</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Ionicons name="pie-chart" size={20} color="#007AFF" />
                <Text style={styles.title}>Analitik Pesanan</Text>
            </View>

            <View style={styles.chartWrapper}>
                <PieChart
                    data={data}
                    // Perkecil width agar tidak memakan seluruh lebar layar
                    width={screenWidth * 0.8}
                    // Perkecil height (sebelumnya mungkin 220, kita coba 160)
                    height={100}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    // Geser chart ke kiri agar legenda di kanan tidak terpotong
                    paddingLeft="0"
                    // Jika absolute={false}, chart akan menunjukkan persentase (%) yang biasanya lebih ringkas
                    absolute
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.totalBadge}>
                    <Text style={styles.totalLabel}>Total Akumulasi</Text>
                    <Text style={styles.totalValue}>{stats.total} Pesanan</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        margin: 16,
        padding: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#192f6a',
        marginLeft: 8,
    },
    chartWrapper: {
        alignItems: 'center', // Pusatkan chart
        justifyContent: 'center',
        marginVertical: 10,
    },
    footer: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingTop: 10,
    },
    totalBadge: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderRadius: 12,
    },
    totalLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    totalValue: {
        fontSize: 14,
        fontWeight: '800',
        color: '#192f6a',
    },
    emptyContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#AAA',
        marginTop: 8,
        fontSize: 13,
    }
});