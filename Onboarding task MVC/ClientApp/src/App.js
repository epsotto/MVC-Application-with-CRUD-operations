import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CustomerList } from './components/CustomerList';
import { ProductList } from './components/ProductList';
import { StoreList } from './components/StoreList';
import { SalesList } from './components/SalesList';
import { AddCustomer } from './components/AddCustomer';
import { AddProduct } from './components/AddProduct';
import { AddStore } from './components/AddStore';
import { AddSale } from './components/AddSale';
import 'semantic-ui-css/semantic.min.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/customer/index' component={CustomerList} />
                <Route path='/product/index' component={ProductList} />
                <Route path='/store/index' component={StoreList} />
                <Route path='/sales/index' component={SalesList} />
                <Route path='/Addcustomer' component={AddCustomer} />
                <Route path='/customer/edit/:customerId' component={AddCustomer} />
                <Route path='/AddProduct' component={AddProduct} />
                <Route path='/product/edit/:productId' component={AddProduct} />
                <Route path='/AddStore' component={AddStore} />
                <Route path='/store/edit/:storeId' component={AddStore} />
                <Route path='/AddSale' component={AddSale} />
                <Route path='/sales/edit/:salesId' component={AddSale} />
            </Layout>
        );
    }
}