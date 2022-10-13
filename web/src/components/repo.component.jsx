import './style.css';
import { Link, useParams } from 'react-router-dom';

const Repo = ({ repos }) => {
  const { id } = useParams();
  const repo = repos.find((elem) => elem.id === Number(id));

  const commitDate = (date) => {
    return new Date(date).toString().split('T')[0];
  };

  if (!repo) {
    return <h1>please wait...</h1>;
  }
  return (
    <div className="repo">
      <h1>{repo.name}</h1>
      <div className="repo_detail">
        <p>The most recent commit date: {commitDate(repo.created_at)}</p>
        <p>Author: {repo.owner.login} </p>
        <p>Message: Not Found </p>
      </div>
      <div className="repo_link">
        <Link to="/">Back</Link>
      </div>
    </div>
  );
};

export default Repo;
