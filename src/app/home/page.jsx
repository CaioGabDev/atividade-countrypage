import styles from "./Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";

export default function Home() {
    return (    
        <div className={styles.container}>
            <div className={styles.cardCentral}>
                <h1>Países</h1>
                <Image className={styles.avatar}
                    src="/avatar.jpg"
                    alt="Avatar"
                    width={120}
                    height={120}
                    priority 
                />
                <h2>Caio Gabriel Lacerda Silva</h2>
                <h2>Turma: 2TDS1</h2>
                <h2>SENAI Valinhos</h2>
                <h3>Instrutores: Thiago e Marcelo</h3>
                <h4>Minha API permite buscar informações detalhadas sobre países ao redor do mundo, incluindo dados populacionais, 
                    regionais, bandeiras, idiomas, entre outros.</h4>
                <p className={styles.quote}>"Conhecer o mundo é expandir seus horizontes. Cada país tem uma história para contar."</p>
                <div className={styles.buttons}>
                <Link href="/country" prefetch>
                    <Button title="Listagem países" />
                </Link>
                <Link href="/sobreapi" prefetch>
                    <Button title="Acessar minha API" />
                </Link>
                </div>
            </div>
        </div>
    );
}