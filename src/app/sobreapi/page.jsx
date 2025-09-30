import styles from "./Sobre.module.css";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";

export default function Sobre() {
    return (    
        <div className={styles.container}>
            <div className={styles.cardCentral}>
                
                {/* Título Focado na Documentação */}
                <h1>Documentação da API: Países</h1>
                
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
                
                {/* Descrição Principal da API */}
                <h4>Esta página detalha a **API de Países** utilizada no projeto. O recurso permite buscar informações geográficas e demográficas, como capital, moeda, população e bandeiras, servindo como base para a aplicação.</h4>
                
                <p className={styles.quote}>"Conhecer o mundo é expandir seus horizontes. Cada país tem uma história para contar."</p>

                {/* --- SEÇÃO DE DOCUMENTAÇÃO TÉCNICA DA API --- */}
                <div className={styles.apiDetails}>
                    <hr />
                    <h3>Detalhes Técnicos da Conexão</h3>
                    
                    <p>
                        <strong>Nome da API escolhida:</strong> <br/>
                        Sample APIs - Countries
                    </p>
                    
                    <p>
                        <strong>Link externo para a documentação oficial:</strong> <br/>
                        <a href="https://api.sampleapis.com/" target="_blank" rel="noopener noreferrer">
                            Sample APIs (Página Principal)
                        </a>
                    </p>
                    
                    <p>
                        <strong>URL base usada para o axios/fetch:</strong> <br/>
                        <code>https://api.sampleapis.com</code>
                    </p>
                    
                    <p>
                        <strong>Endpoint escolhido para buscar os dados:</strong> <br/>
                        <code>/countries</code>
                    </p>
                    
                    <p>
                        <strong>Atributos recebidos na resposta da API:</strong> <br/>
                        `id`, `name`, **`flag`** (Bandeira), **`capital`** (Capital), **`currency`** (Moeda), **`phone`** (Telefone/Código), **`population`** (População)
                    </p>
                    
                    <p>
                        <strong>Descrição breve da API:</strong> <br/>
                        Recurso aberto (sem autenticação) que fornece dados geográficos e demográficos de países para fins de aprendizado e desenvolvimento.
                    </p>
                    
                    <p>
                        <strong>Rotas e Métodos/Verbos HTTP usados ou suportados:</strong> <br/>
                        &bull; **GET /countries**: Retorna a lista completa de todos os países.
                        <br/>&bull; **GET /countries/id**: Retorna os detalhes de um país específico (ex.: `/countries/1`).
                    </p>
                </div>
                {/* ------------------------------------------- */}

                <Link href="/country" prefetch>
                    <Button title="Acessar Aplicação de Países" />
                </Link>
            </div>
        </div>
    );
}