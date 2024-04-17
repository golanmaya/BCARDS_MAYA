import './SignUp.css';
import { ChangeEvent, useContext, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastsContext } from '../../context/ToastsContext';
import { IUserDetails } from '../../interfaces/IUser';




export default function SignUp() {
    const [isBusy, setIsBusy] = useState<boolean>(false)
    const [formData, setFormData] = useState<IUserDetails>({
        _id: '',
        name: {
            first: '',
            middle: '',
            last: ''
        },
        phone: '',
        email: '',
        password: '',
        verifyPassword: '',
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
        isAdmin: false,
        isBusiness: false,
        createdAt: '',
        isBusy: false,
    });

    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBusy(true);
        if (!auth) {
            setIsBusy(false);
            return
        }

        const { error } = await auth?.signUp(
            {
                name: {
                    first: formData.name.first,
                    middle: formData.name.middle,
                    last: formData.name.last,
                },
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                image: {
                    url: 'https://cdns-images.dzcdn.net/images/artist/300b1c998b93b8a62b050a4b10b14b12/264x264.jpg',
                    alt: 'You wrote that this is NOT required 😉',
                },
                address: {
                    country: formData.address.country,
                    city: formData.address.city,
                    houseNumber: formData.address.houseNumber,
                    street: formData.address.street,
                    zip: formData.address.zip,
                    state: formData.address.state,
                },
                isBusiness: formData.isBusiness,
            }
        )

        if (error) {
            toasts?.addToast('⚠️', 'Error Signing-Up', error, 'danger')
        } else {
            toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please sign in with your credentials.`, 'success')
            navigate('/signin')
        }
        formData.isBusy = false
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;

        if (type !== 'checkbox') {
            setFormData(prevFormData => ({
                ...prevFormData,
                name: {
                    ...prevFormData.name,
                    [name]: value
                },
                email: name === "email" ? value : formData.email,
                phone: name === "phone" ? value : formData.phone,
                password: name === "password" ? value : formData.password,
                verifyPassword: name === "verifyPassword" ? value : formData.verifyPassword,
                address: {
                    ...prevFormData.address,
                    [name]: value
                },
                isBusiness: name === "isBusiness" ? !formData.isBusiness : formData.isBusiness,
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                isBusiness: checked
            }));
        }
    };

    return (
        <div className='SignUp Page'>
            <h3>Sign Up</h3> <br />
            <Container>
                <Col xs='auto' className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
                    <span>Please fill up your detailes. Password must
                        be at least 9 characters long and contain an uppercase and a lowercase
                        letter, a number and one of the following characters !@#$%^&*-</span> <br></br><br>
                    </br>
                    <Form onSubmit={handleSubmit}>
                        <Row xs={1} lg={3} className="mb-4">
                            <Form.Group as={Col} /* controlId="formGridFirstName" */>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    id='formGridFirstName'
                                    type="text"
                                    name="first"
                                    placeholder="First Name*"
                                    value={formData.name.first}
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                    minLength={2}
                                    maxLength={8}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row xs={1} lg={2} className="mb-4">
                            <Form.Group as={Col} /* controlId="formGridEmail" */>
                                <Form.Label>Contact Details</Form.Label>
                                <Form.Control
                                    id='formGridEmail'
                                    type="email"
                                    name="email"
                                    placeholder="E-mail Address*"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

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
                        <Row xs={1} lg={2} className="mb-4">
                            <Form.Group as={Col} /* controlId="formGridPassword" */>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id='formGridPassword'
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} /* controlId="formGridVerifyPassword" */>
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control
                                    id='formGridVerifyPassword'
                                    type="password"
                                    name="verifyPassword"
                                    placeholder="Verify Password"
                                    value={formData.verifyPassword}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row xs={1} lg={3} className="mb-4">
                            <Form.Group as={Col} /* controlId="formGridhouseNumber" */>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    id='formGridhouseNumber'
                                    type="text"
                                    name="houseNumber"
                                    placeholder="House Number"
                                    value={formData.address.houseNumber}
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} /* controlId="formGridCity" */>
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control
                                    id='formGridCity'
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.address.city}
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mt-1">
                            <Form.Group className="mb-5" id="formGridIsBusiness">
                                <Form.Check type="checkbox" label="Yes" checked={formData.isBusiness} onChange={handleInputChange} />
                            </Form.Group>
                        </Row>
                        <Button type='submit'
                            variant='info'
                            className='mt-4'
                            disabled={isBusy}>
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
                            Sign Up</Button>
                    </Form >
                </Col>
            </Container>
        </div>
    );
}

