import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { getShippingCost } from '../../services/shippingService';
import { useEffect, useState } from 'react';
import BuyerHeader from '../../components/BuyerHeader';
import BuyerBottomNav from '../../components/BuyerBottomNav';
import { api } from '../../services/api';

import { Picker } from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVillageDetail } from '../../services/regionService';


const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function BuyerProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const loadProducts = async () => {
        const res = await api.get('/products');
        setProducts(res.data);
    };

    const [sellerAddress, setSellerAddress] = useState<any>(null);
    const [buyerAddress, setBuyerAddress] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!selectedProduct) return;

        const loadAddress = async () => {
            // BUYER
            const buyerId = await AsyncStorage.getItem('id_user');
            const buyerRes = await api.get(`/users/${buyerId}`);

            const buyerVillage = await getVillageDetail(
                buyerRes.data.address
            );

            setBuyerAddress(buyerVillage.data.data);

            // SELLER
            const sellerRes = await api.get(
                `/users/${selectedProduct.id_user}`
            );

            const sellerVillage = await getVillageDetail(
                sellerRes.data.address
            );

            setSellerAddress(sellerVillage.data.data);
        };

        loadAddress();
    }, [selectedProduct]);

    useEffect(() => {
        loadProducts();
    }, []);

    const [shippingOptions, setShippingOptions] = useState<any[]>([]);
    const [selectedCourier, setSelectedCourier] = useState<any>(null);
    const [loadingShipping, setLoadingShipping] = useState(false);

    const totalWeight = selectedProduct
        ? Number(selectedProduct.weight) * quantity
        : 0;

    const productTotalPrice = selectedProduct
        ? Number(selectedProduct.price) * quantity
        : 0;

    useEffect(() => {
        if (!sellerAddress || !buyerAddress || !selectedProduct) return;

        const loadShipping = async () => {
            setLoadingShipping(true);
            try {
                const res = await getShippingCost(
                    sellerAddress.code,
                    buyerAddress.code,
                    totalWeight
                );

                setShippingOptions(res.data.data.couriers);
                setSelectedCourier(null); // 🔥 INI PENTING
            } catch (err) {
                console.log('Shipping error', err);
            } finally {
                setLoadingShipping(false);
            }
        };

        loadShipping();
    }, [sellerAddress, buyerAddress, totalWeight]);



    useEffect(() => {
        if (!selectedProduct) {
            setSellerAddress(null);
            setBuyerAddress(null);
            setShippingOptions([]);
            setSelectedCourier(null);
        }
    }, [selectedProduct]);

    /* =====================
       VIEW PEMESANAN
    ====================== */
    if (selectedProduct) {
        return (
            <View style={styles.container}>
                <BuyerHeader title="Pemesanan" />

                <View style={styles.orderContainer}>
                    {selectedProduct.image && (
                        <Image
                            source={{ uri: IMAGE_URL + selectedProduct.image }}
                            style={styles.image}
                        />
                    )}

                    <Text style={styles.name}>{selectedProduct.name}</Text>
                    <Text style={styles.description}>
                        {selectedProduct.description}
                    </Text>
                    <Text style={styles.price}>
                        Rp {selectedProduct.price}
                    </Text>

                    {sellerAddress && buyerAddress && (
                        <View style={styles.addressBox}>
                            <Text style={styles.addressTitle}>📦 Dikirim dari</Text>
                            <Text style={styles.addressText}>
                                {sellerAddress.province},{' '}
                                {sellerAddress.regency},{' '}
                                {sellerAddress.district},{' '}
                                {sellerAddress.name}
                            </Text>

                            <Text style={styles.addressTitle}>📍 Ke</Text>
                            <Text style={styles.addressText}>
                                {buyerAddress.province},{' '}
                                {buyerAddress.regency},{' '}
                                {buyerAddress.district},{' '}
                                {buyerAddress.name}
                            </Text>
                        </View>
                    )}

                    <View style={styles.qtyBox}>
                        <Text style={styles.addressTitle}>Jumlah Pesanan</Text>

                        <View style={styles.qtyRow}>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                            >
                                <Text style={styles.qtyText}>−</Text>
                            </TouchableOpacity>

                            <Text style={styles.qtyValue}>{quantity}</Text>

                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Text style={styles.qtyText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {loadingShipping && (
                        <Text style={styles.loading}>Menghitung ongkos kirim...</Text>
                    )}

                    {shippingOptions.length > 0 && (
                        <View style={styles.shippingBox}>
                            <Text style={styles.addressTitle}>🚚 Pilih Pengiriman</Text>

                            <Picker
                                selectedValue={selectedCourier}
                                onValueChange={(value) => setSelectedCourier(value)}
                            >
                                <Picker.Item label="Pilih kurir" value={null} />
                                {shippingOptions.map((item, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={`${item.courier_name} - Rp ${item.price} (${item.estimation})`}
                                        value={item}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )}

                    {selectedCourier && (
                        <View style={styles.totalBox}>
                            <Text>Harga Produk: Rp {productTotalPrice}</Text>
                            <Text>Berat Total: {totalWeight} kg</Text>
                            <Text>Ongkir: Rp {selectedCourier.price}</Text>

                            <Text style={styles.total}>
                                Total: Rp {productTotalPrice + Number(selectedCourier.price)}
                            </Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.orderBtn}
                        onPress={() => {
                            alert(
                                `Pesanan dikonfirmasi
Produk: ${selectedProduct.name}
Jumlah: ${quantity}
Kurir: ${selectedCourier.courier_name}
Total: Rp ${productTotalPrice + Number(selectedCourier.price)}`
                            );
                        }}
                        disabled={!selectedCourier}
                    >
                        <Text style={styles.orderText}>Konfirmasi Pesanan</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => {
                            setSelectedProduct(null);
                            setSellerAddress(null);
                            setBuyerAddress(null);
                            setShippingOptions([]);
                            setSelectedCourier(null);
                            setQuantity(1);
                        }}
                    >
                        <Text style={styles.backText}>← Kembali</Text>
                    </TouchableOpacity>


                </View>

                <BuyerBottomNav />
            </View>
        );
    }

    /* =====================
       LIST PRODUK
    ====================== */
    return (
        <View style={styles.container}>
            <BuyerHeader title="Produk" />

            <FlatList
                contentContainerStyle={styles.content}
                data={products}
                keyExtractor={(item) => item.id_product.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.image && (
                            <Image
                                source={{ uri: IMAGE_URL + item.image }}
                                style={styles.image}
                            />
                        )}

                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                        <Text style={styles.price}>
                            Rp {item.price}
                        </Text>

                        <TouchableOpacity
                            style={styles.orderBtn}
                            onPress={() => setSelectedProduct(item)}
                        >
                            <Text style={styles.orderText}>Pesan</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <BuyerBottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },

    content: {
        padding: 15,
        paddingBottom: 80,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
    },

    image: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        marginBottom: 10,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    description: {
        fontSize: 13,
        color: '#555',
        marginBottom: 6,
    },

    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1e90ff',
        marginBottom: 10,
    },

    orderBtn: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    orderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },

    backBtn: {
        marginTop: 15,
        alignItems: 'center',
    },

    backText: {
        color: '#1e90ff',
        fontSize: 14,
        fontWeight: '600',
    },

    orderContainer: {
        padding: 20,
        flex: 1,
    },
    addressBox: {
        marginVertical: 15,
        padding: 12,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },

    addressTitle: {
        fontWeight: 'bold',
        marginTop: 6,
    },

    addressText: {
        fontSize: 13,
        color: '#333',
    },

    shippingBox: {
        marginTop: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
    },

    loading: {
        marginTop: 10,
        fontStyle: 'italic',
    },

    totalBox: {
        marginTop: 15,
        padding: 12,
        backgroundColor: '#e0f2fe',
        borderRadius: 8,
    },

    total: {
        marginTop: 6,
        fontWeight: 'bold',
        fontSize: 16,
    },
    qtyBox: {
        marginTop: 15,
    },

    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },

    qtyBtn: {
        width: 36,
        height: 36,
        borderRadius: 6,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },

    qtyText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    qtyValue: {
        marginHorizontal: 15,
        fontSize: 16,
        fontWeight: 'bold',
    },

});
