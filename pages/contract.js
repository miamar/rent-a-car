import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditContractForm from "./forms/edit-contract";

export default function Home(props) {
    console.log(props.data)

    const [editedContract, setEditedContract] = useState(null)
    const [contracts, setContracts] = useState(props.data)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-contract', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setContracts(contracts.filter(contract => contract.id !== data.id));
    };

    function renderTableData() {

        return contracts.map((contract) => {
            const { id, rentedFrom, rentedUntil, client, vehicle, worker } = contract
            return (
                <tr key={id}>
                    <td className={styles.tabletd}>{client.firstName} {client.lastName}</td>
                    <td className={styles.tabletd}>{vehicle.make} {vehicle.model}</td>
                    <td className={styles.tabletd}>{worker.firstName} {worker.lastName}</td>
                    <td className={styles.tabletd}>{rentedFrom.substr(0,10)}</td>
                    <td className={styles.tabletd}>{rentedUntil.substr(0,10)}</td>
                    <td><button onClick={() => setEditedContract(contract)}>Uredi</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Obriši</button></td>
                </tr>
            )
        })
    }

    if (editedContract) {
        return <EditContractForm onCancel={() => setEditedContract(null)} data={editedContract}/>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className="">Ugovori</h1>

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td className={styles.tablefirst}>klijent ime</td>
                            <td className={styles.tablefirst}>vozilo marka</td>
                            <td className={styles.tablefirst}>zaposlenik ime</td>
                            <td className={styles.tablefirst}>od</td>
                            <td className={styles.tablefirst}>do</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedContract('w')} className={styles.button}>Dodaj novo</button>
                    <button className={styles.button}><a href="/home">Početna</a></button>
                </div>


            </main>
        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()

    const allOffices = await prisma.contract.findMany({
        where: {

        },
        include: {
            client: true,
            vehicle: true,
            worker: true
        },
    })
    const data = JSON.parse(JSON.stringify(allOffices))
    return {
        props : { data }
    }
}