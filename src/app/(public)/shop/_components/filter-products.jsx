"use client"

import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";


export function FilterProducts() {
    const searchParams = useSearchParams();
    const pathname = usePathname();


    function handleClick(filter, order) {
        //This function sets the filters(ascending/descending order of name or price)

        const params = new URLSearchParams(searchParams);


        if (filter) params.set('filter', filter)
        else params.delete('filter');

        if (order) params.set('order', order);
        else params.delete('order');

        const newPath = `${pathname}?${params.toString()}`;

        /*
        we are doing shallow routing to persist the state in url search params but at the same
        time preventing server trip, since we don't need to fetch anyting.
        */
        window.history.replaceState(null, '', newPath)
    }

    const filter = searchParams.get("filter");
    const order = searchParams.get("order");

    return (
            <div className="flex flex-col space-y-2">

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
    )
}

function FilterButton({ children, isActive, className, ...props }) {
    return (
        <button className={cn("hover:underline text-left", className, isActive && "underline")} {...props}>
            {children}
        </button>
    )
}