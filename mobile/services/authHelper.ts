import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserFromStorage = async () => {
    const id_user = await AsyncStorage.getItem("id_user");
    const role = await AsyncStorage.getItem("role");

    return {
        id_user: id_user ? Number(id_user) : null,
        role
    };
};
