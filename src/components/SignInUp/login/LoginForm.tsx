import React from 'react';
import { useLogin } from './useLogin';
import './LoginForm.css'; 

const LoginForm = () => {
  const { formState, handlers } = useLogin();
  const { loginId, pwd, isLoading } = formState;
  const { handleChangeId, handleChangePwd, handleLogin } = handlers;

  return (
    <div id="login-page-wrapper" className="login-container">
      <div className="login-card">
        {/* 헤더 영역 */}
        <div className="text-center mb-4">
          <h3 className="login-title">Happy Friends</h3>
          <p className="login-subtitle">오늘도 즐거운 하루 되세요!</p>
        </div>
        
        <form onSubmit={handleLogin}>
          {/* 아이디 입력창 */}
          <div className="custom-input-group">
            <i className="bi bi-person-fill input-icon"></i>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="아이디"
              value={loginId}
              onChange={handleChangeId}
              disabled={isLoading}
            />
          </div>
          
          {/* 비밀번호 입력창 */}
          <div className="custom-input-group">
            <i className="bi bi-lock-fill input-icon"></i>
            <input
              type="password"
              className="form-control custom-input"
              placeholder="비밀번호"
              value={pwd}
              onChange={handleChangePwd}
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