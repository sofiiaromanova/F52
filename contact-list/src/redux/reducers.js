import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, ADD_STATUS, EDIT_STATUS } from "./type";

const intialState = {
    contacts:[
      {
        avatar: "66",
        email: "robert.admin@example.com",
        favorite: true,
        firstName: "Robert",
        gender: "men",
        id: "0ade6e5f-07ef-4ed2-85de-b940aabea656",
        lastName: "Barnabishvili",
        phone: "0680423116",
        status: "Family",
      },
      {
        avatar: "12",
        email: "anna.green@example.com",
        favorite: false,
        firstName: "Anna",
        gender: "women",
        id: "4f1b3b6e-31ce-4a6d-9af1-2f3cbb7f91e3",
        lastName: "Green",
        phone: "0952143321",
        status: "Friends",
      },
      {
        avatar: "73",
        email: "michael.ross@example.com",
        favorite: true,
        firstName: "Michael",
        gender: "men",
        id: "9be8a9e3-44a3-4ba7-91da-6e26042c4e71",
        lastName: "Ross",
        phone: "0935417854",
        status: "Work",
      },
      {
        avatar: "18",
        email: "lisa.moon@example.com",
        favorite: false,
        firstName: "Lisa",
        gender: "women",
        id: "e45f531f-1bb1-456d-a5f4-e9b390fd3d0f",
        lastName: "Moon",
        phone: "0978732164",
        status: "Wrivate",
      },
      {
        avatar: "29",
        email: "kevin.snow@example.com",
        favorite: false,
        firstName: "Kevin",
        gender: "men",
        id: "7a9a4a90-060e-4aca-b7d3-63f96cdcf61d",
        lastName: "Snow",
        phone: "0966549921",
        status: "Others",
      },
      {
        avatar: "47",
        email: "mary.wood@example.com",
        favorite: true,
        firstName: "Mary",
        gender: "women",
        id: "efdc0d58-5c59-4af7-94a8-d5ba9330e2a7",
        lastName: "Wood",
        phone: "0990023144",
        status: "Family",
      },
      {
        avatar: "52",
        email: "alex.kent@example.com",
        favorite: false,
        firstName: "Alex",
        gender: "men",
        id: "f97b5d43-5581-4a44-8a8d-56cf07f022a9",
        lastName: "Kent",
        phone: "0637432299",
        status: "Work",
      },
      {
        avatar: "15",
        email: "sofia.miller@example.com",
        favorite: true,
        firstName: "Sofia",
        gender: "women",
        id: "3cba40e7-eeca-4ced-afaf-8ed6eac31a3a",
        lastName: "Miller",
        phone: "0508221347",
        status: "Friends",
      },
      {
        avatar: "91",
        email: "john.white@example.com",
        favorite: false,
        firstName: "John",
        gender: "men",
        id: "a6c32937-c1b5-4b4d-93c4-e18a5e590fe0",
        lastName: "White",
        phone: "0679435561",
        status: "Private",
      },
      {
        avatar: "33",
        email: "nataly.brown@example.com",
        favorite: false,
        firstName: "Nataly",
        gender: "women",
        id: "da02b49b-31f9-4b35-ae56-c35f8e49dd12",
        lastName: "Brown",
        phone: "0912345689",
        status: "Others",
      }
    ],
    contactStatuses: {
      Work: {count: 0, bg: '#198754'},
      Family: {count: 0, bg: '#dc3545'},
      Private: {count: 0, bg: '#ffc107'},
      Friends: {count: 0, bg: '#0dcaf0'},
      Others: {count: 0, bg: '#6c757d'},
    }
  }

const reducer = (state = intialState, action ) => {
  switch (action.type){
    case ADD_CONTACT:
      return{
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case DELETE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      }
    case EDIT_CONTACT:
      return{
        ...state,
        contacts: state.contacts.map(contact => {
          if(contact.id === action.payload.id){
            return {...contact, ...action.payload.updatedContact}
          }
        return contact
      })
      }
    case ADD_STATUS:
      if(state.contactStatuses[action.payload.statusName]){
        console.warn(`Status ${action.payload.statusName} already exists.`)
        return state
      }
      return {
        ...state,
        contactStatuses: {
          ...state.contactStatuses,
          [action.payload.statusName]: {count: 0, bg: action.payload.bg}
        }
      }
    case EDIT_STATUS:
      if(!state.contactStatuses[action.payload.oldStatus]){
        console.warn(`Status ${action.payload.oldStatus} does not exist.`)
        return state
      }
      const updatedContactStatus = {...state.contactStatuses}
      delete updatedContactStatus[action.payload.oldStatus]
      updatedContactStatus[action.payload.newStatus] = {
        count: state.contactStatuses[action.payload.oldStatus].count,
        bg: action.payload.newBg
      }
      const updatedContacts = state.contacts.map(contact =>
        contact.status === action.payload.oldStatus ? {...contact, status: action.payload.newStatus} : contact
      )
      return{
        ...state,
        contactStatuses: updatedContactStatus,
        contacts: updatedContacts
      }
    default:
      return state
  }
}

export default reducer