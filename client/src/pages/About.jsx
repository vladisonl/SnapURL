import { Link } from "react-router";
import { Github, Mail } from "lucide-react";

export default function About() {
  return (
    <>
      <title>Sobre | Encurtador de URLs — Ciência da Computação</title>
      <meta name="description" content="Projeto acadêmico de encurtador de URLs desenvolvido por estudantes do 7º período de Ciência da Computação, utilizando a stack MERN com Redis e Docker." />
      <meta name="keywords" content="Encurtador de URL, MERN, Projeto Acadêmico, Ciência da Computação, Redis, Docker, MongoDB, React, Node.js" />
      <meta name="author" content="Vladison, Maria, Tomaz e Ingryd" />

      <main className="min-h-screen flex flex-col bg-white">
        <div className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Sobre o Projeto
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Uma solução completa de encurtamento de URLs desenvolvida para fins acadêmicos e aplicações reais
              </p>
            </div>

            <div className="prose prose-lg max-w-none">

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Visão Geral do Projeto
                </h2>
                <p className="text-gray-700 mb-4">
                  Este encurtador de URLs é um projeto acadêmico desenvolvido por estudantes do
                  7º período de Ciência da Computação. Construído com a stack MERN (MongoDB,
                  Express.js, React.js, Node.js, Redis, Docker, TailwindCSS, JWT Auth), o projeto demonstra práticas modernas de
                  desenvolvimento web, incluindo cache com Redis e containerização com Docker.
                </p>
                <p className="text-gray-700">
                  O sistema foi projetado com foco em escalabilidade, segurança e boas práticas
                  de engenharia de software. Servindo como projeto de conclusão de disciplina
                  e portfólio para os desenvolvedores envolvidos.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Funcionalidades
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Funcionalidades Principais
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Encurtamento seguro de URLs com IDs únicos</li>
                      <li>• Geração de QR Code para cada link</li>
                      <li>• Rastreamento de cliques em tempo real</li>
                      <li>• Dashboard com estatísticas completas</li>
                      <li>• Design responsivo para mobile</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Funcionalidades Avançadas
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Autenticação JWT</li>
                      <li>• Cache com Redis para alta performance</li>
                      <li>• Rastreamento de localização por IP</li>
                      <li>• Histórico de acessos</li>
                      <li>• Exclusão segura com backup</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Stack Tecnológica
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Frontend
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• React 19 com hooks modernos</li>
                      <li>• Vite para desenvolvimento rápido</li>
                      <li>• TailwindCSS para estilização</li>
                      <li>• React Query para gerenciamento de estado</li>
                      <li>• React Router v7 para navegação</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Backend
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Node.js com Express</li>
                      <li>• MongoDB para armazenamento de dados</li>
                      <li>• Redis (Upstash) como cache</li>
                      <li>• JWT para autenticação segura</li>
                      <li>• Docker para containerização</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Valor Educacional
                </h2>
                <p className="text-gray-700 mb-4">
                  Este projeto cobre conceitos essenciais do desenvolvimento web moderno:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Desenvolvimento Full-Stack:</strong> Implementação completa da stack MERN</li>
                  <li>• <strong>Segurança:</strong> Autenticação JWT, cookies seguros e validação de entrada</li>
                  <li>• <strong>Banco de Dados:</strong> Modelagem MongoDB com índices e relacionamentos</li>
                  <li>• <strong>Cache:</strong> Redis para redução de latência e escalabilidade</li>
                  <li>• <strong>API REST:</strong> Design e implementação de endpoints RESTful</li>
                  <li>• <strong>Analytics:</strong> Rastreamento de cliques e visualização de dados</li>
                  <li>• <strong>DevOps:</strong> Docker Compose para orquestração de serviços</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  A Equipe
                </h2>
                <p className="text-gray-700 mb-4">
                  Projeto desenvolvido por estudantes do 7º período de Ciência da Computação:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { nome: "Vladison Lucas", papel: "Backend & Banco de Dados & Frontend" },
                    { nome: "Maria", papel: "DevOps" },
                    { nome: "Tomaz", papel: "DevOps" },
                    { nome: "Ingryd", papel: "Frontend" },
                  ].map((membro) => (
                    <div key={membro.nome} className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                      <p className="font-semibold text-indigo-700">{membro.nome}</p>
                      <p className="text-sm text-gray-600">{membro.papel}</p>
                    </div>
                  ))}
                </div>

                <a href="https://github.com/vladisonl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                  <Github className="h-5 w-5 mr-2" />
                  Repositório do Projeto
                </a>
              </div>

              <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Entre em Contato
                </h2>
                <p className="text-gray-700 mb-6">
                  Tem dúvidas sobre o projeto? Quer saber mais sobre a implementação? Fale com a gente!
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Fale Conosco
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}