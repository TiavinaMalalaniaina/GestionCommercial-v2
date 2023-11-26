import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useState } from "react";
import ListProductSelect from "../forms/ListProductSelect";
import ProductDeptTable from "../tables/ProductDeptTable";
import PurchaseOrderTable from "../tables/PurchaseOrderTable";
import Proforma from "./Proforma";

const RequestPurchaseOrder=()=>{

  const [products, setProducts] = useState([
    {value: 1, label: "product 1"},
    {value: 2, label: "product 2"},
    {value: 3, label: "product 3"},
    {value: 4, label: "product 4"},
  ])
  const [productsSelected, setProductsSelected] = useState([])

  const handleChangeProductInput=(selected)=>{
    setProductsSelected(selected)
  }

  return (
    <div>
      <CRow className="mb-4">
        <CCol xs={3}>
          <CCard>
            <CCardBody>
              <ListProductSelect
                options={products}
                selectedOptions={productsSelected}
                onChange={handleChangeProductInput}
                />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol>
                  Listes des produits à commander:
                </CCol>
                <CCol className="text-end">
                  <CButton>Prévisualiser</CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <PurchaseOrderTable/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={3}>
          <CCard>
            <CCardBody>
              <ProductDeptTable/>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={9} className='proformas'>
          <CCardBody>
            <CRow>
              <CCol xs={6}>
                <Proforma/>
              </CCol>
              <CCol xs={6}>
                <Proforma/>
              </CCol>
              <CCol xs={6}>
                <Proforma/>
              </CCol>
              <CCol xs={6}>
                <Proforma/>
              </CCol>
            </CRow>
          </CCardBody>
        </CCol>
      </CRow>
    </div>
  )
}

export default RequestPurchaseOrder;
