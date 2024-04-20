import { makeRequest } from "@/lib/fetch";
import { ProductCategoriesClient } from "./product-categories-client";

async function getCategories() {
    return await makeRequest("/products/categories");
}

export async function ProductCategories() {
    const data = await getCategories();
    return (
        <div className="p-4 border-r">
            <h2 className="text-xl mb-6 font-medium">Categories</h2>
            <ProductCategoriesClient data={data} />
        </div>
    )
}