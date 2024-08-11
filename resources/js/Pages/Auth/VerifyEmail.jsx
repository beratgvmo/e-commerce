import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-6">
                <p className="text-lg font-medium text-gray-800 mb-3">
                    Doğrulama maili gönderildi.
                </p>
                <p className="text-gray-600">lütfen gelen kutunuzu veya</p>
                <p className="text-gray-600">
                    span(önemsiz) klasörünü kontrol edin.
                </p>
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    E-posta adresine yeni bir doğrulama bağlantısı gönderildi.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Yeniden Gönder
                    </PrimaryButton>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Çıkış yap
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
