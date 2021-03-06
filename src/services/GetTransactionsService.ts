import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionService {
  public async execute(): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.find();

    const balance = await transactionsRepository.getBalance();

    return { transactions, balance };
  }
}

export default GetTransactionService;
