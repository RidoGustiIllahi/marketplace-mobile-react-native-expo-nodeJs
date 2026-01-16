import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
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
            if (product) {
                await updateProduct(product.id_product, formData);
            } else {
                await createProduct(formData);
            }

            onClose();
        } catch (err: any) {
            Alert.alert('Error', err.response?.data?.message || 'Gagal menyimpan');
        }
    };

    return (
        <View style={styles.form}>
            <TextInput
                placeholder="Nama Produk"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Deskripsi"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { height: 80 }]}
                multiline
            />

            <TextInput
                placeholder="Harga"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
            />

            <TextInput
                placeholder="Stok"
                keyboardType="numeric"
                value={stock}
                onChangeText={setStock}
                style={styles.input}
            />

            <TextInput
                placeholder="Berat (kg)"
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
                style={styles.input}
            />

            <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
                <Text style={{ color: '#fff' }}>
                    {image ? 'Ganti Gambar' : 'Pilih Gambar'}
                </Text>
            </TouchableOpacity>

            {image && (
                <Image source={{ uri: image.uri }} style={styles.preview} />
            )}

            <Button title="Simpan" onPress={submit} />
            <Button title="Batal" onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },

    content: {
        padding: 20,
    },

    /* =====================
       BUTTON TAMBAH
    ====================== */
    addBtn: {
        backgroundColor: '#1e90ff',
        paddingVertical: 14,
        marginBottom: 15,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
    },

    addText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

    /* =====================
       CARD PRODUCT
    ====================== */
    card: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },

    price: {
        fontSize: 14,
        color: '#1e90ff',
        fontWeight: '600',
        marginBottom: 2,
    },

    stock: {
        fontSize: 13,
        color: '#555',
    },

    /* =====================
       ACTION BUTTON
    ====================== */
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },

    actionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
        marginLeft: 10,
    },

    edit: {
        color: '#fff',
        backgroundColor: '#ffa500',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        fontSize: 13,
        fontWeight: '600',
    },

    delete: {
        color: '#fff',
        backgroundColor: '#dc3545',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        fontSize: 13,
        fontWeight: '600',
    },

    /* =====================
       FORM
    ====================== */
    form: {
        padding: 20,
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 12,
        elevation: 3,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 12,
        borderRadius: 8,
        fontSize: 14,
        backgroundColor: '#fafafa',
    },

    textarea: {
        height: 90,
        textAlignVertical: 'top',
    },

    /* =====================
       IMAGE PICKER
    ====================== */
    imageBtn: {
        backgroundColor: '#1e90ff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },

    preview: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'cover',
    },

    /* =====================
       FORM BUTTON
    ====================== */
    submitBtn: {
        backgroundColor: '#28a745',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },

    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

    cancelBtn: {
        backgroundColor: '#6c757d',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },

    cancelText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
