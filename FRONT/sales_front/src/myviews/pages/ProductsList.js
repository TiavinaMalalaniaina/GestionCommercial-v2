import React, { useEffect, useMemo, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react';
import API_CONFIG from 'src/apiconfig';
import { CChartDoughnut, CChartLine } from '@coreui/react-chartjs';
import DeptProductCard from '../cards/DeptProductCard';
import RequestProformaCard from '../cards/RequestProformaCard';
import Select from 'react-select';
import MultiSelect from '../input/MultiSelect';

const ProductsList = () => {
  const [data, setData] = useState([]);
  const [articles, setArticles] = useState([
    {value: 1, label: "Article 1"},
    {value: 2, label: "Article 2"},
    {value: 3, label: "Article 3"},
    {value: 4, label: "Article 4"}
  ])
  const [selectedArticle, setSelectedArticle] = useState([])

  const test = [1,2,3,4,5]

  useEffect(() => {
    fetch(API_CONFIG.REQUEST_DETAILS)
      .then(res => res.json())
      .then(res => {
        const fakeData = []
        res.data.forEach(element => {
          fakeData.push({
            produit: element.product.productName,
            departement: element.departmentName,
            quantite: element.quantity
          })
        });
        console.log(fakeData)
        setData(fakeData)
      })
}, []);

  const handleMultiSelect=(selected)=>{
    setSelectedArticle(selected);
  }

  const produits = useMemo(() => Array.from(new Set(data.map((item) => item.produit))), [data]);
  const departements = useMemo(() => Array.from(new Set(data.map((item) => item.departement))), [data]);

  return (
    <div>
      <CCard className='mb-4'>
        <CCardHeader>
          <h2>Tableau Croisé</h2>
        </CCardHeader>
        <CCardBody>
          <CTable striped bordered hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Produit</CTableDataCell>
                {departements.map((departement) => (
                  <CTableDataCell key={departement}>{departement}</CTableDataCell>
                ))}
                <CTableDataCell>Total</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {produits.map((produit) => (
                <CTableRow key={produit}>
                  <CTableDataCell>{produit}</CTableDataCell>
                  {departements.map((departement) => (
                    <CTableDataCell key={departement}>
                      {data.find((item) => item.produit === produit && item.departement === departement)?.quantite || 0}
                    </CTableDataCell>
                  ))}
                  <CTableDataCell>
                    {data
                      .filter((item) => item.produit === produit)
                      .reduce((total, item) => total + (item.quantite || 0), 0)}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard className='mb-4'>
        <CCardBody>
          <CRow>
            <CCol xs={12}>
              <MultiSelect
                options={articles}
                selectedOptions={selectedArticle}
                onChange={handleMultiSelect}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs={8}>
          <CRow>
            <DeptProductCard/>
            <DeptProductCard/>
            <DeptProductCard/>
            <DeptProductCard/>
            <DeptProductCard/>
            <DeptProductCard/>
          </CRow>
        </CCol>
        <CCol xs={4}>
            <RequestProformaCard/>
        </CCol>
      </CRow>

    </div>
  );
};

export default ProductsList;
