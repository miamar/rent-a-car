import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Vertigo!
                </h1>

                <p className={styles.description}>
                    Get started by logging in here &rarr;{' '}
                    <code className={styles.code}>Log in</code>
                </p>

                <div className={styles.grid}>
                    <a href="/vozila" className={styles.card}>
                        <h2>Vozila &rarr;</h2>
                        <p>Informacije o vozilima, unos novih i izmjena postojećih podataka.</p>
                    </a>

                    <a href="/zaposlenici" className={styles.card}>
                        <h2>Zaposlenici &rarr;</h2>
                        <p>Informacije o zaposlenicima, unos i izmjena postojećih podataka.</p>
                    </a>

                    <a
                        href="/korisnici"
                        className={styles.card}
                    >
                        <h2>Korisnici &rarr;</h2>
                        <p>Informacije o korisnicima, unos novih i izmjena postojećih podataka.</p>
                    </a>

                    <a
                        href="/poslovnice"
                        className={styles.card}
                    >
                        <h2>Poslovnice &rarr;</h2>
                        <p>Popis poslovnica, unos novih i izmjena postojećih podataka.</p>
                    </a>

                    <a
                        href="/suradnja"
                        className={styles.card}
                    >
                        <h2>Vanjska suradnja &rarr;</h2>
                        <p>Hoteli, aerodromi...</p>
                    </a>
                </div>
            </main>

        </div>
    )
}