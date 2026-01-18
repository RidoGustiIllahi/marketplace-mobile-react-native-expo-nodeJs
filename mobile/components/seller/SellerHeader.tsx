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
        paddingVertical: 15,
        paddingTop: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#192f6a',
    },
});