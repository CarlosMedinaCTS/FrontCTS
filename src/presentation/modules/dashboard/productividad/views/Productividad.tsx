import { IoMdArrowDown } from "react-icons/io"
import { LuUsers } from "react-icons/lu"
import { Typography } from "../../../../components/ui/typography/Typography"
import ApexChart from "react-apexcharts";

const Productividad = () => {
    const options = {
        chart: {
            sparkline: { enabled: false },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: { enabled: false },
            toolbar: { show: false },
        },
        xaxis: {
            show: true,
            categories: [
                '01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb',
                '08 Feb', '09 Feb', '10 Feb', '11 Feb', '12 Feb', '13 Feb', '14 Feb',
                '15 Feb', '16 Feb', '17 Feb', '18 Feb', '19 Feb', '20 Feb',
                '21 Feb', '22 Feb', '23 Feb', '24 Feb', '25 Feb', '26 Feb', '27 Feb', '28 Feb'
            ],
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
                formatter: (value: number) => `$${value}`,
            },
        },
        tooltip: {
            enabled: true,
            x: { show: false },
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
        dataLabels: { enabled: false },
        stroke: { width: 1.5 },
        legend: { show: false },
        grid: { show: false },
    };

    const series = [
        {
            name: "Developer Edition",
            data: [
                150, 1200, 300, 900, 200, 1800, 100, 1500, 300, 700,
                200, 2100, 400, 600, 250, 1100, 350, 1950, 150, 2200,
                1800, 400, 1700, 300, 2100, 500, 1200, 100
            ],
            color: "#1A56DB",
        }
    ];


    const options2 = {
        chart: {
            sparkline: { enabled: false },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: { enabled: false },
            toolbar: { show: false },
        },
        xaxis: {
            show: true,
            categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
                formatter: (value: number) => `$${value}`,
            },
        },
        tooltip: {
            enabled: true,
            x: { show: false },
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
        dataLabels: { enabled: false },
        stroke: { width: 1.5 },
        legend: { show: false },
        grid: { show: false },
    };

    const series2 = [
        {
            name: "Developer Edition",
            data: [150, 151, 145, 152, 135, 125],
            color: "#1A56DB",
        },
        {
            name: "Designer Edition",
            data: [43, 13, 65, 12, 42, 73],
            color: "#7E3BF2",
        },
    ];

    const barOptions = {
        chart: {
            type: "bar",
            height: 300,
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: "Inter, ui-sans-serif",
        },
        series: [
            {
                name: "Income",
                data: [23000, 44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000, 34000, 78000],
                color: "#339385",
            },
            {
                name: "Outcome",
                data: [17000, 76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000, 94000, 67000, 66000],
                color: "#ffbc33",
            },
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "10px",
                borderRadius: 5,
            },
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            axisBorder: { show: false },
            axisTicks: { show: false },
            crosshairs: { show: false },
            labels: {
                style: {
                    colors: "#9ca3af",
                    fontSize: "13px",
                    fontFamily: "Inter, ui-sans-serif",
                    fontWeight: 400,
                },
                offsetX: -2,
                formatter: (title: string) => title.slice(0, 3),
            },
        },
        yaxis: {
            labels: {
                align: "left",
                minWidth: 0,
                maxWidth: 140,
                style: {
                    colors: "#9ca3af",
                    fontSize: "13px",
                    fontFamily: "Inter, ui-sans-serif",
                    fontWeight: 400,
                },
                formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : value),
            },
        },
        states: {
            hover: {
                filter: {
                    type: "darken",
                    value: 0.9,
                },
            },
        },
        tooltip: {
            y: {
                formatter: (value: number) => `$${value >= 1000 ? `${value / 1000}k` : value}`,
            },
        },
        grid: {
            borderColor: "#e5e7eb",
        },
        responsive: [
            {
                breakpoint: 568,
                options: {
                    chart: { height: 300 },
                    plotOptions: { bar: { columnWidth: "14px" } },
                    stroke: { width: 8 },
                    xaxis: {
                        labels: {
                            style: {
                                colors: "#9ca3af",
                                fontSize: "11px",
                                fontFamily: "Inter, ui-sans-serif",
                                fontWeight: 400,
                            },
                            offsetX: -2,
                            formatter: (title: string) => title.slice(0, 3),
                        },
                    },
                    yaxis: {
                        labels: {
                            align: "left",
                            minWidth: 0,
                            maxWidth: 140,
                            style: {
                                colors: "#9ca3af",
                                fontSize: "11px",
                                fontFamily: "Inter, ui-sans-serif",
                                fontWeight: 400,
                            },
                            formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : value),
                        },
                    },
                },
            },
        ],
    };

    const barSeries = [
        {
            name: "Income",
            data: [23000, 44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000, 34000, 78000],
            color: '#339385'
        },
        {
            name: "Outcome",
            data: [17000, 76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000, 94000, 67000, 66000],
            color: '#ffbc33'
        },
    ];

    return (
        <main>
            <section className="grid grid-cols-4 gap-3">
                <div className="bg-white border border-gray-100 shadow-lg p-5 rounded-xl flex flex-col gap-2 ">
                    <LuUsers className="text-3xl text-white bg-indigo-500/50 p-1 rounded-lg" />
                    <h2 className="text-gray-600 font-medium text-sm">Usuarios</h2>
                    <h3 className="font-semibold text-gray-900 text-2xl">450</h3>
                    <div className="flex gap-2">
                        <Typography.P>Ultimos 30 dias</Typography.P>
                        <p className="bg-green-600/10 flex w-max px-2 text-xs items-center gap-2 rounded-lg text-green-500"><span><IoMdArrowDown /></span>32.43%</p>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-lg p-5 rounded-xl flex flex-col gap-2 ">
                    <LuUsers className="text-3xl text-white bg-orange-500/50 p-1 rounded-lg" />
                    <h2 className="text-gray-600 font-medium text-sm">Suscripciones</h2>
                    <h3 className="font-semibold text-gray-900 text-2xl">360</h3>
                    <div className="flex gap-2">
                        <Typography.P>Ultimos 30 dias</Typography.P>
                        <p className="bg-red-600/10 flex w-max text-xs items-center  gap-2 rounded-lg px-2 text-red-500"><span><IoMdArrowDown /></span>32.43%</p>
                    </div>
                </div>

                <div className="bg-white border border-gray-100  shadow-lg p-5 rounded-xl flex flex-col gap-2 ">
                    <LuUsers className="text-3xl text-white bg-blue-500/50 p-1 rounded-lg" />
                    <h2 className="text-gray-600 font-medium text-sm">Generador imagenes</h2>
                    <h3 className="font-semibold text-gray-900 text-2xl">450</h3>
                    <div className="flex gap-2">
                        <Typography.P>Ultimos 30 dias</Typography.P>
                        <p className="bg-green-600/10 flex w-max  px-2 text-xs items-center gap-2 rounded-lg text-green-500"><span><IoMdArrowDown /></span>32.43%</p>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-lg p-5 rounded-xl flex flex-col gap-2 ">
                    <LuUsers className="text-3xl text-white bg-yellow-500/50 p-1 rounded-lg" />
                    <h2 className="text-gray-600 font-medium text-sm">Generador Codigo</h2>
                    <h3 className="font-semibold text-gray-900 text-2xl">450</h3>
                    <div className="flex gap-2">
                        <Typography.P>Ultimos 30 dias</Typography.P>
                        <p className="bg-green-600/10 flex w-max  px-2 text-xs items-center gap-2 rounded-lg text-green-500"><span><IoMdArrowDown /></span>32.43%</p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-12 mt-3 gap-3 ">
                <div className="bg-white col-start-1 col-end-6 shadow-lg border border-gray-100 p-5 rounded-xl">
                    <div className="flex justify-between items-center">
                        <Typography.H3>Total de capturas</Typography.H3>
                        <div className="grid grid-cols-3 gap-2 text-xs bg-gray-100 p-0.5 rounded text-gray-700 text-center">
                            <div className="p-1 bg-white rounded font-medium">
                                Mensual
                            </div>
                            <div className="p-1 rounded font-medium">
                                Trimestral
                            </div >
                            <div className="p-1 rounded font-medium">
                                Anualmente
                            </div>
                        </div>

                    </div>


                    <Typography.P className="py-3 text-xs"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut rerum dignissimos veniam commodi, modi quisquam odio ea quo. Maxime, vero. </Typography.P>
                    <ApexChart
                        options={barOptions}
                        series={barSeries}
                        type="bar"
                        height={320}
                    />
                    <div className="flex items-center justify-center gap-5">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-[#339385] block"></span>
                            <Typography.P>Captura</Typography.P>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-[#ffbc33] block"></span>
                            <Typography.P>No Captutas</Typography.P>
                        </div>
                    </div>
                </div>

                <div className="bg-white col-start-6 col-end-13 shadow-lg border border-gray-100 p-5 rounded-xl">
                    <div className="flex justify-between items-center">
                        <Typography.H3>Total de montos</Typography.H3>
                        <div className="grid grid-cols-3 gap-2 text-xs bg-gray-100 p-0.5 rounded text-gray-700 text-center">
                            <div className="p-1 bg-white rounded font-medium">
                                Mensual
                            </div>
                            <div className="p-1 rounded font-medium">
                                Trimestral
                            </div >
                            <div className="p-1 rounded font-medium">
                                Anualmente
                            </div>
                        </div>
                    </div>
                    <Typography.P className="py-3 text-xs"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut rerum dignissimos veniam commodi, modi quisquam odio ea quo. Maxime, vero. </Typography.P>
                    <ApexChart options={options2} series={series2} type="area" height={320} />
                    <div className="flex items-center justify-center gap-5">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-[#1A56DB] block"></span>
                            <Typography.P>Ventas</Typography.P>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-[#7E3BF2] block"></span>
                            <Typography.P>No ventas</Typography.P>
                        </div>
                    </div>
                </div>


                <div className="bg-white col-start-1 col-end-13 shadow-lg border border-gray-100 p-5 rounded-xl">
                    <div className="flex justify-between items-center">
                        <Typography.H3>Total de montos</Typography.H3>
                        <div className="grid grid-cols-3 gap-2 text-xs bg-gray-100 p-0.5 rounded text-gray-700 text-center">
                            <div className="p-1 bg-white rounded font-medium">
                                Mensual
                            </div>
                            <div className="p-1 rounded font-medium">
                                Trimestral
                            </div >
                            <div className="p-1 rounded font-medium">
                                Anualmente
                            </div>
                        </div>
                    </div>
                    <Typography.P className="py-3 text-xs"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut rerum dignissimos veniam commodi, modi quisquam odio ea quo. Maxime, vero. </Typography.P>
                    <ApexChart options={options} series={series} type="area" height={320} />
                    <div className="flex items-center justify-center gap-5">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-[#1A56DB] block"></span>
                            <Typography.P>Ventas</Typography.P>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-[#7E3BF2] block"></span>
                            <Typography.P>No ventas</Typography.P>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Productividad





