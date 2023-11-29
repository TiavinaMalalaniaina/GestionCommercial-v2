import { CButton, CCard, CCardBody, CCardTitle, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { useEffect, useState } from "react"
import API_CONFIG from "src/apiconfig"
import { toDictProduct } from "src/utils/dict"

const RequestProformaForm=({supplier})=>{
    const [productsSupplier, setProductsSupplier] = useState([])
    const [products, setProducts] = useState([])
    const allProducts = toDictProduct(productsSupplier)

    useEffect(()=>{
      fetch(API_CONFIG.ALL_PRODUCT)
      .then(res => res.json())
      .then(res => setProductsSupplier)
    }, [])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        setProducts([
            ...products,
            {
                productId: formData.get("productId"),
                quantity: formData.get("quantity"),
            }
        ])
    }
    if (supplier === '') return ''
    else {

            return (
            <CRow>
                <CCol xs={8}>
                    <CTable striped>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>#</CTableHeaderCell>
                                <CTableHeaderCell>Produit</CTableHeaderCell>
                                <CTableHeaderCell>Quantite</CTableHeaderCell>
                                <CTableHeaderCell>Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {products.map((product, index) =>
                            <CTableRow>
                                <CTableDataCell>{index+1}</CTableDataCell>
                                <CTableDataCell>{allProducts[product.productId]}</CTableDataCell>
                                <CTableDataCell>{product.quantity}</CTableDataCell>
                                <CTableDataCell></CTableDataCell>
                            </CTableRow>
                            )}
                        </CTableBody>
                    </CTable>
                </CCol>
                <CCol xs={4}>
                    <CCard className="mb-4">
                        <CCardBody>
                            <CCardTitle>Ajout de produit</CCardTitle>
                        <CForm className=" g-3 align-items-center" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <CFormLabel className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</CFormLabel>
                                <CFormSelect id="inlineFormSelectPref" name="productId">
                                <option>Choisissez un produit</option>
                                {productsSupplier.map((value, index)=>
                                    <option value={value.productId} key={index}>{value.productName}</option>
                                )}
                                </CFormSelect>
                            </div>

                            <div className="mb-4">
                                <CFormLabel className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Quantité</CFormLabel>
                                <CFormInput type="number" id="inlineFormInputGroupUsername" placeholder="Quantité" name="quantity"/>
                            </div>

                            <div className="mb-4">
                                <CButton type="submit">Ajouter</CButton>
                            </div>
                        </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}
export default RequestProformaForm
