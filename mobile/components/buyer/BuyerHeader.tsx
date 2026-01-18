import { View, Text, StyleSheet } from 'react-native';
import LogoutButton from '../LogoutButton';

export default function BuyerHeader({ title }: { title: string }) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <LogoutButton />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
});
