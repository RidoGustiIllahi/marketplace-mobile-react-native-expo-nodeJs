import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    RefreshControl,
    Alert
} from 'react-native';
import SellerHeader from '../../components/seller/SellerHeader';
import { useSellerOrders } from '../../hooks/seller/useSellerOrders';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function SellerDashboard() {
    const { orders, loading, refresh, shipOrder } = useSellerOrders();

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image
                    source={{ uri: IMAGE_URL + item.product.image }}
                    style={styles.image}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.productName}>
                        {item.product.name}
                    </Text>

                    <Text style={styles.text}>
                        Pembeli: {item.user.name}
                    </Text>

                    <Text style={styles.text}>
                        Jumlah: {item.quantity}
                    </Text>

                    <Text style={styles.price}>
                        Total: Rp {Number(item.total_price).toLocaleString()}
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={[
                    styles.status,
                    styles[item.status as keyof typeof styles]
                ]}>
                    {item.status.toUpperCase()}
                </Text>

                {item.status === "ordered" && (
                    <Text
                        style={styles.shipBtn}
                        onPress={() =>
                            Alert.alert(
                                "Konfirmasi",
                                "Kirim pesanan ini?",
                                [
                                    { text: "Batal", style: "cancel" },
                                    { text: "Kirim", onPress: () => shipOrder(item.id_order) }
                                ]
                            )
                        }
                    >
                        Kirim Pesanan
                    </Text>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SellerHeader title="Dashboard Penjual" />

            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : orders.length === 0 ? (
                    <Text style={styles.empty}>
                        Belum ada pesanan
                    </Text>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id_order.toString()}
                        renderItem={renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={refresh}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16 },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2
    },

    row: {
        flexDirection: "row",
        marginBottom: 8
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12
    },

    productName: {
        fontWeight: "600",
        fontSize: 15
    },

    text: {
        fontSize: 13,
        color: "#555",
        marginTop: 2
    },

    price: {
        fontWeight: "bold",
        marginTop: 6
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    status: {
        fontSize: 12,
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        color: "#fff"
    },

    ordered: { backgroundColor: "#007AFF" },
    shipped: { backgroundColor: "#FF9500" },
    completed: { backgroundColor: "#34C759" },
    cancelled: { backgroundColor: "#FF3B30" },

    shipBtn: {
        color: "#007AFF",
        fontWeight: "bold",
        fontSize: 13
    },

    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#666"
    }
});
