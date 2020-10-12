import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import fs from 'fs';
import path from 'path';

import GetTransactionService from '../services/GetTransactionsService';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const getTransactionsService = new GetTransactionService();

  const { transactions, balance } = await getTransactionsService.execute();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const createTransactionService = new CreateTransactionService();

  const { title, type, value, category } = request.body;

  const transaction = await createTransactionService.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const deleteTransactionService = new DeleteTransactionService();

  const transaction_id = request.params.id;

  await deleteTransactionService.execute({ transaction_id });

  return response.json();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    // const importTransactionsService = new ImportTransactionsService();
    // const { filename } = uploadConfig.storage;
    // const csvFilePath = path.resolve(
    //   __dirname,
    //   '..',
    //   '..',
    //   'tmp',
    //   ,
    // );
    // console.log(csvFilePath);
    // const readCSVStream = fs.createReadStream(csvFilePath);
  },
);

export default transactionsRouter;
