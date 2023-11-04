import React from 'react'
import Titulo from './Titulo'
import Input from './Input'
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, addDoc, deleteDoc} from 'firebase/firestore';
import Button from './Button';


const Form = () => {

  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [diretor, setDiretor] = useState('');
  const [estudio, setEstudio] = useState('');
  const [plataforma, setPlataforma] = useState('');

  const firebaseConfig = initializeApp({
    apiKey: "AIzaSyC0C-ca6C-9_Fm2cKBpsm12klxYSkwunq4",
    authDomain: "project-movies-377f3.firebaseapp.com",
    projectId: "project-movies-377f3",
  });

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

  async function addMovies(e) {
    e.preventDefault();
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
    <form>
      <Titulo titulo='Cadastro de filmes no banco de dados (FIREBASE)'/>
      <Input 
      type='text' 
      label='Nome do filme: ' 
      id='nome' 
      value={nome} 
      onChange={(e) => 
      setNome(e.target.value)}
      />
      <Input 
      type='number' 
      label='Ano: ' 
      id='ano' 
      value={ano} 
      onChange={(e) => 
      setAno(e.target.value)}
      />
      <Input 
      type='text' 
      label='Diretor: ' 
      id='diretor' 
      value={diretor} 
      onChange={(e) => 
      setDiretor(e.target.value)}
      />
      <Input 
      type='text' 
      label='Estudio: ' 
      id='estudio' 
      value={estudio} 
      onChange={(e) => 
      setEstudio(e.target.value)}
      />
      <Input 
      type='text' 
      label='Plataforma: ' 
      id='plataforma' 
      value={plataforma} 
      onChange={(e) => 
      setPlataforma(e.target.value)}
      />
      <Button onClick={addMovies} texto='Cadastrar'/> 
      <Titulo titulo='Lista de filmes cadastrados'/>
      {movies.map(({id, nome, ano, diretor, estudio, plataforma}) =>
      <div key={id} style={{ border: '1px solid', margin: '1rem 0', padding: '1rem' }}>
        <p>Nome do filme: {nome}</p>
        <p>Ano: {ano}</p>
        <p>Diretor: {diretor}</p>
        <p>Estudio: {estudio}</p>
        <p>Plataforma: {plataforma}</p>
        <Button onClick={() => deleteMovies(id)} texto='Deletar'/>
      </div>)}
    </form> 
  )
}

export default Form