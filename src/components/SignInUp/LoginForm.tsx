import React, { useState } from 'react';
import { commonClient } from '../../api/index'; 
import { setToken } from '../../store/authStore';
import './LoginForm.css';

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
    <div className="login-container">
      <div className="login-card">
        {/* 헤더 영역 */}
        <div className="text-center mb-4">
          <h3 className="login-title">Happy Friends</h3>
          <p className="login-subtitle">오늘도 즐거운 하루 되세요!</p>
        </div>
        
        <form onSubmit={handleLogin}>
          {/* 아이디 입력창 */}
          <div className="custom-input-group">
            <i className="bi bi-person input-icon"></i> {/* 부트스트랩 아이콘 */}
            <input
              type="text"
              className="form-control custom-input"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          {/* 비밀번호 입력창 */}
          <div className="custom-input-group">
            <i className="bi bi-lock input-icon"></i> {/* 부트스트랩 아이콘 */}
            <input
              type="password"
              className="form-control custom-input"
              placeholder="비밀번호"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* 로그인 버튼 */}
          <button 
            type="submit" 
            className="btn btn-brand w-100 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                로그인 중...
              </span>
            ) : (
              '로그인'
            )}
          </button>
        </form>
        
        {/* 하단 회원가입 링크 */}
        <div className="login-footer">
          <span>아직 계정이 없으신가요? </span>
          <a href="/signup">회원가입 하기</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;