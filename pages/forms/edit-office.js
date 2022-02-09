import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';

export default function EditOfficeForm({onCancel, data}) {
    const [selected, setSelected] = useState(data)

    const createNewEntry = async (values) => {
        const res = await fetch('/api/new-office', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    };

    const saveChanges = async (values) => {
        const res = await fetch('/api/edit-office', {
            method: 'PUT',
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
            id: selected.id ? selected.id : '',
            address: selected.address ? selected.address : '',
            phoneNumber: selected.phoneNumber ? selected.phoneNumber : '',
            workHours: selected.workHours ? selected.workHours : ''
        },
        validate,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            if (selected !== 'w') {
                saveChanges(values);
                if(confirm("Uspješno ste uredili zapis o poslovnici!")){
                    window.location.reload();
                }
            } else {
                createNewEntry(values);
                if(confirm("Uspješno ste dodali novu poslovnicu!")){
                    window.location.reload();
                }
            }
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
                <h1 className="">Podatci poslovnice</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="address">Adresa</label>
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
                        <label htmlFor="phoneNumber">Broj telefona</label>
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
                        <label htmlFor="workHours">Radno vrijeme</label>
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


                    <button className={styles.button} type="submit">OK</button>
                    <button className={styles.button} onClick={() => onCancel()}>Odustani</button>

                </form>
            </main>
        </div>
    );
};