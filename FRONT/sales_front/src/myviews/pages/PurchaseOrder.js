import React, { useEffect, useState } from 'react';

import { CContainer, CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableRow, CTableHeaderCell, CButton, CCardTitle, CRow, CCol } from '@coreui/react';
import API_CONFIG from 'src/apiconfig';
import { toLetter } from 'src/utils/util';

const PurchaseOrder = ({ order }) => {


  const validate=(purchaseOrderId)=>{
    fetch (API_CONFIG.PURCHASE_ORDERS_VALIDATION + "?purchase_order_id=" + purchaseOrderId)
      .then(res => res.json())
      .catch (error => console.log(error))
  }

  return (
    <>
      <CCard className='mb-4'>
        <CCardHeader>
          <CRow>
            <CCol>
              <h2>Commande d'Achat #{order.purchaseOrderId}</h2>
            </CCol>
            <CCol>
              <CCardTitle className='text-end'>
                <CButton onClick={() => validate(order.purchaseOrderId)}>Validé</CButton>
              </CCardTitle>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <p><strong>Fournisseur:</strong>  {order.supplier.name} ({order.supplierId})</p>
          <p><strong>Date de commande:</strong> {order.createdAt.substring(0,10)}</p>
          <p><strong>Livraison dans:</strong> {order.deliveryDays} jour </p>

          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Produit</CTableDataCell>
                <CTableDataCell>Quantité</CTableDataCell>
                <CTableDataCell>Prix unitaire</CTableDataCell>
                <CTableDataCell>Prix Hors taxe</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {order.purchaseOrderDetails.map((product, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{product.product.productName}</CTableDataCell>
                  <CTableDataCell className='text-end'>{product.quantity.toLocaleString()}</CTableDataCell>
                  <CTableDataCell className='text-end'>{product.price.toLocaleString()} Ar</CTableDataCell>
                  <CTableDataCell className='text-end'>{(product.quantity * product.price).toLocaleString()} Ar</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell  className='text-end' colSpan={3}>Montant total hors taxe</CTableHeaderCell>
                <CTableHeaderCell className='text-end'> {calculateTotal(order.purchaseOrderDetails).toLocaleString()} Ar</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell  className='text-end' colSpan={3}>TVA</CTableHeaderCell>
                <CTableHeaderCell  className='text-end'> 20 %</CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell  className='text-end' colSpan={3}>Montant total TTC</CTableHeaderCell>
                <CTableHeaderCell className='text-end'> {(calculateTotal(order.purchaseOrderDetails) * 1.2).toLocaleString()} Ar</CTableHeaderCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <p> Montant total arrété à la somme de <strong>{toLetter(calculateTotal(order.purchaseOrderDetails) * 1.2)} Ariary</strong></p>
        </CCardBody>
      </CCard>
    </>

  );
};

const calculateTotal = (purchaseOrderDetails) => {
  return purchaseOrderDetails.reduce((total, purchaseOrderDetails) => total + purchaseOrderDetails.quantity * purchaseOrderDetails.price, 0);
};


const PurchaseOrderList = () =>
{
  const [data, setData] = useState([]);
  const [order, setOrder]  = useState(null)
  const [isHovered, setIsHovered] = useState(null)

    useEffect(()=>{
      fetch(API_CONFIG.PURCHASE_ORDERS_NO_VALIDATED)
      .then(res => res.json())
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
    },[])

    const handleClickRow=(index)=> {
      setOrder(data[index])
    }

    const handleMouseEnter = (index) => {
      setIsHovered(index);
    };

    const handleMouseLeave = () => {
      setIsHovered(null);
    };

    return (

        <CContainer>
        <h2>Liste des Commandes à validé</h2>
        <CRow>
        <CCol xs={4}>
          <CCard>
            <CCardBody>
              <CTable striper responsive hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Ref</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Fournisseur</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {data.map((purchaseOrder, index) => (
                  <CTableRow key={index}
                  onClick={() => handleClickRow(index)}
                  >
                    <CTableDataCell>{purchaseOrder.purchaseOrderId}</CTableDataCell>
                    <CTableDataCell>{purchaseOrder.createdAt.substring(0, 10)}</CTableDataCell>
                    <CTableDataCell>{purchaseOrder.supplier.name}</CTableDataCell>
                  </CTableRow>
                ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
          <CCol>
          {order !== null && <PurchaseOrder order={order} />}
          </CCol>
          </CRow>
        </CContainer>
    )
}

export default PurchaseOrderList;
