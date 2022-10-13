import './style.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultLanguage = 'Select Language';

const RepoList = ({ repos }) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  //display repos in reverse chronological order by creation date
  const orderedRepos = repos.sort((x, y) => {
    return new Date(y.created_at).getTime() - new Date(x.created_at).getTime();
  });

  //create arry for unique languge
  const languages = [];
  for (const item of repos) {
    languages.push(item.language);
  }
  const uniqueLanguageList = [...new Set(languages)];
  // console.log('uniqeLanguage', uniqueLanguageList);

  useEffect(() => {
    // Filter list by language type
    const list = () => {
      if (selectedLanguage !== defaultLanguage) {
        const newList = orderedRepos.filter(
          (e) => e.language === `${selectedLanguage}`
        );
        setFilteredData(newList);
      } else {
        setFilteredData(orderedRepos);
      }
    };
    list();
  }, [orderedRepos, selectedLanguage]);

  const handleOnClick = (id) => {
    navigate(`/repo/${id}`, { replace: true });
  };

  return (
    <div className="repos_list">
      <div className="repos_select">
        <span>Select Language Type: </span>
        <select onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value={defaultLanguage}>{defaultLanguage}</option>
          {uniqueLanguageList.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Repository</th>
            <th>Description</th>
            <th>Language</th>
            <th>Forks Count</th>
            <th>Creation Date</th>
          </tr>
          {filteredData.map((repo) => {
            const { id, name, description, language, forks_count, created_at } =
              repo;
            return (
              <tr
                className="repos_item"
                key={id}
                onClick={() => handleOnClick(id)}
              >
                <td>{name}</td>
                <td>{description === null ? <span> - </span> : description}</td>
                <td>{language}</td>
                <td>{forks_count}</td>
                <td>{created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RepoList;
