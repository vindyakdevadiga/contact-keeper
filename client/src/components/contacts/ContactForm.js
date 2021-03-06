import React,{useState,useContext,useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';

const ContactForm = () => {
    const contactContext=useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    
    const { setAlert } = alertContext;
  
    const {addContact,updateContact,clearCurrent,current}=contactContext;

    useEffect(() =>{
        if(current !==null){
            setContact(current);
        }else{
            setContact({
                name:'',
                email: '',
                phone:'',
                type:'personal'
            });
        }
    },[contactContext,current])

    const [contact,setContact]=useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });

    const { name,email,phone,type}=contact;

    const onChange= (e) =>{
    setContact({...contact,[e.target.name]:e.target.value});}

    const onSubmit = e =>{
        e.preventDefault();
        if (name === '' || email === '') {
            setAlert('Por favor, preencha pelo menos menos nome e e-mail.', 'danger');
          } else if (current === null) {
            addContact(contact);
            setContact({
              name: '',
              email: '',
              phone: '',
              type: 'personal'
            });
            clearAll();
          } else {
            updateContact(contact);
            clearCurrent();
            clearAll();
          };
        
    };

    const clearAll=() =>{
        clearCurrent();
    };
    return (
       <form onSubmit={onSubmit}>
           <h2 className='text-primary'>Add Contact</h2>
           <input type="text" placeholder='Name' name="name" value={name} onChange={onChange}/>
           <input type="email" placeholder='Email' name="email" value={email} onChange={onChange}/>
           <input type="text" placeholder='Phone' name="phone" value={phone} onChange={onChange}/>
           <h5>Contact Type</h5>
           <input type="radio" name='type' value="personal" checked={type  === 'personal' } onChange={onChange}/>Personal{ ' '}
           <input type="radio" name='type' value="professional" checked={type  === 'professional'}onChange={onChange}/>professional{ ' '}
           <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
       </form>
    )
}

export default ContactForm
