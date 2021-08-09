import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
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
    const [showHistory, setShowHistory] = useState(true);

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState(user?.password);
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSave = async (e) => {
        e.preventDefault();
        setErrors([]);

        let errors = [];
        if (!username) errors.push('Please provide a username.');
        if (!email) errors.push('Please provide an email.');
        if (confirmPassword && password !== confirmPassword) errors.push('Password and confirm password must match.');

        if (!errors.length) {
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
        } else {
            setErrors(errors);
        };
    };

    return(
        <div className={styles.profile}>
            <div className={styles.editForm}>
                <div className={styles.editForm__message}>
                    <h2>Hi, {user.username}!</h2>
                    {/* <img src={profileImg} alt='default'/> */}
                </div>
                {showEditForm ? (
                    <>
                        {errors.map((error, ind) => (
                            <div key={ind} className={styles.errors}>{error}</div>
                        ))}
                        <form onSubmit={onSave}>
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
                            <button className={styles.cancelButton} type='button' onClick={() => setShowEditForm(false)}>Cancel</button>
                        </form>
                    </>
                ) : (
                    <>
                        <button type='button' onClick={() => setShowEditForm(true)}>Edit profile</button>
                        <LogoutButton />
                        {/* <button type='button'>Delete</button> */}
                    </>
                )}
            </div>
            <div className={styles.usersDrawingsContainer}>
                <div className={styles.switch}>
                    <button onClick={() => setShowHistory(true)}>My drawings</button>
                    <button onClick={() => setShowHistory(false)}>Liked drawings</button>
                </div>
                <div className={styles.usersDrawings}>
                    {showHistory ? (
                        <UserHistory />
                    ) : (
                        <UserLikes />
                    )}
                </div>
            </div>
        </div> 
    );
};