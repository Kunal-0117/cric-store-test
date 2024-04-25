"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

//This component returns the filtered list of all the product items
export function ProductsList({ data }) {

    const searchParams = useSearchParams();

    //This function is repsonsible to filter cards
    const filterCards = useCallback((data, filter, order) => {
        if (!Array.isArray(data)) return [];

        let filteredData = [...data];

        if (filter && order) {
            filteredData.sort((a, b) => {

                let res = 0;
                if (filter === "name") res = a.title.localeCompare(b.title);
                else if (filter === "price") res = (parseFloat)(a.price) - (parseFloat)(b.price);

                //if the selected order of filter is desc, we are reversing the sort order, hence -1.
                if (order === "desc") res *= -1;

                return res;

            })
        }

        return filteredData;

    }, []);

    const [cards, setCards] = useState(() => filterCards(data));

    useEffect(() => {

        const filter = searchParams.get("filter");
        const order = searchParams.get("order");
        const result = filterCards(data, filter, order);
        setCards(result);

    }, [searchParams, data, filterCards])

    return (
        cards?.length ? (
            cards.map((product) => (
                <ProductCard key={product.id} data={product} />
            ))


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
                    alt={data.title}
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