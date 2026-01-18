import { View, Text, StyleSheet } from 'react-native';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerBottomNav from '../../components/buyer/BuyerBottomNav';

export default function BuyerChat() {
    return (
        <View style={styles.container}>
            <BuyerHeader title="Chat Penjual" />

            <View style={styles.content}>
                <Text>about</Text>
            </View>

            <BuyerBottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 20 },
});
