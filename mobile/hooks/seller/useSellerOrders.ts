import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrdersBySeller, updateOrderStatus } from "../../services/orderService";

export const useSellerOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const id_user = await AsyncStorage.getItem("id_user");
            if (!id_user) return;

            const data = await getOrdersBySeller(Number(id_user));
            setOrders(data);
        } catch (err) {
            Alert.alert("Error", "Gagal memuat pesanan");
        } finally {
            setLoading(false);
        }
    };

    const shipOrder = async (id_order: number) => {
        try {
            await updateOrderStatus(id_order, "shipped");
            Alert.alert("Berhasil", "Pesanan dikirim");
            fetchOrders();
        } catch (err: any) {
            Alert.alert(
                "Gagal",
                err.response?.data?.message || "Gagal update status"
            );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        refresh: fetchOrders,
        shipOrder
    };
};
