import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import SellerHeader from '../../components/seller/SellerHeader';

export default function About() {
    return (
        <View style={styles.container}>
            <SellerHeader title="About" />

            <View style={styles.content}>
                <Text style={styles.title}>Tentang Aplikasi</Text>

                <Text style={styles.desc}>
                    Aplikasi ini merupakan platform marketplace yang dirancang untuk memfasilitasi transaksi jual beli antara penjual dan pembeli secara terintegrasi. Sistem ini menyediakan fitur autentikasi pengguna dengan peran penjual dan pembeli, pengelolaan produk, pemesanan, pengiriman, serta pemantauan status pesanan secara real-time.

                    Pada proses registrasi, pengguna diwajibkan mengisi data alamat lengkap yang meliputi provinsi, kabupaten/kota, kecamatan, dan desa. Data wilayah tersebut diperoleh melalui integrasi dengan API publik Indonesia sehingga menjamin keakuratan dan konsistensi informasi alamat.

                    Penjual dapat mengelola produk yang dijual, memantau pesanan masuk, serta mengubah status pengiriman melalui dashboard penjual yang dilengkapi dengan ringkasan dan grafik penjualan. Sementara itu, pembeli dapat menelusuri produk, melakukan pemesanan, mengatur jumlah pembelian, memilih jasa pengiriman, serta memantau riwayat dan status pesanan.

                    Aplikasi ini juga mendukung perhitungan ongkos kirim secara otomatis berdasarkan alamat penjual, alamat pembeli, dan total berat produk. Dengan adanya sistem ini, diharapkan proses transaksi jual beli dapat berjalan lebih efektif, transparan, dan efisien.

                </Text>

                <Text style={styles.title}>Developer</Text>

                <View style={styles.devItem}>
                    <Text style={styles.devName}>Fikriansyah</Text>
                    <Text style={styles.devNpm}>NRP: 152023138</Text>
                </View>

                <View style={styles.devItem}>
                    <Text style={styles.devName}>Rido Gusti Illahi</Text>
                    <Text style={styles.devNpm}>NRP: 152023169</Text>
                </View>


                <Text style={styles.title}>Video Demo</Text>

                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL(
                            'https://www.youtube.com/watch?v=LINK_VIDEO_DEMO'
                        )
                    }
                >
                    <Text style={styles.link}>
                        ▶️ Tonton Demo Aplikasi di YouTube
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    content: {
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8
    },
    desc: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20
    },
    devItem: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2
    },
    devName: {
        fontWeight: '600',
        fontSize: 14
    },
    devNpm: {
        fontSize: 13,
        color: '#666'
    },
    link: {
        color: '#007AFF',
        fontSize: 15,
        marginTop: 8
    }
});
