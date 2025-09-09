"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "./CountryDetail.module.css";

export default function CountryDetail({ params }) {
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const defaultFlag = "/default-flag.png";

  useEffect(() => {
    const fetchPais = async () => {
      try {
        const response = await axios.get(
          "https://api.sampleapis.com/countries/countries"
        );
        const paisEncontrado = response.data.find(
          (p) => p.id.toString() === params.id
        );
        setPais(paisEncontrado);
      } catch (error) {
        toast.error("Erro ao carregar dados do país");
      } finally {
        setLoading(false);
      }
    };

    fetchPais();
  }, [params.id]);

  if (loading) return <Skeleton active />;
  if (!pais) return <div>País não encontrado</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href="/country" className={styles.backButton}>
          ← Voltar para lista
        </Link>
        <h1>{pais.name}</h1>
        <div className={styles.imageContainer}>
          {imageLoading && (
            <div className={styles.skeleton} />
          )}
          <img
            src={pais.media?.flag || defaultFlag}
            alt={`Bandeira de ${pais.name}`}
            className={styles.flag}
            style={{ opacity: imageLoading ? 0 : 1 }}
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultFlag;
              setImageLoading(false);
            }}
          />
        </div>
        <div className={styles.info}>
          <p><strong>Capital:</strong> {pais.capital || "N/A"}</p>
          <p><strong>Moeda:</strong> {pais.currency || "N/A"}</p>
          <p><strong>Telefone:</strong> {pais.phone || "N/A"}</p>
          <p><strong>População:</strong> {pais.population?.toLocaleString() || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}