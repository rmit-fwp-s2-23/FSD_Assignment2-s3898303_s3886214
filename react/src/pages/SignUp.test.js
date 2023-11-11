/*Kaiyan (s3898303), Moosa (s3898303)*/
/* SignUp.test.js */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';

describe('SignUp Component', () => {
  /*
  Please ensure you have Express Running before running any testing files.

  The first test, titled 'validates Name, Email, and Password inputs correctly,' 
  verifies that the SignUp component handles user input correctly for name, email, 
  and password fields. It does this by rendering the component with React Testing Library, 
  simulating user input in these fields, and checking if the input values match the user's input.
  */
  // Test for validating Name, Email, and Password inputs
  test('validates Name, Email, and Password inputs correctly', () => {
    const mockLoginUser = jest.fn();

    const { getByLabelText } = render(
      <MemoryRouter>
        <SignUp loginUser={mockLoginUser} />
      </MemoryRouter>
    );
    
    // Get input fields for Name, Email, and Password by their label text
    const nameInput = getByLabelText('Name');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText(/Password/);

    // Simulate user input by changing the field values
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@123!' } });

    // Verify if the input values match the user input
    expect(nameInput.value).toBe('John');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('Password@123!');
  });


  /*
  Please ensure you have Express Running before running any testing files.

  The second test, 'validates a valid email and an invalid password,' 
  focuses on the scenario where a valid email is provided, but the password is 
  weak and doesn't meet the required criteria. It also uses React Testing Library to render the component, 
  simulates user input for name, email, and password fields, and then clicks the Sign Up button. 
  After this, it employs async/await and the findByText method to locate and validate the error message 
  displayed for the weak password condition, ensuring it is correctly shown in the component.
   */
  // Test for a valid email and an invalid password
  test('validates a valid email and an invalid password', () => { 
    const mockLoginUser = jest.fn();

    const { getByLabelText, getByRole, findByText } = render(
      <MemoryRouter>
        <SignUp loginUser={mockLoginUser} />
      </MemoryRouter>
    );

    // Get input fields for Name, Email, and Password, and the Sign Up button by their respective elements
    const nameInput = getByLabelText('Name');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText(/Password/);
    const signUpButton = getByRole('button', { name: /SignUp/i }); // Use getByRole instead of getByText

    // Simulate user input by changing the field values and attempting to sign up
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } }); // Using a weak password
    fireEvent.click(signUpButton);

    // Use async/await and findByText to check for the error message
    return findByText(/Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character./i).then(errorMessage => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

});
