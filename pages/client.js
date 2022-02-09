import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditClientForm from "./forms/edit-client";

export default function Home(props) {
    const [editedClient, setEditedClient] = useState(null)
    const [clients, setClients] = useState(props.data)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-client', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setClients(clients.filter(client => client.id !== data.id));
    };

    function renderTableData() {
        return clients.map((client, index) => {
            const { id, firstName, lastName, email, address, phoneNumber, oib, dateOfBirth } = client
            return (
                <tr key={id}>
                    <td className={styles.tabletd}>{firstName}</td>
                    <td className={styles.tabletd}>{lastName}</td>
                    <td className={styles.tabletd}>{email}</td>
                    <td className={styles.tabletd}>{address}</td>
                    <td className={styles.tabletd}>{phoneNumber}</td>
                    <td className={styles.tabletd}>{oib}</td>
                    <td className={styles.tabletd}>{dateOfBirth.substr(0,10)}</td>
                    <td><button onClick={() => setEditedClient(client)}>Uredi</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Obriši</button></td>
                </tr>
            )
        })
    }

    if (editedClient) {
        return <EditClientForm onCancel={() => setEditedClient(null)} data={editedClient}/>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className="">Klijenti</h1>

                <div>
                    <table>
                        <tbody>
                        <tr >
                            <td className={styles.tablefirst}>ime</td>
                            <td className={styles.tablefirst}>prezime</td>
                            <td className={styles.tablefirst}>email</td>
                            <td className={styles.tablefirst}>adresa</td>
                            <td className={styles.tablefirst}>broj mobitela</td>
                            <td className={styles.tablefirst}>oib</td>
                            <td className={styles.tablefirst}>datum rođenja</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedClient('w')} className={styles.button}>Dodaj novo</button>
                    <button className={styles.button}><a href="/home">Početna</a></button>
                </div>


            </main>

        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allClients = await prisma.client.findMany()
    const data = JSON.parse(JSON.stringify(allClients))
    return {
        props : { data }
    }
}