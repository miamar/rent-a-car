import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditCollabForm from "./forms/edit-collab";
import EditOfficeForm from "./forms/edit-office";

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

        return props.data.map((collab, index) => {
            const { id, type, name, website, description } = collab
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{type}</td>
                    <td>{name}</td>
                    <td>{website}</td>
                    <td>{description}</td>
                    <td><button onClick={() => setEditedCollab(collab)}>Edit</button></td>
                    <td><button onClick={() => deleteFromDatabase({id: id})}>Delete</button></td>
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
                        {renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedCollab('w')} className={styles.button}>Add new</button>
                    <button className={styles.button}><a href="/home">Home page</a></button>
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