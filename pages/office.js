import styles from "../styles/Home.module.css";
import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import EditOfficeForm from "./forms/edit-office";
import Link from "next/link";
import Navigation from "./navigation";
import {ProtectRoute} from "../components/router";
import useAuth from "../context/auth/login";

const Office = (props) => {

    const {user} = useAuth()

    console.log("parararam", user)
    const [editedOffice, setEditedOffice] = useState(null)
    const [offices, setOffices] = useState(props.data)
    const [pageNumber, setPageNumber] = useState(1)

    const numberOfOffices = props.data.length
    const numberOfPages = Math.ceil(numberOfOffices / 5)

    const deleteFromDatabase = async (values) => {
        const res = await fetch('api/delete-office', {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        setOffices(offices.filter(office => office.id !== data.id));
    };

    function renderTableData(pageNumber) {

        return offices.map((office, index) => {
            const { id, address, phoneNumber, workHours } = office
            if (index >= pageNumber*5-5 && index <= pageNumber*5-1) {
                return (
                    <tr key={id}>
                        <td className={styles.tabletd}>{address}</td>
                        <td className={styles.tabletd}>{phoneNumber}</td>
                        <td className={styles.tabletd}>{workHours}</td>
                        <td>
                            <button className={styles.buttonTable} onClick={() => setEditedOffice(office)}>Uredi</button>
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

    if (editedOffice) {
        return <EditOfficeForm onCancel={() => setEditedOffice(null)} data={editedOffice}/>
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

                <h1 className={styles.titles}>Poslovnice</h1>

                <div>
                    <table className={styles.tableall}>
                        <tbody>
                        <tr>
                            <td className={styles.tablefirst}>adresa</td>
                            <td className={styles.tablefirst}>broj telefona</td>
                            <td className={styles.tablefirst}>radno vrijeme</td>
                        </tr>
                        {renderTableData(pageNumber)}
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={() => setEditedOffice('w')} className={styles.button}>Dodaj novo</button>
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

export default ProtectRoute(Office)

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allOffices = await prisma.office.findMany()
    const data = JSON.parse(JSON.stringify(allOffices))
    return {
        props : { data }
    }
}