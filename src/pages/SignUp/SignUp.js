// zxc@gmail.com
// qwqw@gmail.com
// Qwe123123
// src/pages/auth/SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { AUTH_ENDPOINTS, ERROR_MESSAGES } from '../../constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import '../../styles/auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID;
    }

    if (!formData.password) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
    } else if (formData.password.length < 8) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_LENGTH;
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = ERROR_MESSAGES.PASSWORD_MISMATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios({
        method: 'post',
        url: AUTH_ENDPOINTS.SIGNUP,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: formData.email,
          password: formData.password
        }
      });

      alert('회원가입이 완료되었습니다.');
      window.location.href = '/login';
      
    } catch (err) {
      setErrors({ 
        submit: err.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h2 className="auth-title">회원가입</h2>
          <p className="auth-subtitle">트렌드믹스의 회원이 되어주세요</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="이메일"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="이메일을 입력해주세요"
          />

          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            placeholder="비밀번호를 입력해주세요"
          />

          <Input
            label="비밀번호 확인"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
            required
            placeholder="비밀번호를 다시 입력해주세요"
          />

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? '처리중...' : '회원가입'}
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

          <div className="login-link">
            이미 계정이 있으신가요?
            <a href="/login">로그인</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './SignUp.css';

// const INITIAL_FORM_STATE = {
//   email: '',
//   password: '',
//   confirm_password: ''
// };

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(INITIAL_FORM_STATE);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
    
//     // 이메일 검증
//     if (!formData.email) {
//       newErrors.email = '이메일을 입력해주세요.';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = '올바른 이메일 형식이 아닙니다.';
//     }

//     // 비밀번호 검증
//     if (!formData.password) {
//       newErrors.password = '비밀번호를 입력해주세요.';
//     } else if (formData.password.length < 8) {
//       newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
//     }

//     // 비밀번호 확인 검증
//     if (formData.password !== formData.confirm_password) {
//       newErrors.confirm_password = '비밀번호가 일치하지 않습니다.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = ({ target: { name, value } }) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // 에러 메시지 실시간 제거
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     try {
//       setIsLoading(true);
//       await axios.post(
//         'http://localhost:8000/api/v1/auth/register', 
//         formData,
//         {
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
      
//       alert('회원가입이 완료되었습니다.');
//       navigate('/');
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || '회원가입에 실패했습니다.';
//       alert(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignUp = () => {
//     // Google 로그인 구현
//     window.location.href = 'http://localhost:8000/api/v1/auth/google';
//   };

//   const renderFormInput = (id, label, type = 'text', placeholder) => (
//     <div className="form-group">
//       <label className="form-label" htmlFor={id}>{label}</label>
//       <input 
//         type={type}
//         id={id}
//         name={id}
//         className={`form-input ${errors[id] ? 'error' : ''}`}
//         placeholder={placeholder}
//         value={formData[id]}
//         onChange={handleChange}
//         required
//       />
//       {errors[id] && <span className="error-message">{errors[id]}</span>}
//     </div>
//   );

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <h1>회원가입</h1>
//         <p>트렌드믹스의 회원이 되어주세요</p>
//       </div>

//       <form onSubmit={handleSubmit} noValidate>
//         {renderFormInput('email', '이메일', 'email', '이메일을 입력해주세요')}
//         {renderFormInput('password', '비밀번호', 'password', '비밀번호를 입력해주세요')}
//         {renderFormInput('confirm_password', '비밀번호 확인', 'password', '비밀번호를 다시 입력해주세요')}

//         <button 
//           type="submit" 
//           className="login-button"
//           disabled={isLoading}
//         >
//           {isLoading ? '처리중...' : '회원가입'}
//         </button>

//         <div className="divider">
//           <span>또는</span>
//         </div>

//         <button 
//           type="button" 
//           className="google-button"
//           onClick={handleGoogleSignUp}
//           disabled={isLoading}
//         >
//           <div className="google-icon"></div>
//           Google로 계속하기
//         </button>

//         <div className="signup-link">
//           이미 계정이 있으신가요? <Link to="/login">로그인</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUp;












// import './SignUp.css';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';


// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirm_password: ''
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
    
//     // 비밀번호 확인
//     if(formData.password !== formData.confirm_password) {
//       alert('비밀번호가 일치하지 않습니다.');
//       return;
//     }

//     try {
//       await axios.post(
//         'http://localhost:8000/api/v1/auth/register', 
//         formData,
//         {
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
      
//       alert('회원가입이 완료되었습니다.');
//       navigate('/login');
//     } catch (error) {
//       console.error('회원가입 실패:', error.response?.data);
//       alert('회원가입에 실패했습니다.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <h1>회원가입</h1>
//         <p>트렌드믹스의 회원이 되어주세요</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label className="form-label" htmlFor="email">이메일</label>
//           <input 
//             type="email" 
//             id="email" 
//             className="form-input" 
//             placeholder="이메일을 입력해주세요"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label" htmlFor="password">비밀번호</label>
//           <input 
//             type="password" 
//             id="password" 
//             className="form-input" 
//             placeholder="비밀번호를 입력해주세요"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label" htmlFor="confirm_password">비밀번호 확인</label>
//           <input 
//             type="password" 
//             id="confirm_password" 
//             className="form-input" 
//             placeholder="비밀번호를 다시 입력해주세요"
//             value={formData.confirm_password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="login-button">회원가입</button>

//         <div className="divider">
//           <span>또는</span>
//         </div>

//         <button type="button" className="google-button">
//           <div className="google-icon"></div>
//           Google로 계속하기
//         </button>

//         <div className="signup-link">
//           이미 계정이 있으신가요? <Link to="/login">로그인</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUp;











//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form 
//         className="flex flex-col gap-4 w-full max-w-sm"
//         onSubmit={handleSubmit}
//       >
//         <div className="flex flex-col">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             name="confirm_password"
//             value={formData.confirm_password}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <button 
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           회원가입
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;















// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [ConfirmPassword, setConfirmPassword] = useState("");

//   const onEmailHandler = (event) => {
//     setEmail(event.currentTarget.value);
//   }
  
//   const onPasswordHandler = (event) => {
//     setPassword(event.currentTarget.value);
//   }
  
//   const onConfirmPasswordHandler = (event) => {
//     setConfirmPassword(event.currentTarget.value);
//   }

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if(Password !== ConfirmPassword){
//       return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
//     }

//     const body = {
//       email: Email,
//       password: Password,
//       confirm_password: ConfirmPassword,
//     }
//     console.log('전송하는 데이터:', body);
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/auth/register', body, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       console.log('회원가입 성공:', response.data);
//       alert('회원가입이 완료되었습니다.');
//       navigate('/login'); // 로그인 페이지로 이동
//     } catch (error) {
//       console.error('회원가입 실패:', error.response?.data || error.message);
//       console.error('유효성 검사 실패:', error.response.data);
//       alert('회원가입에 실패했습니다. 다시 시도해주세요.');
//     }
//   }
   
//   return (
//     <div style={{ 
//       display: 'flex', 
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       width: '100%', 
//       height: '100vh'
//     }}>
//       <form style={{ display: 'flex', flexDirection: 'column'}}
//           onSubmit={onSubmitHandler}
//       >
//           <label>Email</label>
//           <input type='email' value={Email} onChange={onEmailHandler}/>

//           <label>Password</label>
//           <input type='password' value={Password} onChange={onPasswordHandler}/>

//           <label>Confirm Password</label>
//           <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

//           <br />
//           <button type="submit">
//               회원가입
//           </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;



// src/pages/LoginPage.jsx
// import React from 'react';

// import React, { useState } from 'react';
// import axios from 'axios'

// const SignUp = () => {

//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [ConfirmPassword, setConfirmPassword] = useState("");

//   const onEmailHandler = (event) => {
//       setEmail(event.currentTarget.value);
//   }
//   const onPasswordHandler = (event) => {
//       setPassword(event.currentTarget.value);
//   }
//   const onConfirmPasswordHandler = (event) => {
//       setConfirmPassword(event.currentTarget.value);
//   }
//   const onSubmitHandler = (event) => {
//     event.preventDefault();

//     if(Password !== ConfirmPassword){
//       return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
//       }
//     let body = {
//       email: Email,
//       password: Password,
//       confirm_password: ConfirmPassword,
//     }

//     const request = axios.post('http://localhost:8000/api/v1/auth/register', body)
//     .then((response) => {
//       console.log(response.data)
//     }).catch(()=>{
//       console.log('실패함')
//     })
//    }

//   return (
//     <div style={{ 
//       display: 'flex', justifyContent: 'center', alignItems: 'center', 
//       width: '100%', height: '100vh'
//       }}>
//       <form style={{ display: 'flex', flexDirection: 'column'}}
//           onSubmit={onSubmitHandler}
//       >
//           <label>Email</label>
//           <input type='email' value={Email} onChange={onEmailHandler}/>

//           <label>Password</label>
//           <input type='password' value={Password} onChange={onPasswordHandler}/>

//           <label>Confirm Password</label>
//           <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

//           <br />
//           <button formAction=''>
//               회원가입
//           </button>
//       </form>
//   </div>
//   );
// };

// export default SignUp;