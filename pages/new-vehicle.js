import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from 'react';
import { useFormik } from 'formik';

export default function SignupForm() {

    const saveToDatabase = async (values) => {
        const res = await fetch('api/new-vehicle', {
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

        if (!values.plates) {
            errors.plates = 'Required';
        }

        if (!values.make) {
            errors.make = 'Required';
        }

        if (!values.model) {
            errors.model = 'Required';
        }

        if (!values.year) {
            errors.year = 'Required';
        }

        if (!values.price) {
            errors.price = 'Required';
        }

        return errors;
    };
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            plates: '',
            make: '',
            model: '',
            year: ''
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
                        <label htmlFor="plates">Plates</label>
                        <input
                            className={styles.input}
                            id="plates"
                            name="plates"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.plates}
                        />
                    </div>
                    {formik.errors.plates ? <div className={styles.error}>{formik.errors.plates}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="make">Make</label>
                        <input
                            className={styles.input}
                            id="make"
                            name="make"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.make}
                        />
                    </div>
                    {formik.errors.make ? <div className={styles.error}>{formik.errors.make}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="model">Model</label>
                        <input
                            className={styles.input}
                            id="model"
                            name="model"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.model}
                        />
                    </div>
                    {formik.errors.model ? <div className={styles.error}>{formik.errors.model}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="year">Year</label>
                        <input
                            className={styles.input}
                            id="year"
                            name="year"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.year}
                        />
                    </div>
                    {formik.errors.year ? <div className={styles.error}>{formik.errors.year}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="seats">Number of seats</label>
                        <input
                            className={styles.input}
                            id="seats"
                            name="seats"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.seats}
                        />
                    </div>
                    {formik.errors.seats ? <div className={styles.error}>{formik.errors.seats}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="transmission">Transmission</label>
                        <input
                            className={styles.input}
                            id="transmission"
                            name="transmission"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.transmission}
                        />
                    </div>
                    {formik.errors.transmission ? <div className={styles.error}>{formik.errors.transmission}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="fuel">Fuel</label>
                        <input
                            className={styles.input}
                            id="fuel"
                            name="fuel"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.fuel}
                        />
                    </div>
                    {formik.errors.fuel ? <div className={styles.error}>{formik.errors.fuel}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="price">Price per day</label>
                        <input
                            className={styles.input}
                            id="price"
                            name="price"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                        />
                    </div>
                    {formik.errors.price ? <div className={styles.error}>{formik.errors.price}</div> : null}

                    <button className={styles.button} type="submit">Submit</button>
                    <button className={styles.button}><a href="/home">Cancel</a></button>

                </form>
            </main>
        </div>
    );
};

