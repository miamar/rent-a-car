import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React from 'react';
import { useFormik } from 'formik';

export default function SignupForm() {

    const saveToDatabase = async (values) => {
        const res = await fetch('api/new-client', {
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

        if (!values.firstName) {
            errors.firstName = 'Required';
        }

        if (!values.lastName) {
            errors.lastName = 'Required';
        }

        if (!values.oib) {
            errors.oib = 'Required';
        }

        if (!values.address) {
            errors.address = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Required';
        }

        if (!values.dateOfBirth) {
            errors.dateOfBirth = 'Required';
        }

        return errors;
    };
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            oib: '',
            address: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: ''
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
                <h1 className="">New client</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            className={styles.input}
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </div>
                    {formik.errors.firstName ? <div className={styles.error}>{formik.errors.firstName}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            className={styles.input}
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </div>
                    {formik.errors.lastName ? <div className={styles.error}>{formik.errors.lastName}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="oib">OIB</label>
                        <input
                            className={styles.input}
                            id="oib"
                            name="oib"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.oib}
                        />
                    </div>
                    {formik.errors.oib ? <div className={styles.error}>{formik.errors.oib}</div> : null}

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
                        <label htmlFor="email">Email Address</label>
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
                        <label htmlFor="phoneNumber">Phone Number</label>
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
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input
                            className={styles.input}
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.dateOfBirth}
                        />
                    </div>
                    {formik.errors.dateOfBirth ? <div className={styles.error}>{formik.errors.dateOfBirth}</div> : null}

                    <button className={styles.button} type="submit">Submit</button>
                    <button className={styles.button}><a href="/home">Cancel</a></button>

                </form>
            </main>
        </div>
    );
};

