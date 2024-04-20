import { makeRequest } from "@/lib/fetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImages } from "./_components/product-images";

async function getSingleProduct(id) {
    return await makeRequest("/products/" + id);
}

export default async function SingleProductPage({ params }) {

    const data = await getSingleProduct(params.productId);
    return (
        <div className="p-4">
            <div className="border-2 py-6 px-4 grid lg:grid-cols-3 gap-6 rounded-md">
                <div className="overflow-hidden lg:col-span-2">
                    <ProductImages images={data.images}/>
                </div>

                <div>
                    <h1 className="text-5xl font-semibold mb-3">{data.title}</h1>
                    <Badge className="text-lg mb-6">$ {data.price}</Badge>
                    <p className="text-muted-foreground text-lg mb-4">
                        {data.description}
                    </p>

                    <Button>+ Add to Cart</Button>
                </div>
            </div>
        </div>
    )
}