import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
} from "../types";
import { config } from "react-transition-group";

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get("api/contacts");

            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.msg });
        }
    };

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            "Content-Type": "application/json",
        };

        try {
            const res = await axios.post("api/contacts", contact, config);

            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.msg });
        }
    };

    // Delete Contact

    const deleteContact = async (id) => {
        try {
            const res = await axios.delete(`api/contacts/${id}`);

            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.msg });
        }
    };

    // Update Contact

    const updateContact = async (contact) => {
        const config = {
            "Content-Type": "application/json",
        };

        try {
            const res = await axios.put(
                `api/contacts/${contact._id}`,
                contact,
                config
            );

            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.msg });
        }
    };

    // Clear Contacts

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    // Set Current Contact

    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT, payload: null });
    };

    // Filter Contacts

    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    // Clear Filter

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER, payload: null });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
