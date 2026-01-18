import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  contacts: [
    {
      id: "1",
      firstName: "Robert",
      lastName: "Barnabishvili",
      email: "robert.admin@example.com",
      phone: "0680423116",
      avatar: "66",
      gender: "men",
      status: "Family",
      favorite: true,
    },
    {
      id: "2",
      firstName: "Anna",
      lastName: "Green",
      email: "anna.green@example.com",
      phone: "0952143321",
      avatar: "12",
      gender: "women",
      status: "Friends",
      favorite: false,
    },
        {
      id: "3",
      firstName: "Michael",
      lastName: "Ross",
      email: "michael.ross@example.com",
      phone: "0935417854",
      avatar: "73",
      gender: "men",
      status: "Work",
      favorite: false,
    },
        {
      id: "4",
      firstName: "Lisa",
      lastName: "Moon",
      email: "lisa.moon@example.com",
      phone: "0978732164",
      avatar: "18",
      gender: "women",
      status: "Private",
      favorite: false,
    },
        {
      id: "5",
      firstName: "Kevin",
      lastName: "Snow",
      email: "kevin.snow@example.com",
      phone: "0966549921",
      avatar: "29",
      gender: "men",
      status: "Others",
      favorite: false,
    },
        {
      id: "6",
      firstName: "Mary",
      lastName: "Wood",
      email: "mary.wood@example.com",
      phone: "0990023144",
      avatar: "47",
      gender: "women",
      status: "Family",
      favorite: false,
    },
  ],
  search: "",
  contactStatuses: {
    Work: { count: 0, bg: "#3e7f61" },
    Family: { count: 1, bg: "#ce6872" }, 
    Private: { count: 0, bg: "#c1b07c" },
    Friends: { count: 1, bg: "#82bdc9" }, 
    others: { count: 0, bg: "#8ba3b8" },
  },
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {

    
    addContact: (state, action) => {

      state.contacts.push(action.payload);
      

      const statusName = action.payload.status;
      if (state.contactStatuses[statusName]) {
        state.contactStatuses[statusName].count += 1;
      }
    },

    deleteContact: (state, action) => {
      const contactId = action.payload;

      const contactToDelete = state.contacts.find((c) => c.id === contactId);
      
      if (contactToDelete) {

        const statusName = contactToDelete.status;
        if (state.contactStatuses[statusName]) {
          state.contactStatuses[statusName].count -= 1;
        }

        state.contacts = state.contacts.filter((c) => c.id !== contactId);
      }
    },

    updateContact: (state, action) => {
      const { id, updatedContact } = action.payload;
      const index = state.contacts.findIndex((c) => c.id == id);

      if (index !== -1) {
        const oldStatus = state.contacts[index].status;
        const newStatus = updatedContact.status;

        if (oldStatus !== newStatus) {
          // Від старого віднімаємо
          if (state.contactStatuses[oldStatus]) {
            state.contactStatuses[oldStatus].count -= 1;
          }
          // До нового додаємо
          if (state.contactStatuses[newStatus]) {
            state.contactStatuses[newStatus].count += 1;
          }
        }

        // Оновлюємо сам контакт
        state.contacts[index] = { ...state.contacts[index], ...updatedContact };
      }
    },








    addStatus: (state, action) => {
      const { statusName, bg } = action.payload;

      state.contactStatuses[statusName] = { count: 0, bg };
    },

    deleteStatus: (state, action) => {
      const statusName = action.payload;
      delete state.contactStatuses[statusName];
    },

    editStatus: (state, action) => {
      const { oldStatus, newStatus, newBg } = action.payload;
      
      // Копіюємо старий статус
      const oldData = state.contactStatuses[oldStatus];
      
      // Видаляємо старий ключ
      delete state.contactStatuses[oldStatus];
      
      // Створюємо новий ключ 
      state.contactStatuses[newStatus] = { ...oldData, bg: newBg };


      state.contacts.forEach((contact) => {
        if (contact.status === oldStatus) {
          contact.status = newStatus;
        }
      });
    },






    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
});


export const { 
  addContact, deleteContact, updateContact, 
  addStatus, deleteStatus, editStatus, 
  setSearch} = contactSlice.actions;


export default contactSlice.reducer;