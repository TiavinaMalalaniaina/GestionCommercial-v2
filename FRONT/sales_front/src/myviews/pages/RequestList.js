import { CBadge, CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { useEffect, useState } from "react"
import API_CONFIG from "src/apiconfig"

    const RequestList=()=> {
      const treat=(index)=> {
        if (index==-1) return <CBadge color="danger">Refusé</CBadge>
        if (index==1) return <CBadge color="primary">Validé</CBadge>
        if (index==0) return <CBadge color="warning">En attente</CBadge>
        else return <CBadge color="primary">Validé</CBadge>
      }

      const [data, setData] = useState([])
      useEffect(()=>{
        fetch(API_CONFIG.REQUEST_SELF_SENDED)
        .then(res => res.json())
        .then(res => {
          setData(res.data)
          console.log(res)
        })
      }, [])
  return (
    <>
    {data.map((request, index) =>
    <CRow>
      <CCol xs={12}>
          <CCard className="mb-4">
              <CCardBody>
                  <CCardTitle>Envoyé le <strong>{request.createdAt}</strong></CCardTitle>
                  <CTable striped>
                  <CTableHead>
                      <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Produit</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Quantité</CTableHeaderCell>
                          <CTableHeaderCell  className="text-end" scope="col">Action</CTableHeaderCell>
                      </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {request.requestDetails.map((value, index) =>
                      <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                          <CTableDataCell>{value.product.productName}</CTableDataCell>
                          <CTableDataCell>{value.quantity}</CTableDataCell>
                          <CTableDataCell className="text-end">
                          {treat(value.treated)}
                          </CTableDataCell>
                      </CTableRow>
                      )}
                  </CTableBody>
              </CTable>
              </CCardBody>
          </CCard>
      </CCol>
  </CRow>
  )}
  </>
  )
}
export default RequestList
