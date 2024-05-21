import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { clearCurrentUser } from "../../store/authentication/authentication.action";
import { selectCurrentUser } from '../../store/authentication/authentication.selector';
import { isAuthenticated } from "../../utils/authentication/authentication.utils";
import { ReactComponent as HangmanLogo } from '../../assets/hagman_logo.svg'
import './navigation.styles.scss'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOutHandler = () => {
        dispatch(clearCurrentUser());
        localStorage.setItem("authenticated", "false");
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
                    <Link to='/results'>RESULTS</Link>
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