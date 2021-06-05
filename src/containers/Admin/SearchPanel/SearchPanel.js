import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import CheckForm from './CheckForm/CheckForm';
import InfoForm from './InfoForm/InfoForm';

import classes from './SearchPanel.module.css';

const SearchPanel = ({
  statusForm,
  setStatusForm,
  typeForm,
  setTypeForm,
  priceForm,
  setPriceForm,
  nombreForm,
  setNombreForm,
  apellidoForm,
  setApellidoForm,
  mailForm,
  setMailForm,
  descripcionForm,
  setDescripcionForm,
  categoriaForm,
  setCategoriaForm,
  filterHandler,
  clearFilter
}) => {
  return (
    <section className={classes.SearchPanel} id='Filters'>
      <div className={classes.Filter}>
        {!!statusForm ? <div className={classes.StatusCommands}>
          <label className={classes.orange}>Estatus: </label>
          <CheckForm checkForm={statusForm} setCheckForm={setStatusForm} />
        </div> : null}
        {!!typeForm ? <div className={classes.StatusCommands}>
          <label className={classes.orange}>Tipo: </label>
          <CheckForm checkForm={typeForm} setCheckForm={setTypeForm} />
        </div> : null}
        {!!priceForm ? <div className={classes.PriceCommands}>
          <label className={classes.orange}>Precio: </label>
          <InfoForm infoForm={priceForm} setInfoForm={setPriceForm} />
        </div> : null}
        {!!nombreForm ? <div className={classes.PriceCommands}>
          <label className={classes.orange}>Nombre: </label>
          <InfoForm infoForm={nombreForm} setInfoForm={setNombreForm} />
        </div> : null}
        {!!apellidoForm ? <div className={classes.PriceCommands}>
          <label className={classes.orange}>Apellido: </label>
          <InfoForm infoForm={apellidoForm} setInfoForm={setApellidoForm} />
        </div> : null}
        {!!mailForm ? <div className={classes.PriceCommands}>
          <label className={classes.orange}>Correo: </label>
          <InfoForm infoForm={mailForm} setInfoForm={setMailForm} />
        </div> : null}
        {!!descripcionForm ? <div className={classes.PriceCommands}>
          <label className={classes.orange}>Descripción: </label>
          <InfoForm infoForm={descripcionForm} setInfoForm={setDescripcionForm} />
        </div> : null}
        {!!categoriaForm ? <div className={classes.PriceCommands}>
          <label className={classes.orange}>Categoría: </label>
          <InfoForm infoForm={categoriaForm} setInfoForm={setCategoriaForm} />
        </div> : null}
      </div>
      <div className="text-right">
        <Button className={classes.orangeBtn} type='submit' size='sm' onClick={filterHandler}> Buscar </Button>
        <Button className={classes.orangeBtn} type='submit' size='sm' onClick={clearFilter}> Limpiar </Button>
      </div>
    </section>
  );
};

export default SearchPanel;
