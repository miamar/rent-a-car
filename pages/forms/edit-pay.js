import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import useError from "../../context/error/error";

export default function EditWorkerPay({onCancel, data}) {
    console.log(data)
    const [selected, setSelected] = useState(data)
    const [finalPay, setFinalPay] = useState(0)

    const {setErrorMessage, setErrorVisible} = useError();

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

        return errors;
    };

    console.log(selected)

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            id: selected && selected.id ? selected.id : '',
            firstName: selected && selected.firstName ? selected.firstName : '',
            lastName: selected && selected.lastName ? selected.lastName : '',
            basePay: selected && selected.basePay ? selected.basePay : 0,
            afterHours: selected && selected.afterHours ? selected.afterHours : 0,
            workDays: selected && selected.workDays ? selected.workDays : 0,
            distToJob: selected && selected.distToJob ? selected.distToJob : 0,
            yearsInCo: selected && selected.yearsInCo ? selected.yearsInCo : 0,
            bonus: selected && selected.bonus ? selected.bonus : false,
            finalPay: selected && selected.finalPay ? selected.finalPay : 0
        },
        validate,
        onSubmit: values => {
            saveChanges(values).then(() => {
                setErrorMessage("Uspjesno napravljeno")
                setErrorVisible(true)
                setTimeout(() => {window.location.reload()}, 1000);
            }).catch(e => {
                setErrorMessage(e.message)
                setErrorVisible(true)
            });
        }
    });

    useEffect(() => {
        managePay()
    }, [formik.values && JSON.stringify(formik.values)])

    function managePay() {
        let finalPay = 0

        let base = formik.values.basePay
        let afterHours = formik.values.afterHours
        let workDays = formik.values.workDays
        let distanceToJob = formik.values.distToJob
        let yearsInCo = formik.values.yearsInCo
        let yearsBonus = 0
        let stimulation = formik.values.bonus
        let stimulationBonus = 0

        let food = workDays * 50
        let transport = 2 * distanceToJob * workDays
        afterHours = 40 * afterHours

        if (stimulation) {
            stimulationBonus = 500
        }
        if (yearsInCo > 0) {
            yearsBonus = yearsInCo / 10
        }

        finalPay = base + (base * yearsBonus) + stimulationBonus + food + transport + afterHours

        setFinalPay(finalPay)
        formik.values.finalPay = finalPay
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Vertigo</title>
                <meta name="description" content="Rent a car" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.titles}>Plaća zaposlenika</h1>

                <form onSubmit={formik.handleSubmit}>

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
                        <label htmlFor="basePay">Bazna plaća</label>
                        <input
                            className={styles.input}
                            id="basePay"
                            name="basePay"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.basePay}
                        />
                    </div>

                    <div className={styles.forms}>
                        <label htmlFor="afterHours">Prekovremeni sati</label>
                        <input
                            className={styles.input}
                            id="afterHours"
                            name="afterHours"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.afterHours}
                        />
                    </div>
                    {formik.errors.afterHours ? <div className={styles.error}>{formik.errors.afterHours}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="workDays">Broj radnih dana</label>
                        <input
                            className={styles.input}
                            id="workDays"
                            name="workDays"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.workDays}
                        />
                    </div>
                    {formik.errors.workDays ? <div className={styles.error}>{formik.errors.workDays}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="distToJob">Broj km do posla</label>
                        <input
                            className={styles.input}
                            id="distToJob"
                            name="distToJob"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.distToJob}
                        />
                    </div>
                    {formik.errors.distToJob ? <div className={styles.error}>{formik.errors.distToJob}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="yearsInCo">Broj godina u firmi</label>
                        <input
                            className={styles.input}
                            id="yearsInCo"
                            name="yearsInCo"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.yearsInCo}
                        />
                    </div>
                    {formik.errors.yearsInCo ? <div className={styles.error}>{formik.errors.yearsInCo}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="bonus">Bonus na plaći</label>
                        <input
                            className={styles.formCheckbox}
                            id="bonus"
                            name="bonus"
                            type="checkbox"
                            onChange={formik.handleChange}
                            value={formik.values.bonus}
                            checked={formik.values.bonus}
                        />
                    </div>
                    {formik.errors.bonus ? <div className={styles.error}>{formik.errors.bonus}</div> : null}

                    <div className={styles.forms}>
                        <label htmlFor="finalPay">Ukupna plaća</label>
                        <input
                            className={styles.input}
                            id="finalPay"
                            name="finalPay"
                            type="text"
                            disabled={true}
                            value={finalPay}
                        />
                    </div>
                    {formik.errors.finalPay ? <div className={styles.error}>{formik.errors.finalPay}</div> : null}

                    <button className={styles.button} type="submit">OK</button>
                    <button className={styles.buttonCancel} onClick={() => onCancel()}>Odustani</button>

                </form>
            </main>
        </div>
    );
};

