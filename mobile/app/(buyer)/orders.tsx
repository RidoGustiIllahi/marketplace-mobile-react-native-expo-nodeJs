import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerBottomNav from '../../components/buyer/BuyerBottomNav';
import { useBuyerOrders } from '../../hooks/buyer/useBuyerOrders';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function BuyerOrders() {
    const { orders, loading, refresh } = useBuyerOrders();

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
                    <Text style={styles.qty}>
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
                <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString()}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <BuyerHeader title="Pesanan Saya" />

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

            <BuyerBottomNav />
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

    qty: {
        fontSize: 13,
        color: "#666",
        marginTop: 4
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
        overflow: "hidden",
        color: "#fff"
    },

    ordered: { backgroundColor: "#007AFF" },
    shipped: { backgroundColor: "#FF9500" },
    completed: { backgroundColor: "#34C759" },
    cancelled: { backgroundColor: "#FF3B30" },

    date: {
        fontSize: 12,
        color: "#888"
    },

    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#666"
    }
});
