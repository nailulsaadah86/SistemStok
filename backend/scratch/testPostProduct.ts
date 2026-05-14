import axios from 'axios';

async function testPost() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            username: 'admin',
            password: 'admin'
        });
        const token = res.data.accessToken;
        console.log("Logged in, token:", token);

        const product = {
            name: 'Test Product ' + Date.now(),
            sku: 'SKU-' + Date.now(),
            category: 'Test',
            price: 0,
            cost_price: 0
        };

        const postRes = await axios.post('http://localhost:5000/api/products', product, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Post success:", postRes.data);
    } catch (err: any) {
        console.error("Post failed:", err.response?.data || err.message);
    }
}

testPost();
