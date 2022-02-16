import React,{useContext,Fragment,useEffect} from 'react';
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';


const Contacts = () => {
    const contactContext  = useContext(ContactContext);
     const {contacts,filtered,getContact,loading} = contactContext;

     useEffect(()  =>{
       getContact();
       // eslint-disable-next-line react-hooks/exhaustive-deps
     },[]);
     if(contacts !==null && contacts.length ===0 && !loading){
       return <h4>Please add a contacts</h4>
     }
    return (
      <Fragment>
        {contacts !== null && !loading ? (  
        <TransitionGroup>
          {filtered  !== null ? 
          filtered.map(contact =>(
            <CSSTransition key={contact._id} timeout={500} className='item'>
              <ContactItem contact={contact}/>
              </CSSTransition>

          )):
          contacts.map(contact=>(
           <CSSTransition key={contact._id} timeout={500} className='item'>
             <ContactItem  contact={contact}/>
            </CSSTransition>
          ))}
          </TransitionGroup>
          
          ): <Spinner />}
      
      </Fragment>
    )
}

export default Contacts
