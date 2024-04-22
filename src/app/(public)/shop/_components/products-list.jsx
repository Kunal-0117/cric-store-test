"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export function ProductsList({ data }) {

    const searchParams = useSearchParams();

    function filterCards() {
        if (!Array.isArray(data)) return [];

        // const category = searchParams.get("category");
        const filter = searchParams.get("filter");
        const order = searchParams.get("order");

        let filteredData = data;
        // if (category) filteredData = filteredData.filter((item) => item.category === category);

        if (!filter || !order) return filteredData;
        filteredData.sort((a, b) => {

            let res = 0;
            if (filter === "name") res = a.title.localeCompare(b.title);
            else if (filter === "price") res = (parseFloat)(a.price) - (parseFloat)(b.price);
            if (order === "desc") res *= -1;

            return res;

        })

        return [...filteredData];

    }

    const [cards, setCards] = useState(() => {
        return filterCards();
    });

    useEffect(() => {
        const data = filterCards();
        setCards(data);
    }, [searchParams])

    return (
        cards?.length ? (
            <div className="col-span-4 gap-x-6 gap-y-12 grid md:grid-cols-2 lg:grid-cols-3  py-12">
                {
                    cards.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))
                }
            </div>

        )

            :
            <div className="col-span-4 flex items-center justify-center">
                <p className="text-muted-foreground text-2xl">No Product Found!</p>
            </div>

    )
}

function ProductCard({ data }) {
    return (
        <div className="rounded-xl flex flex-col shadow-md overflow-hidden max-w-xs mx-auto">
            <div className="w-full h-48">
                <img
                    className="w-full h-full object-cover"
                    src={data.thumbnail}
                />
            </div>

            <div className="p-3 gap-3 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold">{data.title}</h3>
                <p>
                    {data.description}
                </p>

                <div className="text-sm font-bold mt-auto">Price: {data.price}</div>

                <Button asChild>
                    <Link href={"/" + data.id}>
                        View Details
                    </Link>
                </Button>
            </div>
        </div>
    )
}