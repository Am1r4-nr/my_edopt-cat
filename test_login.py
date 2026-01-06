
import requests
import sys

session = requests.Session()

# 1. Get CSRF Cookie
try:
    print("Fetching CSRF cookie...")
    response = session.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
    print(f"CSRF Status: {response.status_code}")
    print(f"Cookies: {session.cookies.get_dict()}")
    
    if 'XSRF-TOKEN' not in session.cookies:
        print("Error: XSRF-TOKEN cookie not found")
        sys.exit(1)

    xsrf_token = requests.utils.unquote(session.cookies['XSRF-TOKEN'])
    
    # 2. Login
    print("Attempting login...")
    headers = {
        'X-XSRF-TOKEN': xsrf_token,
        'Accept': 'application/json',
        'Referer': 'http://127.0.0.1:8000/login'
    }
    
    payload = {
        'email': 'admin@edoptcat.com',
        'password': 'password'
    }
    
    response = session.post('http://127.0.0.1:8000/login', json=payload, headers=headers)
    print(f"Login Status: {response.status_code}")
    print(f"Login Response: {response.text}")
    
    # 3. Check User
    print("Checking user...")
    response = session.get('http://127.0.0.1:8000/api/user', headers={'Accept': 'application/json'})
    print(f"User Status: {response.status_code}")
    print(f"User Response: {response.text}")

except Exception as e:
    print(f"An error occurred: {e}")
