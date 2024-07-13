import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import ProductContainer from "@/Components/ProductContainer";

export default function Home({ auth, categories, products, canLogin }) {
    return (
        <HomeLayout auth={auth} categories={categories}>
            <Head title="Welcome" />
            {/* {auth.store.store_name} -{auth.store.city} -
            {auth.store.phone_number} -{auth.store.store_name} */}
            <div className="flex">
                <ProductContainer products={products} />
            </div>
        </HomeLayout>
    );
}
