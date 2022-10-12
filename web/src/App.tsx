import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Repo from './components/repo.component';
import RepoList from './components/repoList.component';
import { useEffect, useState } from 'react';

export function App() {
  const [repo, setRepo] = useState([]);
  const url = 'http://localhost:4000/repos';
  const getRepos = async () => {
    const response = await fetch(url);
    const result = await response.json();
    setRepo(result);
  };

  useEffect(() => {
    getRepos();
  }, []);

  console.log('repolist', repo);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/repo" element={<Repo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
