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
    mainContainer: { marginBottom: 15 },
    label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
    container: { flexDirection: 'row', gap: 10 },
    button: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', backgroundColor: '#fff' },
    active: { backgroundColor: '#3b5998', borderColor: '#3b5998' },
    text: { color: '#666', fontWeight: '500' },
    textActive: { color: '#fff', fontWeight: 'bold' }
});