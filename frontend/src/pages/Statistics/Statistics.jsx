import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import "./Statistics.css"

function formatDate(date) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

function Statistics() {
    const [list, setList] = useState([]);
    const user_id = Cookies.get("user_id");

    const getData = async () => {
        const data = await fetch(
            "http://127.0.0.1:8000/notes/" + user_id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((data) => data.json());
        setList(JSON.parse(data.data)?.map((item) => item.fields) ?? []);
    };

    useEffect(() => {
        getData();
    }, []);

    // console.log(list);

    // Створюємо об'єкт Map для групування нотаток за датою
    const groupedNotes = new Map();
    list.forEach(note => {
        const date = new Date(note.created_at);
        const formattedDate = formatDate(date);
        if (!groupedNotes.has(formattedDate)) {
            groupedNotes.set(formattedDate, []);
        }
        groupedNotes.get(formattedDate).push(note);
    });

    return (

        <>
            <div className="note-container">
                <span className="star left"></span>
                <span className="star right"></span>
                <span className="star right3"></span>
                <span className="home_circle"></span>
                <span className="home_circle left"></span>
                <span className="star right2"></span>
                {[...groupedNotes].map(([date, notes]) => (
                    <div key={date} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <h2>{date}</h2>
                        {notes.map((note, index) => {
                            if (!note.title || !note.content) {
                                // Handle null or undefined values, or skip rendering for such notes
                                return null;
                            }
                            const truncatedTitle = note.title.length > 20 ? `${note.title.slice(0, 20)}...` : note.title;
                            const truncatedContent = note.content.length > 70 ? `${note.content.substring(0, 70)}...` : note.content;
                            const backgroundColor = index % 2 === 0 ? '#fff' : '#f5edff'; // Alternating colors
                            return (
                                <div key={`${date}-${index}`} className="note-block" style={{
                                    padding: '15px',
                                    borderRadius: '8px',
                                    backgroundColor
                                }}>
                                    <h3>{truncatedTitle}</h3>
                                    <p>{truncatedContent}</p>
                                </div>
                            );
                        })}

                    </div>
                ))}
            </div>

        </>
    );


}


export default Statistics;
