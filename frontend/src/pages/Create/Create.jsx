import "./Create.css";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function Create() {
    const navigate = useNavigate();
    const user_id = Cookies.get("user_id");

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const jsonData = JSON.stringify({user_id, ...formObject});

        try {
            const response = await fetch(
                "http://localhost:8000/create_note/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: jsonData,
                }
            );

            if (!response.ok) {
                const errorMessage = await response.json();
                alert(errorMessage.message);
                return;
            }

            navigate("/notes/");
        } catch (error) {
            alert("Something went wrong");
        }
    };

    return (
        <>
            <span className="star left"></span>
            <span className="star right"></span>
            <span className="star right3"></span>
            <span className="home_circle"></span>
            <span className="home_circle left"></span>
            <span className="rocket_create">⭐</span>
            <span className="star right2"></span>
            <form onSubmit={onSubmit} className="sect">
                <h2>Create a Note</h2>
                <label htmlFor="title" className="input-label">Title</label>
                <input type="text" id="title" name="title"/>
                <label htmlFor="note_category" className="input-label">Category</label>
                <input type="text" id="note_category" name="note_category"/>
                <label htmlFor="note_content" className="input-label">Content</label>
                <input
                    name="content"
                    rows="4"
                    required=""
                    id="note_content"
                />
                <button type="submit">Create</button>
            </form>


        </>
    );
}

export default Create;
