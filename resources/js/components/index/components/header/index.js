import React, { useState, useEffect } from 'react'
import { Container } from './style';
export default function Header(props) {
    const [user, setUser] = useState({})
    const [box, setBox] = useState(false)
    useEffect(() => {
        setUser(props.user)
    }, [props])

    const handleBox = () => {
        props.handleStore('')
        setBox(!box)
    }

    const handleSearch = e => {
        const { value } = e.target
        props.handleStore(value)
    }
    return (
        <Container>
            {!box ?
            <>
            <div className="user ml-3">
                <span className="text-white h4">
                    <i className="fas fa-user"></i>
                </span>
                <div className="score" >{Math.round(user.scores)}pts</div>
            </div>
            <div className="logo">
                <img src="/img/logo.svg" />
            </div>
            <div className="search mr-3" onClick = {() => handleBox()}>
                <span className="text-white h5"><i className="fas fa-search"></i></span>
            </div>
            </>:
            <div className="container">
                <div className="search-box w-100 row">
                    <input 
                        className="form-control" 
                        placeholder="Digite o nome do estabalecimento" 
                        onChange = {handleSearch}
                    />
                    <span className="close" onClick = {() => handleBox()}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
            </div>}
        </Container>
    )
}
