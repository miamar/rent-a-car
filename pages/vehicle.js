import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditVehicleForm from "./forms/edit-vehicle";
import Link from "next/link";
import {ProtectRoute} from "./router";
import Navigation from "./navigation";

const Vehicle = (props) => {
    const [editedVehicle, setEditedVehicle] = useState(null)
    const [vehicles, setVehicles] = useState(props.data)

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

    function renderTableData() {

        return vehicles.map((vehicle, index) => {
            const { id, plates, make, model, year, seats, consumption, transmission, fuel, price, rented } = vehicle
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
                    <td className={styles.tabletd}>{rented.toString()}</td>
                    <td><button className={styles.buttonTable} onClick={() => setEditedVehicle(vehicle)}>Uredi</button></td>
                    <td><button className={styles.buttonTable} onClick={() => deleteFromDatabase({id: id})}>Obriši</button></td>
                </tr>
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

                <h1 className="">Vozila</h1>

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
                            <td className={styles.tablefirst}>iznajmljen</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedVehicle('w')} className={styles.buttonMain}>Dodaj novo</button>
                    <button className={styles.buttonMain}>
                        <Link href="/">
                            <a>Početna</a>
                        </Link>
                    </button>
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