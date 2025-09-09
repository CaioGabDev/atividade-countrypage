"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Country.module.css";

const PAGE_SIZE_OPTIONS = ["5", "10", "20"];

export default function Paises() {
  const [data, setData] = useState({
    paises: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    pais: null,
    loading: false,
  });

  const [imageLoading, setImageLoading] = useState({});

const handleImageLoad = (paisId) => {
  setImageLoading(prev => ({...prev, [paisId]: false}));
};

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await axios.get(
          "https://api.sampleapis.com/countries/countries"
        );
        const paisesOrdenados = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setData((d) => ({
          ...d,
          paises: paisesOrdenados,
          loading: false,
          current: 1,
        }));
      } catch (error) {
        toast.error("Erro ao carregar países");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchPaises();
  }, []);

  const openModal = (pais) => {
    setModalInfo({ visible: true, pais, loading: false });
  };

  const closeModal = () => {
    setModalInfo({ visible: false, pais: null, loading: false });
  };

  const paginatedPaises = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.paises.slice(start, start + data.pageSize);
  };

  const defaultFlag = "/default-flag.png";

  return (
    <div className={styles.container}>
      <div className={styles.bloco}>
        <h1>Lista de Países</h1>

        <Pagination
          className={styles.pagination}
          current={data.current}
          pageSize={data.pageSize}
          total={data.paises.length}
          onChange={(page, size) =>
            setData((d) => ({ ...d, current: page, pageSize: size }))
          }
          showSizeChanger
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        />

        {data.loading ? (
          <Image
            src="/images/loading.gif"
            width={300}
            height={200}
            alt="Loading"
          />
        ) : (
          <div className={styles.cardsContainer}>
            {paginatedPaises().map((pais) => (
  <Card
    key={pais.id}
    className={styles.card}
    hoverable
    onClick={() => openModal(pais)}
    cover={
      <>
        {imageLoading[pais.id] !== false && (
          <div style={{ position: 'absolute', width: '100%', height: '140px' }}>
            <Skeleton.Image 
              active 
              style={{ 
                width: '100%', 
                height: '140px',
                borderRadius: '8px 8px 0 0'
              }} 
            />
          </div>
        )}
        <img
          alt={pais.name}
          src={pais.media?.flag || defaultFlag}
          width={220}
          height={140}
          style={{
            objectFit: "cover",
            background: "#f5f5f5",
            borderRadius: '8px 8px 0 0',
            opacity: imageLoading[pais.id] !== false ? 0 : 1,
            transition: 'opacity 0.3s'
          }}
          onLoad={() => handleImageLoad(pais.id)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultFlag;
            handleImageLoad(pais.id);
          }}
        />
      </>
    }
  >
    <Card.Meta
      title={pais.name}
      description={`Capital: ${pais.capital || "N/A"}`}
    />
  </Card>
))}
          </div>
        )}
      </div>

      <Modal
        title={`Detalhes de ${modalInfo.pais?.name}`}
        open={modalInfo.visible}
        onCancel={closeModal}
        onOk={closeModal}
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.pais ? (
          <div className={styles.avaliacaoInfo}>
            <p>
              <strong>Nome:</strong> {modalInfo.pais.name}
            </p>
            <p>
              <strong>Capital:</strong> {modalInfo.pais.capital || "N/A"}
            </p>
            <p>
              <strong>Moeda:</strong> {modalInfo.pais.currency || "N/A"}
            </p>
            <p>
              <strong>Telefone:</strong> +{modalInfo.pais.phone || "N/A"}
            </p>
            <p>
              <strong>População:</strong>{" "}
              {modalInfo.pais.population
                ? modalInfo.pais.population.toLocaleString()
                : "N/A"}
            </p>
            <p>
  <strong>Bandeira:</strong>
</p>
{imageLoading[modalInfo.pais?.id] !== false && (
  <Skeleton.Image 
    active 
    style={{ 
      width: '220px', 
      height: '140px',
      borderRadius: '8px'
    }} 
  />
)}
<img
  alt={modalInfo.pais.name}
  src={modalInfo.pais.media?.flag || defaultFlag}
  width={220}
  height={140}
  style={{
    objectFit: "cover",
    background: "#f5f5f5",
    borderRadius: "8px",
    opacity: imageLoading[modalInfo.pais?.id] !== false ? 0 : 1,
    transition: 'opacity 0.3s'
  }}
  onLoad={() => handleImageLoad(modalInfo.pais.id)}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = defaultFlag;
    handleImageLoad(modalInfo.pais.id);
  }}
/>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Detalhes não disponíveis.</p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}
