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

        if (!values.rentedFrom) {
            errors.rentedFrom = 'Required';
        }

        if (!values.rentedUntil) {
            errors.rentedUntil = 'Required';
        }

        // dates
        let dateRentedFrom = new Date(values.rentedFrom)
        dateRentedFrom = dateRentedFrom.getTime()
        let dateRentedUntil = new Date(values.rentedUntil)
        dateRentedUntil = dateRentedUntil.getTime()

        if (dateRentedFrom > dateRentedUntil) {
            errors.rentedFrom = 'Datum "od" mora biti prije datuma "do"';
            errors.rentedUntil = 'Datum "do" mora biti nakon datuma "od"';
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
            rentedUntil: selected.rentedUntil ? selected.rentedUntil.substr(0,10) : '',
            openReturn: selected.openReturn ? selected.openReturn : false,
            insurance: selected.insurance ? selected.insurance : false,
            price: selected.price ? selected.id : 0
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

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const calculatePrice = () => {
        const vehiclePricePerDay = 100

        let dateUntil = new Date(formik.values.rentedUntil).getTime()
        let dateFrom = new Date(formik.values.rentedFrom).getTime()
        let diff = dateUntil - dateFrom
        let diffInH = diff  / 3600000
        let diffInDays = diffInH / 24

        let premiumInsurance = 0
        let openReturn = 0
        let discount = 1

        if (diffInDays > 7) {
            discount = 0.9
        }

        if (formik.values.insurance) {
            premiumInsurance = 300
        }
        if (formik.values.openReturn) {
            openReturn = 100
        }

        formik.values.price = diffInDays * (vehiclePricePerDay * discount) + premiumInsurance + openReturn
    };


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
                            min={disablePastDate()}
                            onChange={formik.handleChange}
                            value={formik.values.rentedFrom}
                        />
                    </div>
                    {formik.errors.rentedFrom ? <div className={styles.error}>{formik.errors.rentedFrom}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="rentedUntil">Iznajmljeno do</label>
                        <input
                            className={styles.input}
                            id="rentedUntil"
                            name="rentedUntil"
                            type="date"
                            min={disablePastDate()}
                            onChange={formik.handleChange}
                            value={formik.values.rentedUntil}
                        />
                    </div>
                    {formik.errors.rentedUntil ? <div className={styles.error}>{formik.errors.rentedUntil}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="openReturn">Otvoreni povratak</label>
                        <input
                            className={styles.input}
                            id="openReturn"
                            name="openReturn"
                            type="checkbox"
                            onChange={formik.handleChange}
                            value={formik.values.openReturn}
                        />
                    </div>
                    {formik.errors.openReturn ? <div className={styles.error}>{formik.errors.openReturn}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="insurance">Dodatno osiguranje</label>
                        <input
                            className={styles.input}
                            id="insurance"
                            name="insurance"
                            type="checkbox"
                            onChange={formik.handleChange}
                            value={formik.values.insurance}
                        />
                    </div>
                    {formik.errors.insurance ? <div className={styles.error}>{formik.errors.insurance}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="price">Cijena najma</label>
                        <input
                            className={styles.input}
                            id="price"
                            name="price"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            disabled="disabled"
                        />
                        <a onClick={calculatePrice()} href={"#"} className={styles.linkie}>Izračunaj</a>
                    </div>
                    {formik.errors.price ? <div className={styles.error}>{formik.errors.price}</div> : null}


                    <button className={styles.button} type="submit">OK</button>
                    <button className={styles.button} onClick={() => onCancel()}>Odustani</button>

                </form>
            </main>
        </div>
    );
};