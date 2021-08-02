import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editUser, deleteUser } from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
import UserHistory from './UserHistory';
import UserLikes from './UserLikes';
import styles from '../../css-modules/Profile.module.css';
import profileImg from '../../assets/profile-img.png';

export default function Profile() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showEditForm, setShowEditForm] = useState(false);

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const errors = [];
        if (!username) errors.push('Please provide a username.');
        if (confirmPassword && password !== confirmPassword) errors.push('Password and confirm password must match.');
        setErrors(errors);
    }, [username, email, password, confirmPassword]);

    const onSave = async (e) => {
        e.preventDefault();
        const payload = {
            id: user.id,
            username: username,
            email: email,
            password: password,
            profile_img: ''
        };
        const data = await dispatch(editUser(payload));
        if (data) {
            setErrors(data);
        } else {
            setShowEditForm(false);
        }
    };

    return(
        <div className={styles.profile}>
            <div className={styles.editForm}>
                <div>
                    <h1>Hi, {user.username}!</h1>
                    <img src={profileImg} alt='default'/>
                </div>
                {showEditForm ? (
                    <>
                        <form onSubmit={onSave}>
                            <div>
                                {errors.map((error, ind) => (<div key={ind}>{error}</div>))}
                            </div>
                            <div>
                                <input
                                    name='username'
                                    type='text'
                                    placeholder={username ? username : 'Username'}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    name='email'
                                    type='text'
                                    placeholder={email ? email : 'Email'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    name='confirmPassword'
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type='submit'>Save</button>
                            <button type='button' onClick={() => setShowEditForm(false)}>Cancel</button>
                        </form>
                    </>
                ) : (
                    <>
                        <div>{user.email}</div>
                        <button type='button' onClick={() => setShowEditForm(true)}>Edit</button>
                        {/* <button type='button'>Delete</button> */}
                    </>
                )}
                <div><LogoutButton /></div>
            </div>
            <div><UserLikes /></div>
            <div><UserHistory /></div>
        </div> 
    );
};