import { makeRequest } from "@/lib/fetch"
import { ProductCategories } from "./_components/product-categories/product-categories";
import { ProductsList } from "./_components/products-list";
import { FilterProducts } from "./_components/filter-products";
import { Suspense } from "react";

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

        <div className="grid grid-cols-6 h-[calc(100vh_-_3rem)]">

            <div className="overflow-y-auto h-full hidden lg:block">
                <ProductCategories />
            </div>


            <div className="col-span-full lg:col-span-4 py-12 w-full overflow-y-auto px-4">
                <div className="gap-x-6 gap-y-12 grid md:grid-cols-2 lg:grid-cols-3">
                    <Suspense>
                        <ProductsList data={products} />
                    </Suspense>
                </div>
            </div>


            <div className="overflow-y-auto h-full hidden lg:block">
                <FilterProducts />
            </div>

        </div>
    )
}