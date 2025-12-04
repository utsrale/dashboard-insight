import { useDashboard } from '@/lib/contexts/DashboardContext';

export function useProducts(userId: string | null) {
    const { products, loading, addProduct, updateProduct, deleteProduct } = useDashboard();

    console.log('[useProducts] Products count:', products.length, 'Loading:', loading);

    return { products, loading, error: null, addProduct, updateProduct, deleteProduct };
}
