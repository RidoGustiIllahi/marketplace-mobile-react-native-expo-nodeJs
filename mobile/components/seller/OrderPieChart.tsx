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
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 20,
        // Shadow modern
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontWeight: "800",
        fontSize: 17,
        color: "#1A1A1A",
        marginLeft: 8,
    },
    chartWrapper: {
        alignItems: 'center',
        marginLeft: -10, // Menyeimbangkan posisi chart kit yang biasanya agak ke kanan
    },
    footer: {
        marginTop: 10,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        alignItems: 'center',
    },
    totalBadge: {
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 12,
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginTop: 2,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#DDD',
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    emptyText: {
        marginTop: 10,
        color: '#AAA',
        fontSize: 14,
    }
});