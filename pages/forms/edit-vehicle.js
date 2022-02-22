import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from 'react';
import { useFormik } from 'formik';
import useError from "../../context/error/error";

export default function EditVehicleForm({onCancel, data}) {
    const [selected, setSelected] = useState(data)

    const {setErrorMessage, setErrorVisible} = useError();

    const createNewEntry = async (values) => {
        const res = await fetch('/api/new-vehicle', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    };

    const saveChanges = async (values) => {
        const res = await fetch('/api/edit-vehicle', {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await res.json()
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

        if (!values.seats) {
            errors.seats = 'Required';
        }

        if (!values.consumption) {
            errors.consumption = 'Required';
        }

        if (!values.transmission) {
            errors.transmission = 'Required';
        }

        if (!values.fuel) {
            errors.fuel = 'Required';
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
            id: selected && selected.id ? selected.id : '',
            plates: selected && selected.plates ? selected.plates : '',
            make: selected && selected.make ? selected.make : '',
            model: selected && selected.model ? selected.model : '',
            year: selected && selected.year ? selected.year : '',
            seats: selected && selected.seats ? selected.seats : '',
            consumption: selected && selected.consumption ? selected.consumption : '',
            transmission: selected && selected.transmission ? selected.transmission : '',
            fuel: selected && selected.fuel ? selected.fuel : '',
            price: selected && selected.price ? selected.price : '',
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
                <h1 className={styles.titles}>Podaci o vozilu</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="plates">Registracija</label>
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
                        <label htmlFor="make">Marka</label>
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
                        <label htmlFor="year">Godina proizvodnje</label>
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
                        <label htmlFor="seats">Broj sjedala</label>
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
                        <label htmlFor="consumption">Potrošnja goriva</label>
                        <input
                            className={styles.input}
                            id="consumption"
                            name="consumption"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.consumption}
                        />
                    </div>
                    {formik.errors.consumption ? <div className={styles.error}>{formik.errors.consumption}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="transmission">Vrsta mjenjača</label>
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
                        <label htmlFor="fuel">Gorivo</label>
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
                        <label htmlFor="price">Cijena po danu</label>
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

                    <button className={styles.button} type="submit">OK</button>
                    <button className={styles.buttonCancel} onClick={() => onCancel()}>Odustani</button>

                </form>
            </main>
        </div>
    );
};

