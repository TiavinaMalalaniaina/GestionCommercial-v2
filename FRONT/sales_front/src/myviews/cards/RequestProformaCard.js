// Import des dépendances
import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CCardFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMedicalCross, cilTrash } from '@coreui/icons';

const proformaData = {
  fournisseurs: ['Fournisseur 1', 'Fournisseur 2', 'Fournisseur 3'],
  produits: [
    { id: 1, nom: 'Produit X', quantite: 20 },
    { id: 1, nom: 'Produit X', quantite: 20 },
    { id: 1, nom: 'Produit X', quantite: 20 },
    { id: 1, nom: 'Produit X', quantite: 20 },
    // Ajoutez d'autres produits au besoin
  ],
};
const RequestProformaCard = ({ proforma }) => {
  proforma = proformaData
  const [selectedFournisseur, setSelectedFournisseur] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleFournisseurChange = (event) => {
    // Mettez à jour le fournisseur sélectionné
    setSelectedFournisseur(event.target.value);
  };

  const handleCheckboxChange = (productId) => {
    // Mettez à jour la liste des produits sélectionnés
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleRemoveProduct = (productId) => {
    // Retirez le produit de la liste
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  };

  return (
    <CCard>
      <CCardHeader>
        <CFormSelect
          value={selectedFournisseur}
          onChange={handleFournisseurChange}
        >
          <option value="" disabled>
            Sélectionnez un fournisseur
          </option>
          {proforma.fournisseurs.map((fournisseur, index) => (
            <option key={index} value={fournisseur}>
              {fournisseur}
            </option>
          ))}
        </CFormSelect>
      </CCardHeader>


      <CCardBody>
        <CTable striped bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Produit</CTableHeaderCell>
              <CTableHeaderCell>Quantité</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {proforma.produits.map((produit) => (
              <CTableRow key={produit.id}>
                <CTableDataCell>{produit.nom}</CTableDataCell>
                <CTableDataCell>{produit.quantite}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    onClick={() => handleRemoveProduct(produit.id)}
                  >
                    <CIcon icon={cilMedicalCross} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        {selectedProducts.length > 0 && (
          <CButton
            color="danger"
            className="mt-3"
            onClick={() => setSelectedProducts([])}
          >
            Retirer les produits sélectionnés
          </CButton>
        )}
      </CCardBody>
      <CCardFooter className='text-center'>
        <CButton color='primary'>Prévisualiser le proforma</CButton>
      </CCardFooter>
    </CCard>
  );
};
export default RequestProformaCard
