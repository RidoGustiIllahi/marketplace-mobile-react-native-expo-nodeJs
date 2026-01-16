import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { createProduct, updateProduct } from '../../services/productService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProductForm({ product, onClose }: any) {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price?.toString() || '');
    const [stock, setStock] = useState(product?.stock_quantity?.toString() || '');
    const [description, setDescription] = useState(product?.description || '');
    const [weight, setWeight] = useState(product?.weight?.toString() || '');
    const [image, setImage] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const submit = async () => {
        const id_user = await AsyncStorage.getItem('id_user');

        if (!id_user) {
            Alert.alert('Error', 'User belum login');
            return;
        }

        if (!name || !price || !stock || !description || !weight || (!image && !product)) {
            Alert.alert('Error', 'Semua field wajib diisi');
            return;
        }

        const formData = new FormData();

        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock_quantity', stock);
        formData.append('description', description);
        formData.append('weight', weight);
        formData.append('id_user', id_user);

        if (image) {
            formData.append('image', {
                uri: image.uri,
                name: 'product.jpg',
                type: 'image/jpeg',
            } as any);
        }

        try {
            setLoading(true);
            if (product) {
                await updateProduct(product.id_product, formData);
            } else {
                await createProduct(formData);
            }

            onClose();
        } catch (err: any) {
            Alert.alert('Error', err.response?.data?.message || 'Gagal menyimpan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.formTitle}>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Ionicons name="close-circle" size={28} color="#999" />
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                {/* INPUT NAMA */}
                <Text style={styles.label}>Nama Produk</Text>
                <TextInput
                    placeholder="Contoh: Sepatu Lari Ultra"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

                {/* INPUT DESKRIPSI */}
                <Text style={styles.label}>Deskripsi</Text>
                <TextInput
                    placeholder="Jelaskan detail produk Anda..."
                    value={description}
                    onChangeText={setDescription}
                    style={[styles.input, styles.textArea]}
                    multiline
                    textAlignVertical="top"
                />

                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.label}>Harga (Rp)</Text>
                        <TextInput
                            placeholder="0"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                            style={styles.input}
                        />
                    </View>
                    <View style={{ width: 15 }} />
                    <View style={styles.flex1}>
                        <Text style={styles.label}>Stok</Text>
                        <TextInput
                            placeholder="0"
                            keyboardType="numeric"
                            value={stock}
                            onChangeText={setStock}
                            style={styles.input}
                        />
                    </View>
                </View>

                <Text style={styles.label}>Berat (kg)</Text>
                <TextInput
                    placeholder="0.0"
                    keyboardType="decimal-pad"
                    value={weight}
                    onChangeText={setWeight}
                    style={styles.input}
                />

                {/* BAGIAN GAMBAR */}
                <Text style={styles.label}>Foto Produk</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {image ? (
                        <View style={styles.imagePreviewContainer}>
                            <Image source={{ uri: image.uri }} style={styles.previewImage} />
                            <View style={styles.changeImageOverlay}>
                                <Ionicons name="camera" size={20} color="#fff" />
                                <Text style={styles.changeImageText}>Ganti Foto</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.placeholderBox}>
                            <Ionicons name="cloud-upload-outline" size={40} color="#007AFF" />
                            <Text style={styles.placeholderText}>Unggah Foto Produk</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* TOMBOL AKSI */}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnSubmit]}
                        onPress={submit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.btnSubmitText}>Simpan Produk</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
                        <Text style={styles.btnCancelText}>Batal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 12,
        padding: 12,
        fontSize: 15,
        color: '#333',
    },
    textArea: {
        height: 100,
    },
    row: {
        flexDirection: 'row',
    },
    flex1: {
        flex: 1,
    },
    imagePicker: {
        marginTop: 5,
        marginBottom: 20,
    },
    placeholderBox: {
        height: 150,
        backgroundColor: '#F0F7FF',
        borderRadius: 15,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#007AFF',
        marginTop: 8,
        fontWeight: '500',
    },
    imagePreviewContainer: {
        height: 200,
        borderRadius: 15,
        overflow: 'hidden',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    changeImageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    changeImageText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold',
    },
    buttonGroup: {
        marginTop: 10,
    },
    btn: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 10,
    },
    btnSubmit: {
        backgroundColor: '#007AFF',
    },
    btnSubmitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnCancel: {
        backgroundColor: '#F2F2F7',
    },
    btnCancelText: {
        color: '#FF3B30',
        fontWeight: '600',
    },
});
