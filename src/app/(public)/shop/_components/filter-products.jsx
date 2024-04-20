"use client"

import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export function FilterProducts() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    function handleClick(filter, order) {
        const params = new URLSearchParams(searchParams);


        if (filter) params.set('filter', filter)
        else params.delete('filter');

        if (order) params.set('order', order);
        else params.delete('order');

        const newPath = `${pathname}?${params.toString()}`;

        //shallow routing
        window.history.replaceState(null, '', newPath)
    }

    const filter = searchParams.get("filter");
    const order = searchParams.get("order");

    return (
        <div className="p-4 border-l h-full">
            <h2 className="text-xl mb-6 font-medium">Filters</h2>
            {/* <ProductCategoriesClient data={data} /> */}
            <div className="space-y-4 flex flex-col">

                <div className="font-bold">Name:</div>

                <FilterButton
                    className="hover:underline"
                    isActive={filter === "name" && order === "asc"}
                    onClick={handleClick.bind(null, "name", "asc")}
                >
                    Sort in Asc.
                </FilterButton>

                <FilterButton
                    className="hover:underline"
                    isActive={filter === "name" && order === "desc"}
                    onClick={handleClick.bind(null, "name", "desc")}
                >
                    Sort in Desc.
                </FilterButton>

                <div
                    className="font-bold"
                >
                    Price:</div>

                <FilterButton
                    className="hover:underline"
                    isActive={filter === "price" && order === "asc"}
                    onClick={handleClick.bind(null, "price", "asc")}
                >
                    Sort in Asc.
                </FilterButton>

                <FilterButton
                    className="hover:underline"
                    isActive={filter === "price" && order === "desc"}
                    onClick={handleClick.bind(null, "price", "desc")}
                >
                    Sort in Desc.
                </FilterButton>

                <FilterButton
                    className="hover:underline"
                    onClick={handleClick.bind(null, null, null)}
                >
                    Clear Filters
                </FilterButton>
            </div>
        </div>
    )
}

function FilterButton({ children, isActive, className, ...props }) {
    return (
        <button className={cn("hover:underline text-left", className, isActive && "underline")} {...props}>
            {children}
        </button>
    )
}