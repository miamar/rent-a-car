import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditCollabForm from "./forms/edit-collab";
import Link from "next/link";
import Navigation from "./navigation";
import {ProtectRoute} from "../components/router";
import useAuth from "../context/auth/login";

const Collab = (props) => {

    const {user} = useAuth()
    const [editedCollab, setEditedCollab] = useState(null)
    const [collabs, setCollabs] = useState(props.data)
    const [pageNumber, setPageNumber] = useState(1)

    const numberOfOffices = props.data.length
    const numberOfPages = Math.ceil(numberOfOffices / 5)

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

    function renderTableData(pageNumber) {

        return collabs.map((collab, index) => {
            const { id, type, name, website, description } = collab
            if (index >= pageNumber*5-5 && index <= pageNumber*5-1) {
                return (
                    <tr key={id}>
                        <td className={styles.tabletd}>{type}</td>
                        <td className={styles.tabletd}>{name}</td>
                        <td className={styles.tabletd}><a href={website} rel="noopener noreferrer"
                                                          target="_blank">{website}</a></td>
                        <td className={styles.tabletd}>{description}</td>
                        <td>
                            <button className={styles.buttonTable} onClick={() => setEditedCollab(collab)}>Uredi
                            </button>
                        </td>
                        <td>
                            {user.role === "admin" ? (
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

                <Navigation/>

                <h1 className={styles.titles}>Vanjska suradnja</h1>

                <div>
                    <table className={styles.tableall}>
                        <tbody>
                        <tr >
                            <td className={styles.tablefirst}>vrsta</td>
                            <td className={styles.tablefirst}>naziv</td>
                            <td className={styles.tablefirst}>web stranica</td>
                            <td className={styles.tablefirst}>opis</td>
                        </tr>
                        {renderTableData(pageNumber)}
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

                <div className={styles.pageView}>
                    <a className={styles.linkPageView}>Broj stranice:</a>
                    {renderPageNumbers(numberOfPages)}
                </div>


            </main>

        </div>
    )
}

export default ProtectRoute(Collab)

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allCollab = await prisma.collaborator.findMany()
    const data = JSON.parse(JSON.stringify(allCollab))
    return {
        props : { data }
    }
}