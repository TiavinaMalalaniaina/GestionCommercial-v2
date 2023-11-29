import {
    CButton,
    CCard,
    CCardBody,
    CCardSubtitle,
    CCardTitle,
    CCol,
    CFormLabel,
    CFormSelect,
    CRow
} from '@coreui/react'
import { useEffect, useState } from 'react'
import API_CONFIG from 'src/apiconfig'
import { toDictSupplier } from 'src/utils/dict'
import SupplierCard from '../cards/SupplierCard'
import RequestProformaForm from '../forms/RequestProformaForm'


const RequestProforma=()=> {
    const [supplier, setSupplier] = useState('')
    const [suppliers, setSuppliers] = useState([])
    const [allProduct, setAllProduct] = useState([])
    const [productsSelected, setProductsSelected] = useState([])
    const dictSupplier = toDictSupplier(suppliers)

    const addProduct=(product)=>{
      let productTemp = [...productsSelected, product]
      setProductsSelected(productTemp)
    }

    const handleSupplierChange=(e)=>{
        const { value } = e.target
        setSupplier(dictSupplier[value])
    }

    useEffect(()=>{
      fetch(API_CONFIG.SUPPLIERS)
      .then(res => res.json())
      .then(res => setSuppliers(res.data))
      .catch(error => console.log(error))
    }, [])


    return (
        <>
          <CRow>
              <CCol xs={7}>
                  <CCard className="mb-4">
                      <CCardBody>
                          <CCardTitle>Fournisseur</CCardTitle>
                          <div className="mb-3">
                              <CFormLabel htmlFor="request-form-product">Produit</CFormLabel>
                              <CFormSelect
                                aria-label="Default select example"
                                name='product'
                                onChange={handleSupplierChange}
                              >
                              <option>Choisissez un fournisseur</option>
                              {suppliers.map((value, index)=>
                                  <option value={value.supplierId} key={index}>{value.name}</option>
                              )}
                              </CFormSelect>
                          </div>
                      </CCardBody>
                  </CCard>
              </CCol>
              <CCol xs={5}>
                  <SupplierCard supplier={supplier} />
              </CCol>
          </CRow>
          <RequestProformaForm supplier={supplier} addProduct={addProduct}/>
        </>
    )
}
export default RequestProforma
