// src/pages/LoginPage.jsx
// import React from 'react';
// LoginForm.js

// # main.py (FastAPI)
// from fastapi import FastAPI
// from fastapi.middleware.cors import CORSMiddleware

// app = FastAPI()

// # CORS 미들웨어 설정
// app.add_middleware(
//     CORSMiddleware,
//     allow_origins=["http://localhost:3001"],  # React 앱의 주소
//     allow_credentials=True,
//     allow_methods=["*"],
//     allow_headers=["*"],
// )

// user@example.com
// Password123
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const INITIAL_FORM_STATE = {
  email: '',
  password: ''
};

const API_URL = 'http://192.168.0.50:8000/api/v1/auth/token';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLoginSuccess = (data) => {
    const { access_token, token_type } = data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('token_type', token_type);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    navigate('/');
  };

  const getErrorMessage = (err) => {
    if (!err.response) {
      return '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
    }

    const { status, data } = err.response;

    if (status === 422 && Array.isArray(data.detail)) {
      return data.detail.map(error => error.msg).join('\n');
    }

    const errorMessages = {
      400: '잘못된 요청입니다. 입력 정보를 확인해주세요.',
      401: '이메일 또는 비밀번호가 올바르지 않습니다.',
      404: 'API 주소를 찾을 수 없습니다.',
      500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    };

    return errorMessages[status] || data?.detail || '로그인에 실패했습니다.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      handleLoginSuccess(response.data);
    } catch (err) {
      console.error('Login error:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormInput = (id, label, type = 'text', placeholder) => (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={formData[id]}
        onChange={handleChange}
        required
        autoComplete={type === 'password' ? 'current-password' : 'email'}
      />
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>로그인</h1>
        <p>트렌드믹스에 오신 것을 환영합니다</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form" noValidate>
        {renderFormInput('email', '이메일', 'email', '이메일을 입력해주세요')}
        {renderFormInput('password', '비밀번호', 'password', '비밀번호를 입력해주세요')}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="button-content">
              <LoadingSpinner />
              로그인 중...
            </span>
          ) : '로그인'}
        </button>

        <div className="divider">
          <span>또는</span>
        </div>

        <button type="button" className="google-button">
          <div className="google-icon"></div>
          Google로 계속하기
        </button>

        <div className="signup-link">
          아직 계정이 없으신가요? <Link to="/sign-up">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

