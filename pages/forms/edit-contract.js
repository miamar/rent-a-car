import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';

export default function EditContractForm({onCancel, data}) {
    const [selected, setSelected] = useState(data)

    const createNewEntry = async (values) => {
        const res = await fetch('/api/new-contract', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    };

    const saveChanges = async (values) => {
        const res = await fetch('/api/edit-contract', {
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

        if (!values.clientId) {
            errors.clientId = 'Required';
        }

        if (!values.vehicleId) {
            errors.vehicleId = 'Required';
        }

        if (!values.workerId) {
            errors.workerId = 'Required';
        }

        // TODO
        if (values.rentedFrom > values.rentedUntil) {
            errors.rentedFrom = 'This can\'t be.';
            console.log(values.rentedFrom)
        }

        return errors;
    };
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            id: selected.id ? selected.id : '',
            clientId: selected.clientId ? selected.clientId : '',
            vehicleId: selected.vehicleId ? selected.vehicleId : '',
            workerId: selected.workerId ? selected.workerId : '',
            rentedFrom: selected.rentedFrom ? selected.rentedFrom.substr(0,10) : '',
            rentedUntil: selected.rentedUntil ? selected.rentedUntil.substr(0,10) : ''
        },
        validate,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            if (selected !== 'w') {
                saveChanges(values);
                if(confirm("Uspješno ste uredili zapis o ugovoru!")){
                    window.location.reload();
                }
            } else {
                createNewEntry(values);
                if(confirm("Uspješno ste dodali novi ugovor!")){
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
                <h1 className="">Podaci ugovora</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="clientId">Client ID</label>
                        <input
                            className={styles.input}
                            id="clientId"
                            name="clientId"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.clientId}
                        />
                    </div>
                    {formik.errors.clientId ? <div className={styles.error}>{formik.errors.clientId}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="vehicleId">Vehicle ID</label>
                        <input
                            className={styles.input}
                            id="vehicleId"
                            name="vehicleId"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.vehicleId}
                        />
                    </div>
                    {formik.errors.vehicleId ? <div className={styles.error}>{formik.errors.vehicleId}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="workerId">Worker ID</label>
                        <input
                            className={styles.input}
                            id="workerId"
                            name="workerId"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.workerId}
                        />
                    </div>
                    {formik.errors.workerId ? <div className={styles.error}>{formik.errors.workerId}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="rentedFrom">Iznajmljeno od</label>
                        <input
                            className={styles.input}
                            id="rentedFrom"
                            name="rentedFrom"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.rentedFrom}
                        />
                    </div>

                    <div className={styles.forms}>
                        <label htmlFor="rentedUntil">Iznajmljeno do</label>
                        <input
                            className={styles.input}
                            id="rentedUntil"
                            name="rentedUntil"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.rentedUntil}
                        />
                    </div>


                    <button className={styles.button} type="submit">OK</button>
                    <button className={styles.button} onClick={() => onCancel()}>Odustani</button>

                </form>
            </main>
        </div>
    );
};