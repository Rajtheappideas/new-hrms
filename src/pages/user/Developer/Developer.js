import React, { useState, Fragment } from "react"

import { nanoid } from "nanoid"
import "./Developer.css"
import data from "./mock-data.json"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"
import { Input } from "@material-ui/core"
// import {MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact'

// react-bootstrap
import { Table } from "@material-ui/core"
const Developer = () => {
  const [reportData, setReportData] = useState(data)
  const [addFormData, setAddFormData] = useState({
    tasknumber: "",
    taskdetail: "",
    status: "",
    // email: "",
  })

  const [editFormData, setEditFormData] = useState({
    tasknumber: "",
    taskdetail: "",
    status: "",
    // email: "",
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
      status: addFormData.status,
      // email: addFormData.email,
    }

    const newContacts = [...reportData, newContact]
    setReportData(newContacts)
    setAddFormData({ tasknumber: "", taskdetail: "", status: "" })
    localStorage.setItem("tasknumber", JSON.stringify(addFormData.taskdetail))
  }

  const handleEditFormSubmit = event => {
    event.preventDefault()

    const editedContact = {
      id: editContactId,
      tasknumber: editFormData.tasknumber,
      taskdetail: editFormData.taskdetail,
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
        <br />

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
          name="status"
          required
          value={addFormData.status}
          placeholder="Status of Task"
          autoComplete="false"
          className="m-2"
          onChange={handleAddFormChange}
        />
        {/* <Input
          type="text"
          name="status"
          required
          placeholder="Enter Hours you spend..."
          onChange={handleAddFormChange}
        /> */}

        <button className="btn btn-success btn-sm ">Add Details</button>
      </form>
    </div>
  )
}

export default Developer
