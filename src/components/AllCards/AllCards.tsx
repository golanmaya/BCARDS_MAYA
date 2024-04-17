import './AllCards.css'
import { useState, useEffect, useContext } from 'react'
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ICard } from '../../interfaces/ICard'
import { doGetAllCards } from '../../services/Cards'
import CardFooter from '../CardFooter/CardFooter'
import { AuthContext } from '../../context/AuthContext'
import { SearchContext } from '../../context/SerchContext'


export default function AllCards() {
    const [cards, setCards] = useState<null | ICard[]>(null)
    const [error, setError] = useState<null | string>(null)

    const auth = useContext(AuthContext)
    const navigate = useNavigate()


    const search = useContext(SearchContext);
    useEffect(() => {
        const getAllCards = async () => {
            const { error, result } = await doGetAllCards()
            if (error) {
                setError(error)
            } else {
                setCards(result)
            }
        }
        getAllCards();
    }, [])

    const goToCardDetails = (cardId: string) => {
        navigate(`/card-details/${cardId}`, { state: { cardId: cardId } })
    }
    return (
        <div className='AllCards'>
            <div>
                {
                    (error) &&
                    <p style={{ color: 'red' }}>Error getting cards 😔
                        <br></br>
                        {error}
                    </p>
                }
            </div>
            {
                (cards) ?
                    <>
                        <Row xs={1} md={2} lg={3} xl={4} className='g-5'>
                            {cards.filter((card) => (
                                card.title.includes(search!.term!)
                            )).map((card) => (
                                <Col key={card._id} className='mb-4'>
                                    <Card className="text-center h-100">
                                        <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Img variant="top" src={card.image.url} style={{ height: '200px', objectFit: 'cover' }} />
                                            <Card.Title>{card.subtitle}</Card.Title>
                                            <Card.Text className="flex-grow-1 overflow-auto">
                                                {card.description}
                                            </Card.Text>
                                            <Button variant="outline-warning" size='sm' onClick={() => goToCardDetails(card._id)}>Go to card</Button>
                                        </Card.Body>
                                        {
                                            (auth?.userDetails?.isBusiness) && (
                                                <CardFooter id={card._id} bizNumber={card.bizNumber} />
                                            )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <h2>Showing {cards?.length} cards</h2>

                    </>
                    :
                    (!error) &&
                    <>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            variant='primary'
                            aria-hidden="true"
                            className='me-2'
                        />
                        <span>Loading cards, Please wait ...</span>
                    </>
            }
        </div>
    )
}
