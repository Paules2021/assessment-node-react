import './style.css';

const RepoList = ({ repos }) => {
  //display repos in reverse chronological order by creation date
  const orderedRepos = repos.sort((x, y) => {
    return new Date(y.created_at).getTime() - new Date(x.created_at).getTime();
  });

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
          {orderedRepos.map((repo) => {
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