const LoadingSpinner = () => (
  <svg className="spinner" viewBox="0 0 24 24">
    <circle className="spinner-circle" cx="12" cy="12" r="10" />
    <path className="spinner-path" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export default Login;












// import React, { useState } from 'react';
// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [token, setToken] = useState('');
  
//     // 회원가입
//     const handleRegister = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await fetch('http://localhost:8000/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//         });
//         const data = await response.json();
//         setMessage(`Registration response: ${JSON.stringify(data)}`);
//       } catch (error) {
//         setMessage(`Registration error: ${error.message}`);
//       }
//     };
  
//     // 로그인
//     const handleLogin = async (e) => {
//       e.preventDefault();
//       try {
//         const formData = new FormData();
//         formData.append('username', email);
//         formData.append('password', password);
  
//         const response = await fetch('http://localhost:8000/api/v1/auth/login', {
//           method: 'post',
//           body: formData,
//         });
//         const data = await response.json();
//         setToken(data.access_token);
//         setMessage(`Login successful! Token: ${data.access_token}`);
//       } catch (error) {
//         setMessage(`Login error: ${error.message}`);
//       }
//     };
  
//     // 비밀번호 변경
//     const handleChangePassword = async () => {
//       if (!token) {
//         setMessage('Please login first');
//         return;
//       }
  
//       try {
//         const response = await fetch('http://localhost:8000/change-password', {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             current_password: password,
//             new_password: 'newpassword123',
//           }),
//         });
//         const data = await response.json();
//         setMessage(`Password change response: ${JSON.stringify(data)}`);
//       } catch (error) {
//         setMessage(`Password change error: ${error.message}`);
//       }
//     };
  
//     // 계정 삭제
//     const handleDeleteAccount = async () => {
//       if (!token) {
//         setMessage('Please login first');
//         return;
//       }
  
//       try {
//         const response = await fetch('http://localhost:8000/delete-account', {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setMessage(`Account deletion response: ${JSON.stringify(data)}`);
//         setToken('');
//       } catch (error) {
//         setMessage(`Delete account error: ${error.message}`);
//       }
//     };
  
//     return (
//       <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
//         <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>FastAPI Auth Test</h1>
        
//         <div style={{ marginBottom: '20px' }}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//           />
//         </div>
  
//         <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//           <button
//             onClick={handleRegister}
//             style={{ padding: '10px', flex: 1, backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
//           >
//             Register
//           </button>
//           <button
//             onClick={handleLogin}
//             style={{ padding: '10px', flex: 1, backgroundColor: '#2196F3', color: 'white', border: 'none' }}
//           >
//             Login
//           </button>
//         </div>
  
//         <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//           <button
//             onClick={handleChangePassword}
//             style={{ padding: '10px', flex: 1, backgroundColor: '#FF9800', color: 'white', border: 'none' }}
//           >
//             Change Password
//           </button>
//           <button
//             onClick={handleDeleteAccount}
//             style={{ padding: '10px', flex: 1, backgroundColor: '#f44336', color: 'white', border: 'none' }}
//           >
//             Delete Account
//           </button>
//         </div>
  
//         <div 
//           style={{ 
//             marginTop: '20px', 
//             padding: '10px', 
//             backgroundColor: '#f5f5f5',
//             borderRadius: '4px',
//             wordBreak: 'break-all'
//           }}
//         >
//           <strong>Response:</strong>
//           <pre>{message}</pre>
//         </div>
//       </div>
//     );
//   }
  
//   export default Login;













// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     // FormData 형식으로 변환
//     const formDataToSend = new URLSearchParams({
//       grant_type: 'password',
//       username: formData.username,
//       password: formData.password,
//       scope: '',
//       client_id: '',
//       client_secret: ''
//     });

//     // 요청 데이터 확인
//     console.log('Request Data:', {
//       grant_type: 'password',
//       username: formData.username,
//       password: formData.password,
//       scope: '',
//       client_id: '',
//       client_secret: ''
//     });

//     try {
//       const response = await axios({
//         method: 'post',
//         url: 'http://192.168.0.50:8000/api/v1/auth/token',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         data: formDataToSend
//       });

//       console.log('Response:', response.data);

//       if (response.data.access_token) {
//         localStorage.setItem('token', response.data.access_token);
//         localStorage.setItem('token_type', response.data.token_type);

//         // axios 기본 헤더 설정
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        
//         console.log('로그인 성공:', response.data);
//         // window.location.href = '/dashboard';
//       }

//     } catch (err) {
//       console.error('Login error details:', {
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data,
//         url: err.config?.url,
//         requestData: formDataToSend.toString()  // 실제 전송된 데이터 확인
//       });

//       let errorMessage = '로그인에 실패했습니다.';

//       if (!err.response) {
//         errorMessage = '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
//       } else if (err.response.status === 422) {
//         const validationErrors = err.response.data.detail;
//         if (Array.isArray(validationErrors)) {
//           errorMessage = validationErrors.map(error => error.msg).join('\n');
//         }
//       } else {
//         switch (err.response.status) {
//           case 400:
//             errorMessage = '잘못된 요청입니다. 입력 정보를 확인해주세요.';
//             break;
//           case 401:
//             errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
//             break;
//           case 404:
//             errorMessage = 'API 주소를 찾을 수 없습니다.';
//             break;
//           case 500:
//             errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
//             break;
//           default:
//             if (err.response.data?.detail) {
//               errorMessage = err.response.data.detail;
//             }
//             break;
//         }
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             계정에 로그인하세요
//           </p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 이메일
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="이메일을 입력하세요"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 비밀번호
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="비밀번호를 입력하세요"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded whitespace-pre-line">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 로그인 중...
//               </span>
//             ) : '로그인'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;












// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',  // email 대신 username 사용
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     // FormData 형식으로 변환
//     const formDataToSend = new URLSearchParams();
//     formDataToSend.append('username', formData.username);  // email 값을 username으로 전송
//     formDataToSend.append('password', formData.password);
//     formDataToSend.append('grant_type', 'password');  // grant_type 필수

//     // 요청 확인 콘솔 ===============
//     console.log('Request Data:', {
//         username: formData.username,
//         password: formData.password,
//         grant_type: 'password'
//       });


//     console.log('FormData content:', formDataToSend.toString());
//     try {
//       const response = await axios({
//         // method: 'POST',
//         method: 'POST',
//         url: 'http://192.168.0.50:8000/api/v1/auth/token',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Accept': 'application/json'
//         },
//         data: formDataToSend,
//         withCredentials: true
//       });

//       console.log('Response:', response.data);

//       if (response.data.access_token) {
//         localStorage.setItem('token', response.data.access_token);
//         localStorage.setItem('token_type', response.data.token_type);

//         // axios 기본 헤더 설정
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        
//         console.log('로그인 성공:', response.data);
//         // window.location.href = '/dashboard';
//       }

//     } catch (err) {
//       console.error('Login error details:', {
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data,
//         url: err.config?.url
//       });

//       let errorMessage = '로그인에 실패했습니다.';

//       if (!err.response) {
//         errorMessage = '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
//       } else if (err.response.status === 422) {
//         // Validation Error 처리
//         const validationErrors = err.response.data.detail;
//         if (Array.isArray(validationErrors)) {
//           errorMessage = validationErrors.map(error => error.msg).join('\n');
//         }
//       } else {
//         switch (err.response.status) {
//           case 400:
//             errorMessage = '잘못된 요청입니다. 입력 정보를 확인해주세요.';
//             break;
//           case 401:
//             errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
//             break;
//           case 404:
//             errorMessage = 'API 주소를 찾을 수 없습니다.';
//             break;
//           case 500:
//             errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
//             break;
//           default:
//             if (err.response.data?.detail) {
//               errorMessage = err.response.data.detail;
//             }
//             break;
//         }
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             계정에 로그인하세요
//           </p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 이메일
//               </label>
//               <input
//                 id="username"
//                 name="username"  // email에서 username으로 변경
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="이메일을 입력하세요"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 비밀번호
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="비밀번호를 입력하세요"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded whitespace-pre-line">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 로그인 중...
//               </span>
//             ) : '로그인'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;







// import { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',  // FastAPI OAuth2 기본 스펙에서는 'username'을 사용
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // FastAPI 서버 설정

//   // 
//   const api = axios.create({
//     // FastAPI 기본 포트
//     // baseURL: 'http://localhost:8000',
//     baseURL: 'http://192.168.0.50:8000/api/v1/auth/token',,
//     headers: {
//         // FastAPI OAuth2 요구사항
//     //   'Content-Type': 'application/x-www-form-urlencoded'
//         "email": "user@example.com",
//         "password": "string"
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // FormData 형식으로 변환 (FastAPI OAuth2 요구사항)
//       const params = new URLSearchParams();
//       params.append('email', formData.email);
//       params.append('password', formData.password);

//       const response = await api.post('/token', params);
      
//       // 토큰 저장
//       const { access_token, token_type } = response.data;
//       localStorage.setItem('token', access_token);
//       localStorage.setItem('token_type', token_type);

//       // API 인스턴스에 기본 헤더 설정
//       api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
//       console.log('로그인 성공:', response.data);
      
//       // 로그인 성공 후 처리 (예: 리다이렉트)
//       // window.location.href = '/dashboard';
      
//     } catch (err) {
//       console.error('Login error:', err.response?.data);
//       setError(
//         err.response?.data?.detail || 
//         '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             계정에 로그인하세요
//           </p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 이메일
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="이메일을 입력하세요"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 비밀번호
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="비밀번호를 입력하세요"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 로그인 중...
//               </span>
//             ) : '로그인'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// ---------------2
// import { useState } from 'react';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await fetch('http://your-api-url/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('로그인에 실패했습니다');
//       }

//       const data = await response.json();
//       console.log('로그인 성공:', data);
      
//       // 여기서 토큰을 저장하거나 다른 처리를 할 수 있습니다
//       localStorage.setItem('token', data.token);
      
//       // 로그인 성공 후 리다이렉트 등의 처리
//       // window.location.href = '/dashboard';

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
//         </div>
        
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 이메일
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="이메일을 입력하세요"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 비밀번호
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="비밀번호를 입력하세요"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? '로그인 중...' : '로그인'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// npx create-react-app login-test
// cd login-test






// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   return (
//     <div className="login-container">
//         <div className="login-header">
//             <h1>로그인</h1>
//             <p>트렌드믹스에 오신 것을 환영합니다</p>
//         </div>

//         <form>
//             <div className="form-group">
//                 <label className="form-label" htmlFor="email">이메일</label>
//                 <input 
//                     type="email" 
//                     id="email" 
//                     className="form-input" 
//                     placeholder="이메일을 입력해주세요"
//                 />
//             </div>

//             <div className="form-group">
//                 <label className="form-label" htmlFor="password">비밀번호</label>
//                 <input 
//                     type="password" 
//                     id="password" 
//                     className="form-input" 
//                     placeholder="비밀번호를 입력해주세요"
//                 />
//             </div>

//             <button type="submit" className="login-button">로그인</button>

//             <div className="divider">
//                 <span>또는</span>
//             </div>

//             <button type="button" className="google-button">
//                 <div className="google-icon"></div>
//                 Google로 계속하기
//             </button>

//             <div className="signup-link">
//                 아직 계정이 없으신가요?
//                 <Link to="/sign-up">회원가입</Link>
//             </div>
//         </form>
//     </div>
//   );
// };

// export default Login;



// // 1
// // npm install axios 
// import axios from 'axios'

// function App(){
//   return (
//     <button onClick={()=>{
//       axios.get('https://coding1.github.io/shop/data2.json').then((결과)=>{
//         console.log(결과.data)
//       })
//       .catch(()=>{
//         console.log('실패함')
//       })
//     }}>버튼</button>
//   )
// }

// // 2
// import axios from 'axios'

// function App(){

//   let [shoes, setShoes] = useState(어쩌구);
//   return (
//     <button onClick={()=>{
//       axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
//         let copy = [...shoes, ...결과.data]
//         setShoes(copy)
//       })
//       .catch(()=>{
//         console.log('실패함')
//       })
//     }}>버튼</button>
//   )
// }


// axios.post('URL', {name : 'kim'})