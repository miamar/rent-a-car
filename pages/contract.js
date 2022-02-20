import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditContractForm from "./forms/edit-contract";
import Link from "next/link";
import Navigation from "./navigation";
import {ProtectRoute} from "./router";

const Contract = (props) => {

    const [editedContract, setEditedContract] = useState(null)
    const [contracts, setContracts] = useState(props.data)

    let dataToSend = {editedContract: editedContract, clients: props.dataC, vehicles: props.dataV, workers: props.dataW}

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
            const { id, rentedFrom, rentedUntil, client, vehicle, worker, price, openReturn, insurance } = contract
            return (
                <tr key={id}>
                    <td className={styles.tabletd}>{client.firstName} {client.lastName}</td>
                    <td className={styles.tabletd}>{vehicle.make} {vehicle.model}</td>
                    <td className={styles.tabletd}>{worker.firstName} {worker.lastName}</td>
                    <td className={styles.tabletd}>{rentedFrom.substr(0,10)}</td>
                    <td className={styles.tabletd}>{rentedUntil.substr(0,10)}</td>
                    <td className={styles.tabletd}>{price} kn</td>
                    <td className={styles.tabletd}>{insurance.toString()}</td>
                    <td className={styles.tabletd}>{openReturn.toString()}</td>
                    <td><button className={styles.buttonTable} onClick={() => setEditedContract(contract)}>Uredi</button></td>
                    <td><button className={styles.buttonTable} onClick={() => deleteFromDatabase({id: id})}>Obriši</button></td>
                </tr>
            )
        })
    }

    if (editedContract) {
        return <EditContractForm onCancel={() => setEditedContract(null)} data={dataToSend}/>
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

                <h1 className="">Ugovori</h1>

                <div>
                    <table className={styles.tableall}>
                        <tbody>
                        <tr>
                            <td className={styles.tablefirst}>klijent ime</td>
                            <td className={styles.tablefirst}>vozilo marka</td>
                            <td className={styles.tablefirst}>zaposlenik ime</td>
                            <td className={styles.tablefirst}>od</td>
                            <td className={styles.tablefirst}>do</td>
                            <td className={styles.tablefirst}>cijena najma</td>
                            <td className={styles.tablefirst}>dodatno osiguranje</td>
                            <td className={styles.tablefirst}>Povrat izvan poslovnice</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedContract('w')} className={styles.buttonMain}>Dodaj novo</button>
                    <button className={styles.buttonMain}>
                        <Link href="/home">
                            <a>Početna</a>
                        </Link>
                    </button>
                </div>


            </main>
        </div>
    )
}

export default ProtectRoute(Contract)

export async function getServerSideProps() {
    const prisma = new PrismaClient()

    const allVehicles = await prisma.vehicle.findMany()
    const dataV = JSON.parse(JSON.stringify(allVehicles))

    const allClients = await prisma.client.findMany()
    const dataC = JSON.parse(JSON.stringify(allClients))

    const allWorkers = await prisma.worker.findMany()
    const dataW = JSON.parse(JSON.stringify(allWorkers))

    const allContracts = await prisma.contract.findMany({
        where: {

        },
        include: {
            client: true,
            vehicle: true,
            worker: true
        },
    })
    const data = JSON.parse(JSON.stringify(allContracts))
    return {
        props : { data, dataV, dataC, dataW }
    }
}