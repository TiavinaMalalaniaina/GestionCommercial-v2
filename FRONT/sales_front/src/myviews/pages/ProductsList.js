import React, { useEffect, useMemo, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react';
import API_CONFIG from 'src/apiconfig';
import { CChartDoughnut, CChartLine } from '@coreui/react-chartjs';

const ProductsList = () => {
  const [data, setData] = useState([]);
  const [dataCurve, setDataCurve] = useState([]);
  const random = () => Math.round(Math.random() * 100)

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

      {/* <CRow>
        {test.map(t =>
        <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Line Chart</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: [random(), random(), random(), random(), random(), random(), random()],
                  },
                  {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    data: [random(), random(), random(), random(), random(), random(), random()],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
          )}
      </CRow> */}

    </div>
  );
};

export default ProductsList;
