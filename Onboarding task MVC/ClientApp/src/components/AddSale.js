import React from 'react';
import { salesListData } from './SalesList';


export class AddSale extends React.Component {
    constructor(props) {
        super(props);
        //here we are intializing the interface's fields with default values.
        this.state = ({ title: "", loading: true, customerListData: [], productListData: [], storeListData: [], salesList: new salesListData() });

        //this fetch method is responsible to get all the customer record using web api.
        fetch('api/Customer/Index')
            .then(response => response.json())
            .then(data => {

                this.setState({ customerListData: data, loading: false });
            });

        //this fetch method is responsible to get all the product record using web api.
        fetch('api/Product/Index')
            .then(response => response.json())
            .then(data => {

                this.setState({ productListData: data, loading: false });
            });
        //this fetch method is responsible to get all the store record using web api.
        fetch('api/Store/Index')
            .then(response => response.json())
            .then(data => {

                this.setState({ storeListData: data, loading: false });
            });


        //the salesId variable will get the sales id from URL.
        var salesId = this.props.match.params["salesId"];
        //if salesId is greater than 0 then fetch method will get the specific sales record and display it as in edit mode.
        if (salesId > 0) {
            fetch('api/Sales/Details/' + salesId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, salesList: data });
                });

        }
        else {
            this.state = ({ title: "Create", loading: false, customerListData: [], productListData: [], storeListData: [], salesList: new salesListData() });
        }
        //This binding is necessary to make "this" work in the callback.
        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);

    }

    //this method will render html onto the DOM.
    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.customerListData, this.state.productListData, this.state.storeListData, this.state.salesListData);
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Sales</h3>
            <hr />
            {contents}
        </div>;
    }

    //this method will save the record into database. If the URL has an SalesId, 
    //then it will update the record and if the URL has not sales Id parameter than it will save the record.
    FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit sales record.  
        if (this.state.salesList.salesId) {
            fetch('api/Sales/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/sales/index");
                });
        }
        else {
            fetch('api/Sales/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/sales/index");
                });
        }
    }
    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/sales/index");
    }
    //this method will return the html table to display all the sales record with edit and delete methods.
    renderCreateForm(customerListData, productListData, storeListData) {
        return (

            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="SalesId" value={this.state.salesList.salesId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="date">Date Sold</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="dateSold" placeholder="YYYY-MM-DD" defaultValue={this.state.salesList.dateSold} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="customer" >Customer</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="customerName" placeholder="Customer Name" defaultValue={this.state.salesList.customerName} required>
                            <option value="">--Select Customer Name --</option>
                            {customerListData.map(item =>
                                <option key={item.customerId} value={item.customerName}>{item.customerName}</option>
                            )}
                        </select>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="product" >Product</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="productName" placeholder="Product Name" defaultValue={this.state.salesList.productName} required>
                            <option value="">--Select Product Name --</option>
                            {productListData.map(item =>
                                <option key={item.productId} value={item.productName}>{item.productName}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="store" >Store</label>
                    <div className="col-md-4">

                        <select className="form-control" data-val="true" name="storeName" placeholder="Store Name" defaultValue={this.state.salesList.storeName} required>
                            <option value="">--Select Store Name --</option>
                            {storeListData.map(item =>
                                <option key={item.storeId} value={item.storeName}>{item.storeName}</option>
                            )}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default, ui yellow button"><i className="save icon"></i>Save</button>
                    {' '}
                    <button className="btn, ui yellow button" onClick={this.FuncCancel}><i className="cancel icon"></i>Cancel</button>
                </div >
            </form >

        )
    }


}



