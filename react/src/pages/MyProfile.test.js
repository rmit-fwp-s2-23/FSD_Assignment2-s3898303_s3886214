/*Kaiyan (s3898303), Moosa (s3898303)*/
/* MyProfile.test.js */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MyProfile from "./MyProfile";
import { useNavigate } from "react-router-dom";
import { editUser, deleteUser, removeUser } from "../data/repository";

// Mocking navigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

// Mocking repository functions
jest.mock("../data/repository", () => ({
  deleteUser: jest.fn(),
  removeUser: jest.fn()
}));

const mockLogout = jest.fn();
const mockNavigate = jest.fn();

/*
Please ensure you have Express Running before running any testing files.

This code is a Jest test suite for the "MyProfile" component in a React application. 
It first mocks the necessary dependencies such as the "react-router-dom" library and repository functions ("deleteUser" and "removeUser"). 
The test case within this suite verifies the functionality of deleting a user profile. It creates a test user object 
and renders the "MyProfile" component with this user and a mock logout function. It then simulates a click 
on the "Delete Account" button, mocks the "deleteUser" function to immediately resolve, and uses 
the "waitFor" function to ensure that the expected actions are called. These actions include verifying that "deleteUser" 
is called with the user's email, "removeUser" is called, "mockLogout" is called, and that "mockNavigate" is called to 
redirect the user to the home page ("/"). This test case helps ensure that the delete profile functionality works as expected.
*/

describe("MyProfile Component", () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Deleting profile", () => {
    it("allows deleting the profile", async () => {
      // Create a user object for testing
      const user = {
        name: "John Doe",
        email: "john@example.com"
      };

      // Render the MyProfile component with the test user and mockLogout function
      const { getByText } = render(<MyProfile user={user} logoutUser={mockLogout} />);

      // Trigger Delete Account
      const deleteButton = getByText(/Delete Account/i);
      fireEvent.click(deleteButton);

      // Mock the deleteUser function to resolve immediately
      deleteUser.mockResolvedValueOnce(true);

      // Wait for deleteUser and removeUser to be called and actions to be verified
      await waitFor(() => {
        expect(deleteUser).toHaveBeenCalledWith(user.email);
        expect(removeUser).toHaveBeenCalled();
        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });
  });
});
