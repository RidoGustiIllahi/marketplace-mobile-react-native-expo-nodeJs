import axios from 'axios';

const API_KEY = 'frYruszswkud342oBbuC16NGknkQZ3UpRB3FqI3IdPz9qL0RBW';

const headers = {
    headers: { 'x-api-co-id': API_KEY },
};

export const getProvinces = async () => {
    const res = await axios.get(
        'https://use.api.co.id/regional/indonesia/provinces',
        headers
    );
    return res.data.data;
};

export const getRegencies = async (provinceCode: string) => {
    const res = await axios.get(
        `https://use.api.co.id/regional/indonesia/provinces/${provinceCode}/regencies`,
        headers
    );
    return res.data.data;
};

export const getDistricts = async (regencyCode: string) => {
    const res = await axios.get(
        `https://use.api.co.id/regional/indonesia/regencies/${regencyCode}/districts`,
        headers
    );
    return res.data.data;
};

export const getVillages = async (districtCode: string) => {
    const res = await axios.get(
        `https://use.api.co.id/regional/indonesia/districts/${districtCode}/villages`,
        headers
    );
    return res.data.data;
};
