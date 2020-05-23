import React from 'react';
import { productListData } from './ProductList';


export class AddProduct extends React.Component {
    constructor(props) {
        super(props);

        //here we are intializing the interface's fields with default values.
        this.state = { title: "", loading: true, productList: new productListData() };

        //the productId variable will get the product id from URL.
        var productId = this.props.match.params["productId"];

        //if productId is greater than 0 then fetch method will get the specific product record and display it as in edit mode.
        if (productId > 0) {
            fetch('api/Product/Details/' + productId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, productList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, productList: new productListData() };
        }

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }
    //this method will render html onto the DOM.
    render() {
        console.log("hello");
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }



    //this method will save the record into database. If the URL has an ProductId, 
    //then it will update the record and if the URL has not product Id parameter than it will save the record.
    FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit product.  
        if (this.state.productList.productId) {
            fetch('api/Product/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/product/index");
                })
        }
        else {
            fetch('api/Product/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/product/index");
                })
        }
    }


    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/product/index");
    }

    //this method will return the html table to display all the product record with edit and delete methods.
    renderCreateForm() {
        return (

            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="ProductId" value={this.state.productList.productId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="productName" placeholder="Product Name" defaultValue={this.state.productList.productName} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="price" >Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="productPrice" placeholder="Product Price" defaultValue={this.state.productList.productPrice} required />
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