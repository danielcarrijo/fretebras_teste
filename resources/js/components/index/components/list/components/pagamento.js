import React, {useState, useEffect } from 'react'
import { Container } from './pagamento-style'

export default function Pagamento(props) {
    const [value, setValue] = useState(0)
    const [invoice, setInvoice] = useState({})
    useEffect(() => {
        if(props.items && props.items.value) {
            setValue(props.items.value)
        }
        setInvoice(props.invoice)
    }, [props])
    return (
        <div>
            <Container>
                <div className="ball" style={invoice.status == 'prev' ? greenBackground : (invoice.status == 'next' ? yellowBackground : (invoice.status == 'open' ? yellowBackground : redBackground))}></div>
                <div className="container">
                    <div className="row">
                        <div className="info col-10">
                            <div className="payment" style={invoice.status == 'prev' ? green : (invoice.status == 'next' ? yellow : (invoice.status == 'open' ? yellow : red))}>{invoice.status == 'prev' ? 'Pagamento Realizado' : (invoice.status == 'next' ? 'Próxima fatura' : (invoice.status == 'open' ? 'Fatura aberta' : 'Fatura fechada'))}</div>
                            <div className="price"> R$ {value ? value : 0}</div>
                            <div className="price"> {invoice && invoice.scores ? (invoice.scores.toFixed(2)) + 'pts': '0pts'}</div>
                        </div>
                        <div className="date col-2">
                            <div className="ml-auto">02:39</div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

const green = {
    color: '#3AEA63'
}

const red = {
    color: '#F42C2C'
}

const yellow = {
    color: '#F8B600'
}

const greenBackground = {
    background: '#3AEA63'
}

const redBackground = {
    background: '#F42C2C'
}

const yellowBackground = {
    background: '#F8B600'
}
