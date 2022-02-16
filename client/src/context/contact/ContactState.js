import React,{useReducer} from "react";
//import uuid from 'uuid';
// import {v4} from 'uuid';
import contactContext from "./contactContext";
import contactReducer from './contactReducer';
import axios from "axios";
import{
    ADD_CONTACT ,
    DELETE_CONTACT ,
    SET_CURRENT ,
    CLEAR_CURRENT ,
    UPDATE_CONTACT ,
    FILTER_CONTACTS,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER ,
    CONTACT_ERROR
} from '../types';


const ContactState = props =>{
    const initialState ={
       contacts:null,
       current:null,
       filtered:null,
       error:null
    };

    const [state,dispatch]=useReducer(contactReducer,initialState);


    //GET CONTACTS
    const getContact =async () =>{
    
        try {
            const res=await axios.get('/api/contacts');
            dispatch({type:GET_CONTACTS,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
        
    }

    //add contact
    const addContact =async (contact) =>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        try {
            const res=await axios.post('/api/contacts',contact,config);
            dispatch({type:ADD_CONTACT,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
        
    }

    //delete contact
    const deleteContact =async (id) =>{ 
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({type:DELETE_CONTACT,payload:id});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg});
        }
    }


    //update contact
    const updateContact = async contact =>{

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        try {
            const res=await axios.put(`/api/contacts/${contact._id}`,contact,config);
            dispatch({type:UPDATE_CONTACT,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg});
        }
    }
       
    //clear contact
    const   clearContact=()=>{
        dispatch({type:CLEAR_CONTACTS});
    }

    //set current contact
    const setCurrent=contact => {
        dispatch({type:SET_CURRENT,payload:contact});
    }

    //clear current contact
    const clearCurrent =()=>{
        dispatch({type:CLEAR_CURRENT});

    }

    

    //Filter contacts
    const filterContacts = text =>{
        dispatch({type:FILTER_CONTACTS,payload:text});
    }

    //clear filter
    const clearFilter = () =>{
        dispatch({type:CLEAR_FILTER});
    };

    return  (
    
           <contactContext.Provider 
            value={{
                    contacts:state.contacts,
                    current:state.current,
                    filtered:state.filtered,
                    error:state.error,
                    getContact,
                    addContact,
                    deleteContact,
                    setCurrent,
                    clearCurrent,
                    updateContact,
                    filterContacts,
                    clearFilter,
                    clearContact   
                  }}>
                            {props.children}
            </contactContext.Provider>
            );
};

export default ContactState;