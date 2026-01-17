import { api } from "./api";

interface CreateOrderPayload {
    id_user: number;
    id_product: number;
    quantity: number;
    shipping_price: number;
}

export const createOrder = async (payload: CreateOrderPayload) => {
    const res = await api.post("/orders", payload);
    return res.data;
};
