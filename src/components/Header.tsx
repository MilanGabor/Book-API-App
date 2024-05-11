import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Font Awesome icons
import { FaRegUser, FaRegStar, FaLock, FaFacebookF, FaInstagramSquare, FaTwitter, FaBars } from 'react-icons/fa';
// import styles
import '../styles/Header.css';
// imports for redux
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, logout } from '../store/AuthSlice';
import { AppDispatch, RootState } from '../store/store';
// import components
import LoginModal from './LoginModal';

export const Header = () => {
  const [ isMobile, setIsMobile ] = useState<boolean>(window.innerWidth < 900);
  const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);
  const [ isLoginVisible, setIsLoginVisible ] = useState<boolean>(false);
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLogged } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsMenuOpen(false); // Close the menu when switching to desktop view
    }
  };

  const handleScroll = () => {
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const logoutHandler = () => {
    dispatch(logout())
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, isMenuOpen]);

  const toggleNavVisible = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="header">
      <div className="header__top-bar">
        {!isLogged && 
          <div className="header__top-bar-content" >
            <FaInstagramSquare className='fa-icon' size={12}/>
            <FaFacebookF className='fa-icon' size={12}/>
            <FaTwitter className='fa-icon' size={12}/>
            <a className="header__login-link" onClick={() => setIsLoginVisible(true)}>
              {<FaLock size={9} className='header__top-bar-lock'/>}LOGIN
            </a>
          {isLoginVisible && <LoginModal closeModal={() => setIsLoginVisible(false)}/>}
        </div>}
        {isLogged && <a className='signout-link' onClick={logoutHandler}>SIGN OUT</a>}
      </div>
      <div className="header__main">
        <div className="header__logo">
          <img src="logo.png" width={150} height={60} />
        </div>
        <nav className="header__menu">
          <ul className="header__menu-list" style={{ display: !isMobile ? 'flex' : isMenuOpen ? 'block' : 'none'}}>
            <li className="header__menu-item"><a onClick={() => navigation('/')}>HOME</a></li>
            <li className="header__menu-item"><a>FEATURES</a></li>
            <li className="header__menu-item"><a>PAGES</a></li>
            <li className="header__menu-item"><a>SHOP</a></li>
            <li className="header__menu-item"><a>EVENT</a></li>
            <li className="header__menu-item"><a>BLOG</a></li>
          </ul>
          {isLogged && <div className='header__menu-user-actions'>
            <FaRegStar className='fa-icon fa-action-icon' style={{ color: '#666666'}} size={20} onClick={() => navigation('/favorites')}/>
            <FaRegUser className='fa-icon fa-action-icon' style={{ color: '#666666' }} size={20}/>
          </div>}
          <div className='hamburger' onClick={toggleNavVisible}>
            <FaBars className='hamburger-icon' size={20}/>
          </div>
        </nav>
      </div>
      <div className="header__banner">
        <div className='header__banner-title'>NEW BOOKS EVERYDAY</div>
      </div>
    </header>
  )
};