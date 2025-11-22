import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $accessToken, logout } from '../store/authStore';

import './Navbar.css';

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const accessToken = useStore($accessToken);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) { 
      logout();
      alert('로그아웃 되었습니다.');
      window.location.href = '/';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0">
      <div className="container px-1">
        <a className="navbar-brand font-weight-bolder ms-lg-0 " href="/">
          Astro Ecommerce
        </a>
        <button 
          className="navbar-toggler shadow-none ms-2" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navigation" 
          aria-controls="navigation" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon mt-2">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        
        <div className="collapse navbar-collapse" id="navigation">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="/astro-ecommerce/">
                All Components
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link text-dark dropdown-toggle font-weight-bold d-flex align-items-center me-2 " aria-current="page" id="pagesExample" data-bs-toggle="dropdown" aria-expanded="false">
                Pages <i className="bi bi-chevron-down ms-1"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="pagesExample">
                <li><a className="dropdown-item" href="/astro-ecommerce/landing/">Landing Page</a></li>
                <li><a className="dropdown-item" href="/astro-ecommerce/product/">Product Page</a></li>
                <li><a className="dropdown-item" href="/astro-ecommerce/shopping-cart/">Shopping Cart</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="https://www.creative-tim.com/learning-lab/astro/overview/astro-ecommerce">
                Documentation
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="https://github.com/creativetimofficial/astro-ecommerce">
                <i className="fab text-lg fa-github"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="https://discord.com/invite/TGZqBvZB" rel="nofollow" target="_blank">
                <i className="fab text-lg fa-discord"></i>
              </a>
            </li>

            <li className="nav-item d-flex align-items-center ms-2 gap-2"> {/* gap-2로 버튼 사이 간격 줌 */}
              {isMounted && accessToken ? (
                <>
                  {/* 마이페이지 버튼: 주황색 테두리 */}
                  <a 
                    className="btn btn-nav-custom btn-nav-mypage" 
                    href="/myPage"
                  >
                    <i className="bi bi-person-fill"></i> {/* 아이콘 추가 */}
                    My Page
                  </a>
                  
                  {/* 로그아웃 버튼: 회색 */}
                  <button 
                    className="btn btn-nav-custom btn-nav-logout"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i> {/* 아이콘 추가 */}
                    Log Out
                  </button>
                </>
              ) : (
                /* 로그인 버튼: 주황색 배경 */
                <a 
                  className="btn btn-nav-custom btn-nav-login" 
                  href="/login"
                >
                  <i className="bi bi-box-arrow-in-right"></i> {/* 아이콘 추가 */}
                  Log In
                </a>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;