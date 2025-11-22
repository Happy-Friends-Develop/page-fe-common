import React, { useState } from 'react';
import { commonClient } from '../api/index'; 
import { setToken } from '../store/authStore'; 

const LoginForm = () => {
  const [loginId, setLoginId] = useState('');
  const [pwd, setPwd] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!loginId || !pwd) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true); 

    try {
      const response = await commonClient.api.login({
        loginId: loginId,
        pwd: pwd,
      },
      { format : 'json' }
    );

      const { success, data: token, errorMessage } = response.data;

      if (success && token) {
        setToken(token); 
        
        alert('로그인 성공!');
        window.location.href = '/'; 
      } else {
        alert(errorMessage || '로그인에 실패했습니다.');
      }

    } catch (error) {
      console.error('Login Error:', error);
      alert('서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card p-4 shadow border-0 rounded-3">
        <h3 className="text-center mb-4 fw-bold">Happy Friends</h3>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-muted small">아이디</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="아이디를 입력하세요"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label text-muted small">비밀번호</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="비밀번호를 입력하세요"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 btn-lg fw-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span><span className="spinner-border spinner-border-sm me-2"></span>로그인 중...</span>
            ) : (
              '로그인'
            )}
          </button>
        </form>
        
        <div className="text-center mt-3">
          <a href="/signup" className="text-decoration-none small text-secondary">
            아직 회원이 아니신가요? 회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;