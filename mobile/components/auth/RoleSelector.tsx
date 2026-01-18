import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RoleSelector({ role, setRole }: any) {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.label}>Daftar Sebagai:</Text>
            <View style={styles.container}>
                {['pembeli', 'penjual'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.button, role === item && styles.active]}
                        onPress={() => setRole(item)}
                    >
                        <Text style={[styles.text, role === item && styles.textActive]}>
                            {item === 'pembeli' ? '🛍️ Pembeli' : '🏪 Penjual'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3b5998',
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#f0f2f5',
        borderRadius: 12,
        padding: 4,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
    },
    active: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
    textActive: {
        color: '#3b5998',
        fontWeight: 'bold',
    },
});