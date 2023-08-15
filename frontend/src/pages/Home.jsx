import React, { useState } from 'react'
import {  Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { BACKGROUND_COLOR } from '../global';
import NewProduct from './NewProduct';
import ListProducts from './ListProducts';


const pageTitle = {
  textAlign: 'center',
  fontSize: 72,
  fontWeight: 900,
  marginBottom: 12
}


function Wrapper() {
  const [key, setKey] = useState('nouveauProduit');

  return (
      <Container fluid style={{  height: '100vh',  backgroundColor: BACKGROUND_COLOR }}>
          <Row style={{  height: '100vh', justifyContent: 'center', paddingTop: 64 }}>
              <Col md={{  span: 7 }} style={{ fontSize: '20px' }}> 
                  <h1 style={pageTitle}>Amazon Price Watcher</h1> 
                  <p style={{textAlign: 'center', marginBottom: 64}}>Surveillez les prix des produits Amazon avec notre outil de scraping et ne manquez jamais une baisse de prix.</p>
                <Card>
                  <Card.Body>
                    <Tabs
                        id="controlled-tab"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3">
                      <Tab eventKey="nouveauProduit" title="Ajoutez un produit">
                          <NewProduct />
                      </Tab>
                      <Tab eventKey="listeProduits" title="Liste des produits">
                          <ListProducts />
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
      </Container>
  )
}

export default Wrapper