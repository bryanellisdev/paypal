import { useLocation } from "@remix-run/react";

export default function Confirmation() {
    const { state } = useLocation();

    return (
        <main className="relative lg:min-h-full">
            <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
                <img
                    src={state?.item?.img}
                    alt="TODO"
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
                    <div className="lg:col-start-2">
                        <h1 className="text-sm font-medium text-indigo-600">Payment successful</h1>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering</p>
                        <p className="mt-2 text-base text-gray-500">
                            We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation
                            very soon!
                        </p>

                        <dl className="mt-16 text-sm font-medium">
                            <dt className="text-gray-900">Order Number</dt>
                            <dd className="mt-2 text-indigo-600">{state?.id}</dd>
                        </dl>

                        <ul
                            role="list"
                            className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
                        >
                            <li key={state?.id} className="flex space-x-6 py-6">
                                <img
                                    src={state?.item?.img}
                                    alt={state?.item?.title}
                                    className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                                />
                                <div className="flex-auto space-y-1">
                                    <h3 className="text-gray-900">
                                        <a href={`/product/${state?.item?.id}`}>{state?.item?.title}</a>
                                    </h3>
                                    <p>{state?.selectedSize}</p>
                                </div>
                                <p className="flex-none font-medium text-gray-900">{state?.purchase_units[0]?.amount?.value}</p>
                            </li>
                        </ul>
                        <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">{`$${state?.purchase_units[0]?.amount?.value}`}</dd>
                            </div>
                        </dl>
                        <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                            <div>
                                <dt className="font-medium text-gray-900">Shipping Address</dt>
                                <dd className="mt-2">
                                    <address className="not-italic">
                                        <span className="block">{`${state?.payer?.name?.given_name} ${state?.payer?.name?.surname}`}</span>
                                        <span className="block">{state?.payer?.address?.address_line_1}</span>
                                        <span className="block">{`${state?.payer?.address?.admin_area_2} ${state?.payer?.address?.admin_area_1}, ${state?.payer?.address?.postal_code}`}</span>
                                    </address>
                                </dd>
                            </div>
                        </dl>
                        <div className="mt-16 border-t border-gray-200 py-6 text-right">
                            <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
