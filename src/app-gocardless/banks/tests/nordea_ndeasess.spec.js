import NORDEA_NDEASESS from '../nordea_ndeasess.js';
import { mockTransactions } from '../../services/tests/fixtures.js';

describe('NORDEA_NDEASESS', () => {
  describe('#normalizeTransaction', () => {
    it('Removes the debit card prefix from string', () => {
      const transaction = {
        ...mockTransactions.transactions.booked[0],
        remittanceInformationUnstructured: 'Kortköp 240115 Systembolaget',
        bookingDate: '2024-01-15',
      };

      const normalizedTransaction = NORDEA_NDEASESS.normalizeTransaction(
        transaction,
        true,
      );

      expect(normalizedTransaction.remittanceInformationUnstructured).toEqual(
        'Systembolaget',
      );
    });

    it('Removes the reserved prefix from string', () => {
      const transaction = {
        ...mockTransactions.transactions.booked[0],
        remittanceInformationUnstructured: 'Reservation Kortköp Systembolaget',
        bookingDate: '2024-01-15',
      };

      const normalizedTransaction = NORDEA_NDEASESS.normalizeTransaction(
        transaction,
        true,
      );

      expect(normalizedTransaction.remittanceInformationUnstructured).toEqual(
        'Systembolaget',
      );
    });

    it('Handles empty value', () => {
      const transaction = {
        ...mockTransactions.transactions.booked[0],
        bookingDate: '2024-01-15',
      };

      const normalizedTransaction = NORDEA_NDEASESS.normalizeTransaction(
        transaction,
        true,
      );

      expect(normalizedTransaction.remittanceInformationUnstructured).toEqual(
        undefined,
      );
    });
  });
});
