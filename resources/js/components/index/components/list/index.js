import React, { useState, useEffect } from 'react'
import Item from './components/item'
import Pagamento from './components/pagamento'
export default function List(props) {
    const [items, setItems] = useState([])
    const [data, setData] = useState([])
    const [invoice, setInvoice] = useState({})
    useEffect(() => {
        setItems(props.items)
        setData(props.data)
        setInvoice(props.invoice)
    }, [props])
    return (
        <>
        <Pagamento items={data} invoice={invoice} />
        {items.map(item => (
            <Item key={item.id} item={item}/>
        ))}
            
        </>
    )
}
