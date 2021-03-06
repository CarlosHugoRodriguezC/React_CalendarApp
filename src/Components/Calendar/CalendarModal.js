import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import './CalendarModal.css';
import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import {
  eventAddNew,
  eventsClearActiveEvent,
  eventsUpdate,
} from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const startDateInitial = moment().minutes(0).seconds(0).add(1, 'hours');

const initEvent = {
  title: 'Evento',
  notes: '',
  start: startDateInitial.toDate(),
  end: startDateInitial.clone().add(1, 'hours').toDate(),
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(startDateInitial.toDate());
  const [endDate, setEndDate] = useState(
    startDateInitial.clone().add(1, 'hours').toDate()
  );

  const [TitleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventsClearActiveEvent());
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFormValues({
      ...formValues,
      start: date,
    });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFormValues({
      ...formValues,
      end: date,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd) || momentStart.isSame(momentEnd)) {
      return Swal.fire(
        'Error',
        'La fecha de inicio debe ser menor a la fecha de fin',
        'error'
      );
    }
    if (title.length < 2) {
      return setTitleValid(false);
    }

    if (!!activeEvent) {
      dispatch(
        eventsUpdate({
          ...formValues,
        })
      );
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {},
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        className='modal'
        closeTimeoutMS={200}
        overlayClassName='modal-fondo'>
        <h1> {!!activeEvent ? activeEvent.title : 'Nuevo Evento'} </h1>
        <hr />
        <form className='container' onSubmit={handleSubmitForm}>
          <div className='form-group'>
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={handleStartDateChange}
              value={startDate}
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={handleEndDateChange}
              value={endDate}
              minDate={startDate}
              className='form-control'
            />
          </div>

          <hr />
          <div className='form-group'>
            <label>Titulo y notas</label>
            <input
              type='text'
              className={`form-control ${!TitleValid && 'is-invalid'}`}
              placeholder='T??tulo del evento'
              name='title'
              value={title}
              onChange={handleInputChange}
              autoComplete='off'
            />
            <small id='emailHelp' className='form-text text-muted'>
              Una descripci??n corta
            </small>
          </div>

          <div className='form-group'>
            <textarea
              type='text'
              className='form-control'
              placeholder='Notas'
              rows='5'
              name='notes'
              onChange={handleInputChange}
              value={notes}></textarea>
            <small id='emailHelp' className='form-text text-muted'>
              Informaci??n adicional
            </small>
          </div>

          <button type='submit' className='btn btn-outline-primary btn-block'>
            <i className='far fa-save'></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
