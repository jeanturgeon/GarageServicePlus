import styles from './uistyles.module.css'

/*
TODO: changer le style du header (de hidden a {styles.header} quand on aura fait la page de connexion
*/

export default function Header() {
    return (
        <header className="hidden">            
        {/* <header className={styles.header}> */}
            Connecté en tant que: Jean Turgeon
            <span className={styles["header-span"]}>Déconnecter</span>
        </header>
    )

}