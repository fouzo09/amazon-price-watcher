import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import ProductService from '../services/ProductService.js';



const formLabel = {
    fontSize: 12,
}


function NewProduct() {

    const [newProduct, setNewProduct] = useState({
        product_name: '',
        product_url: '',
        expected_price: '',
        phone: ''
    });
    const [message, setMessage] = useState();

    const addProductFormHandle = (event)=>{
        setNewProduct({...newProduct, [event.target.name] : event.target.value});
    }

    const saveProduct = async (event)=>{
        event.preventDefault();
        try {
            const result = await ProductService.addProduct(newProduct);
            setMessage(result);
        } catch (error) {
            setMessage(error.message);
        }
    }

  return (
    <>
        {(message) && 
            <Alert key='success' variant='success'>
                {message}
            </Alert>}
        <Form onSubmit={saveProduct}>
            <Row style={{ marginBottom: 12}}>
                <Col md={{span: 6}} >
                    <Form.Label style={formLabel} htmlFor="Nom du produit">Nom du produit</Form.Label>
                    <Form.Control
                        type="text"
                        id="Nom du produit"
                        placeholder="Sac à main Dior"
                        name='product_name'
                        value={newProduct?.product_name}
                        onChange={addProductFormHandle}
                    />
                </Col>
                <Col md={{span: 6}}>
                    <Form.Label style={formLabel} htmlFor="Lien du produit">Lien de la page du produit (URL)</Form.Label>
                        <Form.Control
                        type="text"
                        id="Lien du produit"
                        placeholder="https://www.amazon.fr/sac_a_main"
                        name='product_url'
                        value={newProduct?.product_url}
                        onChange={addProductFormHandle}
                    />
                </Col>
            </Row>

            <Row style={{ marginBottom: 12 }}>
                <Col md={{span: 6}} >
                    <Form.Label style={formLabel} htmlFor="Nom du produit">Prix attendu</Form.Label>
                    <Form.Control
                        type="text"
                        id="Prix attendu"
                        placeholder="50"
                        name='expected_price'
                        value={newProduct?.expected_price}
                        onChange={addProductFormHandle}
                    />
                </Col>
                <Col md={{span: 6}} >
                    <Form.Label style={formLabel} htmlFor="Votre numéro de telephone">Votre numéro de telephone</Form.Label>
                    <Form.Control
                        type="text"
                        id="Votre numéro de telephone"
                        placeholder="+224 6xx xx xx xx"
                        name='phone'
                        value={newProduct?.phone}
                        onChange={addProductFormHandle}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={{span: 3}}>
                    <Button type='submit' variant="secondary">Enregistrer</Button>
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default NewProduct