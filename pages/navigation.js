import styles from "../styles/Home.module.css";
import Link from "next/link";
import useAuth from "../context/auth/login";
import {useFormik} from "formik";

export default function Navigation(props) {
    const {logout} = useAuth()

    const formik = useFormik({
        onSubmit: () => {
            logout()
        },
    });

    return (

            <div className={styles.navigation}>

                <Link href="/home">
                    <a className={styles.navigationElements}>
                        Početna
                    </a>
                </Link>

                <Link href="/vehicle">
                    <a className={styles.navigationElements}>
                        Vozila
                    </a>
                </Link>

                <Link href="/worker">
                    <a className={styles.navigationElements}>
                        Zaposlenici
                    </a>
                </Link>

                <Link href="/client">
                    <a className={styles.navigationElements}>
                        Klijenti
                    </a>
                </Link>

                <Link href="/office">
                    <a className={styles.navigationElements}>
                        Poslovnice
                    </a>
                </Link>

                <Link href="/collab">
                    <a className={styles.navigationElements}>
                        Vanjska suradnja
                    </a>
                </Link>

                <Link href="/contract">
                    <a className={styles.navigationElements}>
                        Iznajmljivanje
                    </a>
                </Link>

                <form onSubmit={formik.handleSubmit}>
                    <button className={styles.navButton} type="submit">Odjava</button>
                </form>


            </div>
    )
}