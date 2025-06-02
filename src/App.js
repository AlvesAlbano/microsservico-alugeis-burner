// import logo from './logo.svg';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import api from './api';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [aluguéis, setAlugueis] = useState([]);
  const [form, setForm] = useState({
    idUsuario: '',
    idFilme: '',
    inicioAluguel: '',
    devolucaoAluguel: '',
  });
  const [editandoId, setEditandoId] = useState(null);

  // const carregarAlugueis = async () => {
  //   const response = await api.get('/alugueis/todos');
  //   setAlugueis(response.data);
  // };

  const carregarAlugueis = async () => {
    try {
      const response = await api.get('/alugueis/todos');
      setAlugueis(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Nenhum aluguel encontrado');
      } else {
        toast.error('Erro ao carregar os aluguéis');
      }
    }
  };

  useEffect(() => {
    carregarAlugueis();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idUsuario: Number(form.idUsuario),
      idFilme: Number(form.idFilme),
      inicioAluguel: form.inicioAluguel,
      devolucaoAluguel: form.devolucaoAluguel,
    };

    if (editandoId !== null) {
      await api.patch(`/alugueis/editar/${editandoId}`, payload);
    } else {
      await api.post('/alugueis/adicionar', payload);
    }

    setForm({ idUsuario: '', idFilme: '', inicioAluguel: '', devolucaoAluguel: '' });
    setEditandoId(null);
    carregarAlugueis();
  };

  const handleEdit = (aluguel) => {
    setForm({
      idUsuario: aluguel.idUsuario,
      idFilme: aluguel.idFilme,
      inicioAluguel: aluguel.inicioAluguel,
      devolucaoAluguel: aluguel.devolucaoAluguel,
    });
    setEditandoId(aluguel.idAluguel);
  };

  const handleDelete = async (idAluguel) => {
    await api.delete(`/alugueis/devolver/${idAluguel}`);
    carregarAlugueis();
  };

  return (
    <div className="App">
      <h1>Aluguéis de Filmes</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="idUsuario"
          placeholder="ID do Usuário"
          value={form.idUsuario}
          onChange={handleChange}
          required
        />
        <input
          name="idFilme"
          placeholder="ID do Filme"
          value={form.idFilme}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="inicioAluguel"
          value={form.inicioAluguel}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="devolucaoAluguel"
          value={form.devolucaoAluguel}
          onChange={handleChange}
          required
        />
        <button type="submit">{editandoId ? 'Atualizar' : 'Adicionar'}</button>
      </form>

      <h2>Lista de Aluguéis</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Usuário</th>
            <th>ID Filme</th>
            <th>Início</th>
            <th>Devolução</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aluguéis.map((a) => (
            <tr key={a.idAluguel}>
              <td>{a.idAluguel}</td>
              <td>{a.idUsuario}</td>
              <td>{a.idFilme}</td>
              <td>{a.inicioAluguel}</td>
              <td>{a.devolucaoAluguel}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Editar</button>
                <button onClick={() => handleDelete(a.idAluguel)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default App;