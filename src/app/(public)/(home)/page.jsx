import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center gap-4 flex-col">
            <h1 className="text-7xl font-bold">Cric Store</h1>
            <p>Buy Cricket accessories</p>
            <Button asChild>
                <Link href={"/shop"}>
                    Visit Shop
                </Link>
            </Button>
        </div>
    )
}