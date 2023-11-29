import React, { useEffect, useState } from 'react';

import { CContainer, CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableRow, CTableHeaderCell, CButton, CCardTitle, CRow, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import API_CONFIG from 'src/apiconfig';
import { toLetter } from 'src/utils/util';
import { useNavigate } from 'react-router-dom';
import { hydrate } from 'react-dom';

const PurchaseOrder = ({ order, validate }) => {
  const [visible, setVisible] = useState(false)
  const [validationModal, setValidationModal] = useState(false)
  const handleValidate=(purchaseOrderId)=>{
    validate(purchaseOrderId)
    setVisible(false)
    setValidationModal(true)
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
                <CButton onClick={()=>setVisible(!visible)}>Validé</CButton>
                <CModal
                  visible={visible}
                  onClose={() => setVisible(false)}
                  aria-labelledby="LiveDemoExampleLabel"
                >
                  <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Validation du bon de commande</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <h5>Etes-vous sûrs de vouloir valider ce bon de commande?</h5>
                    <p>Ce bon de commande sera tout de suite envoyé à votre supérieur</p>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                    </CButton>
                    <CButton color="primary" onClick={() => handleValidate(order.purchaseOrderId)}>Validé</CButton>
                  </CModalFooter>
                </CModal>
                <CModal
                  visible={validationModal}
                  onClose={() => setValidationModal(false)}
                  aria-labelledby="LiveDemoExampleLabel"
                >
                  <CModalHeader onClose={() => setValidationModal(false)}>
                    <CModalTitle id="LiveDemoExampleLabel"></CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <h5>Le bon de commande a été envoyé vers votre supérieur</h5>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setValidationModal(false)}>
                      Close
                    </CButton>
                  </CModalFooter>
                </CModal>
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

  const updateData=()=>{
    fetch(API_CONFIG.PURCHASE_ORDERS_NO_VALIDATED)
    .then(res => res.json())
    .then(res => {
      console.log(res.data)
      setData(res.data)
    })
  }

  useEffect(()=>{
    updateData()
    },[])
    const handleClickRow=(index)=> {
      setOrder(data[index])
    }

    const validate=(purchaseOrderId)=>{
      fetch (API_CONFIG.PURCHASE_ORDERS_VALIDATION + "?purchase_order_id=" + purchaseOrderId)
      .then(res => res.json())
      .then(res => updateData())
      .catch (error => console.log(error))
    }

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
            {order !== null && <PurchaseOrder order={order} validate={validate} />}
          </CCol>
          </CRow>
        </CContainer>
    )
}

export default PurchaseOrderList;
