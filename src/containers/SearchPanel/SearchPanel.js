import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import CheckForm from './CheckForm/CheckForm';
import DateForm from './DateForm/DateForm';
import InfoForm from './InfoForm/InfoForm';

import classes from './SearchPanel.module.css';

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
      elementConfig: {
        placeholder: 'Fecha Inicial'
      },
      valid: true
    },
    maxDate: {
      elementType: 'datepicker',
      value: '',
      elementConfig: {
        placeholder: 'Fecha Final'
      },
      valid: true
    }
  });
  const [priceForm, setPriceForm] = useState({
    minPrice: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Precio minimo',
      },
      value: '',
      valid: true
    },
    maxPrice: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Precio máximo',
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
    const filter = {};
    const forms = [
      checkForm,
      dateForm,
      priceForm,
      platilloForm,
      chefForm,
      meseroForm,
      clienteForm
    ];
    forms.forEach(form => {
      for (let input in form) {
        filter[input] = form[input].value;
      }
    });
    props.filterOrders(filter);
  }

  const clearFilter = () => {
    setCheckForm({
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
    setDateForm({
      minDate: {
        elementType: 'datepicker',
        value: '',
        elementConfig: {
          placeholder: 'Fecha Inicial'
        },
        valid: true
      },
      maxDate: {
        elementType: 'datepicker',
        value: '',
        elementConfig: {
          placeholder: 'Fecha Final'
        },
        valid: true
      }
    });
    setPriceForm({
      minPrice: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Precio minimo',
        },
        value: '',
        valid: true
      },
      maxPrice: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Precio máximo',
        },
        value: '',
        valid: true
      }
    });
    setPlatilloForm({
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
    setChefForm({
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
    setMeseroForm({
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
    setClienteForm({
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
    props.clearFilterOrdersHandler();
  }

  return (
    <section className={classes.SearchPanel} id='Filters'>
      <div className={classes.Filter}>
        <div className={classes.DateCommands}>
          <label className={classes.orange}>Fecha: </label>
          <section className={classes.DateElements}>
            <DateForm dateForm={dateForm} setDateForm={setDateForm} />
          </section>
        </div>
        <div className={classes.StatusCommands}>
          <label className={classes.orange}>Estatus: </label>
          <CheckForm checkForm={checkForm} setCheckForm={setCheckForm} />
        </div>
        <div className={classes.PriceCommands}>
          <label className={classes.orange}>Precio: </label>
          <InfoForm infoForm={priceForm} setInfoForm={setPriceForm} />
        </div>
        <div className={classes.ChefCommands}>
          <label className={classes.orange}>Chef: </label>
          <InfoForm infoForm={chefForm} setInfoForm={setChefForm} />
          <label className={classes.orange}>Mesero: </label>
          <InfoForm infoForm={meseroForm} setInfoForm={setMeseroForm} />
          <label className={classes.orange}>Cliente: </label>
          <InfoForm infoForm={clienteForm} setInfoForm={setClienteForm} />
        </div>
        <div className={classes.DishCommands}>
          <label className={classes.orange}>Platillo: </label>
          <InfoForm infoForm={platilloForm} setInfoForm={setPlatilloForm} />
        </div>
      </div>
      <div className="text-right">
        <Button className={classes.orangeBtn} type='submit' size='sm' onClick={filterOrdersHandler}> Buscar </Button>
        <Button className={classes.orangeBtn} type='submit' size='sm' onClick={clearFilter}> Limpiar </Button>
      </div>
    </section>
  );
};

export default SearchPanel;
