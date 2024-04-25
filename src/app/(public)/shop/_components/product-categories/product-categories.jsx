import { makeRequest } from "@/lib/fetch";
import { ProductCategoriesClient } from "./product-categories-client";
import { Suspense } from "react";


//We are fetching all the availabled categories through this function.
async function getCategories() {
    return await makeRequest("/products/categories");
}

export async function ProductCategories() {
    const data = await getCategories();
    return (
        <Suspense>
            <ProductCategoriesClient data={data} />
        </Suspense>
    )
}