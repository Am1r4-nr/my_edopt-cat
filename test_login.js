
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

async function testLogin() {
    try {
        console.log('1. Getting CSRF cookie...');
        await client.get('http://127.0.0.1:8000/sanctum/csrf-cookie');

        // Extract XSRF-TOKEN from cookies
        const cookies = await jar.getCookies('http://127.0.0.1:8000');
        const xsrfToken = cookies.find(c => c.key === 'XSRF-TOKEN')?.value;

        if (!xsrfToken) {
            console.error('XSRF-TOKEN cookie not found');
            return;
        }

        console.log('XSRF-TOKEN found:', xsrfToken);

        console.log('1b. Initial Debug Session...');
        try {
            const debugInit = await client.get('http://127.0.0.1:8000/api/debug-session', {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                    'Accept': 'application/json',
                    'Referer': 'http://127.0.0.1:8000/login',
                    'Origin': 'http://127.0.0.1:8000'
                }
            });
            console.log('Init Session ID:', debugInit.data.session_id);
            console.log('Init Config:', {
                driver: debugInit.data.config_session_driver,
                domain: debugInit.data.config_session_domain,
                secure: debugInit.data.config_session_secure // I didn't add this to api route but assumed defaults
            });
        } catch (e) { console.log('Init Debug failed:', e.message); }

        console.log('2. Logging in...');
        const loginResponse = await client.post('http://127.0.0.1:8000/login', {
            email: 'admin@edoptcat.com',
            password: 'password'
        }, {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                'Accept': 'application/json',
                'Referer': 'http://127.0.0.1:8000/login',
                'Origin': 'http://127.0.0.1:8000'
            }
        });

        console.log('Login Status:', loginResponse.status);

        console.log('3. Debug Session (Post-Login)...');
        try {
            const debugResponse = await client.get('http://127.0.0.1:8000/api/debug-session', {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                    'Accept': 'application/json',
                    'Referer': 'http://127.0.0.1:8000/login',
                    'Origin': 'http://127.0.0.1:8000'
                }
            });
            console.log('Debug Status:', debugResponse.status);
            console.log('Debug Data:', debugResponse.data);
        } catch (e) {
            console.error('Debug session failed', e.message);
            if (e.response) console.error('Debug session status:', e.response.status);
        }

        console.log('4. Checking User...');
        const userResponse = await client.get('http://127.0.0.1:8000/api/user', {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                'Accept': 'application/json',
                'Referer': 'http://127.0.0.1:8000/login',
                'Origin': 'http://127.0.0.1:8000'
            }
        });
        console.log('User Status:', userResponse.status);
        console.log('User Role:', userResponse.data.role);

    } catch (error) {
        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testLogin();
