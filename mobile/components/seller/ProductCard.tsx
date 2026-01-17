import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function ProductCard({ item, onEdit, onDelete }: any) {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: IMAGE_URL + item.image }}
                style={styles.image}
            />

            <View style={styles.info}>
                <View>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.price}>Rp {Number(item.price).toLocaleString('id-ID')}</Text>
                    <View style={styles.stockRow}>
                        <Ionicons name="cube-outline" size={14} color="#666" />
                        <Text style={styles.stockText}> Stok: {item.stock_quantity}</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.btnAction, styles.editBtn]} onPress={onEdit}>
                        <Ionicons name="pencil-sharp" size={16} color="#007AFF" />
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnAction, styles.deleteBtn]} onPress={onDelete}>
                        <Ionicons name="trash-outline" size={16} color="#FF3B30" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EDF0F2',
    },
    image: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#f0f0f0' },
    info: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
    name: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
    price: { fontSize: 15, color: '#007AFF', fontWeight: '600', marginTop: 2 },
    stockRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    stockText: { fontSize: 13, color: '#666' },
    actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
    btnAction: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8
    },
    editBtn: { backgroundColor: '#E5F1FF' },
    deleteBtn: { backgroundColor: '#FFEBEA' },
    editText: { color: '#007AFF', fontSize: 12, fontWeight: 'bold', marginLeft: 4 }
});