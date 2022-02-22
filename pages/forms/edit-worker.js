import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from 'react';
import { useFormik } from 'formik';
import useError from "../../context/error/error";

export default function EditWorkerForm({onCancel, data}) {
    console.log(data)
    const [selected, setSelected] = useState(data)

    const {setErrorMessage, setErrorVisible} = useError();

    const createNewEntry = async (values) => {
        const res = await fetch('/api/new-worker', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    };

    const saveChanges = async (values) => {
        const res = await fetch('/api/edit-worker', {
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

        if (!values.username) {
            errors.username = 'Required';
        } else if (values.username.length < 8) {
            errors.username = 'Must be 8 characters or more';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.oib) {
            errors.oib = 'Required';
        } else if (values.oib.length !== 11) {
            errors.oib = 'OIB must have 11 numbers'
        }

        if (!values.firstName) {
            errors.firstName = 'Required';
        }

        if (!values.lastName) {
            errors.lastName = 'Required';
        }

        if (!values.address) {
            errors.address = 'Required';
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
            id: selected && selected.id ? selected.id : '',
            role: selected && selected.role ? selected.role : '',
            username: selected && selected.username ? selected.username : '',
            email: selected && selected.email ? selected.email : '',
            password: selected && selected.password ? selected.password : '',
            firstName: selected && selected.firstName ? selected.firstName : '',
            lastName: selected && selected.lastName ? selected.lastName : '',
            oib: selected && selected.oib ? selected.oib : '',
            address: selected && selected.address ? selected.address : '',
            phoneNumber: selected && selected.phoneNumber ? selected.phoneNumber : '',
            dateOfBirth: selected && selected.dateOfBirth ? selected.dateOfBirth.substr(0,10) : '',
            basePay: selected && selected.basePay ? selected.basePay : ''
        },
        validate,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            if (selected !== 'w') {
                saveChanges(values).then(r => {
                    setErrorMessage("Uspjesno napravljeno")
                    setErrorVisible(true)
                    setTimeout(() => {window.location.reload()}, 1000);
                }).catch(e => {
                    setErrorMessage(e.message)
                    setErrorVisible(true)
                });
            } else {
                createNewEntry(values).then(r => {
                    setErrorMessage("Uspjesno napravljeno")
                    setErrorVisible(true)
                    setTimeout(() => {window.location.reload()}, 1000);
                }).catch(e => {
                    setErrorMessage(e.message)
                    setErrorVisible(true)
                });
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
                <h1 className={styles.titles}>Podaci o zaposleniku</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="username">Korisničko ime</label>
                        <input
                            className={styles.input}
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                    </div>
                    {formik.errors.username ? <div className={styles.error}>{formik.errors.username}</div> : null}

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
                        <label htmlFor="firstName">Ime</label>
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
                        <label htmlFor="lastName">Prezime</label>
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
                        <label htmlFor="phoneNumber">Broj mobitela</label>
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
                        <label htmlFor="dateOfBirth">Datum rođenja</label>
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

                    <div className={styles.forms}>
                        <label htmlFor="basePay">Plaća</label>
                        <input
                            className={styles.input}
                            id="basePay"
                            name="basePay"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.basePay}
                        />
                    </div>

                    <button className={styles.button} type="submit">OK</button>
                    <button className={styles.buttonCancel} onClick={() => onCancel()}>Odustani</button>

                </form>
            </main>
        </div>
    );
};

