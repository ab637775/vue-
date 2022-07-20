import Vue from 'vue'
import { Button, Header, Main, Container, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownItem, DropdownMenu, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Input, Select, Option, Switch, DatePicker, Dialog, Pagination, MessageBox, Message } from 'element-ui'
const elArr = [Button, Header, Main, Container, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownItem, DropdownMenu, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Input, Select, Option, Switch, DatePicker, Dialog, Pagination]
export default function getEl () {
  elArr.forEach(item => {
    Vue.use(item)
  })
}
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
