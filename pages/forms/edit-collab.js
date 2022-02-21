import styles from "../../styles/Home.module.css";
import Head from "next/head";
import React, {useState} from 'react';
import { useFormik } from 'formik';

export default function EditCollabForm({onCancel, data}) {
    const [selected, setSelected] = useState(data)

    const createNewEntry = async (values) => {
        const res = await fetch('/api/new-collab', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    };

    const saveChanges = async (values) => {
        const res = await fetch('/api/edit-collab', {
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
            id: selected && selected.id ? selected.id : '',
            name: selected && selected.name ? selected.name : '',
            type: selected && selected.type ? selected.type : '',
            description: selected && selected.description ? selected.description : '',
            website: selected && selected.website ? selected.website : ''
        },
        validate,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            if (selected !== 'w') {
                saveChanges(values);
                if(confirm("Uspješno ste uredili zapis o vanjskoj suradnji!")){
                    window.location.reload();
                }
            } else {
                createNewEntry(values);
                if(confirm("Uspješno ste dodali novu vanjsku suradnju!")){
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
                <h1 className={styles.titles}>Podaci vanjske suradnje</h1>

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.forms}>
                        <label htmlFor="name">Naziv</label>
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
                        <label htmlFor="type">Vrsta</label>
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
                        <label htmlFor="description">Opis</label>
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
                        <label htmlFor="website">Web stranica</label>
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
                    <button className={styles.button} onClick={() => onCancel()}>Cancel</button>

                </form>
            </main>
        </div>
    );
};

