import { Outlet, Link, useNavigate } from "react-router-dom";

import { clearUser, isAuthenticated } from "../../utils/authentication/authentication.utils";
import { ReactComponent as HangmanLogo } from '../../assets/hangman_logo.svg'
import './navigation.styles.scss'

const Navigation = () => {
    const navigate = useNavigate();

    const signOutHandler = () => {
        clearUser();
        navigate('/auth');
    }

    return (
        <>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                    <HangmanLogo className='logo' />
                    <span className="logo-game-name">HANGMAN GAME</span>
                </Link>
                <div className='nav-links-container'>
                    <Link to='/'>GAME</Link>
                    <Link to='/scores'>SCORES</Link>
                    {isAuthenticated() ? 
                        (<span className='sign-out' onClick={signOutHandler}>SIGN OUT</span>) : 
                        (<Link to='/auth'>SIGN IN</Link>)
                    }
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation;