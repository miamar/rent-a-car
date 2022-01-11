import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React from 'react';
import { useFormik } from 'formik';

export default function SignupForm() {

    const saveToDatabase = async (values) => {
        const res = await fetch('api/new-office', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    };

    const validate = values => {
        const errors = {};

        if (!values.address) {
            errors.address = 'Required';
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Required';
        }

        if (!values.workHours) {
            errors.workHours = 'Required';
        }

        return errors;
    };
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            address: '',
            phoneNumber: '',
            workHours: ''
        },
        validate,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            saveToDatabase(values);
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
                <h1 className="">New office</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="address">Address</label>
                        <input
                            className={styles.input}
                            id="address"
                            name="address"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                    </div>
                    {formik.errors.address ? <div className={styles.error}>{formik.errors.address}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input
                            className={styles.input}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                        />
                    </div>
                    {formik.errors.phoneNumber ? <div className={styles.error}>{formik.errors.phoneNumber}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="workHours">Working hours</label>
                        <input
                            className={styles.input}
                            id="workHours"
                            name="workHours"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.workHours}
                        />
                    </div>
                    {formik.errors.workHours ? <div className={styles.error}>{formik.errors.workHours}</div> : null}


                    <button className={styles.button} type="submit">Submit</button>
                    <button className={styles.button}><a href="/home">Cancel</a></button>

                </form>
            </main>
        </div>
    );
};

