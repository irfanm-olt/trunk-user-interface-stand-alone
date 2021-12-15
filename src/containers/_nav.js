import 'font-awesome/css/font-awesome.min.css';
const _nav =  [
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-5'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Enquiry',
    route: '/enquiry',
    fontIcon: 'fa fa-paper-plane fa-lg',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Create Enquiry',
        to: '/enquiry/enquiry-vehicle',
        fontIcon: 'fa fa fa-plus fa-xs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List Enquiry',
        to: '/enquiry/enquiry-list',
        fontIcon: 'fa fa-list fa-xs'
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Customer',
    route: '/customer',
    fontIcon: 'fa fa-user fa-lg',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Create Customer',
        to: '/customer/add-customer',
        fontIcon: 'fa fa fa-plus fa-xs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List Customer',
        to: '/customer/list-customer',
        fontIcon: 'fa fa-list fa-xs'
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Manufacture',
    route: '/masters',
    to: '/masters/manufacture',
    fontIcon: 'fa fa-industry fa-lg',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Car',
    route: '/masters',
    to: '/masters/cars',
    fontIcon: 'fa fa-car fa-lg',
    attributes: {
      onClick: (e, item)=>{
         console.log(e, item);
         alert("hi!");
        }
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Part Section',
    route: '/masters',
    to: '/masters/part-sections',
    fontIcon: 'fa fa-list-alt fa-lg',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Part',
    route: '/masters',
    to: '/masters/parts',
    fontIcon: 'fa fa-cogs fa-lg',
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
