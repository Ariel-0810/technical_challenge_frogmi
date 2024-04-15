// Detail.jsx
import styles from './Detail.module.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { postComment } from '../../redux/actions/actions';

const Detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true); 
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {        
        fetch(`http://localhost:3000/api/v1/features/${id}`)
            .then(response => response.json())
            .then(data => {
                setDetail(data); 
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching detail:', error);
                setLoading(false);
            });

        fetch(`http://localhost:3000/api/v1/features/${id}comments`)
            .then(response => response.json())
            .then(data => {
                setComments(data.comments); 
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(postComment(id, { body: commentText }));
            setCommentText('');
            fetch(`http://localhost:3000/api/v1/features/${id}`)
                .then(response => response.json())
                .then(data => {
                    setDetail(data);
                })
                .catch(error => {
                    console.error('Error fetching detail:', error);
                });
        } catch (error) {
            console.error('Error al enviar el comentario:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!detail) {
        return <div>No data available</div>;
    }
    return (
        <div className={styles.container}>
            <div>
                <NavBar></NavBar>
            </div>
            <h2>Detail of Earthquake</h2>
            <h3 className={styles.title}>Title: {detail.title}</h3>
            <p className={styles.detail}>Magnitude: {detail.magnitude}</p>
            <p className={styles.detail}>Place: {detail.place}</p>
            <p>Time: {detail.time}</p>
            <p>Tsunami: {detail.tsunami ? 'YES' : 'No'}</p>
            <p>Mag Type: {detail.mag_type}</p>
            <p>Magnitude: {detail.magnitude}</p>
            <p>Coordinates:</p>
            <p>Coordinates:</p>
            <p>Latitude: {detail.latitude}</p>
            <p>Longitud: {detail.longitude}</p>
            {detail.url && (
                <p style={styles.link}>
                    <a href={detail.url} target="_blank" rel="noopener noreferrer">
                        Link detail
                    </a>
                </p>
            )}
            <h3>Comentarios: </h3>
            <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
                <div className={styles.commentList}>
                {comments.map(comment => (
                    <div key={comment.id} className={styles.commentItem}>
                        <p>{comment.body}</p>
                    </div>
                ))}
                </div>
                <textarea
                className={styles.commentTextarea}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Escribe un comentario..."
                />
                <button className={styles.commentButton} type="submit">Agregar Comentario</button>
            </form>
        </div>
    );
};

export default Detail;

