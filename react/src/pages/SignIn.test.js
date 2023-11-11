/*Kaiyan (s3898303), Moosa (s3898303)*/
/* SignIn.test.js */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './SignIn'; // Replace 'SignIn' with the actual path to your SignIn component.

describe('SignIn Component', () => {


  /*
  Please ensure you have Express Running before running any testing files.
  
  
  This unit test, titled 'validates Email and Password inputs correctly,' 
  uses the React Testing Library and Jest to check if the SignIn component correctly 
  handles user input for email and password fields. It ensures that the component displays and retains the values 
  entered by the user, specifically verifying that the email input contains 'john@example.com' 
  and the password input contains 'Password@123!'.
  */
  // Tests for valid email and password
  test('validates Email and Password inputs correctly', () => {
    const mockLoginUser = jest.fn();

    const { getByLabelText } = render(
      <MemoryRouter>
        <SignIn loginUser={mockLoginUser} />
      </MemoryRouter>
    );

    // Get email and password input fields by their label text
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    // Simulate user input by changing the field values
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@123!' } });

    // Verify if the input values match the user input
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('Password@123!');
  });


  /*
  Please ensure you have Express Running before running any testing files.

  For this test ('validates a valid email and an invalid password') focuses on testing a scenario where the user enters a 
  valid email but an invalid password. It again sets up a mock login function, renders the SignIn component, 
  retrieves the email input, password input, and the Sign In button, simulates user input, clicks the Sign In button, 
  and uses async/await with findByText to check for the presence of an error message indicating that the email and/or password is invalid. 
  */
  // Tests for a valid email and an invalid password
  test('validates a valid email and an invalid password', () => {
    const mockLoginUser = jest.fn();
  
    const { getByLabelText, getByRole, findByText } = render(
      <MemoryRouter>
        <SignIn loginUser={mockLoginUser} />
      </MemoryRouter>
    );
  
    // Get email input, password input, and the Sign In button by their respective elements
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByRole('button', { name: /SignIn/i }); // Use getByRole instead of getByText
  
    // Simulate user input by changing the field values
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPass' } });
    fireEvent.click(signInButton);
  
    // Use async/await and findByText to check for the error message
    return findByText(/Email and\/or password invalid, please try again./i).then(errorMessage => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
  
});
