"use client"

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({ hasMore, hasPrev }) {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    /*
    Debounced input search function
    */
    const handleClick = (moveNext) => {
        const params = new URLSearchParams(searchParams);
        let page = searchParams.get("page") ?? 1;
        moveNext ? page++ : page--;
        if (page <= 1) page = null;
        page ? params.set('page', page) : params.delete('page');
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="col-span-full flex justify-between">
            <Button onClick={handleClick.bind(null, false)} disabled={!hasPrev}>
                Prev
            </Button>

            <Button onClick={handleClick.bind(null, true)} disabled={!hasMore}>
                Next
            </Button>
        </div>
    )
}