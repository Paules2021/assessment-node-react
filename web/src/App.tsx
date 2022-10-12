import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Repo from './components/repo.component';
import RepoList from './components/repoList.component';
import { useEffect, useState } from 'react';

export function App() {
  const [repos, setRepos] = useState([]);
  const [isError, setIsError] = useState(false);

  const url = 'http://localhost:4000/repos';

  const getRepos = async () => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const result = await response.json();
        setRepos(result.data);
      } else {
        throw new Error('error');
      }
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  console.log('repolist', repos);

  return (
    <div className="App">
      {!isError ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RepoList repos={repos} />} />
            <Route path="/repo" element={<Repo />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div>Can not connet to database!Please Try Agian!</div>
      )}
    </div>
  );
}
