import { useNavigate } from 'react-router-dom'
import './MyCards.css'
import { useEffect, useState } from 'react'
import { ICard } from '../../interfaces/ICard'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import { doGetMyCards } from '../../services/Cards'
import DeleteBtn from '../../components/DeleteBtn/DeleteBtn'


export default function MyCards() {

    const [cards, setCards] = useState<ICard[] | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const navigate = useNavigate();

    useEffect(() => {
        const getMyCards = async () => {
            const { error, result } = await doGetMyCards()
            if (error) {
                setError(error)
            } else {
                setCards(result)
            }
        }
        getMyCards();
    }, [])

    const goToCardDetails = (cardId: string) => {
        if (cardId) {
            navigate(`/card-details/${cardId}`,
                { state: { cardId: cardId } })
        }
    }
    const goToCardUpdate = (cardId: string) => {
        if (cardId) {
            navigate(`/update-card/${cardId}`,
                { state: { cardId: cardId } })
        }
    }

    return (
        <div className='MyCards Page'>
            <h3>My Cards</h3>
            <br></br>

            <div>
                {(error) && <p>Error getting cards 😞 <br></br> {error}</p>}
            </div>
            {
                (cards) ?
                    <>
                        <Row xs={1} md={2} lg={3} xl={4} className="g-5">
                            {cards.map((card) => (
                                <Col key={card._id}>
                                    <Card className="text-center">
                                        <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Img variant="top" src={card.image.url} style={{ height: '200px', objectFit: 'cover' }} />
                                            <Card.Title>{card.subtitle}</Card.Title>
                                            <Card.Text>
                                                {card.description}
                                            </Card.Text>
                                            <Button variant="outlin-info" size='sm' onClick={() => goToCardDetails(card._id)}>Go to card</Button>
                                            <Button variant="outlin-info" size='sm' onClick={() => goToCardUpdate(card._id)}>edit</Button>
                                            <DeleteBtn id={card._id} bizNumber={card.bizNumber}></DeleteBtn>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">{card.likes.length} <AiOutlineLike size={18} style={{ marginTop: '-5px' }} /></Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <h5>Total {cards?.length} card</h5>
                    </>
                    :
                    (!error) &&
                    <>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            variant='info'
                            aria-hidden="true"
                            className='me-2'
                        />
                        <span>Loading cards, Please wait ...</span>
                    </>
            }
        </div>
    )
}
