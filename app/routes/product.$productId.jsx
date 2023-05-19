import { redirect, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import classNames from "classnames";
import productdata from '~/data/products.json'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export const loader = async ({ params }) => {
    // get call
    const item = productdata.find((p) => p.id == params.productId)
    if (!item) {
        return redirect('/404')
    }
    return json(item);
};

export const action = async ({ }) => {
    // This is an example if we were to use the server in Remix
    console.log('hello order created')
    return json(null)
}

export default function ProductPage() {
    const item = useLoaderData()
    const navigate = useNavigate()
    const [selectedSize, setSelectedSize] = useState(item.sizes[2])

    return (
        <div className="bg-white">
            <div className="pb-16 pt-6 sm:pb-24">
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-gray-900">{item.title}</h1>
                                <p className="text-xl font-medium text-gray-900">{`$${item.price}`}</p>
                            </div>
                        </div>
                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                                <img
                                    key={item.id}
                                    src={item.img}
                                    alt="shirt"
                                    className="lg:col-span-2 lg:row-span-2"
                                />
                            </div>
                        </div>
                        <div className="mt-8 lg:col-span-5">
                            <form>
                                <div className="mt-8 radio_buttons">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-medium text-gray-900">Size</h2>
                                    </div>
                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                            {item.sizes.map((size, index) => (
                                                <RadioGroup.Option
                                                    key={index}
                                                    value={size}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                                                            checked
                                                                ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                                                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                                            'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                                <PayPalScriptProvider options={{ "client-id": "test" }}>
                                    <PayPalButtons
                                        fundingSource="paypal"
                                        createOrder={async (data, actions) => {
                                            // just an example of calling the server
                                            await fetch(`/product/${item.id}`, { method: 'POST' })
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: item.price,
                                                        },
                                                        description: item.title,
                                                        custom_id: `${item.id}`
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                navigate(`/confirmation/${item.id}`, { state: { ...details, item, selectedSize } })
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </form>
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Description</h2>
                                <div
                                    className="prose prose-sm mt-4 text-gray-500"
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

