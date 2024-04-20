"use client"
import { useStore } from "@/stores/store";
import { Button } from "@/components/ui/button";

export function AddProductButton({ product }) {
    const addItemAction = useStore((state) => state.actions.addItem);
    const removeItemAction = useStore((state) => state.actions.removeItem);
    const hasItem = !!(useStore((state) => state.cart[product.id]));
    return (
        <div>
            {
                !hasItem ?
                    <Button Button onClick={addItemAction.bind(null, product)}>
                        + Add to Cart
                    </Button>
                    :
                    <Button variant={"destructive"} onClick={removeItemAction.bind(null, product.id)}>
                        - Remove Item
                    </Button>
            }
        </div >
    )
}