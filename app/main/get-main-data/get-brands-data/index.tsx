

export const  GetBrandsData = async () => {
    const brandsRes = await fetch(`http://localhost:3000/api/brands`);
    return await brandsRes.json()
}