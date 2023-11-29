import { CCard, CCardBody, CCardHeader, CCardSubtitle, CCardTitle, CFormCheck, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { useEffect, useState } from "react"
import API_CONFIG from "src/apiconfig"
import ProformaInfo from "./ProformaInfo"
import './../../styles/RequestPurchaseOrder.css'

const Proforma=({proforma, checkFunction})=> {
    const calculateTotal = (items) => {
      return items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const handleCheck=(requestDetail, proforma)=>{
      checkFunction(requestDetail, proforma)
    }


    return (
        <>
            <CCard className='mb-4 proforma'>
              <CCardHeader>
                <CCardTitle className="text-center">ProformaInfo Invoice</CCardTitle>
                {proforma && (
                  <CCardSubtitle className="text-center">
                    {proforma.supplier.name} - {proforma.supplier.address}
                  </CCardSubtitle>
                )}
              </CCardHeader>
              <CCardBody>
                <CTable striped bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Item</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Quantity</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Price per Unit</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Total</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {proforma.proformaDetails.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.product.productName}</CTableDataCell>
                        <CTableDataCell className='text-end'>{item.quantity.toLocaleString()}</CTableDataCell>
                        <CTableDataCell className='text-end'>{item.price.toLocaleString()} AR</CTableDataCell>
                        <CTableDataCell className='text-end'>{(item.quantity * item.price).toLocaleString()} AR</CTableDataCell>
                        <CTableDataCell className='text-center'>
                          <CFormCheck
                            onChange={()=>handleCheck(item, proforma)}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell colSpan="3" className='text-end'>Total Hors Taxe:</CTableHeaderCell>
                      <CTableHeaderCell colSpan="2" className='text-end'>{calculateTotal(proforma.proformaDetails).toLocaleString()} AR</CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell colSpan="3" className='text-end'>Total TTC:</CTableHeaderCell>
                      <CTableHeaderCell colSpan="2" className='text-end'>{(calculateTotal(proforma.proformaDetails) * 1.2).toLocaleString()} AR</CTableHeaderCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
        </>
    )
}
export default Proforma
