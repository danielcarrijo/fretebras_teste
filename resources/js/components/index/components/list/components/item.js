import React, {useState, useEffect } from 'react'
import { Container } from './style'

export default function Item(props) {
    const [item, setItem] = useState({})
    useEffect(() => {
        setItem(props.item)
    }, [])
    return (
        <Container>
            {item && item.price && (item.price > 0 ? <div className="green-ball"></div> : <div className="chargeback"><img src="/img/estorno.svg" /></div> )}
            <div className="container">
                <div className="row">
                    <div className="info col-10">
                        <div className="store">{item?.store?.name}</div>
                        <div className="price"> R$ {item && item.price ? (item.price > 0 ? item.price : item.price * (-1)): ''}</div>
                        <div className="price"> {item && item.score ? (item.score.toFixed(2)) + 'pts': '0pts'}</div>
                        {item && item.price && item.price < 0 &&
                        <div className="chargeback-message">
                            <div>Estorno</div>
                        </div>}
                    </div>
                    <div className="date col-2">
                        <div className="ml-auto">{item?.formatted_date}</div>
                    </div>
                    
                </div>
                
            </div>
        </Container>
    )
}
