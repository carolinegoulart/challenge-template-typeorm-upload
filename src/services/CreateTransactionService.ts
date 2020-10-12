import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: TransactionDTO): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('Your balance is lower than the value.', 400);
    }

    var categoryDB = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!categoryDB) {
      categoryDB = await categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryDB);
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category: categoryDB,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
