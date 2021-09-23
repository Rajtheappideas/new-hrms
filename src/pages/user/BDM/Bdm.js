import React, { useState, Fragment } from "react"

import { nanoid } from "nanoid"
import "./bdm.css"
import data from "./mock-data.json"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"
import { Input } from "@material-ui/core"
// import {MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact'

// react-bootstrap
import { Table } from "@material-ui/core"
const Bdm = () => {
  const [reportData, setReportData] = useState(data)
  const [addFormData, setAddFormData] = useState({
    tasknumber: "",
    taskdetail: "",
    hoursspent: "",
    status: "",
  })

  const [editFormData, setEditFormData] = useState({
    tasknumber: "",
    taskdetail: "",
    hoursspent: "",
    status: "",
  })

  const [editContactId, setEditContactId] = useState(null)

  const handleAddFormChange = event => {
    event.preventDefault()

    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  const handleEditFormChange = event => {
    event.preventDefault()

    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  const handleAddFormSubmit = event => {
    event.preventDefault()

    const newContact = {
      id: nanoid(),
      tasknumber: addFormData.tasknumber,
      taskdetail: addFormData.taskdetail,
      hoursspent: addFormData.hoursspent,
      status: addFormData.status,
      // email: addFormData.email,
    }

    const newContacts = [...reportData, newContact]
    setReportData(newContacts)
    setAddFormData({ tasknumber: "", taskdetail: "", status: "" ,hoursspent:''})
    // localStorage.setItem("tasknumber", JSON.stringify(addFormData.taskdetail))
  }

  const handleEditFormSubmit = event => {
    event.preventDefault()

    const editedContact = {
      id: editContactId,
      tasknumber: editFormData.tasknumber,
      taskdetail: editFormData.taskdetail,
      hoursspent: editFormData.hoursspent,
      status: editFormData.status,
      // email: editFormData.email,
    }

    const newContacts = [...reportData]

    const index = reportData.findIndex(contact => contact.id === editContactId)

    newContacts[index] = editedContact

    setReportData(newContacts)

    setEditContactId(null)
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault()
    setEditContactId(contact.id)

    const formValues = {
      tasknumber: contact.tasknumber,
      taskdetail: contact.taskdetail,
      hoursspent: contact.hoursspent,
      status: contact.status,
      // email: contact.email,
    }

    setEditFormData(formValues)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteClick = contactId => {
    const newContacts = [...reportData]

    const index = reportData.findIndex(contact => contact.id === contactId)

    newContacts.splice(index, 1)

    setReportData(newContacts)
  }

  return (
    <div className="app-container">
      <h2>Add Report</h2>
      <form onSubmit={handleEditFormSubmit}>
        <table id="customers">
          <thead>
            <tr>
              <th>No.</th>
              <th>Task Details</th>
              <th>Hours spent</th>
              <th>Status</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map(contact => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <form className="mt-5" onSubmit={handleAddFormSubmit}>
        <Input
          type="text"
          name="tasknumber"
          value={addFormData.tasknumber}
          autoComplete="false"
          required
          className="m-2"
          placeholder="No.1"
          onChange={handleAddFormChange}
        />

        <Input
          type="text"
          autoComplete="false"
          placeholder="Task Details"
          name="taskdetail"
          value={addFormData.taskdetail}
          required
          className="m-2"
          onChange={handleAddFormChange}
        />
        <Input
          type="text"
          autoComplete="false"
          placeholder="Hours spent"
          name="hoursspent"
          value={addFormData.hoursspent}
          required
          className="m-2"
          onChange={handleAddFormChange}
        />
      
        <Input
          type="text"
          name="status"
          required
          value={addFormData.status}
          placeholder="Status of Task"
          autoComplete="false"
          className="m-2"
          onChange={handleAddFormChange}
        />
        

        <button className="btn btn-success btn-sm ">Add Details</button>
      </form>
    </div>
  )
}

export default Bdm
