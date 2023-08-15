import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ProductService from '../services/ProductService.js'


const tHeader = {
    fontSize: 16
}

const tData = {
    fontSize: 14
}


function ListProducts() {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState();

    useEffect(()=>{
        let isMounted = true;

        (async()=>{
            await getListeOfProducts();
        })();

        return ()=> isMounted = false;
    })


    const getListeOfProducts = async()=>{
        try {
            const products = await ProductService.getProducts();
            setProducts(products);            
        } catch (error) {
            setMessage(error.message);
        }

    }
  return (
    <>
        {(products?.total) ? <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th style={tHeader}>#</th>
                    <th style={tHeader}>Produit</th>
                    <th style={tHeader}>Prix attendu</th>
                    <th style={tHeader}>Telephone</th>
                    <th style={tHeader}>Lien du produit</th>
                </tr>
            </thead>
            <tbody>
                {products.items.map((item, key)=>(
                    <tr key={key}>
                        <td style={tData}>{key + 1}</td>
                        <td style={tData}>{item.product_name}</td>
                        <td style={tData}>{item.expected_price}</td>
                        <td style={tData}>{item.phone}</td>
                        <td style={tData}>
                            <a target='_blank' href={item.product_url}>Lien du produit</a>
                        </td>
                    </tr>))}
            </tbody>
        </Table> : <p>{message}</p>}
    </>
  )
}

export default ListProducts