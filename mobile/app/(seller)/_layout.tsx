import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import SellerBottomNav from '../../components/SellerBottomNav';

export default function SellerLayout() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Slot />
            </View>
            <SellerBottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        marginBottom: 20,
    },
    content: {
        flex: 1,
    },
});
