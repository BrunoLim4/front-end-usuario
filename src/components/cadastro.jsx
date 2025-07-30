// frontend-pais/src/components/cadastro.jsx

import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import './cadastro.css';
// Caminho ajustado para a imagem, supondo que está em /public/img
import racingLogo from '/img/racing_rodape.png'; // Recomendo usar o logo principal aqui, 'racing_rodape.png' parece ser para o rodapé.

// CORREÇÃO: Define a URL base da API usando a mesma variável de ambiente do backend
// que já está configurada na Vercel (VITE_BACKEND_URL).
// O valor padrão 'http://localhost:3001' é para o seu ambiente de desenvolvimento local do backend.
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';


export default function Cadastro() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    genero: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    nomeMae: '',
    contato1: '',
    contato2: '',
    categoria: '', // Será preenchida automaticamente
    statusPagamento: 'Pendente', // Adicionei o status de pagamento padrão aqui para garantir que vá para o backend
  });
  const [fotoFile, setFotoFile] = useState(null); // Estado separado para o arquivo da foto
  const [fotoPreview, setFotoPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false); // Adicionado estado de loading
  const [calculatedCategory, setCalculatedCategory] = useState(''); // Estado para exibir a categoria calculada


  // Função para calcular a categoria com base no ano de nascimento
  const calculateCategory = (birthDateString, genero) => {
    if (!birthDateString) return '';

    // Se o gênero for feminino, a categoria é "Feminina" independente da idade
    if (genero === 'Feminino') {
        return 'Feminina';
    }

    const birthYear = new Date(birthDateString).getFullYear();
    let category = '';

    if (birthYear >= 2010 && birthYear <= 2013) {
      category = 'Sub14';
    } else if (birthYear >= 2014 && birthYear <= 2016) {
      category = 'Sub10';
    } else if (birthYear >= 2017 && birthYear <= 2018) {
      category = 'Sub08';
    } else if (birthYear >= 2019 && birthYear <= 2020) {
      category = 'Sub06';
    } else {
      category = 'Fora de Categoria';
    }
    return category;
  };

  // Efeito para atualizar a categoria quando a data de nascimento ou o gênero muda
  useEffect(() => {
    const category = calculateCategory(formData.dataNascimento, formData.genero);
    setCalculatedCategory(category);
    setFormData((prevData) => ({
      ...prevData,
      categoria: category, // Atualiza o formData com a categoria calculada
    }));
  }, [formData.dataNascimento, formData.genero]); // Adicionar formData.genero como dependência

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file); // Salva o arquivo em um estado separado
      setFotoPreview(URL.createObjectURL(file));
    } else {
      setFotoFile(null);
      setFotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true); // Ativa o estado de loading

    // Validação frontend adicional antes de enviar
    if (!formData.nomeCompleto || !formData.dataNascimento || !formData.genero ||
        !formData.nomeResponsavel || !formData.cpfResponsavel || !formData.nomeMae ||
        !formData.contato1) {
        setMessage('Por favor, preencha todos os campos obrigatórios.');
        setIsError(true);
        setLoading(false);
        return;
    }

    // Validação da categoria se não for feminino
    if (formData.genero !== 'Feminino' && (calculatedCategory === 'Não Definida' || calculatedCategory === 'Fora de Categoria' || calculatedCategory === '')) {
        setMessage('A data de nascimento está fora das categorias válidas ou não foi informada para o gênero selecionado.');
        setIsError(true);
        setLoading(false);
        return;
    }


    const dataToSend = new FormData();
    for (const key in formData) {
        // Não adicione 'foto' do formData aqui, pois 'fotoFile' é o que contém o File object
        if (key !== 'foto') {
            dataToSend.append(key, formData[key]);
        }
    }
    if (fotoFile) { // Adicione o arquivo de foto do estado 'fotoFile'
        dataToSend.append('foto', fotoFile);
    }
    // Adicione statusPagamento que não está no formulário
    // Já está no formData, então não precisa adicionar separadamente aqui se já estiver lá.
    // dataToSend.append('statusPagamento', formData.statusPagamento); // Se precisar garantir que vai sempre, mesmo que o campo não esteja no form.


    try {
      // CORREÇÃO: A URL completa agora usa API_BASE_URL e o prefixo correto para rotas de pais
      const response = await fetch(`${API_BASE_URL}/api/pais/alunos/cadastro`, {
        method: 'POST',
        // Não defina Content-Type para FormData. O navegador fará isso automaticamente.
        body: dataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar aluno.');
      }

      const result = await response.json();
      console.log('Aluno cadastrado com sucesso:', result);
      setMessage(result.message || 'Aluno cadastrado com sucesso!');
      setIsError(false);

      // Limpar formulário após o envio
      setFormData({
        nomeCompleto: '',
        dataNascimento: '',
        genero: '',
        nomeResponsavel: '',
        cpfResponsavel: '',
        nomeMae: '',
        contato1: '',
        contato2: '',
        categoria: '', // Resetar categoria também
        statusPagamento: 'Pendente',
      });
      setFotoFile(null); // Limpar o estado do arquivo da foto
      setFotoPreview(null);
      setCalculatedCategory(''); // Resetar categoria exibida

    } catch (err) {
      console.error('Erro ao cadastrar aluno:', err);
      setMessage(err.message || 'Ocorreu um erro ao tentar cadastrar o aluno.');
      setIsError(true);
    } finally {
      setLoading(false); // Desativa o estado de loading
    }
  };

  return (
    <div className="registration-container">
      <header className="main-header">
        {/* Caminho ajustado para a imagem */}
        <img src={racingLogo} alt="Racing Logo" className="header-image" />
      </header>

      <h1 className="registration-header-text">
        FUTEBOL COM ALEGRIA, DISCIPLINA E AMIZADE.<br />
        CADASTRE-SE NA ESCOLINHA RACING!
      </h1>

      <form className="registration-form-card" onSubmit={handleSubmit}>
        <h2 className="form-section-title">DADOS DO ALUNO</h2>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="nomeCompleto">NOME COMPLETO DO ALUNO</label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              placeholder="Nome completo do aluno"
              value={formData.nomeCompleto}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-grid two-columns">
          <div className="form-field">
            <label htmlFor="dataNascimento">DATA DE NASCIMENTO DO ALUNO</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="genero">GÊNERO DO ALUNO</label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione o gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="foto">FOTO DO ALUNO</label>
            <label htmlFor="foto" className="photo-upload-box">
              {fotoPreview ? (
                <img src={fotoPreview} alt="Prévia da foto do aluno" className="photo-preview-image" />
              ) : (
                <>
                  <FaUpload />
                  <p>Clique ou arraste a imagem aqui</p>
                </>
              )}
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>
          </div>
        </div>

        <h2 className="form-section-title">DADOS DOS RESPONSÁVEIS</h2>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="nomeResponsavel">NOME COMPLETO DO RESPONSÁVEL</label>
            <input
              type="text"
              id="nomeResponsavel"
              name="nomeResponsavel"
              placeholder="Nome completo do responsável"
              value={formData.nomeResponsavel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="cpfResponsavel">NÚMERO DE CPF DO RESPONSÁVEL</label>
            <input
              type="text"
              id="cpfResponsavel"
              name="cpfResponsavel"
              placeholder="CPF do responsável"
              value={formData.cpfResponsavel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="nomeMae">NOME COMPLETO DA MÃE NO RG</label>
            <input
              type="text"
              id="nomeMae"
              name="nomeMae"
              placeholder="Nome completo da mãe"
              value={formData.nomeMae}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-grid two-columns">
          <div className="form-field">
            <label htmlFor="contato1">NÚMERO PARA CONTATO 1</label>
            <input
              type="tel"
              id="contato1"
              name="contato1"
              placeholder="(XX) XXXXX-XXXX"
              value={formData.contato1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="contato2">NÚMERO PARA CONTATO 2</label>
            <input
              type="tel"
              id="contato2"
              name="contato2"
              placeholder="(XX) XXXXX-XXXX"
              value={formData.contato2}
              onChange={handleChange}
            />
          </div>
        </div>

        {message && (
          <p className={`message ${isError ? 'error-message' : 'success-message'}`}>
            {message}
          </p>
        )}

        <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
        </button>
      </form>

      <footer className="footer">
        {/* Caminho ajustado para a imagem */}
        <img src="/img/racing_rodape.png" alt="foto-rodape" className='foto-Rodape' />
      </footer>
    </div>
  );
}
