import { useSelector } from 'react-redux';
import { useState } from 'react';
import { editUser, deleteUser } from '../../store/session';
import UserHistory from './UserHistory';
import UserLikes from './UserLikes';
import styles from '../../css-modules/Profile.module.css';

export default function Profile() {
    const user = useSelector(state => state.session.user);
    const [showEditForm, setShowEditForm] = useState(false);
    


    return(
        <div>
            <div>
                {showEditForm ? (
                    <>
                        <form>

                            <button type='submit'>Save</button>
                        </form>
                    </>
                ) : (
                    <>
                        <div>Hi, {user.username}!</div>
                        <div>show user's default profile img</div>
                        <div>Email: {user.email}</div>
                        <button type='button' onClick={() => setShowEditForm(true)}>Edit</button>
                        {/* <button type='button'>Delete</button> */}
                    </>
                )}
            </div>
            <div><UserLikes /></div>
            <div><UserHistory /></div>
        </div> 
    );
};