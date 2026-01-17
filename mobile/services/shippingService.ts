import axios from 'axios';

const API_KEY = 'frYruszswkud342oBbuC16NGknkQZ3UpRB3FqI3IdPz9qL0RBW';

export const getShippingCost = (
    origin: string,
    destination: string,
    weight: number
) => {
    return axios.get(
        `https://use.api.co.id/expedition/shipping-cost`,
        {
            headers: {
                'x-api-co-id': API_KEY,
            },
            params: {
                origin_village_code: origin,
                destination_village_code: destination,
                weight,
            },
        }
    );
};
