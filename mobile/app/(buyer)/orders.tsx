import {
    View, Text, StyleSheet, FlatList, Image,
    ActivityIndicator, RefreshControl, Alert, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerBottomNav from '../../components/buyer/BuyerBottomNav';
import { useBuyerOrders } from '../../hooks/buyer/useBuyerOrders';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function BuyerOrders() {
    const { orders, loading, refresh, changeStatus } = useBuyerOrders();

    // Helper untuk warna status
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'ordered': return { bg: '#E3F2FD', text: '#1976D2', label: 'Menunggu' };
            case 'shipped': return { bg: '#FFF3E0', text: '#F57C00', label: 'Dikirim' };
            case 'completed': return { bg: '#E8F5E9', text: '#388E3C', label: 'Selesai' };
            case 'cancelled': return { bg: '#FFEBEE', text: '#D32F2F', label: 'Dibatalkan' };
            default: return { bg: '#F5F5F5', text: '#616161', label: status };
        }
    };

    const renderItem = ({ item }: any) => {
        const statusConfig = getStatusStyle(item.status);

        return (
            <View style={styles.card}>
                {/* Header Card: Tanggal & Status */}
                <View style={styles.cardHeader}>
                    <View style={styles.dateContainer}>
                        <Ionicons name="calendar-outline" size={14} color="#888" />
                        <Text style={styles.dateText}>
                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                        <Text style={[styles.statusText, { color: statusConfig.text }]}>
                            {statusConfig.label}
                        </Text>
                    </View>
                </View>

                {/* Body Card: Produk Info */}
                <View style={styles.productRow}>
                    <Image
                        source={{ uri: IMAGE_URL + item.product.image }}
                        style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={1}>{item.product.name}</Text>
                        <Text style={styles.productQty}>{item.quantity} Barang</Text>
                        <Text style={styles.totalLabel}>Total Belanja:</Text>
                        <Text style={styles.totalPrice}>Rp {Number(item.total_price).toLocaleString()}</Text>
                    </View>
                </View>

                {/* Footer Card: Action Buttons */}
                {(item.status === "ordered" || item.status === "shipped") && (
                    <View style={styles.cardFooter}>
                        {item.status === "ordered" && (
                            <TouchableOpacity
                                style={styles.outlineBtn}
                                onPress={() => {
                                    Alert.alert("Batalkan Pesanan", "Apakah Anda yakin?", [
                                        { text: "Tidak", style: "cancel" },
                                        { text: "Ya, Batal", onPress: () => changeStatus(item.id_order, "cancelled") }
                                    ]);
                                }}
                            >
                                <Text style={styles.outlineBtnText}>Batalkan</Text>
                            </TouchableOpacity>
                        )}

                        {item.status === "shipped" && (
                            <TouchableOpacity
                                style={styles.primaryBtn}
                                onPress={() => {
                                    Alert.alert("Selesaikan Pesanan", "Sudah menerima barang?", [
                                        { text: "Belum", style: "cancel" },
                                        { text: "Sudah", onPress: () => changeStatus(item.id_order, "completed") }
                                    ]);
                                }}
                            >
                                <Text style={styles.primaryBtnText}>Pesanan Diterima</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <BuyerHeader title="Daftar Pesanan" />

            <View style={styles.content}>
                {loading && orders.length === 0 ? (
                    <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id_order.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContainer}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={refresh} />
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Ionicons name="receipt-outline" size={80} color="#DDD" />
                                <Text style={styles.emptyText}>Belum ada riwayat pesanan</Text>
                            </View>
                        }
                    />
                )}
            </View>

            <BuyerBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Background abu-abu sangat muda
    },
    content: {
        flex: 1,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 100, // Ruang untuk bottom nav
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    // Header: Tanggal & Badge
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 12,
        marginBottom: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
        fontWeight: '500',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    // Body: Produk
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#F9F9F9',
    },
    productInfo: {
        flex: 1,
        marginLeft: 15,
    },
    productName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#333',
        marginBottom: 2,
    },
    productQty: {
        fontSize: 13,
        color: '#777',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 11,
        color: '#999',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#192F6A', // Biru gelap tema utama
    },
    // Footer: Buttons
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    outlineBtn: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D32F2F',
        marginRight: 10,
    },
    outlineBtnText: {
        color: '#D32F2F',
        fontSize: 13,
        fontWeight: '600',
    },
    primaryBtn: {
        backgroundColor: '#3B5998', // Biru tema
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        elevation: 2,
    },
    primaryBtnText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '700',
    },
    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#AAA',
        marginTop: 10,
        fontWeight: '500',
    },
});