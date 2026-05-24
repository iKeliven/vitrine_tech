import styles from './Loading.module.css'
import Subtitle from '../Subtitle/Subtitle'
export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <Subtitle size="md" variant="primary">
                Carregando...
            </Subtitle>
        </div>
    )
}