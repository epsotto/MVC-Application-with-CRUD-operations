import React from 'react';


//here declaring the StoreList class. And this StoreList class inherits the abstract class React.Component
export class StoreList extends React.Component {

    //Declaring the constructor 
    constructor() {

        //here we are calling base class constructor using super()
        super();

        //here we are intializing the interface's fields using default values.
        this.state = { storeListData: [], loading: true };

        //this fetch method is responsible to get all the store record using web api.
        fetch('api/Store/Index')
            .then(response => response.json())
            .then(data => {
                debugger
                this.setState({ storeListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }


    //this method will render html onto the DOM.
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStoreTable(this.state.storeListData);//this renderStoreTable method will return the HTML table. This table will display all the record.
        return <div>
            <h1>Store Record</h1>
            <p>
                <a href="addStore"><button className="ui blue button"><i className="plus icon"></i>Create New</button></a>
            </p>
            {contents}
        </div>;
    }
    // this method will be responsible for deleting the store record.
    FuncDelete(id) {
        if (window.confirm("Do you want to delete store with this Id: " + id) === false)
            return;
        else {
            //this fetch method will get the specific store record using store id.
            fetch('api/Store/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        storeListData: this.state.storeListData.filter((rec) => {
                            return (rec.storeId !== id);
                        })
                    });
            });
        }
    }

    //this method will responsible for editing the specific store record.
    FuncEdit(id) {
        this.props.history.push("/store/edit/" + id);
    }

    //this method will return the html table to display all the store record with edit and delete methods.
    renderStoreTable(storeListData) {
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
                {storeListData.map(item =>
                    <tr key={item.storeId}>
                        <td >{item.storeName}</td>
                        <td >{item.storeAddress}</td>
                        <td ><button className="action, ui yellow button" onClick={(id) => this.FuncEdit(item.storeId)}><i className="edit icon"></i>Edit</button></td>
                        <td ><button className="action, ui red button" onClick={(id) => this.FuncDelete(item.storeId)}><i className="trash icon"></i>Delete</button></td>

                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//here we are declaring a class which have the same properties as we have in model class.
export class storeListData {
    storeId = 0;
    storeName = "";
    storeAddress = "";
}