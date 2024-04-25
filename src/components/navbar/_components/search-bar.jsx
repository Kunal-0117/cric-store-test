"use client"
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';


export function SearchBar() {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const [value, setValue] = useState(searchParams.get("search") ?? "");

    /*
    Debounced input search function
    */
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams();
        if (term) {
            params.set('search', term);
            replace(`/shop?${params.toString()}`);
        } else {
            replace(pathname);
        }
    }, 500)



    useEffect(() => {
        handleSearch(value);
    }, [value, handleSearch]);


    return (
        <Input
            placeholder="Type to Search Product"
            onChange={(event) => setValue(event.target.value)}
            value={value}
            className="max-w-xl mx-auto h-8 border-primary/40"
        />
    )
}