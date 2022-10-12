import { Router, Request, Response } from 'express';
import axios from 'axios';
import jsonData from '../../data/repos.json';
const url = 'https://api.github.com/users/silverorange/repos';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  // res.json([]);

  const repoData = async () => {
    const response = await axios.get(url);
    const result = response.data
      .concat(jsonData)
      .filter((repo: any) => repo.fork === false);

    return result;
  };

  repoData()
    .then((data) => {
      res.status(200).json({ message: 'Request complete', data });
    })
    .catch((err) => err.message);
});
