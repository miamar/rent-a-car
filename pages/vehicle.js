import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditVehicleForm from "./forms/edit-vehicle";

export default function Home(props) {
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
            const { id, plates, make, model, year, fuel, price, rented } = vehicle
            return (
                <tr key={id}>
                    <td className={styles.tabletd}>{plates}</td>
                    <td className={styles.tabletd}>{make}</td>
                    <td className={styles.tabletd}>{model}</td>
                    <td className={styles.tabletd}>{year}</td>
                    <td className={styles.tabletd}>{fuel}</td>
                    <td className={styles.tabletd}>{price}</td>
                    <td className={styles.tabletd}>{rented.toString()}</td>
                    <td><button onClick={() => setEditedVehicle(vehicle)}>Edit</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Delete</button></td>
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
                <h1 className="">Vozila</h1>

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td className={styles.tablefirst}>plates</td>
                            <td className={styles.tablefirst}>make</td>
                            <td className={styles.tablefirst}>model</td>
                            <td className={styles.tablefirst}>year</td>
                            <td className={styles.tablefirst}>fuel</td>
                            <td className={styles.tablefirst}>price</td>
                            <td className={styles.tablefirst}>rented</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedVehicle('w')} className={styles.button}>Add new</button>
                    <button className={styles.button}><a href="/home">Home page</a></button>
                </div>


            </main>

        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allVehicles = await prisma.vehicle.findMany()
    const data = JSON.parse(JSON.stringify(allVehicles))
    return {
        props : { data }
    }
}