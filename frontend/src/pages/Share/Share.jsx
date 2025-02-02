import './Share.css';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import Img from '../../images/media.png';

function Share() {
    const navigate = useNavigate();
    const user_id = Cookies.get('user_id');

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const jsonData = JSON.stringify({user_id, ...formObject});

        try {
            const response = await fetch('http://localhost:8000/create_note/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                alert(errorMessage.message);
                return;
            }

            navigate('/notes/');
        } catch (error) {
            alert('Something went wrong');
        }
    };

    return (
        <>
            <div className="block"></div>
            <div className="form_container">
                <form id="share-form" onSubmit={onSubmit} className="share-form">
                    <h2 className="form_title">Send Note to friend</h2>

                    <label htmlFor="title">Title</label>
                    <textarea id="title" name="title"></textarea>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" cols="40" rows="4" style={{height: '101px'}}></textarea>

                    <label htmlFor="category">Category</label>
                    <textarea id="category" name="category" type="text"></textarea>

                    <label htmlFor="user">User</label>
                    <textarea id="user" name="user" type="text"></textarea>

                    <input type="submit" value="Send"/>
                </form>
                <img src={Img} className="share-image"/>
            </div>
            <span className="star_share">⭐</span>
            <span className="rocket">🚀</span>
        </>
    );
}

export default Share;
