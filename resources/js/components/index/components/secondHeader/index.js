import React, { useState, useEffect } from 'react'
import { Container } from './style'

export default function SecondHeader(props) {
    const [invoices, setInvoices] = useState([])
    const [invoice, setInvoice] = useState(0)
    useEffect(() => {
        setInvoices(props?.invoices)
        setInvoice(props?.invoice)
    }, [props])

    useEffect(() => {
        if(invoices && invoices.length && !invoice) {
            let id = invoices[0].id;
            invoices.map((item, key) => {
                if(item.current == true) {
                    id = item.id;
                }
            })
            props.handleInvoiceId(id)
        }
    }, [invoices])

    return (
        <>
            {invoices.map((item, key) => (
                item.id == invoice &&
                <div key={item.id}>
                    <Container> 
                        <div className="main-text" style={item.status == 'prev' ? green : (item.status == 'next' ? yellow : (item.status == 'open' ? yellow : red))}>
                            {invoices[key+1] && <div className="seta esquerda" onClick={() => props.handleInvoiceId(invoices[key+1].id)}>
                                <img src="/img/seta.svg" />
                            </div>}
                            <h5>Vencimento {item.pay_date}</h5>

                            {invoices[key-1] && <div className="seta direita" onClick={() => props.handleInvoiceId(invoices[key-1].id)}>
                                <img src="/img/seta.svg" />
                            </div>}
                        </div>
                    </Container>
                </div>
            ))}
        </>
    )
}

const green = {
    backgroundColor: '#5AF27D'
}

const red = {
    backgroundColor : '#F42C2C'
}

const yellow = {
    backgroundColor: '#F8B600'
}