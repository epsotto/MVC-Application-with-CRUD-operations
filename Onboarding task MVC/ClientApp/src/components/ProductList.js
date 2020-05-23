import React from 'react';


//here declaring the ProductList class. And this ProductList class inherits the abstract class React.Component
export class ProductList extends React.Component {

    //Declaring the constructor 
    constructor() {

        //here we are calling base class constructor using super()
        super();

        //here we are intializing the interface's fields using default values.
        this.state = { productListData: [], loading: true };

        //this fetch method is responsible to get all the product record using web api.
        fetch('api/Product/Index')
            .then(response => response.json())
            .then(data => {
                debugger
                this.setState({ productListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }


    //this method will render html onto the DOM.
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.productListData);//this renderProductTable method will return the HTML table. This table will display all the record.
        return <div>
            <h1>Product Record</h1>
            <p>
                <a href="addProduct"><button className="ui blue button"><i className="plus icon"></i>Create New</button></a>
            </p>
            {contents}
        </div>;
    }
    // this method will be responsible for deleting the product record.
    FuncDelete(id) {
        //if (!confirm("Do you want to delete product with this Id: " + id))
        //    return;
        //else {
        if (window.confirm("Do you want to delete product with this Id: " + id) === false)
            return;
        else {
            //this fetch method will get the specific product record using product id.
            fetch('api/Product/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        productListData: this.state.productListData.filter((rec) => {
                            return (rec.productId !== id);
                        })
                    });
            });
        }
    }

    //this method will responsible for editing the specific product record.
    FuncEdit(id) {
        this.props.history.push("/product/edit/" + id);
    }

    //this method will return the html table to display all the product record with edit and delete methods.
    renderProductTable(productListData) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {productListData.map(item =>
                    <tr key={item.productId}>
                        <td >{item.productName}</td>
                        <td >{item.productPrice}</td>
                        <td ><button className="action, ui yellow button" onClick={(id) => this.FuncEdit(item.productId)}><i className="edit icon"></i>Edit</button></td>
                        <td ><button className="action, ui red button" onClick={(id) => this.FuncDelete(item.productId)}><i className="trash icon"></i>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//here we are declaring a class which have the same properties as we have in model class.
export class productListData {
    productId = 0;
    productName = "";
    productPrice = "";
}