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
        padding: 12,
        marginBottom: 16,
        flexDirection: 'row', // Layout menyamping
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 12,
        backgroundColor: '#f8f9fa',
    },
    info: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
        flexDirection: 'row', // Memisahkan teks dan tombol aksi
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#192f6a', // Biru gelap tema utama
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3b5998',
        marginBottom: 6,
    },
    stockRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    stockText: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnAction: {
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    editBtn: {
        backgroundColor: '#E3F2FD', // Biru muda pastel
        marginRight: 8,
        paddingHorizontal: 12,
    },
    editText: {
        color: '#007AFF',
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 4,
    },
    deleteBtn: {
        backgroundColor: '#FFEBEE', // Merah muda pastel
    },
});