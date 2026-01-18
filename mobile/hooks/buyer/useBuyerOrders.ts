import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getOrdersByUser } from "../../services/orderService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useBuyerOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const id_user = await AsyncStorage.getItem("id_user");

            if (!id_user) {
                Alert.alert("Error", "User belum login");
                return;
            }

            const data = await getOrdersByUser(Number(id_user));
            setOrders(data);
        } catch (err: any) {
            Alert.alert(
                "Error",
                err.response?.data?.message || "Gagal memuat pesanan"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        refresh: fetchOrders
    };
};
