import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React from 'react';
import { useFormik } from 'formik';

export default function SignupForm() {

    const saveToDatabase = async (values) => {
        const res = await fetch('api/new-collab', {
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

        if (!values.name) {
            errors.name = 'Required';
        }

        if (!values.type) {
            errors.type = 'Required';
        }

        if (!values.description) {
            errors.description = 'Required';
        }

        if (!values.website) {
            errors.website = 'Required';
        }

        return errors;
    };
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            description: '',
            website: ''
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
                <h1 className="">New collaboration</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="name">Name</label>
                        <input
                            className={styles.input}
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>
                    {formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="type">Type</label>
                        <input
                            className={styles.input}
                            id="type"
                            name="type"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.type}
                        />
                    </div>
                    {formik.errors.type ? <div className={styles.error}>{formik.errors.type}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="description">Description</label>
                        <input
                            className={styles.input}
                            id="description"
                            name="description"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                    </div>
                    {formik.errors.description ? <div className={styles.error}>{formik.errors.description}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="website">Website address</label>
                        <input
                            className={styles.input}
                            id="website"
                            name="website"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.website}
                        />
                    </div>
                    {formik.errors.website ? <div className={styles.error}>{formik.errors.website}</div> : null}


                    <button className={styles.button} type="submit">Submit</button>
                    <button className={styles.button}><a href="/home">Cancel</a></button>

                </form>
            </main>
        </div>
    );
};

