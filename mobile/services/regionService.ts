import axios from 'axios';

const API_KEY = 'frYruszswkud342oBbuC16NGknkQZ3UpRB3FqI3IdPz9qL0RBW';

export const getVillageDetail = (code: string) => {
    return axios.get(
        `https://use.api.co.id/regional/indonesia/villages/${code}`,
        {
            headers: {
                'x-api-co-id': API_KEY,
            },
        }
    );
};
