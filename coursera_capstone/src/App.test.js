import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import App from './App';

test('renders the title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Restaurant Table Booking/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the form with initial values', () => {
  const { getByLabelText, getByDisplayValue } = render(<App />);
  const dateInput = getByLabelText('Date:');
  const timeInput = getByLabelText('Time:');
  const guestsInput = getByLabelText('Number of Guests:');
  const occasionSelect = getByLabelText('Occasion:');

  expect(dateInput).toBeInTheDocument();
  expect(timeInput).toBeInTheDocument();
  expect(guestsInput).toBeInTheDocument();
  expect(occasionSelect).toBeInTheDocument();

  // Check initial values
  expect(dateInput).toHaveValue('');
  expect(timeInput).toHaveValue('');
  expect(guestsInput).toHaveValue('1');
  expect(occasionSelect).toHaveValue('none');
});

test('shows a "required" message when trying to submit without time and occasion', () => {
  const { getByText, getByLabelText, getByDisplayValue } = render(<App />);
  const submitButton = getByText('Book Table');
  fireEvent.click(submitButton);

  const errorMessage = getByText('Time and occasion are required.');
  expect(errorMessage).toBeInTheDocument();
});

test('shows a "Reservation Successful" message when submitting with time and occasion', () => {
  const { getByText, getByLabelText, getByDisplayValue } = render(<App />);
  const timeInput = getByLabelText('Time:');
  const occasionSelect = getByLabelText('Occasion:');
  const submitButton = getByText('Book Table');

  fireEvent.change(timeInput, { target: { value: '18:00' } });
  fireEvent.change(occasionSelect, { target: { value: 'birthday' } });

  fireEvent.click(submitButton);

  const successMessage = getByText('Reservation Successful!');
  expect(successMessage).toBeInTheDocument();
});
