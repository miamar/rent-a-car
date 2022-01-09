import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";

export default function Home(props) {

    function renderTableData() {

        return props.data.map((worker, index) => {
            const { id, firstName, lastName, email } = worker
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
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
                <h3 className={styles.title}>
                    Zaposlenici!
                </h3>

                <div>
                    <table>
                        <tbody>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button className={styles.button}><a href="/register">Add new</a></button>
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