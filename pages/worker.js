import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditWorkerForm from "./forms/edit-worker";

export default function Home(props) {
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
            const { id, firstName, lastName, email, address, pay } = worker
            return (
                <tr key={id}>
                    <td className={styles.tabletd}>{firstName}</td>
                    <td className={styles.tabletd}>{lastName}</td>
                    <td className={styles.tabletd}>{email}</td>
                    <td className={styles.tabletd}>{address}</td>
                    <td className={styles.tabletd}>{pay}</td>
                    <td><button onClick={() => setEditedWorker(worker)}>Edit</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Delete</button></td>
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
                <h1 className="">Zaposlenici</h1>

                <div>
                    <table>
                        <tbody>
                        <tr >
                            <td className={styles.tablefirst}>first name</td>
                            <td className={styles.tablefirst}>last name</td>
                            <td className={styles.tablefirst}>email</td>
                            <td className={styles.tablefirst}>address</td>
                            <td className={styles.tablefirst}>pay</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedWorker('w')} className={styles.button}>Add new</button>
                    <button className={styles.button}><a href="/home">Home page</a></button>
                </div>


            </main>

        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allWorkers = await prisma.worker.findMany()
    const data = JSON.parse(JSON.stringify(allWorkers))
    return {
        props : { data }
    }
}