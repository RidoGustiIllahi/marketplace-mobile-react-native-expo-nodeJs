import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { createProduct, updateProduct } from '../../services/productService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductForm({ product, onClose }: any) {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || '');
    const [stock, setStock] = useState(product?.stock_quantity || '');

    const submit = async () => {
        const id_user = await AsyncStorage.getItem('id_user');

        if (!id_user) {
            Alert.alert('Error', 'User belum login');
            return;
        }

        const payload = {
            name,
            price,
            stock_quantity: stock,
            weight: 1,
            id_user: Number(id_user),
        };

        if (product) {
            await updateProduct(product.id_product, payload);
        } else {
            await createProduct(payload);
        }

        onClose();
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

            <Button title="Simpan" onPress={submit} />
            <Button title="Batal" onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20 },
    addBtn: {
        backgroundColor: '#1e90ff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
    },
    addText: { color: '#fff', textAlign: 'center' },
    card: {
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        marginBottom: 10,
    },
    name: { fontWeight: 'bold', fontSize: 16 },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    edit: { color: 'orange' },
    delete: { color: 'red' },
    form: { padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});
