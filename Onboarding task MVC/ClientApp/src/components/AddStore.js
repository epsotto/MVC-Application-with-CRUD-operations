import React from 'react';
import { storeListData } from './StoreList';


export class AddStore extends React.Component {
    constructor(props) {
        super(props);
        //here we are intializing the interface's fields with default values.
        this.state = { title: "", loading: true, storeList: new storeListData() };
        //the storeId variable will get the store id from URL.
        var storeId = this.props.match.params["storeId"];
        //if storeId is greater than 0 then fetch method will get the specific store record and display it as in edit mode.
        if (storeId > 0) {
            fetch('api/Store/Details/' + storeId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, storeList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, storeList: new storeListData() };
        }
        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }
    //this method will render html onto the DOM.
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Store</h3>
            <hr />
            {contents}
        </div>;
    }
    //this method will save the record into database. If the URL has an StoreId, 
    //then it will update the record and if the URL has not store Id parameter than it will save the record.
    FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit store.  
        if (this.state.storeList.storeId) {
            fetch('api/Store/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/store/index");
                });
        }
        else {
            fetch('api/Store/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/store/index");
                });
        }
    }
    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/store/index");
    }
    //this method will return the html table to display all the store record with edit and delete methods.
    renderCreateForm() {
        return (
            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="StoreId" value={this.state.storeList.storeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="storeName" placeholder="Store Name" defaultValue={this.state.storeList.storeName} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="address" >Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="storeAddress" placeholder="Store Address" defaultValue={this.state.storeList.storeAddress} required />
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