'use client'; // Mark this as a client component
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container, Row, Col, Alert, Card, Spinner } from 'react-bootstrap';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3005/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setIsLoading(false);
                router.push('/Movies');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{  height: '100vh' }}
        >
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <Card className="shadow p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                            />
                                            Logging in...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
