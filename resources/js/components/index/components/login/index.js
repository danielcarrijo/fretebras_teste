import api from './../../../services/api';
import { set } from 'lodash';
import React, { useState, useEffect, useContext } from 'react'
import { Container } from './style';
import { UserContext } from './../../../context/UserContext'
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { authenticated } = useContext(UserContext)
    const [formErrors, setFormErrors] = useState({
        email: '',
        password : '',
        general: ''
    });

    useEffect(() => {
        if(authenticated) {
            window.location.href = '/'
        }
    }, [])

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    
    const formValid = (formErrors, email, password) => {
        let valid = true;
        Object.values(formErrors).forEach(val => { 
            val.length > 0 && (valid = false)
        });

        if(email == '' || password == '') {
            valid = false
        }
        return valid; 
    }

    const handleChange = e => {
        const { name, value } = e.target
        let errors = formErrors
        if(error) {
            setError(false);
        }
        switch(name) {
            case 'email':
                setEmail(value)
                errors.email = emailRegex.test(value) ? "" : "Escreva o email no padrão correto"
                break
            case 'password':
                errors.password = value.length < 8 ? "Senha muito curta" : ""
                setPassword(value)
                break
        }
        setFormErrors(errors)
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password);
        if(formValid(formErrors, email, password)) {
            api.post('login', { email, password }).then(response => {
                localStorage.setItem('pineapple.jwt', response.data.access_token);
                window.location.href = '/';
            }).catch(err => {
                setError(true)
            })
        }else {
            let errors = formErrors
            errors.general = 'Preencha o formulário corretamente';
            setFormErrors(errors);
        }
    }

    console.log(formErrors);
    return (
        !authenticated && <Container>
            <form onSubmit={handleSubmit}>
                <div className="logo">
                    <img src="/img/logo.svg" />
                </div>
                <div className="form-row">
                    <div className="form-group col-12">
                        <input name="email" value={email} className="form-control w-100" onChange={handleChange}/>
                        <span>{formErrors.email}</span>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-12">
                        <input name="password" type="password" className="form-control" onChange={handleChange}/>
                        <span>{formErrors.password}</span><br />
                        <span style={{display : error ? 'block' : 'none' }}>Credenciais inválidas</span><br />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button type="submit" className="btn btn-secondary">Entrar</button>
                </div>
            </form>
        </Container>
    )
}
