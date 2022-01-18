import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import { useFormik } from 'formik';
import {useState} from "react";

export default function Home(props) {
    // change office to contract
    const [offices, setOffices] = useState(props.data)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-contract', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setOffices(offices.filter(office => office.id !== data.id));
    };

    const editDatabase = async (values) => {
        const res = await fetch('api/edit-contract', {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setOffices(offices.filter(office => office.id !== data.id));
    };

    function renderTableData() {

        return offices.map((contract, index) => {
            const { id, address, phoneNumber, workHours } = contract
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{address}</td>
                    <td>{phoneNumber}</td>
                    <td>{workHours}</td>
                    <td><button onClick={() => editDatabase({id: id, number: 1})}>Edit</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Delete</button></td>
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
                <h1 className="">Ugovori!</h1>

                <div>
                    <table>
                        <tbody>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button className={styles.button}><a href="/forms/new-contract">Add new</a></button>
                    <button className={styles.button}><a href="/home">Home page</a></button>
                </div>


            </main>

        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allOffices = await prisma.contract.findMany()
    const data = JSON.parse(JSON.stringify(allOffices))
    return {
        props : { data }
    }
}