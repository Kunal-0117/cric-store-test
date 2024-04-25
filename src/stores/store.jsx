"use client"

import { createContext, useContext, useState } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from "zustand/middleware";
const StoreContext = createContext(null)


/*
The global store of this application, I first thought of just using context, but to prevent
re-renders on context value change I thought of using zustand as the external store, but then I read this article
https://tkdodo.eu/blog/zustand-and-react-context
so I thought of going with a mixture,

from the official docs of zustand I also found out the simple way to persist the zustand values to local storage.
*/
export const StoreProvider = ({ children }) => {

    const [store] = useState(() => {
        return createStore(
            persist(
                immer((set) => ({
                    cart: {},
                    actions: {
                        addItem: (item) => {
                            set((state) => {
                                const id = item.id;
                                state.cart[id] = {
                                    ...item,
                                    count: 1
                                }
                            })
                        },
                        incrementItem: (id) => {
                            set((state) => {
                                state.cart[id].count += 1;
                            })
                        },

                        decrementItem: (id) => {
                            set((state) => {
                                state.cart[id].count -= 1;
                                if (state.cart[id].count <= 1) {
                                    delete state.cart[id];
                                }
                            })
                        },
                        removeItem: (id) => {
                            set(state => {
                                delete state.cart[id];
                            })
                        }
                    },

                })
                ),
                {
                    name: "persist",
                    //we are using partialize so as to just persisit the required values in the local storage, for here, 
                    //it's only cart.
                    partialize: (state) => ({ cart: state.cart }),
                }
            )

        )

    })

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = (selector) => {

    const store = useContext(StoreContext)

    if (!store) {

        throw new Error('Missing StoreProvider')

    }

    return useZustandStore(store, selector)

}