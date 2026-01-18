import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, ADD_STATUS, EDIT_STATUS, DELETE_STATUS } from "./type";

export const addContact = (newContact) => {
  return{
    type: ADD_CONTACT,
    payload: newContact
  }
}
export const deleteContact = (id) => {
  return{
    type: DELETE_CONTACT,
    payload: id
  }
}
export const editContact = (id, updatedContact) => {
  return{
    type: EDIT_CONTACT,
    payload: {id, updatedContact}
  }
}

//STATUS

export const addStatus = (statusName, bg) => {
  return{
    type: ADD_STATUS,
    payload: {statusName, bg}
  }
}

export const editStatus = (oldStatus, newStatus, newBg) => {
  return{
    type: EDIT_STATUS,
    payload: {oldStatus, newStatus, newBg}
  }
}

export const deleteStatus = (statusName) => {
  return {
    type: DELETE_STATUS,
    payload: statusName
  }
}


export const updateContact = (contact) => {
  return {
    type: "UPDATE_CONTACT",
    payload: contact,
  };
};