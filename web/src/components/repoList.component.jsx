import './style.css';

const RepoList = ({ repos }) => {
  return (
    <div className="repos_list">
      <table>
        <tbody>
          <tr>
            <th>Repository</th>
            <th>Description</th>
            <th>Language</th>
            <th>Corks count</th>
          </tr>
          {repos.map((repo) => {
            const { id, name, description, language, forks_count } = repo;
            return (
              <tr className="repos_item" key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>{language}</td>
                <td>{forks_count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RepoList;
