import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditOfficeForm from "./forms/edit-office";

export default function Home(props) {
    const [editedOffice, setEditedOffice] = useState(null)
    const [offices, setOffices] = useState(props.data)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-office', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setOffices(offices.filter(office => office.id !== data.id));
    };

    function renderTableData() {

        return offices.map((office, index) => {
            const { id, address, phoneNumber, workHours } = office
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{address}</td>
                    <td>{phoneNumber}</td>
                    <td>{workHours}</td>
                    <td><button onClick={() => setEditedOffice(office)}>Edit</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Delete</button></td>
                </tr>
            )
        })
    }

    if (editedOffice) {
        return <EditOfficeForm onCancel={() => setEditedOffice(null)} data={editedOffice}/>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className="">Poslovnice</h1>

                <div>
                    <table>
                        <tbody>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedOffice('w')} className={styles.button}>Add new</button>
                    <button className={styles.button}><a href="/home">Home page</a></button>
                </div>


            </main>
        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allOffices = await prisma.office.findMany()
    const data = JSON.parse(JSON.stringify(allOffices))
    return {
        props : { data }
    }
}