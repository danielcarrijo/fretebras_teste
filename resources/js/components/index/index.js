import { data } from 'jquery'
import React, { useState, useEffect, useContext } from 'react'
import Header from './components/header'
import SecondHeader from './components/secondHeader'
import api from './../services/api'
import List from './components/list'
import debounce from "lodash.debounce";
import { identity } from 'lodash'
import { UserContext } from '../context/UserContext'

export default function Index() {
    const [items, setItems] = useState([])
    const [data, setData] = useState({})
    const [time, setTime] = useState(0)
    const [invoices, setInvoices] = useState([])
    const [invoice, setInvoice] = useState(0)
    const [fullInvoice, setFullInvoice] = useState({})
    const [store, setStore] = useState('')
    const { authenticated, token, user } = useContext(UserContext)

    useEffect(() => {
        if(authenticated) {
            api.get('/invoice', { headers: { Accept: 'application/json', Authorization: `Bearer ${ token }` } }).then(response => {
                setInvoices(response.data.data)
            })
            let uri = store ? '/payment?invoice=' + invoice + '&store=' + store : '/payment?invoice=' + invoice;
            api.get(uri, { headers: { Accept: 'application/json', Authorization: `Bearer ${ token }` } }).then(response => {
                setData(response.data)
                console.log('tudo isso');
                setItems(response.data.data)
            })
        }else {
            window.location.href = '/login'
        }
    }, [invoice, store])

    const reload = () => {
        if(data?.meta?.current_page != data?.meta?.last_page) {
            let page = parseInt(data.meta.current_page) + 1;
            let itemsCopy = items
            let uri = store ? '/payment?page=' + page + '&invoice=' + invoice + '&store=' + store : '/payment?page=' + page + '&invoice=' + invoice;
            api.get(uri, { headers: { Accept: 'application/json', Authorization: `Bearer ${ token }` } }).then(response => {
                setData(response.data)
                let newItems = itemsCopy.concat(response.data.data)
                setItems(newItems)
              });
        }
    }

    const handleInvoiceId = id => {
        invoices.map(item => {
            if(item.id == id) setFullInvoice(item)
        })
        setInvoice(id);
    }

    const handleStore = value => {
        setStore(value)
    }

    window.onscroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            reload()
        }
      }, 100);
    return (
        authenticated && <div>
            <Header user={user} handleStore={handleStore}/>
            <SecondHeader invoices={invoices} handleInvoiceId={handleInvoiceId} invoice={invoice} />
            <List items = {items} data={data} invoice={fullInvoice} />
        </div>
    )
}
