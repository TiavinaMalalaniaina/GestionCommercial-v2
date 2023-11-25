import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CCol,
} from '@coreui/react';



const DeptProductCard = ({ departement }) => {
  const departementData = {
    nom: 'Département 1',
    produits: [
      { id: 1, nom: 'Produit A', quantite: 10 },
      { id: 2, nom: 'Produit B', quantite: 5 },
    ],
  };
  departement = departementData
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <CCol xs={4}>
      <CCard className='mb-4'>
        <CCardHeader>{departement.nom}</CCardHeader>
        <CCardBody>
          <CListGroup>
            {departement.produits.map((produit) => (
              <CListGroupItem key={produit.id}>
                <CFormCheck
                  type="checkbox"
                  id={`produit-${produit.id}`}
                  label={`${produit.nom} - ${produit.quantite} unités`}
                  checked={selectedProducts.includes(produit.id)}
                  onChange={() => handleCheckboxChange(produit.id)}
                />
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCardBody>
      </CCard>
    </CCol>

  );
};
export default DeptProductCard
