import React, { Component } from 'react';
import ReactTable from 'react-table'
import ReactToExcel from 'react-html-table-to-excel';
import 'react-table/react-table.css'
import fire from './config'
import SubmitForm from './AppOLD.js'
import './grid.css'
import XLSX from 'xlsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [], loaded: false
    }
    this.exportFile = this.exportFile.bind(this)
  }

  componentDidMount(){
    this.getUsers()
  }

  componentWillUpdate(){
    console.log(this.state.loaded)
    if(!this.state.loaded){
      this.getUsers()
    }
  }

  exportFile() {
    console.log(this.state.users)
    let users = [["Company Name", "Address", "Address2", "City", "State", "Zip", "Contact", "Tel","Email", "Parent Account", "Account Type", "Regional Statement", "Segment Type", "Salesman Code", "Sales Terriotory", "AGC", "Comments to CPG", "GO! Request", "Offer ID"]]
    this.state.users.forEach((user) => {
      let userArray = [user.companyname, user.address, user.address2, user.city, user.state, user.zip, user.contact, user.tel, user.email, user.parentaccount, user.accounttype, user.regionalstatement, user.segmenttype, user.salesmancode, user.salesterritory, user.agc, user.commentstocpg, user.gorequest, user.offerid]
      users.push(userArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(users)
    XLSX.utils.book_append_sheet(wb, wsAll, "All Users")
    XLSX.writeFile(wb, "export-demo.xlsx")
  }

  getUsers() {
    let users = []
    fire.database().ref("users/").once('value', snapshot => {
      snapshot.forEach(snap => {
        users.push(snap.val())
      })
      this.setState({
        users
      })
    })
    console.log(this.state.loaded)
    this.setState({loaded: true})
  }

  updateMethod = () => {
    this.setState({loaded: false})
    this.getUsers()
  }

  handleButtonClick = (e, row) => {
    var db = fire.database();                   
    var ref = db.ref("users/user-" + row.id); 
    ref.remove();
    this.getUsers();
  }

  render() {
    const userColumns = [
      {
        Header: "General Info",
        columns: [
          {
            Header: "Company",
            id: "companyname",  
            accessor: "companyname"
          },
          {
            Header: "Number",
            id: "number",  
            accessor: "Tel"
          }
        ]
      },
      {
        Header: "Date Submitted",
        columns: [
          {
            Header: "date",
            id: "date",  
            accessor: d => d.date
          },
          {
            Header: "DELETE",
            accessor: "id",
            Cell: ({ row }) => (<button onClick={(e) => this.handleButtonClick(e, row)} className="btn" style={{ width: "75px",align: "center", position: "absolute", verticalAlign: "middle",
                padding: "0px", margin: "0px", height: "20px"}}><span style={{fontSize: "12px",textAlign: "center", background: "red", verticalAlign: "middle", border: "1px solid black", height: "100%"}}>Delete</span></button>)
          }
        ]
      }
    ]
    console.log(this.state.users)
    return (
      <div id="container">
      <div id="top">
      <SubmitForm action={this.updateMethod}/>
      </div>
      <div id="bottom">
      <ReactTable
      data={this.state.users}
      columns={userColumns}
      defaultPageSize={10}
      id="table2"
      style={style}
      />
      <button onClick={this.exportFile} className="btn"><span>Export to Excel</span></button>
      </div>
      </div>
    );
  }
}

const style = {
  background: "#527EFF"
}

export default App;
