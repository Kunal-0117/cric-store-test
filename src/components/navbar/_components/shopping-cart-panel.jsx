"use client"
import { ShoppingCartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useStore } from "@/stores/store";
import Image from "next/image";



export function ShoppingCartPanel() {
    const cart = useStore((state) => state.cart);
    const incrementItemAction = useStore((state) => state.actions.incrementItem);
    const decrementItemAction = useStore((state) => state.actions.decrementItem);

    const count = Object.keys(cart).length;

    function getTotal() {
        return Object.values(cart).reduce((pre, cur) => pre + (cur.price * cur.count), 0);
    }
    return (

        <>


            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant={"outline"} className="ml-auto relative">
                        <ShoppingCartIcon />
                        <div className="rounded-full h-4 w-4 text-xs font-bold bg-primary text-primary-foreground absolute right-0 top-0">{count}</div>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    {
                        count ?

                            <>
                                <SheetHeader>
                                    <SheetTitle>My Cart</SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-4 h-full pb-4">

                                    <div className="flex flex-col gap-3">
                                        {
                                            Object.values(cart).map(value => (

                                                <div className="grid grid-cols-4 w-full gap-4 border-b-2 pb-2" key={value.id}>
                                                    <div className="h-16 w-full relative">
                                                        <Image
                                                        fill
                                                        sizes="100px"
                                                            alt={value.title}
                                                            src={value.thumbnail} className="object-contain" />
                                                    </div>

                                                    <div className="col-span-2">
                                                        {value.title}
                                                    </div>

                                                    <div className="">
                                                        <div>${value.price}</div>

                                                        <div className="flex gap-1 items-center">

                                                            <Button
                                                                size="icon"
                                                                className="rounded-full h-8 w-8"
                                                                variant="destructive"
                                                                onClick={decrementItemAction.bind(null, value.id)}
                                                            >
                                                                -
                                                            </Button>


                                                            <span>{value.count}</span>

                                                            <Button
                                                                onClick={incrementItemAction.bind(null, value.id)}
                                                                size="icon"
                                                                className="rounded-full h-8 w-8"
                                                            >
                                                                +
                                                            </Button>



                                                        </div>

                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <Button className="mt-auto">
                                        Place Order (${getTotal()})
                                    </Button>
                                </div>
                            </>

                            :
                            <SheetHeader>
                                <SheetTitle>My Cart</SheetTitle>
                                <SheetDescription>
                                    Your cart is empty!
                                </SheetDescription>
                            </SheetHeader>
                    }
                </SheetContent>
            </Sheet>


        </>

    )
}