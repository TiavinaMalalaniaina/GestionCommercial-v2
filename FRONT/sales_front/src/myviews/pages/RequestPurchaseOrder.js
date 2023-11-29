import { CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "src/apiconfig";
import ListProductSelect from "../forms/ListProductSelect";
import ProductDeptTable from "../tables/ProductDeptTable";
import PurchaseOrderTable from "../tables/PurchaseOrderTable";
import Proforma from "./Proforma";

const RequestPurchaseOrder=()=>{
  const [visible, setVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [productsSelected, setProductsSelected] = useState([])
  const [proformas, setProformas] = useState([])
  const [productChecked, setProductChecked] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(API_CONFIG.ALL_PRODUCT)
    .then(res=>res.json())
    .then(res => {
      const fakeData = []
      res.data.forEach(element => {
        fakeData.push({value: element.productId, label: element.productName})
      });
      setProducts(fakeData)
    })
  }, [])

  const handleChargeProformas=(selected)=>{
    let listProductsId = "?"
    productsSelected.forEach(element => {
      listProductsId += "productId="+element.value
    });
    fetch(API_CONFIG.PROFORMA_PRODUCTS + listProductsId)
    .then(res => res.json())
    .then(res => {
      setProformas(res.data)
    })
  }

  const handleChangeProductInput=(selected)=>{
    setProductsSelected(selected)
    handleChargeProformas(selected)
  }

  const checkedValue=(requestDetail, proforma)=>{
    console.log(requestDetail, proforma)
    productChecked.forEach(element => {
      console.log(element.requestDetail.product.productId + "===" + requestDetail.product.productId)
      if (element.requestDetail.product.productId === requestDetail.product.productId) alert("Ce produit figure deja dans le tableau. Etes-vous sûrs de vouloir changer de proforma ?")
    });
    setProductChecked([
      ...productChecked,
      {
        requestDetail: requestDetail,
        proforma: proforma
      }
    ])
  }

  const removeValue=(index)=>{
    console.log("test")
    const tempData = [...productChecked]
    tempData.splice(index, 1)
    setProductChecked(tempData)
  }

  const createPurchaseOrder=()=>{
    let listProformaDetail = "?"
    productChecked.forEach(element => {
      listProformaDetail += "proformaDetailsId="+element.requestDetail.proformaDetailsId+"&"
    });
    fetch(API_CONFIG.PURCHASE_ORDERS_CREATE + listProformaDetail)
      .then(res => res.json())
      .then(res => console.log(res))
    navigate("/dept/purchaseOrders")
  }

  return (
    <div>
      <CCard className="mb-4">
        <CCardBody>
          <ProductDeptTable/>
        </CCardBody>
      </CCard>
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
                  <CButton onClick={()=>setVisible(!visible)}>Prévisualiser</CButton>
                  <CModal
                    visible={visible}
                    onClose={() => setVisible(false)}
                    aria-labelledby="LiveDemoExampleLabel"
                  >
                    <CModalHeader onClose={() => setVisible(false)}>
                      <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <p>Etes vous sûrs de vouloir créer les bons de commandes ?</p>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                      </CButton>
                      <CButton color="primary" onClick={createPurchaseOrder}>Crée</CButton>
                    </CModalFooter>
                  </CModal>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <PurchaseOrderTable
                data={productChecked}
                removeFunction={removeValue}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} className='proformas'>
          <CCardBody>
            <CRow>
              {proformas.map((proforma, index) =>
              <CCol xs={4} key={index}>
                <Proforma
                  proforma={proforma}
                  checkFunction={checkedValue}
                />
              </CCol>
              )}
            </CRow>
          </CCardBody>
        </CCol>
      </CRow>
    </div>
  )
}

export default RequestPurchaseOrder;
