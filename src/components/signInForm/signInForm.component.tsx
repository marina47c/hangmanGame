import { FormEvent, useState, useContext } from 'react';
import { Button } from '@radix-ui/themes/dist/cjs/components/button';
import * as Form from '@radix-ui/react-form';

import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/authentication/authentication.action';

import './signInForm.styles.scss'
import { redirect, useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setCurrentUser({name}))
        localStorage.setItem("authenticated", "true");
        setName('');
        navigate('/');
    }

    return (
        <>
            <h1>Sign in:</h1>
            <Form.Root className="sign-in-form" onSubmit={handleSubmit}>
                <Form.Field className="name-field" name="name" onChange={handleChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Message className="name-message" match="valueMissing">
                        Please enter your name.
                    </Form.Message>
                    <Form.Control asChild  value={name}>
                        <input required name="name"/>
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <Button>
                        Sign in
                    </Button>
                </Form.Submit>
            </Form.Root>
        </>
    )
};

export default SignInForm;

