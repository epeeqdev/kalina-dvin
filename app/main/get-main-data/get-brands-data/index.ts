import axios from "axios";

export const getBrandsData = async (origin: string = '') => {
    const brandsRes = await axios(`${origin}/api/brands`);
    return brandsRes.data
}