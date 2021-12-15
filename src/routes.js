import React from 'react';
//const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
//const Cards = React.lazy(() => import('./views/base/cards/Cards'));

//const Tables = React.lazy(() => import('./views/base/tables/Tables'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
/* Trnk routes */
const Dashboard = React.lazy(() => import('./public/home/dashboard'));
const AddCustomer = React.lazy(() => import('./public/customer/add-customer'));
const ListCustomer = React.lazy(() => import('./public/customer/list-customer'));
const Make = React.lazy(() => import('./public/masters/make'))
const Car = React.lazy(() => import('./public/masters/cars'));
const PartSection = React.lazy(() => import('./public/masters/partSections'));
const Part = React.lazy(() => import('./public/masters/parts'));
const EnquiryCarDetail = React.lazy(() => import('./public/enquiry/enquiryCarDetail'));
const EditEnquiryCarDetail = React.lazy(() => import('./public/enquiry/editenquiryCarDetail'))
const EnquiryPartHeader = React.lazy(() => import('./public/enquiry/enquiryPartHeaders'));
const EditEnquiryPartHeader = React.lazy(() => import('./public/enquiry/editenquiryPartHeaders'));
const EnquiryPart = React.lazy(() => import('./public/enquiry/enquiryParts'));
const EnquiryList = React.lazy(() => import('./public/enquiry/enquiryList'));
const ThePageNotFound = React.lazy(() => import('./public/404/404'));

/* Trnk routes */

const routes = [
  { path: '/', exact: true, name: 'Home' },
  //{ path: '/base', name: 'Base', component: Cards, exact: true },
  //{ path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/customer/add-customer', exact: true, name: 'Add Customer', component: AddCustomer },
  { path: '/customer/list-customer', exact: true, name: 'List Customer', component: ListCustomer },
  { path: '/masters/cars', exact: true, name: 'Cars', component: Car },
  { path: '/masters/manufacture', exact: true, name: 'Manufactures', component: Make },
  { path: '/masters/part-sections', exact: true, name: 'Part Sections', component: PartSection },
  { path: '/masters/parts', exact: true, name: 'Parts', component: Part },
  { path: '/enquiry/enquiry-vehicle', exact: true, name: 'Enquiry Vehicle', component: EnquiryCarDetail },
  { path: '/enquiry/edit-enquiry-vehicle/:id', exact: true, name: 'Edit enquiry vehicle', component: EditEnquiryCarDetail },
  { path: '/enquiry/enquiry-parts-header', exact: true, name: 'Enquiry Part Headers', component: EnquiryPartHeader },
  { path: '/enquiry/edit-enquiry-parts-header', exact: true, name: 'Edit Enquiry Part Headers', component: EditEnquiryPartHeader },
  { path: '/enquiry/enquiry-parts', exact: true, name: 'Enquiry Parts', component: EnquiryPart },
  { path: '/enquiry/enquiry-list', exact: true, name: 'Enquiry List', component: EnquiryList },
  { path: '*', exact: true, component: ThePageNotFound },


  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/theme', name: 'Theme', component: Colors, exact: true },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
];

export default routes;
