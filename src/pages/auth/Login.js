// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AUTH_ENDPOINTS, ERROR_MESSAGES } from '../../constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import '../../styles/auth.css';

const INITIAL_FORM_STATE = {
  username: '', // FastAPI username field
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    // if (!formData.username) {
    //   setError(ERROR_MESSAGES.EMAIL_REQUIRED);
    //   return;
    // }

    setError('');
    setIsLoading(true);

    try {
      // const response = await axios.post(
      //   AUTH_ENDPOINTS.LOGIN,
      //   {
      //     username: formData.username,
      //     password: formData.password,
      //     grant_type: 'password'
      //   },
      //   {
      //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      //   }
      // );

      // 로그인 성공 처리
      // const { access_token, token_type } = response.data;
      // localStorage.setItem('token', access_token);
      // localStorage.setItem('token_type', token_type);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      console.log('로그인 테스트1');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      
      const status = err.response?.status;
      if (status === 401) {
        setError(ERROR_MESSAGES.INVALID_CREDENTIALS);
      } else if (status === 404) {
        setError('API 주소를 찾을 수 없습니다.');
      } else {
        setError(err.response?.data?.detail || ERROR_MESSAGES.NETWORK_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h2 className="auth-title">로그인</h2>
          <p className="auth-subtitle">트렌드믹스에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="이메일"
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="이메일을 입력하세요"
            error={error && error.includes('이메일')}
          />
          
          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="비밀번호를 입력하세요"
            error={error && error.includes('비밀번호')}
          />

          {error && <div className="error-message">{error}</div>}

          <Button 
            type="submit" 
            isLoading={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          <div className="divider">
            <span>또는</span>
          </div>

          <Button
            type="button"
            variant="google"
            onClick={() => window.location.href = AUTH_ENDPOINTS.GOOGLE}
          >
            Google로 계속하기
          </Button>

          <div className="signup-link">
            아직 계정이 없으신가요?{' '}
            <a href="/sign-up">회원가입</a>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default Login;









// import React, { useState } from 'react';
// import axios from 'axios';
// import { AUTH_ENDPOINTS, ERROR_MESSAGES } from '../../constants';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import '../../styles/auth.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');  
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = ({ target: { name, value } }) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     const formDataToSend = new URLSearchParams({
//       email: formData.email,
//       password: formData.password
//     });

//     try {
//       const response = await axios({
//         method: 'post',
//         url: AUTH_ENDPOINTS.LOGIN,
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         data: formDataToSend
//       });
//       const data = await response.json();
//       setError(`Registration response: ${JSON.stringify(data)}`);

//       const { access_token, token_type } = response.data;
//       localStorage.setItem('token', access_token);
//       localStorage.setItem('token_type', token_type);
//       window.location.href = '/';

//     } catch (err) {
//       setError(err.response?.data?.detail || ERROR_MESSAGES.NETWORK_ERROR);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <div className="auth-header">
//           <h2 className="auth-title">로그인</h2>
//           <p className="auth-subtitle">트렌드믹스에 오신 것을 환영합니다</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <Input
//             label="이메일"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="이메일을 입력하세요"
//           />
          
//           <Input
//             label="비밀번호"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             placeholder="비밀번호를 입력하세요"
//           />

//           {ERROR_MESSAGES && <div className="error-message">{ERROR_MESSAGES}</div>}

//           <Button type="submit" isLoading={isLoading}>
//             {isLoading ? '로그인 중...' : '로그인'}
//           </Button>

//           <div className="divider">
//             <span>또는</span>
//           </div>

//           <Button
//             type="button"
//             variant="google"
//             onClick={() => window.location.href = AUTH_ENDPOINTS.GOOGLE}
//           >
//             Google로 계속하기
//           </Button>

//           <div className="signup-link">
//             아직 계정이 없으신가요?
//             <a href="/signup">회원가입</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;