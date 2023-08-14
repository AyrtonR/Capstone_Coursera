import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('none');
  const [reservationStatus, setReservationStatus] = useState(null);

  // Function to generate available time options between 17:00 and 23:00 in 30-minute intervals
  const generateAvailableTimeOptions = () => {
    const startTime = 17;
    const endTime = 23;
    const timeOptions = [];

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeOptions.push(<option key={timeValue} value={timeValue}>{timeValue}</option>);
      }
    }

    return timeOptions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time || occasion === 'none') {
      setReservationStatus('required');
    } else {
      setTimeout(() => {
        setReservationStatus('success');
        // Reset form fields after successful booking
        setName('');
        setPhoneNumber('');
        setDate('');
        setTime('');
        setGuests(1);
        setOccasion('none');
      }, 1000);
    }
  };

  const handlePopupClose = () => {
    setReservationStatus(null);
  };

  return (
    <div className="App">
      <header>
        <div className="top-bar">
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Little Lemon Restaurant" className="logo" />
        </div>
        <h1 className="header-title">Reserve a Table</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="date-section">
              {/* Date Input */}
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="time-section">
              {/* Time Select */}
              <label htmlFor="time">Time:</label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              >
                <option value="">Select a time</option>
                {generateAvailableTimeOptions()}
              </select>
            </div>
           
            <div className="guests-section">
              {/* Guests Input */}
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                required
              />
            </div>
            <div className="occasion-section">
              {/* Occasion Select */}
              <label htmlFor="occasion">Occasion:</label>
              <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
                >
                <option value="none">Select an occasion</option>
                <option value="birthday">Birthday</option>
                <option value="meeting">Meeting</option>
                <option value="anniversary">Anniversary</option>
              </select>
            </div>
            <div className="name-section">
              {/* Name Input */}
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="phone-section">
              {/* Phone Number Input */}
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="button-section">
              <button type="submit" className="book-button">Book Table</button>
            </div>
          </div>
        </form>
        {reservationStatus === 'success' && (
          <div className="success-popup">
            <div className="success-message">
              Booking successful! Your table has been reserved.
            </div>
            <button onClick={handlePopupClose} className="close-button">Close</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
