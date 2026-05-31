import { Github, Linkedin, Code } from "lucide-react";
import { Link } from "react-router";

export const DevPromotionCard = () => {
  return (
    <div className="bg-white rounded-md shadow-sm mt-4 p-8 border border-gray-100">
      <div className="flex items-center justify-center mb-4">
        <Code className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Sobre os Desenvolvedores
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Olá! Somos{" "}
        <span className="font-semibold text-indigo-600">Vladison, Maria, Tomaz e Ingryd</span>
        , estudantes do 7º período de Ciência da Computação, apaixonados por
        desenvolvimento web e tecnologia.
      </p>

      {/* Tech Quote */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border-l-4 border-indigo-500">
        <p className="text-gray-700 italic text-center">
          "Código é como humor. Quando você precisa explicar, é porque está ruim."
        </p>
        <p className="text-sm text-gray-500 text-center mt-2">- Cory House</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-3">Tecnologias utilizadas:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "React.js",
            "Node.js",
            "MongoDB",
            "Express.js",
            "Redis",
            "Docker",
            "TailwindCSS",
            "JWT Auth",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/vladisonl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </a>
      </div>

      {/* Contact CTA */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-center">
        <p className="text-sm mb-2">
          Projeto acadêmico — 7º período de Ciência da Computação
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
        >
          Entrem em contato
        </Link>
      </div>
    </div>
  );
};
