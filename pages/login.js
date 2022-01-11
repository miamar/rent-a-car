import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from 'react';
import { useFormik } from 'formik';

export default function SignupForm() {

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
            errors.password = 'Must be 8 characters or more';
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
            alert(JSON.stringify(values, null, 2));
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
                <h1 className="">Login</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            className={styles.input}
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    </div>

                    <div className={styles.forms}>
                        <label htmlFor="password">Password</label>
                        <input
                            className={styles.input}
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    </div>

                    <button className={styles.button} type="submit">Submit</button>
                    <button className={styles.button}><a href="/home">Cancel</a></button>

                    <p><a href={"#"}>Forgot password?</a></p>

                    <p><a href="/forms/new-worker">Don't have an account? Register.</a></p>

                </form>
            </main>
        </div>
    );
};

