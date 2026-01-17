import { View, Text, StyleSheet } from 'react-native';
import LogoutButton from '../LogoutButton';

type Props = {
    title: string;
};

export default function SellerHeader({ title }: Props) {
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
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' }
});