import { CCard, CCardBody, CCardHeader, CCardSubtitle, CCardTitle, CFormCheck, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { useEffect, useState } from "react"
import API_CONFIG from "src/apiconfig"
import ProformaInfo from "./ProformaInfo"
import './../../styles/RequestPurchaseOrder.css'

const Proforma=()=> {
    const [proformas, setProformas] = useState([])
    const [proforma, setProforma] = useState({"proformaId":"PRO00016","issueDate":null,"dueDate":null,"supplierId":"SUP00001","proformaDetails":[{"proformaDetailsId":"PRD00024","proformaId":"PRO00016","productId":"PRO00008","quantity":500,"price":200.00,"product":{"productId":"PRO00008","productName":"Carnet"}},{"proformaDetailsId":"PRD00025","proformaId":"PRO00016","productId":"PRO00001","quantity":100,"price":1500000.00,"product":{"productId":"PRO00001","productName":"ordinateur"}},{"proformaDetailsId":"PRD00026","proformaId":"PRO00016","productId":"PRO00003","quantity":100,"price":5000.00,"product":{"productId":"PRO00003","productName":"Souris"}},{"proformaDetailsId":"PRD00027","proformaId":"PRO00016","productId":"PRO00002","quantity":10,"price":1500000.00,"product":{"productId":"PRO00002","productName":"projecteur"}},{"proformaDetailsId":"PRD00028","proformaId":"PRO00016","productId":"PRO00004","quantity":100,"price":2000000.00,"product":{"productId":"PRO00004","productName":"Telephone"}}],"supplier":{"supplierId":"SUP00001","name":"Asus","contactEmail":"asus.as@gmail.com","contactPhone":"0345467687","address":"Tana","supplierProducts":null}});
    const calculateTotal = (items) => {
      return items.reduce((total, item) => total + item.quantity * item.price, 0);
    };
    // useEffect(()=>{
    //   fetch(API_CONFIG.PROFORMAS)
    //   .then(res=>res.json())
    //   .then(res=>{
    //     console.log(res)
    //     setProformas(res.data)
    //     if (res.data.length !== 0) setProforma(res.data[0])
    //   })
    //   .catch(error=>console.log(error))
    // },[])

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
                      <CTableHeaderCell className='text-end'>Quantity</CTableHeaderCell>
                      <CTableHeaderCell className='text-end'>Price per Unit</CTableHeaderCell>
                      <CTableHeaderCell className='text-end'>Total</CTableHeaderCell>
                      <CTableHeaderCell className='text-end'>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      <CTableRow color="success">
                        <CTableDataCell>Article 1</CTableDataCell>
                        <CTableDataCell className='text-end'>4</CTableDataCell>
                        <CTableDataCell className='text-end'>4 000 AR</CTableDataCell>
                        <CTableDataCell className='text-end'>4 500 AR</CTableDataCell>
                        <CTableDataCell className='text-end'>
                          <CFormCheck/>
                        </CTableDataCell>
                      </CTableRow>
                    {proforma.proformaDetails.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.product.productName}</CTableDataCell>
                        <CTableDataCell className='text-end'>{item.quantity.toLocaleString()}</CTableDataCell>
                        <CTableDataCell className='text-end'>{item.price.toLocaleString()} AR</CTableDataCell>
                        <CTableDataCell className='text-end'>{(item.quantity * item.price).toLocaleString()} AR</CTableDataCell>
                        <CTableDataCell className='text-end'>
                          <CFormCheck/>
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
