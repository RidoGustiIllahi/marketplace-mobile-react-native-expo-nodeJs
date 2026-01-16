import { View, Text, StyleSheet } from 'react-native';
import SellerHeader from '../../components/SellerHeader';

export default function Chat() {
    return (
        <View style={styles.container}>
            <SellerHeader title="Chat Pembeli" />

            <View style={styles.content}>
                <Text>Daftar Chat</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20 },
});
