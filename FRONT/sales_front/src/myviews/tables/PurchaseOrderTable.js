import React from 'react';
import { CTable, CTableBody, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';

const PurchaseOrderTable = () => {
  const data = [
    { designation: 'Produit A', quantite: 5, prixUnitaire: 10, prixHorsTaxe: 50, refProforma: 'ABC123' },
    { designation: 'Produit B', quantite: 3, prixUnitaire: 15, prixHorsTaxe: 45, refProforma: 'XYZ789' },
  ];

  return (
    <CTable striped bordered responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Designation</CTableHeaderCell>
          <CTableHeaderCell>Quantité</CTableHeaderCell>
          <CTableHeaderCell>Prix unitaire</CTableHeaderCell>
          <CTableHeaderCell>Prix Hors Taxe</CTableHeaderCell>
          <CTableHeaderCell>Ref.proforma</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.designation}</CTableDataCell>
            <CTableDataCell>{item.quantite}</CTableDataCell>
            <CTableDataCell>{item.prixUnitaire}</CTableDataCell>
            <CTableDataCell>{item.prixHorsTaxe}</CTableDataCell>
            <CTableDataCell>{item.refProforma}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default PurchaseOrderTable;
