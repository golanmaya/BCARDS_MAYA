import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './UpdateCard.css';
import { ICardData } from '../../interfaces/ICard';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { apiBase } from '../../config';
import { Form, Button, Col, Container, Row, Spinner } from 'react-bootstrap';

export default function UpdateCard() {
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [cardData, setCardData] = useState<ICardData>({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: {
            url: '',
            alt: '',
        },
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: '',
        }
    });

    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext);
    const navigate = useNavigate();
    const { cardId: id } = useParams();

    const token: string | null = localStorage.getItem('userToken');
    if (!token) throw new Error('User token not found');

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                if (!id) {
                    console.error('ID is undefined');
                    return;
                }

                const response = await fetch(`${apiBase}/cards/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token,
                    }
                });

                if (!response.ok) {
                    const errorMessage = await response.text(); // Get error message from response body
                    throw new Error(`Failed to fetch card data: ${errorMessage}`);
                }

                const card = await response.json();
                setCardData(card);
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };

        fetchCardData();
    }, [id]);

    const handleUpdateCardSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) {
            setIsBusy(false);
            return
        }
        setIsBusy(true);

        const token: string | null = localStorage.getItem('userToken');
        if (!token) throw new Error('User token not found');
        try {


            const cardDetails: ICardData = {
                title: cardData.title,
                subtitle: cardData.subtitle,
                description: cardData.description,
                phone: cardData.phone,
                email: cardData.email,
                web: cardData.web,
                image: {
                    url: cardData.image.url,
                    alt: cardData.image.alt,
                },
                address: {
                    state: cardData.address.state,
                    country: cardData.address.country,
                    city: cardData.address.city,
                    street: cardData.address.street,
                    houseNumber: cardData.address.houseNumber,
                    zip: cardData.address.zip,
                },
            };


            const response = await fetch(`${apiBase}/cards/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(cardDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update card data');
            }
            const data = await response.json();
            const result: ICardData = data;

            toasts?.addToast('🎉', 'Card updated successfully!', 'success');
            navigate('/my-cards');
            return result;



        } catch (error) {
            console.error('PUT card data error:', error);
            toasts?.addToast('⚠️', 'Error updating card', 'danger');
        }

        setIsBusy(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setCardData(prevCardData => ({
            ...prevCardData,
            title: name === "title" ? value : cardData.title,
            subtitle: name === "subtitle" ? value : cardData.subtitle,
            description: name === "description" ? value : cardData.description,
            phone: name === "phone" ? value : cardData.phone,
            email: name === "email" ? value : cardData.email,
            web: name === "web" ? value : cardData.web,
            image: {
                ...prevCardData.image,
                [name]: value,
            },
            address: {
                ...prevCardData.address,
                [name]: value,
            },

        }));
    }

    return (
        <div className='UpdateCard Page'>
            <h3>Update Card</h3> <br />
            <Container>
                {(cardData) ?
                    <>
                        <Row>
                            <Col xs='auto' className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
                                <Form onSubmit={handleUpdateCardSubmit}>
                                    <Row className="mb-4">
                                        <Form.Group as={Col} /* controlId="formGridFirstName" */>
                                            <Form.Label>Card</Form.Label>
                                            <Form.Control
                                                id='formGridCardTitle'
                                                type="text"
                                                name="title"
                                                placeholder="Card Title*"
                                                value={cardData.title}
                                                onChange={handleInputChange}
                                                minLength={2}
                                                maxLength={56}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} /* controlId="formGridMiddleName" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardSubtitle'
                                                type="text"
                                                name="subtitle"
                                                placeholder="Card Subtitle"
                                                value={cardData.subtitle}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} /* controlId="formGridLastName" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardDescription'
                                                type="text"
                                                name="description"
                                                placeholder="Card Description*"
                                                value={cardData.description}
                                                onChange={handleInputChange}
                                                minLength={2}
                                                maxLength={56}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-4">
                                        <Form.Group as={Col} /* controlId="formGridEmail" */>
                                            <Form.Label>Contact Details</Form.Label>
                                            <Form.Control
                                                id='formGridCardPhone'
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone*"
                                                value={cardData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} /* controlId="formGridPhone" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardEmail'
                                                type="email"
                                                name="email"
                                                placeholder="E-Mail*"
                                                value={cardData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-4">
                                        <Form.Group as={Col} /* controlId="formGridPassword" */>
                                            <Form.Label>Web</Form.Label>
                                            <Form.Control
                                                id='formGridCardweb'
                                                type="text"
                                                name="web"
                                                placeholder="Web URL"
                                                value={cardData.web}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-4">
                                        <Form.Group as={Col} /* controlId="formGridVerifyPassword" */>
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control
                                                id='formGridCardImage URL'
                                                type="text"
                                                name="url"
                                                placeholder="Image URL"
                                                value={cardData.image?.url}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>


                                        <Form.Group as={Col} /* controlId="formGridhouseNumber" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardImageAlt'
                                                type="text"
                                                name="alt"
                                                placeholder="Image Alt"
                                                value={cardData.image?.alt}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-4">
                                        <Form.Group as={Col} /* controlId="formGridStreet" */>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                id='formGridCardState'
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                value={cardData.address?.state}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>




                                        <Form.Group as={Col} /* controlId="formGridCountry" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardCountry'
                                                type="text"
                                                name="country"
                                                placeholder="Country"
                                                value={cardData.address?.country}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} /* controlId="formGridCity" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardCity'
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                value={cardData.address?.city}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} /* controlId="formGridZip" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardStreet'
                                                type="text"
                                                name="street"
                                                placeholder="Street"
                                                value={cardData.address?.street}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} /* controlId="formGridZip" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardHouseNumber'
                                                type="tel"
                                                name="houseNumber"
                                                placeholder="House Number"
                                                value={cardData.address?.houseNumber}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} /* controlId="formGridZip" */>
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Control
                                                id='formGridCardZip'
                                                type="tel"
                                                name="zip"
                                                placeholder="Zip code"
                                                value={cardData.address?.zip}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Button type='submit' disabled={isBusy}>
                                        {
                                            (isBusy) &&
                                            <Spinner
                                                className='me-3'
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        }
                                        Update Card</Button>
                                </Form >
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                        <Spinner animation="border" size="sm" />
                        <Spinner animation="border" />
                        <Spinner animation="grow" size="sm" />
                        <Spinner animation="grow" />

                    </>
                }
            </Container>
        </div>
    );
}
