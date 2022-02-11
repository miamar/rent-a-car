import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditCollabForm from "./forms/edit-collab";
import Link from "next/link";

export default function Home(props) {
    const [editedCollab, setEditedCollab] = useState(null)
    const [collabs, setCollabs] = useState(props.data)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-collab', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setCollabs(collabs.filter(collab => collab.id !== data.id));
    };

    function renderTableData() {

        return collabs.map((collab, index) => {
            const { id, type, name, website, description } = collab
            return (
                <tr key={id}>
                    <td className={styles.tabletd}>{type}</td>
                    <td className={styles.tabletd}>{name}</td>
                    <td className={styles.tabletd}><a href={website} rel="noopener noreferrer" target="_blank">{website}</a></td>
                    <td className={styles.tabletd}>{description}</td>
                    <td><button onClick={() => setEditedCollab(collab)}>Uredi</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Obriši</button></td>
                </tr>
            )
        })
    }

    if (editedCollab) {
        return <EditCollabForm onCancel={() => setEditedCollab(null)} data={editedCollab}/>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className="">Vanjska suradnja</h1>

                <div>
                    <table>
                        <tbody>
                        <tr >
                            <td className={styles.tablefirst}>vrsta</td>
                            <td className={styles.tablefirst}>naziv</td>
                            <td className={styles.tablefirst}>web stranica</td>
                            <td className={styles.tablefirst}>opis</td>
                        </tr>
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedCollab('w')} className={styles.button}>Dodaj novo</button>
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

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allCollab = await prisma.collaborator.findMany()
    const data = JSON.parse(JSON.stringify(allCollab))
    return {
        props : { data }
    }
}