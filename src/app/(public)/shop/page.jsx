import { makeRequest } from "@/lib/fetch"
import { ProductCategories } from "./_components/product-categories/product-categories";
import { ProductsList } from "./_components/products-list";
import { FilterProducts } from "./_components/filter-products";
import { Suspense } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Pagination } from "./_components/pagination";

/*
This is the main function which is responsible for fetching all the cards from
the api, the cards fetched depends upon the url search params, if we have a category we fetch
the products of that category only, or if we have search parameter, the we fetch products coresponding
to that search parameter.
*/
async function getProducts({ category, search, page }) {

    const limit = 30;
    const skip = page ? (page - 1) * limit : 0;
    const searchParams = `limit=${limit}&skip=${skip}`
    if (search) {
        return await makeRequest(`/products/search?q=${search}&${searchParams}`);
    }
    if (category) {
        return await makeRequest(`/products/category/${category}?${searchParams}`);
    }
    return await makeRequest(`/products?${searchParams}`);
}

export default async function ShopPage({ searchParams }) {

    const data = await getProducts({ ...searchParams });
    const { products } = data;
    delete data.products;
    const hasMore = (data.limit * (data.skip + 1)) < data.total;
    const hasPrev = data.skip !== 0;

    return (

        <div className="grid grid-cols-6 h-[calc(100vh_-_3rem)]">

            <div className="h-8 col-span-full lg:hidden flex gap-6 items-center justify-center bg-secondary">


                <Sheet>
                    <SheetTrigger>
                        Filters
                    </SheetTrigger>
                    <SheetContent>


                        <FilterProducts />


                    </SheetContent>
                </Sheet>

                <Sheet>
                    <SheetTrigger>
                        Categories
                    </SheetTrigger>
                    <SheetContent>

                        <div className="h-full overflow-y-auto">
                            <ProductCategories />
                        </div>

                    </SheetContent>
                </Sheet>
            </div>

            <div className="overflow-y-auto h-full hidden lg:block">

                <div className="p-4 border-r">
                    <h2 className="text-xl mb-6 font-medium">Categories</h2>
                    <ProductCategories />
                </div>
            </div>


            <div className="col-span-full lg:col-span-4 py-12 w-full overflow-y-auto px-4">
                <div className="gap-x-6 gap-y-12 grid md:grid-cols-2 lg:grid-cols-3">
                    <Suspense>
                        <ProductsList data={products} />
                    </Suspense>

                    <Pagination
                        hasMore={hasMore}
                        hasPrev={hasPrev}
                    />

                </div>
            </div>


            <div className="overflow-y-auto h-full hidden lg:block">
                <div className="p-4 border-l h-full">
                    <h2 className="text-xl mb-6 font-medium">Filters</h2>
                    <FilterProducts />
                </div>
            </div>

        </div>
    )
}