import styles from "../styles/Home.module.css";
import Head from "next/head";
import { PrismaClient } from '@prisma/client'

export default function Home(props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Dobrodošli!
                </h1>

                <p className={styles.description}>
                    Za prijavu u sustav klikni ovdje &rarr;{' '}
                    <code className={styles.code}><a href="/login">Log in</a></code>
                </p>

                <p className="">
                    OR: Trenutno ste prijavljeni u sustav kao <code className={styles.code}>{props.allUsers[1].username}</code>
                </p>

                <div className={styles.grid}>
                    <a href="/vehicle" className={styles.card}>
                        <h2>Vozila &rarr;</h2>
                        <p>Informacije o vozilima, unos novih i izmjena postojećih podataka.</p>
                    </a>

                    <a href="/worker" className={styles.card}>
                        <h2>Zaposlenici &rarr;</h2>
                        <p>Informacije o zaposlenicima, unos i izmjena postojećih podataka.</p>
                    </a>

                    <a
                        href="/client"
                        className={styles.card}
                    >
                        <h2>Klijenti &rarr;</h2>
                        <p>Informacije o korisnicima, unos novih i izmjena postojećih podataka.</p>
                    </a>

                    <a
                        href="/office"
                        className={styles.card}
                    >
                        <h2>Poslovnice &rarr;</h2>
                        <p>Popis poslovnica, unos novih i izmjena postojećih podataka.</p>
                    </a>

                    <a
                        href="/collab"
                        className={styles.card}
                    >
                        <h2>Vanjska suradnja &rarr;</h2>
                        <p>Hoteli, aerodromi...</p>
                    </a>

                    <a
                        href="/contract"
                        className={styles.card}
                    >
                        <h2>Ugovori &rarr;</h2>
                        <p>Pregled svih postojećih ugovora i dodavanje novih.</p>
                    </a>
                </div>
            </main>

        </div>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allUsers = await prisma.auth.findMany()
    return {
        props : { allUsers }
    }
}