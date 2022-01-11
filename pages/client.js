import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";

export default function Home(props) {

    function renderTableData() {
        return props.data.map((client, index) => {
            const { id, firstName, lastName, email } = client
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td><button>Edit</button></td>
                    <td><button>Delete</button></td>
                </tr>
            )
        })
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
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button className={styles.button}><a href="/forms/new-client">Add new</a></button>
                    <button className={styles.button}><a href="/home">Home page</a></button>
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