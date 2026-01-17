import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function ProductCard({ item, onSelect }: any) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onSelect(item)}
        >
            <Image source={{ uri: IMAGE_URL + item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>Rp {Number(item.price).toLocaleString()}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Pesan</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        // Shadow untuk iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        // Shadow untuk Android
        elevation: 3,
    },
    image: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#f0f0f0' },
    info: { flex: 1, marginLeft: 16, justifyContent: 'space-between' },
    name: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
    description: { fontSize: 13, color: '#777', lineHeight: 18 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    price: { fontSize: 15, fontWeight: 'bold', color: '#007AFF' },
    badge: { backgroundColor: '#E5F1FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    badgeText: { color: '#007AFF', fontSize: 12, fontWeight: 'bold' }
});