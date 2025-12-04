/**
 * Debug Script untuk Test Mock Data
 * 
 * Jalankan script ini di browser console untuk test dan debug mock data
 */

// Function untuk test mock data initialization
function testMockData() {
    console.log('=== MOCK DATA DEBUG TEST ===\n');

    // 1. Check current user
    const currentUser = localStorage.getItem('current_user');
    console.log('1. Current User:', currentUser ? JSON.parse(currentUser) : 'NOT LOGGED IN');

    if (!currentUser) {
        console.warn('⚠️ No user logged in. Please login first.');
        return;
    }

    const user = JSON.parse(currentUser);
    const userId = user.uid;
    console.log('   User ID:', userId);

    // 2. Check products
    const productsKey = `dashboard_products_${userId}`;
    const productsData = localStorage.getItem(productsKey);
    console.log('\n2. Products Storage Key:', productsKey);
    console.log('   Products Exists:', !!productsData);

    if (productsData) {
        try {
            const products = JSON.parse(productsData);
            console.log('   Products Count:', products.length);
            console.log('   Sample Product:', products[0]);
        } catch (e) {
            console.error('   Error parsing products:', e);
        }
    } else {
        console.warn('   ⚠️ No products found for this user');
    }

    // 3. Check transactions
    const transactionsKey = `dashboard_transactions_${userId}`;
    const transactionsData = localStorage.getItem(transactionsKey);
    console.log('\n3. Transactions Storage Key:', transactionsKey);
    console.log('   Transactions Exists:', !!transactionsData);

    if (transactionsData) {
        try {
            const transactions = JSON.parse(transactionsData);
            console.log('   Transactions Count:', transactions.length);
            console.log('   Sample Transaction:', transactions[0]);
        } catch (e) {
            console.error('   Error parsing transactions:', e);
        }
    } else {
        console.warn('   ⚠️ No transactions found for this user');
    }

    // 4. Show all localStorage keys
    console.log('\n4. All localStorage keys:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log('   -', key);
    }

    console.log('\n=== END DEBUG TEST ===');
}

// Function untuk force initialize demo data
function forceInitDemoData() {
    console.log('=== FORCE INIT DEMO DATA ===\n');

    const demoUser = {
        uid: 'demo-user',
        email: 'demo@test.com',
        displayName: 'Demo User'
    };

    // Set current user
    localStorage.setItem('current_user', JSON.stringify(demoUser));
    console.log('✅ Set current_user');

    // Import mock data (you need to have this function available)
    // This is a simplified version - in production use the actual initializeMockData
    const mockProducts = [
        {
            id: 'product-demo-user-1',
            userId: 'demo-user',
            name: 'Kopi Arabica Premium',
            category: 'Makanan & Minuman',
            sellingPrice: 45000,
            costPrice: 25000,
            currentStock: 150,
            minStock: 20,
            createdAt: new Date('2024-11-01').toISOString(),
            updatedAt: new Date('2024-11-01').toISOString()
        },
        {
            id: 'product-demo-user-2',
            userId: 'demo-user',
            name: 'Teh Hijau Organik',
            category: 'Makanan & Minuman',
            sellingPrice: 35000,
            costPrice: 18000,
            currentStock: 85,
            minStock: 15,
            createdAt: new Date('2024-11-01').toISOString(),
            updatedAt: new Date('2024-11-01').toISOString()
        }
    ];

    const mockTransactions = [
        {
            id: 'transaction-demo-user-1',
            userId: 'demo-user',
            product: 'Kopi Arabica Premium',
            productId: 'product-demo-user-1',
            quantity: 2,
            pricePerItem: 45000,
            costPerItem: 25000,
            totalAmount: 90000,
            source: 'manual',
            customer: 'Budi Santoso',
            date: new Date().toISOString(),
            time: '10:30',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];

    localStorage.setItem('dashboard_products_demo-user', JSON.stringify(mockProducts));
    console.log('✅ Set products (2 items)');

    localStorage.setItem('dashboard_transactions_demo-user', JSON.stringify(mockTransactions));
    console.log('✅ Set transactions (1 item)');

    console.log('\n=== DONE! Refresh the page ===');
}

// Function untuk clear semua data
function clearAllData() {
    localStorage.clear();
    console.log('✅ All localStorage cleared. Refresh the page.');
}

// Export functions to window
window.testMockData = testMockData;
window.forceInitDemoData = forceInitDemoData;
window.clearAllData = clearAllData;

console.log(`
Available debug commands:
- testMockData()         - Check current mock data status
- forceInitDemoData()    - Manually initialize demo data
- clearAllData()         - Clear all localStorage

Run any command in the console!
`);
