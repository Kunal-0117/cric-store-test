"use client"
import clsx from 'clsx';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function ProductCategoriesClient({ data }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleClick(term) {
        const params = new URLSearchParams();
        if (term) {
            params.set('category', term);
        } else {
            params.delete('category');
        }
        const newPath = `${pathname}?${params.toString()}`;

        //We want to do server trip on category change since we are fetching cards from the server.
        replace(newPath);
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