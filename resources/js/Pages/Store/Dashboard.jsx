import React from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import { Head } from "@inertiajs/react";
import Chart from "react-apexcharts";
import { IoArrowUpOutline, IoCart } from "react-icons/io5";
import { IoMdArrowDropup, IoMdBasket } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoArrowDown } from "react-icons/io5";
export default function Dashboard({
    auth,
    todaySales,
    productCount,
    salesData,
    months,
    orders,
    monthlyIncrease,
}) {
    const chartOptions = {
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        tooltip: {
            enabled: true,
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 5,
        },
        grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
                left: 30,
                right: 2,
                top: 0,
            },
        },
        series: [
            {
                name: "Aylık Satışlar",
                data: salesData,
                color: "#1A56DB",
            },
        ],
        xaxis: {
            categories: months,
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            show: true,
            tickAmount: 4,
            labels: {
                style: {
                    colors: "#8E8DA4",
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                },
                formatter: (value) => {
                    return new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                    }).format(value);
                },
            },
            axisBorder: {
                show: false,
                color: "#8E8DA4",
            },
            axisTicks: {
                show: false,
                color: "#8E8DA4",
            },
        },
    };

    return (
        <StoreLayout
            user={auth.store}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between gap-6">
                        <div className="bg-white overflow-hidden mb-5 shadow-sm w-full rounded-lg">
                            <div className="p-6 text-gray-900 flex items-center">
                                <div className="w-20 h-20 text-xl mr-4 bg-orange-500 border-[13px] border-orange-100 text-white rounded-full flex justify-center items-center">
                                    <div>₺</div>
                                </div>
                                <div>
                                    <p className="font-medium text-black/40">
                                        Bugünkü Satış
                                    </p>
                                    <p>{todaySales}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden mb-5 shadow-sm w-full rounded-lg">
                            <div className="p-6 text-gray-900 flex items-center">
                                <div className="w-20 h-20 text-2xl mr-4 bg-blue-500 border-[13px] border-blue-100 text-white rounded-full flex justify-center items-center">
                                    <IoMdBasket />
                                </div>
                                <div>
                                    <p className="font-medium text-black/40">
                                        Ürün Sayısı
                                    </p>
                                    <p> {productCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden mb-5 shadow-sm w-full rounded-lg">
                            <div className="p-6 text-gray-900 flex items-center">
                                <div className="w-20 h-20 text-2xl mr-4 bg-pink-500 border-[13px] border-pink-100 text-white rounded-full flex justify-center items-center">
                                    <IoCart />
                                </div>
                                <div>
                                    <p className="font-medium text-black/40">
                                        Toplam Siparişler
                                    </p>
                                    <p> {orders}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden mb-5 shadow-sm w-full rounded-lg flex items-center">
                            <div className="p-6 text-gray-900 flex items-center">
                                {monthlyIncrease > 0 ? (
                                    <>
                                        <div className="w-14 h-14 text-2xl mr-4 bg-green-800/15  text-green-600 rounded-lg flex justify-center items-center">
                                            <IoArrowUpOutline size={26} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-black/40">
                                                Aylık Artış Oranı
                                            </p>
                                            <p className="text-xl font-semibold text-green-600">
                                                {monthlyIncrease}%
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-14 h-14 text-2xl mr-4 bg-red-800/15  text-red-600 rounded-lg flex justify-center items-center">
                                            <IoArrowDown size={26} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-black/40">
                                                Aylık Artış Oranı
                                            </p>
                                            <p className="text-xl font-semibold text-red-600">
                                                {monthlyIncrease}%
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="ml-4 mb-6 mt-4 flex justify-between">
                                <p className="text-xl font-medium">
                                    Şatıs Çizelgesi
                                </p>
                                <select name="" id="">
                                    <option value="">Yıllık</option>
                                    <option value="">Aylık</option>
                                    <option value="">Günlük</option>
                                </select>
                            </div>
                            <div id="chart">
                                <Chart
                                    options={chartOptions}
                                    series={chartOptions.series}
                                    type="area"
                                    height={350}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
