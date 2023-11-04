import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, addDoc, deleteDoc} from 'firebase/firestore';
import { useEffect, useState } from "react";
function App() {

  const firebaseConfig = initializeApp({
    apiKey: "AIzaSyC0C-ca6C-9_Fm2cKBpsm12klxYSkwunq4",
    authDomain: "project-movies-377f3.firebaseapp.com",
    projectId: "project-movies-377f3",
  });

  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [diretor, setDiretor] = useState('');
  const [estudio, setEstudio] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [movies, setMovies] = useState([]);

  const db = getFirestore(firebaseConfig);
  const moviesColecctionRef = collection(db, 'movies');

  useEffect(() => {
    const getMovies = async () => {
      const data = await getDocs(moviesColecctionRef);
      setMovies(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getMovies();
  })

  async function addMovies() {
    const movie = addDoc(moviesColecctionRef, {
      nome, ano, diretor, estudio, plataforma
    });
    alert('Cadastro efetuado com sucesso!!!')
  }

  async function deleteMovies(id) {
    const movieDoc = doc(db, 'movies', id);
    deleteDoc(movieDoc);
  }

  return (
    <>
      <div>
        <div>
          <h1 style={{fontFamily: 'monospace', textAlign: 'center'}}>Cadastro de filmes no banco de dados (FIREBASE)</h1>
          <label htmlFor="nome"> Nome do filme: </label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
          <label htmlFor="ano"> Ano: </label>
          <input type="number" value={ano} onChange={(e) => setAno(e.target.value)}/>
          <label htmlFor="diretor"> Diretor: </label>
          <input type="text" value={diretor} onChange={(e) => setDiretor(e.target.value)}/>
          <label htmlFor="estudio"> Estudio: </label>
          <input type="text" value={estudio} onChange={(e) => setEstudio(e.target.value)}/>
          <label htmlFor="plataforma"> Plataforma: </label>
          <input type="select" value={plataforma} onChange={(e) => setPlataforma(e.target.value)}/>
          <button onClick={addMovies} style={{marginTop: '20px'}}>Cadastrar</button>
        </div>
        <div>
          <h1 style={{fontFamily: 'monospace', textAlign: 'center'}}>Lista de filmes cadastrados</h1>
        </div>
        {movies.map(({id, nome, ano, diretor, estudio, plataforma}) =>
        <div key={id} style={{ border: '1px solid', margin: '1rem 0', padding: '1rem' }}> 
            <p key={nome}>Nome do filme: {nome}</p>
            <p key={ano}>Ano: {ano}</p>
            <p key={diretor}>Diretor(es): {diretor}</p>
            <p key={estudio}>Estudio: {estudio}</p>
            <p key={plataforma}>Plataformas: {plataforma}</p>
            
            <button style={{marginBot: '20px'}} onClick={() => deleteMovies(id)}>Deletar</button>
        </div>
        )}
      </div>
    </>
  ) 
}

export default App
