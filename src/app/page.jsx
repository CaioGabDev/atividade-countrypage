"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Page() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://api.sampleapis.com/countries/countries/${id}`);
        setCountry(response.data);
      } catch (error) {
        console.error("Erro ao buscar país:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!country) return <div>País não encontrado.</div>;

  const defaultFlag = "https://via.placeholder.com/1280x720.png?text=Flag+Not+Available";

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <img 
          src={country.media.flag || defaultFlag} 
          alt={`Bandeira de ${country.name}`} 
          className="w-full h-48 object-cover rounded-t-lg" 
        />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">{country.name}</h1>
        <p className="text-gray-600">Capital: {country.capital}</p>
        <p className="text-gray-600">Moeda: {country.currency}</p>
        <p className="text-gray-600">Telefone: +{country.phone}</p>
        <p className="text-gray-600">População: {country.population ? country.population.toLocaleString() : 'N/A'}</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">Voltar para a lista de países</Link>
      </div>
    </div>
  );
}
