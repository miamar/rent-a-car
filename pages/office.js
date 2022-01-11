import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";

export default function Home(props) {

    function renderTableData() {

        return props.data.map((office, index) => {
            const { id, address, phoneNumber, workHours } = office
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{address}</td>
                    <td>{phoneNumber}</td>
                    <td>{workHours}</td>
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
                <h1 className="">Poslovnice</h1>

                <div>
                    <table>
                        <tbody>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button className={styles.button}><a href="/forms/new-office">Add new</a></button>
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