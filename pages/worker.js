import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditWorkerForm from "./forms/edit-worker";
import Link from "next/link";
import Navigation from "./navigation";
import {ProtectRoute} from "../components/router";

const Worker = (props) => {
    const [editedWorker, setEditedWorker] = useState(null)
    const [workers, setWorkers] = useState(props.data)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-worker', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setWorkers(workers.filter(worker => worker.id !== data.id));
    };

    function renderTableData() {

        return workers.map((worker, index) => {
            const { id, firstName, lastName, email, oib, dateOfBirth, address, phoneNumber, pay } = worker
            return (
                <tr key={id}>
                    <td className={styles.tabletd}>{firstName}</td>
                    <td className={styles.tabletd}>{lastName}</td>
                    <td className={styles.tabletd}>{email}</td>
                    <td className={styles.tabletd}>{oib}</td>
                    <td className={styles.tabletd}>{address}</td>
                    <td className={styles.tabletd}>{dateOfBirth.substr(0,10)}</td>
                    <td className={styles.tabletd}>{phoneNumber}</td>
                    <td className={styles.tabletd}>{pay} kn</td>
                    <td><button className={styles.buttonTable} onClick={() => setEditedWorker(worker)}>Uredi</button></td>
                    <td><button className={styles.buttonTable} onClick={() => deleteFromDatabase({id: id})}>Obriši</button></td>
                </tr>
            )
        })
    }

    if (editedWorker) {
        return <EditWorkerForm onCancel={() => setEditedWorker(null)} data={editedWorker}/>
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

                <h1 className="">Zaposlenici</h1>

                <div>
                    <table className={styles.tableall}>
                        <tbody>
                        <tr >
                            <td className={styles.tablefirst}>ime</td>
                            <td className={styles.tablefirst}>prezime</td>
                            <td className={styles.tablefirst}>email</td>
                            <td className={styles.tablefirst}>oib</td>
                            <td className={styles.tablefirst}>adresa</td>
                            <td className={styles.tablefirst}>datum rođenja</td>
                            <td className={styles.tablefirst}>broj mobitela</td>
                            <td className={styles.tablefirst}>plaća</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedWorker('w')} className={styles.button}>Dodaj novo</button>
                    <button className={styles.button}>
                        <Link href="/home">
                            <a>Početna</a>
                        </Link>
                    </button>
                </div>


            </main>

        </div>
    )
}

export default ProtectRoute(Worker)

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allWorkers = await prisma.worker.findMany()
    const data = JSON.parse(JSON.stringify(allWorkers))
    return {
        props : { data }
    }
}