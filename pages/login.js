import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from 'react';
import Link from 'next/link'
import { useFormik } from 'formik';
import {PrismaClient} from "@prisma/client";
import useAuth from "../context/auth/login";

export default function LoginForm(props) {
    const {login} = useAuth()

    const validate = values => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            //errors.password = 'Must be 8 characters or more';
        }

        return errors;
    };
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            login(values)
        },
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className="">Prijava u sustav</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="email">Email</label>
                        <input
                            className={styles.input}
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="password">Lozinka</label>
                        <input
                            className={styles.input}
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>
                    {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : null}

                    <button className={styles.button} type="submit">Prijava</button>
                    <button className={styles.button}>
                        <Link href="/home">
                            <a>Odustani</a>
                        </Link>
                    </button>

                </form>
            </main>
        </div>
    );
};

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const allAuth = await prisma.auth.findMany()
    const data = JSON.parse(JSON.stringify(allAuth))
    return {
        props : { data }
    }
}