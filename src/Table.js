import React, { Component } from 'react';
import ReactToExcel from 'react-html-table-to-excel';
import './Style.css';
import $ from 'jquery'
import fire from './config'

class SubmitForm  extends React.Component {
  state = {
    rows: [], array: []
  };

  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    this.setState({
      rows
    });
  };
  handleAddRow = () => {
    const item = {
      name: "",
      mobile: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };

  handleRemoveRow = () => {
    var arr = this.state.array
    arr.splice(-1, 1)
    this.setState({
      rows: this.state.rows.slice(0, -1),
      array: this.state.rows.splice(-1, 0)
    });
    console.log(this.state.array)
  };

  makeArray = () => {
    console.log("CLIK")
    var table = document.getElementById('table');

    if (table === null)
      return;

    if (table.rows[0].cells.length <= 1)
      return;

    var tblData = [];
    var array = [];
    //Put a RowNumber name and values placeholder for the number of rows we have.
    for (var r = 0; r < table.rows.length; r++) 
    {
      //Debug
      //console.log(" row: ", r);     

      tblData.push({
        name:  + r,
        items: []
      });

      //Get the cells for this row.
      var cells = table.rows[r].cells;

      //Loop through each column for this row and push the value...
      for (var c = 0; c < cells.length; c++) 
      {
        var inputElem = cells[c].children[0];
        var tmpInputElem;

        if (inputElem == null)
        {
          tmpInputElem = "";
        }
        else
        {
          tmpInputElem = inputElem.value           
        }

        //Debug
        //console.log(" row-cel: ", r, "-", c, " ", inputElem);
        tblData[r].items.push(
          {
            //Comment out the type for now...
            //inputType: inputElem.getAttribute('type'),
            [inputElem.name]: tmpInputElem
          });
      }
    }
    tblData.forEach((item, i) => {
      var object = Object.assign({}, ...tblData[i].items);
      array.push(object)
      console.log(i)
    })
    this.setState({ array })
  }

  firebasePush = () => {
    this.state.array.forEach((user, x) => {
    var rand = Math.floor(Math.random() * 100001);
      fire.database().ref('users/user-' + rand ).set({
        "companyname": user.companyname,  
        address: user.address,
        adress2: user.address2,
        city: user.city,
        state: user.state,
        zip: user.zip,
        contact: user.contact,
        tel: user.companynumber,
        email: user.email,
        "parentaccount": user.parentaccount,
        "accounttype": user.accounttype,
        "regional Segment": user.regionalsegment,
        "segmenttype": user.segmenttype,
        "salesmancode": user.salesmancode,
        "salesterritory": user.salesterritory,
        agc: user.AGC,
        "comments to CPG": user.commentstocpg,
        "gorequest": user.gorequest,
        "offerid": user.offerid,
        date: user.date,
        id: rand
      })
      this.setState({rows: [], array: [] })
    });
    this.props.action()
  }

  render() {
    console.log(this.state.array.length)
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return (
      <div>
      <div className="container">
      <div className="row clearfix">
      <div className="col-md-12 column">
      <table
      className="table table-bordered table-hover"
      id="table"
      >
      <thead>
      <th>Company Name</th>
      <th>Address</th>
      <th>Address2</th>
      <th>City</th>
      <th>State</th>
      <th>Zip</th>
      <th>Contact</th>
      <th>Tel</th>
      <th>Email</th>
      <th style={{display: "none"}}>Parent</th>
      <th>Account Type</th>
      <th style={{display: "none"}}>Regional Segement</th>
      <th style={{display: "none"}}>Segement Type</th>
      <th style={{display: "none"}}>Salesman Code</th>
      <th style={{display: "none"}}>Sales Territory</th>
      <th style={{display: "none"}}>AGC</th>
      <th>Commnets to CPG</th>
      <th style={{display: "none"}}>GO! Request</th>
      <th style={{display: "none"}}>Offer ID</th>
      <th style={{display: "none"}}>Date</th>
      </thead>
      <tbody>
      {this.state.rows.map((item, idx) => (
        <tr id="addr0" key={idx}>
        
        <td>
        <input
        type="text"
        required
        id="1"
        name="companyname"
        value={this.state.rows[idx].name}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
       
        <td>
        <input
        required
        type="text"
        id="2"
        name="address"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td>
        <input
        type="text"
        id="3"
        name="address2"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td>
        <input
        required
        type="text"
        id="4"
        name="city"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td>
        <input
        required
        type="text"
        id="5"
        name="state"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td>
        <input
        required
        type="text"
        id="6"
        name="zip"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td>
        <input
        required
        type="text"
        id="7"
        name="contact"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td>
        <input
        required
        type="text"
        id="8"
        name="companynumber"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td>
        <input
        required
        type="text"
        name="email"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />        
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        name="parentaccount"
        id="9"
        value="845741133"
        />
        </td>
        
        <td>
        <input
        type="text"
        required
        id="10"
        name="accounttype"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        id="11"
        name="regionalsegment"
        value="RSL"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        id="12"
        name="segmenttype"
        value="S"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        name="salesmancode"
        id="13"
        value="D200P01"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        name="salesterritory"
        id="14"
        value="USRSL200"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        name="AGC"
        id="15"
        value="3EF"
        />
        </td>
        
        <td>
        <input
        type="text"
        name="commentstocpg"
        value={this.state.rows[idx].mobile}
        onChange={this.handleChange(idx)}
        className="form-control"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        name="gorequest"
        id="15"
        value="New Accounts"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        name="offerid"
        id="16"
        value="100056537"
        />
        </td>
        
        <td style={{display: "none"}}>
        <input
        type="text"
        name="date"
        value={date + '-' + month + '-' + year}
        />
        </td>
        </tr>
      ))}
      </tbody>
      </table>
      <div id="div">
      { ( this.state.rows.length < 10 ) ?
      <button
      onClick={this.handleAddRow}
      className="btn striped-shadow blue"
      >
      <span>
      Add Row
      </span>
      </button>
        :
        null
      }
      {
      (this.state.rows.length != 0) ?
        <div>
        {
          (this.state.rows.length == this.state.array.length) ?
      <button
    id="styled"
      onClick={this.firebasePush}
      className="btn striped-shadow white"
      >
      <span>
      PUBLISH
    </span>
      </button>
          :
      <button
      id="styled"
      onClick={this.makeArray}
      className="btn striped-shadow blue"
      >
      <span>
      SAVE
    </span>
      </button>
        }
        </div>
      :
      null
  }
      <button
    id="styled"
      onClick={this.handleRemoveRow}
      className="btn striped-shadow blue"
      >
      <span>
      Delete
    </span>
      </button>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default SubmitForm;
