import React from 'react';



//here declaring the CustomerList class. And this CustomerList class inherits the abstract class React.Component
export class CustomerList extends React.Component {

    //Declaring the constructor 
    constructor() {

        //here we are calling base class constructor using super()
        super();

        //here we are intializing the interface's fields using default values.
        this.state = { customerListData: [], loading: true };

        //this fetch method is responsible to get all the customer record using web api.
        fetch('api/Customers/Index')
            .then(response => response.json())
            .then(data => {
                debugger
                this.setState({ customerListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }


    //this method will render html onto the DOM.
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomerTable(this.state.customerListData);//this renderCustomerTable method will return the HTML table. This table will display all the record.
        return <div>
            <h1>Customer Record</h1>
            <p>
                <a href="addCustomer"><button className="ui blue button"><i className="plus icon"></i>Create New</button></a>
            </p>
            {contents}
        </div>;
    }
    // this method will be responsible for deleting the customer record.
    FuncDelete(id) {
        //if (!confirm("Do you want to delete customer with this Id: " + id))
        //    return;
        //else {
        if (window.confirm("Do you want to delete customer with this Id: " + id) === false)
            return;
        else {
            //this fetch method will get the specific customer record using customer id.
            fetch('api/Customers/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        customerListData: this.state.customerListData.filter((rec) => {
                            return (rec.customerId !== id);
                        })
                    });
            });
        }
    }

    //this method will responsible for editing the specific customer record.
    FuncEdit(id) {
        this.props.history.push("/customers/edit/" + id);
    }

    //this method will return the html table to display all the customer record with edit and delete methods.
    renderCustomerTable(customerListData) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customerListData.map(item =>
                    <tr key={item.customerId}>
                        <td >{item.customerName}</td>
                        <td >{item.customerAddress}</td>
                        <td ><button className="action, ui yellow button" onClick={(id) => this.FuncEdit(item.customerId)}><i className="edit icon"></i>Edit</button></td>
                        <td ><button className="action, ui red button" onClick={(id) => this.FuncDelete(item.customerId)}><i className="trash icon"></i>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//here we are declaring a class which have the same properties as we have in model class.
export class customerListData {
    customerId = 0;
    customerName = "";
    customerAddress = "";
}