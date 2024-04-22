"use client"
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


function debounce(func, delay = 100) {

    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(func.bind(null, args), delay);
    }
}

export function SearchBar() {

    const params = useSearchParams();
    const { replace } = useRouter();
    const [value, setValue] = useState(params.get("search") ?? "");


    const handleSearch = useCallback(debounce((query) => {
        const params = new URLSearchParams();

        if (query) params.set('search', query)
        else params.delete('search');

        const newPath = `/shop?${params.toString()}`;
        replace(newPath);
    }, 600), []);


    useEffect(() => {
        value && handleSearch(value)
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