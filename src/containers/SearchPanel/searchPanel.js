import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import CheckForm from './CheckForm/CheckForm';
import DateForm from './DateForm/DateForm';
import InfoForm from './InfoForm/InfoForm';

import classes from './searchPanel.module.css';

const SearchPanel = (props) => {
  const [checkForm, setCheckForm] = useState({
    cancelado: {
      elementType: 'check',
      label: 'Cancelado',
      value: false,
      valid: true
    },
    pendiente: {
      elementType: 'check',
      label: 'Pendiente',
      value: false,
      valid: true
    },
    preparando: {
      elementType: 'check',
      label: 'Preparando',
      value: false,
      valid: true
    },
    preparado: {
      elementType: 'check',
      label: 'Preparado',
      value: false,
      valid: true
    },
    entregado: {
      elementType: 'check',
      label: 'Entregado',
      value: false,
      valid: true
    }
  });
  const [dateForm, setDateForm] = useState({
    minDate: {
      elementType: 'datepicker',
      value: '',
      valid: true
    },
    maxDate: {
      elementType: 'datepicker',
      value: '',
      valid: true
    }
  });
  const [priceForm, setPriceForm] = useState({
    minPrice: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Precio máximo',
      },
      value: '',
      valid: true
    },
    maxPrice: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Precio minimo',
      },
      value: '',
      valid: true
    }
  });
  const [platilloForm, setPlatilloForm] = useState({
    platillo: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Platillo',
      },
      value: '',
      valid: true
    }
  });
  const [chefForm, setChefForm] = useState({
    chef: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Chef',
      },
      value: '',
      valid: true
    }
  });
  const [meseroForm, setMeseroForm] = useState({
    mesero: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Mesero',
      },
      value: '',
      valid: true
    }
  });
  const [clienteForm, setClienteForm] = useState({
    cliente: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Cliente',
      },
      value: '',
      valid: true
    }
  });
  const filterOrdersHandler = () => {
    const filter={};
    const forms = [
      checkForm,
      dateForm,
      priceForm,
      platilloForm,
      chefForm,
      meseroForm,
      clienteForm
    ];
    forms.forEach(form=>{
      for(let input in form){
        filter[input]=form[input].value;
      }
    });
    console.log(filter);
    
    
    //props.filterOrders(filter)
  }

  return (
    <section className={classes.searchPanel} id='Filters'>
      <div className={classes.Filter}>
        <CheckForm checkForm={checkForm} setCheckForm={setCheckForm} />
        <DateForm dateForm={dateForm} setDateForm={setDateForm} />
        <InfoForm infoForm={priceForm} setInfoForm={setPriceForm} />
        <InfoForm infoForm={platilloForm} setInfoForm={setPlatilloForm} />
        <InfoForm infoForm={chefForm} setInfoForm={setChefForm} />
        <InfoForm infoForm={meseroForm} setInfoForm={setMeseroForm} />
        <InfoForm infoForm={clienteForm} setInfoForm={setClienteForm} />
      </div>
      <Button className={classes.orangeBtn} type='submit' size='sm' onClick={filterOrdersHandler}> Buscar </Button>
      <Button className={classes.orangeBtn} type='submit' size='sm'> Limpiar </Button>
    </section>
  );
};

export default SearchPanel;
