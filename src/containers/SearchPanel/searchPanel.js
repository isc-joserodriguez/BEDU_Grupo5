import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import classes from "./searchPanel.module.css";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const SearchPanel = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  
  const onChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.changeValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.filterHandler();
  };

  return (
    <section className={classes.searchPanel} id={'Filters'}>
      <form className={classes.Filter} onSubmit={onSubmit}>
        <div className={classes.DateCommands}>
          <label className={classes.orange}>Fecha: </label>

          <section className={classes.DateElements}>

            <label className={classes.Dates}>Desde:</label>
            <DatePicker
              className={classes.DatePicker}
              locale="es"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <br></br>
            <label className={classes.Dates}>Hasta:</label>
            <DatePicker
              className={classes.DatePicker}
              locale="es"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />

            <Button className={classes.orangeBtn} type="submit" size="sm">
              Buscar
            </Button>
          </section>
        </div>
        <div className={classes.StatusCommands}>
          <label className={classes.orange}>Estatus: </label>
          <ul>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Pendiente
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              En preparación
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Preparados
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Cancelados
            </li>
          </ul>
        </div>
        <div className={classes.CatCommands}>
          <label className={classes.orange}>Categorías: </label>
          <ul>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Cat 1
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Cat 2
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Cat 3
            </li>
            <li
              className={`${classes.orangeLink} ${classes.last}`}
              onClick={props.showHide}
              size="sm"
            >
              Ver todas
            </li>
          </ul>
          <p className={classes.orangeLink}></p>
        </div>
        <div className={classes.PriceCommands}>
          <label className={classes.orange}>Precio: </label>
          <ul>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Menos de $30
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              De $20-$50
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              De $50-$100
            </li>
            <li
              className={classes.orangeLink}
              onClick={props.showHide}
              size="sm"
            >
              Más de $100
            </li>
          </ul>
          <InputGroup className="mt-2" size="sm">
            <FormControl
              className={classes.SearchForm}
              placeholder="$ Mín."
              aria-label="search"
              aria-describedby="basic-addon2"
              value={props.value}
              onChange={onChange}
            />
            <FormControl
              className={classes.SearchForm}
              placeholder="$ Máx."
              aria-label="search"
              aria-describedby="basic-addon2"
              value={props.value}
              onChange={onChange}
            />
            <InputGroup.Append>
              <Button className={classes.orangeBtn} type="submit" size="sm">
                Buscar
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <div className={classes.ChefCommands}>
          <label className={classes.orange}>Chef: </label>
          <InputGroup className="mb-3" size="sm">
            <FormControl
              placeholder="Buscar chef..."
              aria-label="search"
              aria-describedby="basic-addon2"
              value={props.value}
              onChange={onChange}
            />
            <InputGroup.Append>
              <Button className={classes.orangeBtn} type="submit" size="sm">
                Buscar
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <label className={classes.orange}>Mesero: </label>
          <InputGroup className="mb-3" size="sm">
            <FormControl
              placeholder="Buscar mesero..."
              aria-label="search"
              aria-describedby="basic-addon2"
              value={props.value}
              onChange={onChange}
            />
            <InputGroup.Append>
              <Button className={classes.orangeBtn} type="submit" size="sm">
                Buscar
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className={classes.DishCommands}>
          <label className={classes.orange}>Platillo: </label>
          <InputGroup className="mb-3" size="sm">
            <FormControl
              placeholder="Buscar un platillo..."
              aria-label="search"
              aria-describedby="basic-addon2"
              value={props.value}
              onChange={null}
            />
            <InputGroup.Append>
              <Button className={classes.orangeBtn} type="submit" size="sm">
                Buscar
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

      </form>
    </section>
  );
};

export default SearchPanel;
