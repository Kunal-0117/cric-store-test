import Link from "next/link"
import { ShoppingCartPanel } from "./_components/shopping-cart-panel"
export function Navbar() {
    return (
        <header>
            <nav className="px-4 h-12 flex items-center fixed top-0 bg-background shadow-md w-full gap-6 z-20">
                <Link href="/" className="text-2xl font-bold hover:underline">
                    Cric Store
                </Link>

                <Link href={"/shop"} className="text-sm hover:underline">
                    Shop
                </Link>

                <ShoppingCartPanel />
            </nav>
        </header>
    )
}

