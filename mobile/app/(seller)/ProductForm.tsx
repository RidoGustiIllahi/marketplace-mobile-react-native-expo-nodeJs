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
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#192f6a',
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
    formCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    // Image Upload Styles
    imageUploadBox: {
        width: '100%',
        height: 180,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        marginBottom: 20,
        overflow: 'hidden',
    },
    placeholderBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    uploadText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#192f6a',
    },
    uploadHint: {
        fontSize: 11,
        color: '#999',
        marginTop: 4,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    editImageBadge: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#192f6a',
        padding: 8,
        borderRadius: 20,
    },
    // Input Styles
    inputGroup: {
        marginBottom: 18,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 18,
    },
    flex: {
        flex: 1,
    },
    // Button Styles
    buttonContainer: {
        marginTop: 10,
    },
    submitBtn: {
        backgroundColor: '#192f6a',
        flexDirection: 'row',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#192f6a',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnDisabled: {
        backgroundColor: '#A0A0A0',
    },
    cancelBtn: {
        marginTop: 15,
        alignItems: 'center',
        padding: 10,
    },
    cancelText: {
        color: '#FF3B30',
        fontWeight: '600',
        fontSize: 14,
    },
});