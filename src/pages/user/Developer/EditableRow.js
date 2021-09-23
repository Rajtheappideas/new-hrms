import React from "react"

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a sr.no..."
          name="tasknumber"
          value={editFormData.tasknumber}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an Task..."
          name="taskdetail"
          value={editFormData.taskdetail}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Hours you spend..."
          name="status"
          value={editFormData.status}
          onChange={handleEditFormChange}
        ></input>
      </td>
      {/* <td>
        <input
          type="text"
          required="required"
          placeholder="Enter status..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td> */}
      <td className="my-0">
        <button className="btn btn-primary " type="submit">
          Save
        </button>
        <button
          className="btn  btn-danger"
          type="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  )
}

export default EditableRow
