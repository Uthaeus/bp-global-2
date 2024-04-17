import background from '../assets/images/forest_image.png';
import { useNavigate } from 'react-router';

function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="home" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className='homepage-title'>GREAT PEOPLE &#x2022; GREAT SOLUTIONS</h1>

            <div className='homepage-subtitle-wrapper'>
                <p className='homepage-subtitle'>KEEPING THE LUMBER SUPPLY CHAIN CONNECTED</p>
            </div>

            <button onClick={() => navigate('/about')} className='homepage-btn'>ABOUT BP GLOBAL</button>
        </div>
    );
}

export default Home;