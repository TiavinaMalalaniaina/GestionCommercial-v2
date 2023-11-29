import React, { useState } from 'react';
import { CTable, CTableBody, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const PurchaseOrderTable = ({data, removeFunction}) => {
  const [visible, setVisible] = useState(null)
  const handleRemove=(index)=>{
    setVisible(null)
    removeFunction(index)
  }

  return (
    <CTable striped bordered responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Designation</CTableHeaderCell>
          <CTableHeaderCell>Quantité</CTableHeaderCell>
          <CTableHeaderCell>Prix unitaire</CTableHeaderCell>
          <CTableHeaderCell>Prix Hors Taxe</CTableHeaderCell>
          <CTableHeaderCell>Ref.proforma</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.requestDetail.product.productName}</CTableDataCell>
            <CTableDataCell className='text-end'>{item.requestDetail.quantity.toLocaleString()}</CTableDataCell>
            <CTableDataCell className='text-end'>{item.requestDetail.price.toLocaleString()} AR</CTableDataCell>
            <CTableDataCell className='text-end'>{(item.requestDetail.quantity * item.requestDetail.price).toLocaleString()} AR</CTableDataCell>
            <CTableDataCell>{item.proforma.proformaId}</CTableDataCell>
            <CTableDataCell className='text-center'>
              <CIcon
                icon={cilTrash}
                onClick={() => setVisible(index)}
              />
              <CModal
                visible={visible===index}
                onClose={() => setVisible(null)}
                aria-labelledby={"modal-"+index}
              >
                <CModalHeader onClose={() => setVisible(null)}>
                  <CModalTitle id={"modal-"+index}></CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <h6>Souhaité vous réellement cela de la commande?</h6>
                  <CTable>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>{item.requestDetail.product.productName}</CTableDataCell>
                        <CTableDataCell>{item.requestDetail.quantity}</CTableDataCell>
                        <CTableDataCell>{item.proforma.proformaId}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(null)}>
                    Close
                  </CButton>
                  <CButton color="danger" onClick={()=>handleRemove(index)}>Enlever</CButton>
                </CModalFooter>
              </CModal>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default PurchaseOrderTable;
