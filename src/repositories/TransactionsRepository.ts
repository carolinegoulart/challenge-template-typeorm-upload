import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    var income = 0;
    var outcome = 0;

    transactions.forEach(transaction => {
      transaction.type === 'income'
        ? (income += transaction.value)
        : (outcome += transaction.value);
    });

    var total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
