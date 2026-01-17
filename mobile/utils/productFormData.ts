export const buildProductFormData = ({
    name,
    price,
    stock,
    description,
    weight,
    id_user,
    image,
}: any) => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock_quantity', stock);
    formData.append('description', description);
    formData.append('weight', weight);
    formData.append('id_user', id_user);

    if (image) {
        formData.append('image', {
            uri: image.uri,
            name: 'product.jpg',
            type: 'image/jpeg',
        } as any);
    }

    return formData;
};
