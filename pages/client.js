import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from 'next/link'
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditClientForm from "./forms/edit-client";
import {ProtectRoute} from "../components/router";
import Navigation from "./navigation";
import useAuth from "../context/auth/login";

const Client = (props) => {

    const {user} = useAuth()
    const [editedClient, setEditedClient] = useState(null)
    const [clients, setClients] = useState(props.data)
    const [pageNumber, setPageNumber] = useState(1)

    const numberOfOffices = props.data.length
    const numberOfPages = Math.ceil(numberOfOffices / 5)

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

    function renderTableData(pageNumber) {
        return clients.map((client, index) => {
            const { id, firstName, lastName, email, address, phoneNumber, oib, dateOfBirth } = client
            if (index >= pageNumber*5-5 && index <= pageNumber*5-1) {
                return (
                    <tr key={id}>
                        <td className={styles.tabletd}>{firstName}</td>
                        <td className={styles.tabletd}>{lastName}</td>
                        <td className={styles.tabletd}>{email}</td>
                        <td className={styles.tabletd}>{address}</td>
                        <td className={styles.tabletd}>{phoneNumber}</td>
                        <td className={styles.tabletd}>{oib}</td>
                        <td className={styles.tabletd}>{dateOfBirth.substr(0, 10)}</td>
                        <td>
                            <button className={styles.buttonTable} onClick={() => setEditedClient(client)}>Uredi
                            </button>
                        </td>
                        <td>
                            {user && user.role === "admin" ? (
                                <button className={styles.buttonTable} onClick={() => deleteFromDatabase({id: id})}>
                                    Obriši
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

                <Navigation/>

                <h1 className={styles.titles}>Klijenti</h1>

                <div>
                    <table className={styles.tableall}>
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
                        {renderTableData(pageNumber)}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedClient('w')} className={styles.button}>Dodaj novo</button>
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

export default ProtectRoute(Client)

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allClients = await prisma.client.findMany()
    const data = JSON.parse(JSON.stringify(allClients))
    return {
        props : { data }
    }
}