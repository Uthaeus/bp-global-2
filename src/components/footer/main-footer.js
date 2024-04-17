import { Link } from 'react-router-dom';

import logo from '../../assets/images/globe.png';

function MainFooter() {

    return (
        <div className="main-footer">
            <img src={logo} alt='bp global logo' width='65px' className='footer-logo' />
            <p className='footer-title'>
                BP Global, LLC.
            </p>
            <p className='footer-address'>
                3266 W 1075 N 
            </p>
            <p className='footer-address'>
                Layton, UT 84041
            </p>

            <div className='footer-socials-wrapper'>
                <a href='/' target='_blank' className='footer-social'>
                    <i className='bi bi-linkedin'></i>
                </a>
                <a href='/' target='_blank' className='footer-social'>
                    <i className='bi bi-instagram'></i>
                </a>
                <a href='/' target='_blank' className='footer-social'>
                    <i className='bi bi-twitter'></i>
                </a>
            </div>

            <div className='d-flex mb-2'>
                <Link to='/login' className='footer-auth'>login</Link>
                <Link to='/signup' className='footer-auth'>register</Link>
            </div>

            <div className='footer-policies-wrapper'>
                <Link to='/' className='footer-policy'>policy</Link> |
                <Link to='/' className='footer-policy'>policy</Link> |
                <Link to='/' className='footer-policy'>policy</Link> |
                <Link to='/' className='footer-policy'>policy</Link> |
                <Link to='/' className='footer-policy'>policy</Link> |
                <Link to='/' className='footer-policy'>policy</Link> |
                <Link to='/' className='footer-policy'>policy</Link>
            </div>
        </div>
    );
}

export default MainFooter;