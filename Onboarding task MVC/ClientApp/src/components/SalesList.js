import React from 'react';


//here declaring the SalesList class. And this SalesList class inherits the abstract class React.Component
export class SalesList extends React.Component {

    //Declaring the constructor 
    constructor() {

        //here we are calling base class constructor using super()
        super();

        //here we are intializing the interface's fields using default values.
        this.state = { salesListData: [], loading: true };

        //this fetch method is responsible to get all the sales record using web api.
        fetch('api/Sales/Index')
            .then(response => response.json())
            .then(data => {
                debugger
                this.setState({ salesListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }


    //this method will render html onto the DOM.
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSalesTable(this.state.salesListData);//this renderSalesTable method will return the HTML table. This table will display all the record.
        return <div>
            <h1>Sales Record</h1>
            <p>
                <a href="addSale"><button className="ui blue button"><i className="plus icon"></i>Create New</button></a>
            </p>
            {contents}
        </div>;
    }
    // this method will be responsible for deleting the sales record.
    FuncDelete(id) {
        if (window.confirm("Do you want to delete sales with this Id: " + id) === false)
            return;
        else {
            //this fetch method will get the specific sales record using sales id.
            fetch('api/Sales/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        salesListData: this.state.salesListData.filter((rec) => {
                            return (rec.salesId !== id);
                        })
                    });
            });
        }
    }

    //this method will responsible for editing the specific sales record.
    FuncEdit(id) {
        this.props.history.push("/sales/edit/" + id);
    }

    //this method will return the html table to display all the sales record with edit and delete methods.
    renderSalesTable(salesListData) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Store</th>
                    <th>Date Sold</th>
                    <th>Actions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {salesListData.map(item =>
                    <tr key={item.salesId}>
                        <td>{item.customerName}</td>
                        <td>{item.productName}</td>
                        <td>{item.storeName}</td>
                        <td>{item.dateSold}</td>
                        <td><button className="action, ui yellow button" onClick={(id) => this.FuncEdit(item.salesId)}><i className="edit icon"></i>Edit</button></td>
                        <td><button className="action, ui red button" onClick={(id) => this.FuncDelete(item.salesId)}><i className="trash icon"></i>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//here we are declaring a class which have the same properties as we have in model class.
export class salesListData {
    salesId = 0;
    customerName = "";
    productName = "";
    storeName = "";
    dateSold = "";

}