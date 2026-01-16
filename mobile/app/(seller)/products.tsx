import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, deleteProduct } from '../../services/productService';
import ProductForm from './ProductForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const IMAGE_URL = 'http://10.22.209.58:3001/';

    const loadProducts = async () => {
        const id_user = await AsyncStorage.getItem('id_user');
        const res = await getProducts(Number(id_user));
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const onDelete = (id: number) => {
        Alert.alert('Hapus', 'Yakin hapus produk?', [
            { text: 'Batal' },
            {
                text: 'Hapus',
                onPress: async () => {
                    await deleteProduct(id);
                    loadProducts();
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SellerHeader title="Produk Saya" />

            {showForm ? (
                <ProductForm
                    product={selectedProduct}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedProduct(null);
                        loadProducts();
                    }}
                />
            ) : (
                <View style={styles.content}>
                    {/* TOMBOL TAMBAH PRODUK MODERN */}
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => setShowForm(true)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add-circle" size={20} color="#fff" />
                        <Text style={styles.addText}>Tambah Produk Baru</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id_product.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                {/* AREA GAMBAR */}
                                <View style={styles.imageContainer}>
                                    {item.image ? (
                                        <Image
                                            source={{ uri: IMAGE_URL + item.image }}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <View style={styles.placeholderImage}>
                                            <Ionicons name="image-outline" size={40} color="#ccc" />
                                        </View>
                                    )}
                                    <View style={styles.stockBadge}>
                                        <Text style={styles.stockText}>Stok: {item.stock_quantity}</Text>
                                    </View>
                                </View>

                                {/* INFO PRODUK */}
                                <View style={styles.infoContainer}>
                                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.description} numberOfLines={2}>
                                        {item.description}
                                    </Text>

                                    <View style={styles.priceRow}>
                                        <Text style={styles.price}>
                                            Rp {Number(item.price).toLocaleString('id-ID')}
                                        </Text>
                                    </View>

                                    {/* ACTION BUTTONS */}
                                    <View style={styles.actions}>
                                        <TouchableOpacity
                                            style={[styles.actionBtn, styles.editBtn]}
                                            onPress={() => {
                                                setSelectedProduct(item);
                                                setShowForm(true);
                                            }}
                                        >
                                            <Ionicons name="pencil" size={16} color="#007AFF" />
                                            <Text style={styles.editText}>Edit</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.actionBtn, styles.deleteBtn]}
                                            onPress={() => onDelete(item.id_product)}
                                        >
                                            <Ionicons name="trash-outline" size={16} color="#FF3B30" />
                                            <Text style={styles.deleteText}>Hapus</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    addBtn: {
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: 'row', // Layout menyamping (Horizontal)
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    imageContainer: {
        width: 120,
        height: 140,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stockBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    stockText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    infoContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    description: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    priceRow: {
        marginVertical: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#007AFF',
    },
    actions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 10,
        marginTop: 5,
        gap: 15, // Memberikan jarak antar tombol aksi
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    editBtn: {
        backgroundColor: '#E3F2FD', // Biru muda transparan untuk background tombol edit
    },
    deleteBtn: {
        backgroundColor: '#FFE5E5', // Merah muda transparan untuk background tombol hapus
    },
    editText: {
        color: '#007AFF',
        marginLeft: 6,
        fontWeight: '600',
        fontSize: 13,
    },
    deleteText: {
        color: '#FF3B30',
        marginLeft: 6,
        fontWeight: '600',
        fontSize: 13,
    },
});