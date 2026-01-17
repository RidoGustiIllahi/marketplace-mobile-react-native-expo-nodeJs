import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { createProduct, updateProduct } from '../../services/productService';
import { buildProductFormData } from '../../utils/productFormData';
import * as ImagePicker from 'expo-image-picker';

export function useProductForm(product?: any, onSuccess?: () => void) {
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
        if (!name || !price || !stock || !description || !weight || (!image && !product)) {
            Alert.alert('Validasi', 'Semua field wajib diisi');
            return;
        }

        const id_user = await AsyncStorage.getItem('id_user');
        if (!id_user) {
            Alert.alert('Error', 'User belum login');
            return;
        }

        try {
            setLoading(true);

            const formData = buildProductFormData({
                name,
                price,
                stock,
                description,
                weight,
                id_user,
                image,
            });

            if (product) {
                await updateProduct(product.id_product, formData);
            } else {
                await createProduct(formData);
            }

            onSuccess?.();
        } catch (err: any) {
            Alert.alert('Error', err.response?.data?.message || 'Gagal menyimpan produk');
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        setName,
        price,
        setPrice,
        stock,
        setStock,
        description,
        setDescription,
        weight,
        setWeight,
        image,
        pickImage,
        submit,
        loading,
        isEdit: !!product,
    };
}
