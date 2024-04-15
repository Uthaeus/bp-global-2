import background from '../assets/images/forest_image.png';

function Home() {
    return (
        <div className="home" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1>Home</h1>
        </div>
    );
}

export default Home;