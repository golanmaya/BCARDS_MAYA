import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';
import { IUserUpdate } from '../../interfaces/IUser';
import { doUpdate, fetchUserDetails, getToken } from '../../services/User';




export default function UpdatUser() {
    const [isBusy, setIsBusy] = useState<boolean>(false)
    const [formData, setFormData] = useState<IUserUpdate>({
        name: {
            first: '',
            middle: '',
            last: ''
        },
        phone: '',
        image: {
            url: 'https://cdns-images.dzcdn.net/images/artist/300b1c998b93b8a62b050a4b10b14b12/264x264.jpg',
            alt: 'You wrote that this is NOT required 😉',
        },
        address: {
            country: '',
            city: '',
            houseNumber: '',
            street: '',
            zip: '',
        },
    });

    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const userData = (await fetchUserDetails());
            if (userData.result) {
                const user = userData.result;
                setFormData({
                    address: {
                        city: user.address.city,
                        country: user.address.country,
                        houseNumber: user.address.houseNumber,
                        zip: user.address.zip,
                        street: user.address.street,
                    },
                    name: {
                        first: user.name.first,
                        middle: user.name.middle,
                        last: user.name.last,
                    },

                    phone: user.phone,
                    image: {
                        url: user.image.url,
                        alt: user.image.alt,
                    }
                });
            }
        };
        getUser();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBusy(true);
        if (!auth) {
            setIsBusy(false);
            return
        }

        const update = async () => {
            const token = await getToken()
            const error = await doUpdate(token!, formData, auth?.userDetails?._id!);

            if (error.error) {
                toasts?.addToast('⚠️', 'Error Signing-Up', error.error, 'danger');
            } else {
                toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please sign in with your credentials.`, 'success')
                navigate('/signin')
            }
        }
        setIsBusy(false)
        update();
    };

    const handleInputChangeAddress = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            address: {
                ...prevFormData.address,
                [name]: value
            },
        }));
    }
    const handleInputChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            name: {
                ...prevFormData.name,
                [name]: value
            },
        }));
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className='UpdatUser Page'>
            <h3>Update profile</h3> <br />
            <Container>

                <Col xs='auto' className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-4">
                            <Form.Group as={Col} /* controlId="formGridFirstName" */>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    id='formGridFirstName'
                                    type="text"
                                    name="first"
                                    placeholder="First Name*"
                                    value={formData.name.first}
                                    onChange={handleInputChangeName}
                                    minLength={2}
                                    maxLength={8}
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} /* controlId="formGridMiddleName" */>
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control
                                    id='formGridMiddleName'
                                    type="text"
                                    name="middle"
                                    placeholder="Middle Name"
                                    value={formData.name.middle}
                                    onChange={handleInputChangeName}
                                />
                            </Form.Group>
                            <Form.Group as={Col} /* controlId="formGridLastName" */>
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control
                                    id='formGridLastName'
                                    type="text"
                                    name="last"
                                    placeholder="Last Name*"
                                    value={formData.name.last}
                                    onChange={handleInputChangeName}
                                    minLength={2}
                                    maxLength={8}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-4">

                            <Form.Group as={Col} /* controlId="formGridPhone" */>
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control
                                    id='formGridPhone'
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number*"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Row>


                        <Row className="mb-4">
                            <Form.Group as={Col} /* controlId="formGridhouseNumber" */>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    id='formGridhouseNumber'
                                    type="text"
                                    name="houseNumber"
                                    placeholder="House Number"
                                    value={formData.address.houseNumber}
                                    onChange={handleInputChangeAddress}
                                />
                            </Form.Group>
                            <Form.Group as={Col} /* controlId="formGridStreet" */>
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control
                                    id='formGridStreet'
                                    type="text"
                                    name="street"
                                    placeholder="Street Name"
                                    value={formData.address.street}
                                    onChange={handleInputChangeAddress}
                                />
                            </Form.Group>

                        </Row>

                        <Row className="mb-4">
                            <Form.Group as={Col} /* controlId="formGridCountry" */>
                                {/* <Form.Label>&nbsp;</Form.Label> */}
                                <Form.Control
                                    id='formGridCountry'
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.address.country}
                                    onChange={handleInputChangeAddress}
                                />
                            </Form.Group>
                            <Form.Group as={Col} /* controlId="formGridCity" */>
                                {/* <Form.Label>&nbsp;</Form.Label> */}
                                <Form.Control
                                    id='formGridCity'
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.address.city}
                                    onChange={handleInputChangeAddress}
                                />
                            </Form.Group>
                            <Form.Group as={Col} /* controlId="formGridZip" */>
                                {/* <Form.Label>&nbsp;</Form.Label> */}
                                <Form.Control
                                    id='formGridZip'
                                    type="tel"
                                    name="zip"
                                    placeholder="Zip code"
                                    value={formData.address.zip}
                                    onChange={handleInputChangeAddress}
                                />
                            </Form.Group>
                        </Row>

                        <Button
                            type='submit'
                            variant='info'
                            disabled={isBusy}
                            className='mt-4'>
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
                            Submit changes</Button>
                    </Form >
                </Col>
            </Container>
        </div >
    );
}

