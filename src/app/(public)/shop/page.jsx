import { makeRequest } from "@/lib/fetch"
import { ProductCategories } from "./_components/product-categories/product-categories";
import { ProductsList } from "./_components/products-list";
import { FilterProducts } from "./_components/filter-products";

async function getProducts({ category, search }) {
    if (search) {
        return await makeRequest("/products/search?q=" + search);
    }
    if (category) {
        return await makeRequest("/products/category/" + category);
    }
    return await makeRequest("/products/");
}

export default async function ShopPage({ searchParams }) {

    const data = await getProducts({ ...searchParams });
    const { products } = data;

    return (

        <div className="grid grid-cols-6 gap-6">
            <div className="relative h-screen">
                <div className="overflow-y-auto w-full h-full">
                    <ProductCategories />
                </div>
            </div>
            <ProductsList data={products} />
            <div>
                <FilterProducts />
            </div>

        </div>
    )
}