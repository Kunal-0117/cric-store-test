"use client"

import { useState } from "react";
import clsx from "clsx";

export function ProductImages({ images }) {

    const [image, setImage] = useState(images[0]);
    return (
        <div className="flex h-full w-full max-w-full flex-col gap-6">

            <div className="rounded-xl border overflow-hidden p-1 w-full max-h-[60vh] min-h-[60vh] h-[60vh] flex">
                <img alt="" src={image} className="object-contain block mx-auto" />
            </div>

            <div className="w-full max-w-full overflow-x-auto mt-auto py-2">
                <div className="flex gap-8 h-28 mx-auto max-w-max">
                    {
                        images.map((src, index) => (
                            <div key={index} onClick={setImage.bind(null, src)} className={clsx("w-28 min-w-28 max-w-28 h-full rounded-md p-2 border flex hover:bg-primary/10 duration-150", image === src && "border-primary")}>
                                <img
                                    alt=""
                                    className="object-contain block mx-auto"
                                    src={src}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}