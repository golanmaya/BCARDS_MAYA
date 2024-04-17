import './CardDetails.css'
import { ICard } from '../../interfaces/ICard'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiBase } from '../../config'




export default function CardDetails() {

    const { cardId } = useParams()

    const [card, setCard] = useState<ICard | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(`${apiBase}/cards/${cardId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json()
                if (!response.ok) throw new Error(data)
                setCard(data)
            } catch (err) {
                const errMessage = (err as Error).message
                setError(errMessage)
            }
        };
        fetchCard();
    }, [cardId])
    return (
        <div className='CardDetails Page'>
            <h3>Card Details</h3>
            <br></br>

            <div>
                {
                    (error) &&
                    <>
                        <h5>Error getting card '{cardId}' :</h5>
                        <p style={{ color: 'red' }}>{error}</p>
                    </>
                }
            </div>
            {
                (card) ?
                    <Container>

                        <Row className="g-5">
                            <Col>
                                <Card className="text-center">
                                    <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
                                    <Card.Body>
                                        <Card.Img variant="top" src={card.image.url} style={{ height: '200px', objectFit: 'cover' }} />
                                        <Card.Title>{card.subtitle}</Card.Title>
                                        <Card.Text>
                                            {card.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        <Button variant="primary" size='sm' className='mx-3' disabled><CiEdit className='me-1' size={22} style={{ marginTop: '-5px' }} />Edit Card</Button>
                                        <Button variant="danger" size='sm' className='mx-3' disabled><CiTrash className='me-1' size={22} style={{ marginTop: '-5px' }} />Delete Card</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col className='border rounded'>
                                <div className='py-5'>
                                    working on it...
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    :
                    null
            }
        </div>
    )
}
