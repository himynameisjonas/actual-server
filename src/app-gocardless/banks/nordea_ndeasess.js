import Fallback from './integration-bank.js';

/** @type {import('./bank.interface.js').IBank} */
export default {
  institutionIds: ['NORDEA_NDEASESS'],

  normalizeAccount(account) {
    return Fallback.normalizeAccount(account);
  },

  normalizeTransaction(transaction, _booked) {
    transaction = Fallback.normalizeTransaction(transaction, _booked);

    return {
      ...transaction,
      remittanceInformationUnstructured:
        transaction.remittanceInformationUnstructured?.replace(
          /Kortköp \d{6} /,
          '',
        ),
    };
  },

  sortTransactions(transactions = []) {
    return Fallback.sortTransactions(transactions);
  },

  calculateStartingBalance(sortedTransactions = [], balances = []) {
    return Fallback.calculateStartingBalance(sortedTransactions, balances);
  },
};
