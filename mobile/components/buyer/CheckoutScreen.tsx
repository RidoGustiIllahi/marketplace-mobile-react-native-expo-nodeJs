import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useOrder } from "../../hooks/buyer/useOrder";
import BuyerHeader from './BuyerHeader';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function CheckoutScreen({ product, quantity, setQuantity, buyerAddress, sellerAddress, shippingOptions, selectedCourier, setSelectedCourier, loadingShipping, onBack }: any) {
    const productTotal = Number(product.price) * quantity;
    const shippingCost = selectedCourier ? Number(selectedCourier.price) : 0;
    const totalPay = productTotal + shippingCost;
    const { placeOrder, loading } = useOrder();

    return (
        <SafeAreaView style={styles.container}>
            <BuyerHeader title="Checkout" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                {/* Item Card */}
                <View style={styles.sectionCard}>
                    <View style={styles.productRow}>
                        <Image source={{ uri: IMAGE_URL + product.image }} style={styles.thumb} />
                        <View style={styles.productDetail}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productDescription}>{product.description}</Text>
                            <Text style={styles.productPrice}>Rp {Number(product.price).toLocaleString()}</Text>
                        </View>
                    </View>
                </View>

                {/* Address Section */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Detail Pengiriman</Text>

                    <View style={styles.addressWrapper}>
                        <View style={styles.timeline}>
                            <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
                            <View style={styles.line} />
                            <View style={[styles.dot, { backgroundColor: '#FF3B30' }]} />
                        </View>

                        <View style={styles.addressTextWrapper}>
                            <View style={styles.addressItem}>
                                <Text style={styles.addressLabel}>Asal (Penjual)</Text>
                                {sellerAddress ? (
                                    <Text style={styles.addressContent}>{sellerAddress.name}, {sellerAddress.district}</Text>
                                ) : <ActivityIndicator size="small" />}
                            </View>

                            <View style={[styles.addressItem, { marginBottom: 0 }]}>
                                <Text style={styles.addressLabel}>Tujuan (Kamu)</Text>
                                {buyerAddress ? (
                                    <Text style={styles.addressContent}>{buyerAddress.name}, {buyerAddress.district}, {buyerAddress.regency}</Text>
                                ) : <ActivityIndicator size="small" />}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quantity & Courier Selection */}
                <View style={styles.rowBetween}>
                    <View style={[styles.sectionCard, { flex: 1, marginRight: 8, marginBottom: 0 }]}>
                        <Text style={styles.sectionTitleSmall}>Jumlah</Text>
                        <View style={styles.stepper}>
                            <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)} style={styles.stepBtn}>
                                <Ionicons name="remove" size={18} color="#007AFF" />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.stepBtn}>
                                <Ionicons name="add" size={18} color="#007AFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.sectionCard, { flex: 1.5, marginLeft: 8, marginBottom: 0 }]}>
                        <Text style={styles.sectionTitleSmall}>Kurir</Text>
                        <View style={styles.pickerWrapper}>
                            {loadingShipping ? <ActivityIndicator size="small" /> : (
                                <Picker selectedValue={selectedCourier} onValueChange={setSelectedCourier} mode="dropdown">
                                    <Picker.Item label="Pilih..." value={null} />
                                    {shippingOptions.map((item: any, idx: number) => (
                                        <Picker.Item key={idx} label={item.courier_name} value={item} />
                                    ))}
                                </Picker>
                            )}
                        </View>
                    </View>
                </View>

                {/* Payment Summary */}
                {selectedCourier && (
                    <View style={styles.summaryCard}>
                        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Ringkasan Bayar</Text>
                        <Row label="Total Produk" value={productTotal} />
                        <Row label="Ongkos Kirim" value={shippingCost} />
                        <View style={styles.divider} />
                        <Row label="Total Belanja" value={totalPay} bold />
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.mainBtn, (!selectedCourier || loading) && styles.disabledBtn]}
                    disabled={!selectedCourier || loading}
                    onPress={() =>
                        placeOrder({
                            id_product: product.id_product,
                            quantity,
                            shipping_price: shippingCost,
                            onSuccess: onBack
                        })
                    }
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.mainBtnText}>Bayar Sekarang</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Ganti Produk</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const Row = ({ label, value, bold }: any) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={[styles.rowLabel, bold && styles.boldText]}>{label}</Text>
        <Text style={[styles.rowValue, bold && styles.boldText]}>Rp {Number(value).toLocaleString()}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scroll: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#192f6a',
        marginBottom: 15,
    },
    sectionTitleSmall: {
        fontSize: 13,
        fontWeight: '600',
        color: '#3b5998',
        marginBottom: 8,
    },
    // Item Card Style
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumb: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    productDetail: {
        marginLeft: 15,
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    productDescription: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
        lineHeight: 16, // Memberikan ruang antar baris agar mudah dibaca
    },
    productPrice: {
        fontSize: 14,
        color: '#3b5998',
        fontWeight: '700',
        marginTop: 4,
    },
    // Address Timeline Style
    addressWrapper: {
        flexDirection: 'row',
    },
    timeline: {
        alignItems: 'center',
        marginRight: 12,
        paddingVertical: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#eee',
        marginVertical: 4,
    },
    addressTextWrapper: {
        flex: 1,
    },
    addressItem: {
        marginBottom: 15,
    },
    addressLabel: {
        fontSize: 11,
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    addressContent: {
        fontSize: 14,
        color: '#444',
        fontWeight: '500',
        marginTop: 2,
    },
    // Controls
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f2f5',
        borderRadius: 10,
        padding: 4,
    },
    stepBtn: {
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 8,
        elevation: 1,
    },
    qtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#192f6a',
    },
    pickerWrapper: {
        backgroundColor: '#f0f2f5',
        borderRadius: 10,
        overflow: 'hidden',
    },
    // Summary Card
    summaryCard: {
        backgroundColor: '#192f6a', // Kontras gelap yang elegan
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    rowLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
    },
    rowValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    boldText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 12,
    },
    // Buttons
    mainBtn: {
        backgroundColor: '#3b5998',
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#3b5998',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    mainBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledBtn: {
        backgroundColor: '#ccc',
        shadowOpacity: 0,
    },
    backBtn: {
        marginTop: 15,
        alignItems: 'center',
        padding: 10,
    },
    backBtnText: {
        color: '#999',
        fontSize: 14,
    },
});