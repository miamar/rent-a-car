import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from 'next/link'
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
                    <code className={styles.code}>
                        <Link href="/login">
                            <a>Prijava</a>
                        </Link>
                    </code>
                </p>



                <div className={styles.grid}>

                    <Link href="/vehicle">
                        <a className={styles.card}>
                            <h2>Vozila &rarr;</h2>
                            <p>Informacije o vozilima, unos novih i izmjena postojećih podataka.</p>
                        </a>
                    </Link>

                    <Link href="/worker">
                        <a className={styles.card}>
                            <h2>Zaposlenici &rarr;</h2>
                            <p>Informacije o zaposlenicima, unos novih i izmjena postojećih podataka.</p>
                        </a>
                    </Link>

                    <Link href="/client">
                        <a className={styles.card}>
                            <h2>Klijenti &rarr;</h2>
                            <p>Informacije o korisnicima, unos novih i izmjena postojećih podataka.</p>
                        </a>
                    </Link>

                    <Link href="/office">
                        <a className={styles.card}>
                            <h2>Poslovnice &rarr;</h2>
                            <p>Popis poslovnica, unos novih i izmjena postojećih podataka.</p>
                        </a>
                    </Link>

                    <Link href="/collab">
                        <a className={styles.card}>
                            <h2>Vanjska suradnja &rarr;</h2>
                            <p>Hoteli, aerodromi...</p>
                        </a>
                    </Link>

                    <Link href="/contract">
                        <a className={styles.card}>
                            <h2>Iznajmljivanje &rarr;</h2>
                            <p>Pregled svih postojećih ugovora i dodavanje novih.</p>
                        </a>
                    </Link>

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