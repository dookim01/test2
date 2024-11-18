// src/pages/auth/SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { AUTH_ENDPOINTS, ERROR_MESSAGES } from '../../constants/auth';
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