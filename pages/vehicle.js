import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditVehicleForm from "./forms/edit-vehicle";
import Link from "next/link";
import {ProtectRoute} from "../components/router";
import Navigation from "./navigation";
import useAuth from "../context/auth/login";

const Vehicle = (props) => {

    const {user} = useAuth()
    const [editedVehicle, setEditedVehicle] = useState(null)
    const [vehicles, setVehicles] = useState(props.data)
    const [pageNumber, setPageNumber] = useState(1)

    const numberOfOffices = props.data.length
    const numberOfPages = Math.ceil(numberOfOffices / 5)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-vehicle', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setVehicles(vehicles.filter(vehicle => vehicle.id !== data.id));
    };

    function renderTableData(pageNumber) {

        return vehicles.map((vehicle, index) => {
            const { id, plates, make, model, year, seats, consumption, transmission, fuel, price, rented } = vehicle
            if (index >= pageNumber*5-5 && index <= pageNumber*5-1) {
                return (
                    <tr key={id}>
                        <td className={styles.tabletd}>{plates}</td>
                        <td className={styles.tabletd}>{make}</td>
                        <td className={styles.tabletd}>{model}</td>
                        <td className={styles.tabletd}>{year}</td>
                        <td className={styles.tabletd}>{seats}</td>
                        <td className={styles.tabletd}>{consumption} L/km</td>
                        <td className={styles.tabletd}>{transmission}</td>
                        <td className={styles.tabletd}>{fuel}</td>
                        <td className={styles.tabletd}>{price} kn</td>
                        <td>
                            <button className={styles.buttonTable} onClick={() => setEditedVehicle(vehicle)}>Uredi
                            </button>
                        </td>
                        <td>
                            {user.role === "admin" ? (
                                <button className={styles.buttonTable} onClick={() => deleteFromDatabase({id: id})}>
                                    Obriši
                                </button>
                            ) : null}
                        </td>
                    </tr>
                )
            }
        })
    }

    function renderPageNumbers(numberOfPages) {
        let arrayPages = [...Array(numberOfPages+1).keys()]
        arrayPages.shift()

        return arrayPages.map((page) => {
            return (
                <a key={page} onClick={() => setPageNumber(page)} href={"#"} className={styles.linkPageView}>{page}</a>
            )
        })
    }

    if (editedVehicle) {
        return <EditVehicleForm onCancel={() => setEditedVehicle(null)} data={editedVehicle}/>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>

                <Navigation/>

                <h1 className={styles.titles}>Vozila</h1>

                <div>
                    <table className={styles.tableall}>
                        <tbody>
                        <tr>
                            <td className={styles.tablefirst}>registracija</td>
                            <td className={styles.tablefirst}>marka</td>
                            <td className={styles.tablefirst}>model</td>
                            <td className={styles.tablefirst}>godina</td>
                            <td className={styles.tablefirst}>br. sjedala</td>
                            <td className={styles.tablefirst}>potrošnja</td>
                            <td className={styles.tablefirst}>mjenjač</td>
                            <td className={styles.tablefirst}>gorivo</td>
                            <td className={styles.tablefirst}>cijena</td>
                        </tr>
                        {renderTableData(pageNumber)}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedVehicle('w')} className={styles.button}>Dodaj novo</button>
                    <button className={styles.button}>
                        <Link href="/">
                            <a>Početna</a>
                        </Link>
                    </button>
                </div>

                <div className={styles.pageView}>
                    <a className={styles.linkPageView}>Broj stranice:</a>
                    {renderPageNumbers(numberOfPages)}
                </div>


            </main>

        </div>
    )
}

export default ProtectRoute(Vehicle)

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allVehicles = await prisma.vehicle.findMany()
    const data = JSON.parse(JSON.stringify(allVehicles))
    return {
        props : { data }
    }
}