import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const findIfTransactionExists = await transactionsRepository.findOne(
      transaction_id,
    );

    if (!findIfTransactionExists) {
      throw new AppError('Transaction not found.', 400);
    }

    await transactionsRepository.delete(transaction_id);

    return;
  }
}

export default DeleteTransactionService;
