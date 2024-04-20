"use client"
import clsx from 'clsx';
import { useSearchParams, usePathname } from 'next/navigation';

export function ProductCategoriesClient({ data }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();

    function handleClick(term) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('category', term);
        } else {
            params.delete('category');
        }
        const newPath = `${pathname}?${params.toString()}`;

        //shallow routing
        window.history.replaceState(null, '', newPath)
    }

    const category = searchParams.get("category");

    return (
        <ul className="flex flex-col gap-4">

            <li key="all">
                <button onClick={handleClick.bind(null, "")} className={clsx("hover:underline text-left", (category === null || category === undefined) && "underline")}>
                    All
                </button>
            </li>
            {
                data.map(item => (
                    <li key={item}>
                        <button onClick={handleClick.bind(null, item)} className={clsx("hover:underline text-left", category === item && "underline")}>
                            {item}
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}