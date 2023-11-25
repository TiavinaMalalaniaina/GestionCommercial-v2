import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _head = {
  component: CNavItem,
  name: 'Validation de besoin',
  to: '/dept/product/request/validate',
  icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
}

const _sales = [
  {
    component: CNavItem,
    name: 'Demande de proforma',
    to: '/dept/proforma/request',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ajout de proforma',
    to: '/dept/proforma/add',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Listes des proforma',
    to: '/dept/proformas',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bon de commande',
    to: '/dept/purchaseOrders',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bon de commande Validé',
    to: '/dept/purchaseOrders/validated',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Création de bon',
    to: '/dept/purchaseOrder/request',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Listes des produits demande',
    to: '/dept/products',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

const _all = [
  {
    component: CNavItem,
    name: 'Demande de besoin',
    to: '/dept/product/request',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Demande envoyé',
    to: '/dept/products/sended',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

const _nav=()=> {
  const employe = JSON.parse(localStorage.getItem('userInfo'))
  console.log(employe)
  let nav = _all.slice();
  if (employe.departmentHeadId !== null && employe.departmentHeadId !== '') {
    nav.push(_head);
  }
  if (employe.departmentId === 'DEP00006') {
    nav = nav.concat(_sales);
  }


  return nav
}

export default _nav
