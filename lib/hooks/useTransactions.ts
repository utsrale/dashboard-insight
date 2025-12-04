import { useDashboard } from '@/lib/contexts/DashboardContext';

export function useTransactions(userId: string | null) {
    const { transactions, loading, addTransaction } = useDashboard();

    return { transactions, loading, error: null, addTransaction };
}
