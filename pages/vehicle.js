import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditVehicleForm from "./forms/edit-vehicle";
import EditOfficeForm from "./forms/edit-office";

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

        return props.data.map((vehicle, index) => {
            const { id, plates, make, model } = vehicle
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{plates}</td>
                    <td>{make}</td>
                    <td>{model}</td>
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