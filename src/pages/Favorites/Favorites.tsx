import { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { ICard } from "../../interfaces/ICard";
import { doGetAllCards, goToCardDetails } from "../../services/Cards";
import { AuthContext } from "../../context/AuthContext";
import { getToken } from "../../services/User";

export default function Favorites() {
    const [favCards, setFavCards] = useState<ICard[] | undefined>([]);
    const [error, setError] = useState<string | null>(null);
    const auth = useContext(AuthContext);

    useEffect(() => {

        const fetchFavorite = async () => {
            const token = await getToken();
            try {

                if (!token) {
                    setError("Authentication token not available");
                    return;
                }

                const { error, result } = await doGetAllCards();

                if (error) {
                    setError(error);
                } else {
                    setFavCards(result?.filter(card => (card.likes.includes(auth?.userDetails?._id!))));
                }
            } catch (err) {
                setError("Error fetching favorite cards");
            }
            console.log(favCards);
        };
        fetchFavorite();
    }, [auth]);

    return (
        <div className='AllCards'>
            {error ? (
                <h6 style={{ color: 'red' }}>Error getting favorite cards 😔<br />{error}</h6>
            ) : (
                <>
                    {favCards && favCards.length > 0 ? (
                        <Row xs={1} md={2} lg={3} xl={4} className='g-5'>
                            {favCards.map((card) => (
                                <Col key={card._id}>
                                    <Card className="text-center">
                                        <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Img variant="top" src={card.image.url} style={{ height: '200px', objectFit: 'cover' }} />
                                            <Card.Title>{card.subtitle}</Card.Title>
                                            <Card.Text>{card.description}</Card.Text>
                                            <Button variant="primary" size='sm' onClick={() => goToCardDetails(card._id)}>Go to card</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No favorite cards found</p>
                    )}
                </>
            )}
        </div>
    );
};