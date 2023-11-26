import React from 'react';
import { CTable, CTableBody, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';

const ProductDeptTable = () => {
  // Exemple de données, remplacez-les par vos propres données
  const data = [
    { produit: 'Produit 1', article: 'Article A', departement: 'Département X' },
    { produit: 'Produit 2', article: 'Article B', departement: 'Département Y' },
    // Ajoutez d'autres lignes de données au besoin
  ];

  return (
    <CTable striped bordered responsive style={{fontSize: 'small'}}>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Produit</CTableHeaderCell>
          <CTableHeaderCell>Article</CTableHeaderCell>
          <CTableHeaderCell>Département</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.produit}</CTableDataCell>
            <CTableDataCell>{item.article}</CTableDataCell>
            <CTableDataCell>{item.departement}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default ProductDeptTable;
