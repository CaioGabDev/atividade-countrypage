import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full">
        {/* Título amigável com emoji */}
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Página não encontrada 😢
        </h2>

        {/* Mensagem explicando o problema */}
        <p className="text-gray-600 mb-8">
          Ops! Parece que a página que você está procurando não existe ou foi movida.
        </p>

        {/* Botão/Link para voltar à página inicial */}
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}