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
        borderRadius: 15,
        width: '48%', // Untuk 2 kolom
        marginBottom: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#f9f9f9',
    },
    info: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#777',
        height: 32,
        lineHeight: 16,
    },
    footer: {
        flexDirection: 'column',
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        fontWeight: '800',
        color: '#3b5998',
        marginBottom: 8,
    },
    badge: {
        backgroundColor: '#3b5998',
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
});