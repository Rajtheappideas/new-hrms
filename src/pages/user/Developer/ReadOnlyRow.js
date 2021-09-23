import React from "react"

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.tasknumber}</td>
      <td>{contact.taskdetail}</td>
      <td>{contact.status}</td>
      {/* <td>{contact.email}</td> */}
      <td className="my-0 py-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={event => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button
          className="btn  btn-danger"
          type="button"
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default ReadOnlyRow
