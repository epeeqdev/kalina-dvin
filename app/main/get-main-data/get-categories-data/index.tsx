import axios from "axios";

export const getCategoriesData = async (origin: string = '') => {
    const categoriesRes = await axios(`${origin}/api/categories`);
    return categoriesRes.data
}