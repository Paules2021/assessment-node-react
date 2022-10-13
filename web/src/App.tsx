import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Repo from './components/repo.component';
import RepoList from './components/repoList.component';
import { useEffect, useState } from 'react';

export function App() {
  const [repos, setRepos] = useState([]);
  const [errorValue, setErrorValue] = useState(false);

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
      setErrorValue(true);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  console.log('repolist', repos);

  const reload = () => window.location.reload();

  return (
    <div className="App">
      {!errorValue ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RepoList repos={repos} />} />
            <Route path="/repo/:id" element={<Repo repos={repos} />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <span>
          <div>Can not connet to database!Please Try Agian!</div>
          <button onClick={reload}>Reload</button>
        </span>
      )}
    </div>
  );
}
