import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditWorkerForm from "./forms/edit-worker";
import Link from "next/link";
import Navigation from "./navigation";
import {ProtectRoute} from "../components/router";
import EditWorkerPay from "./forms/edit-pay";
import useAuth from "../context/auth/login";

const Worker = (props) => {

    const {user} = useAuth()
    const [editedWorker, setEditedWorker] = useState(null)
    const [managePay, setManagePay] = useState(null)
    const [workers, setWorkers] = useState(props.data)
    const [pageNumber, setPageNumber] = useState(1)

    const numberOfOffices = props.data.length
    const numberOfPages = Math.ceil(numberOfOffices / 5)

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

    function renderTableData(pageNumber) {

        return workers.map((worker, index) => {
            const { id, firstName, lastName, email, oib, dateOfBirth, address, phoneNumber, finalPay } = worker
            if (index >= pageNumber*5-5 && index <= pageNumber*5-1) {
                return (
                    <tr key={id}>
                        <td className={styles.tabletd}>{firstName}</td>
                        <td className={styles.tabletd}>{lastName}</td>
                        <td className={styles.tabletd}>{email}</td>
                        <td className={styles.tabletd}>{oib}</td>
                        <td className={styles.tabletd}>{address}</td>
                        <td className={styles.tabletd}>{dateOfBirth.substr(0, 10)}</td>
                        <td className={styles.tabletd}>{phoneNumber}</td>
                        <td className={styles.tabletd}>{finalPay} kn</td>
                        <td>
                            <button className={styles.buttonTable} onClick={() => setEditedWorker(worker)}>
                                Uredi
                            </button>
                        </td>
                        <td>
                            {user && user.role === "admin" ? (
                                <button className={styles.buttonTable} onClick={() => deleteFromDatabase({id: id})}>
                                    Obriši
                                </button>
                            ) : null}
                        </td>
                        <td>
                            {user && user.role === "admin" ? (
                                <button className={styles.buttonTable} onClick={() => setManagePay(worker)}>
                                    Plaća
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

    if (editedWorker) {
        return <EditWorkerForm onCancel={() => setEditedWorker(null)} data={editedWorker}/>
    }

    if (managePay) {
        return <EditWorkerPay onCancel={() => setEditedWorker(null)} data={managePay}/>
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

                <h1 className={styles.titles}>Zaposlenici</h1>

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
                        {renderTableData(pageNumber)}
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

                <div className={styles.pageView}>
                    <a className={styles.linkPageView}>Broj stranice:</a>
                    {renderPageNumbers(numberOfPages)}
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