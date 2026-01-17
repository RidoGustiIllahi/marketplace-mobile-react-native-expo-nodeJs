import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';
import { getVillageByCode } from '../../services/regionService';

export const useAddresses = (selectedProduct: any) => {
    const [buyerAddress, setBuyerAddress] = useState<any>(null);
    const [sellerAddress, setSellerAddress] = useState<any>(null);

    useEffect(() => {
        if (!selectedProduct) return;

        const loadAddress = async () => {
            try {
                const buyerId = await AsyncStorage.getItem('id_user');

                const [buyerRes, sellerRes] = await Promise.all([
                    api.get(`/users/${buyerId}`),
                    api.get(`/users/${selectedProduct.id_user}`)
                ]);

                const [bVillage, sVillage] = await Promise.all([
                    getVillageByCode(buyerRes.data.address),
                    getVillageByCode(sellerRes.data.address)
                ]);

                setBuyerAddress(bVillage);
                setSellerAddress(sVillage);
            } catch (err) {
                console.log('Address error', err);
            }
        };

        loadAddress();
    }, [selectedProduct]);

    return { buyerAddress, sellerAddress };
};
