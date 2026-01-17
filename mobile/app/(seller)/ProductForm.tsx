import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProductForm } from '../../hooks/seller/useProductForm';

export default function ProductForm({ product, onClose }: any) {
    const {
        name, setName,
        price, setPrice,
        stock, setStock,
        description, setDescription,
        weight, setWeight,
        image, pickImage,
        submit, loading, isEdit,
    } = useProductForm(product, onClose);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>
                            {isEdit ? 'Update Produk' : 'Produk Baru'}
                        </Text>
                        <Text style={styles.subtitle}>Lengkapi detail informasi produk Anda</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="close-circle" size={32} color="#E0E0E0" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formCard}>
                    {/* Section: Foto */}
                    <Text style={styles.label}>Foto Produk</Text>
                    <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage} activeOpacity={0.7}>
                        {image ? (
                            <View>
                                <Image source={{ uri: image.uri }} style={styles.previewImage} />
                                <View style={styles.editImageBadge}>
                                    <Ionicons name="camera" size={16} color="#fff" />
                                </View>
                            </View>
                        ) : (
                            <View style={styles.placeholderBox}>
                                <View style={styles.iconCircle}>
                                    <Ionicons name="cloud-upload" size={30} color="#007AFF" />
                                </View>
                                <Text style={styles.uploadText}>Ketuk untuk upload foto</Text>
                                <Text style={styles.uploadHint}>Format JPG, PNG (Maks. 5MB)</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Section: Info Produk */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nama Produk</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Contoh: Sepatu Lari Pro"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Deskripsi Produk</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            placeholder="Ceritakan keunggulan produk Anda..."
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={styles.flex}>
                            <Text style={styles.label}>Harga (Rp)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>
                        <View style={{ width: 16 }} />
                        <View style={styles.flex}>
                            <Text style={styles.label}>Stok</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                keyboardType="numeric"
                                value={stock}
                                onChangeText={setStock}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Berat (Kg)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.0"
                            keyboardType="decimal-pad"
                            value={weight}
                            onChangeText={setWeight}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.submitBtn, loading && styles.btnDisabled]}
                            onPress={submit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
                                    <Text style={styles.submitText}>{isEdit ? 'Simpan Perubahan' : 'Terbitkan Produk'}</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text style={styles.cancelText}>Batal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FBFBFB' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
    subtitle: { fontSize: 13, color: '#777', marginTop: 2 },
    formCard: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    inputGroup: { marginBottom: 18 },
    label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
    input: {
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 15,
        color: '#333',
        borderWidth: 1,
        borderColor: '#EDF0F3',
    },
    textArea: { height: 100 },
    row: { flexDirection: 'row', marginBottom: 18 },
    flex: { flex: 1 },
    imageUploadBox: {
        width: '100%',
        height: 180,
        backgroundColor: '#F5F7FA',
        borderRadius: 15,
        marginBottom: 20,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#D1D9E6',
        overflow: 'hidden',
    },
    placeholderBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E5F1FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    uploadText: { fontSize: 14, fontWeight: '600', color: '#007AFF' },
    uploadHint: { fontSize: 11, color: '#999', marginTop: 4 },
    previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    editImageBadge: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
        borderRadius: 20,
    },
    buttonContainer: { marginTop: 10 },
    submitBtn: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    btnDisabled: { backgroundColor: '#A0CFFF' },
    submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    cancelBtn: {
        marginTop: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: { color: '#FF3B30', fontWeight: '600', fontSize: 15 },
});