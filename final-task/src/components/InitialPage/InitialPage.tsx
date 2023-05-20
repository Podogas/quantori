import './InitialPage.css';
import { useNavigate } from 'react-router-dom';

const InitialPage = () => {
    const navigate = useNavigate();
    return (
    <section className="initialPage">
        <div className='initialPage__content-wrapper'>
            <h1 className="initialPage__title">Q-1 Search</h1>
            <h3 className="initialPage__subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u</h3>
            <button className="initialPage__button" type="button" onClick={() => {navigate('/auth')}}>Login</button>
        </div>        
    </section>
    )
}

export {InitialPage};