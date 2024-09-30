import styled from 'styled-components';

type InputWrapperProps = {
    $correct: boolean | undefined;
    $userClicked: boolean | undefined;
};
export const LettersWrapper = styled.div`
  letter-spacing: 0.1em; /* Adjust the spacing as needed */
  display: flex;
  gap: 0.5em; /* Adds space between each letter */
  align-items: center;
  text-align: center; /* Center text */
`;
export const CollumnWrapper = styled.div`
  letter-spacing: 0.1em; /* Adjust the spacing as needed */
  display: flex;
  gap: 0.5em; /* Adds space between each letter */
  align-items: center;
  text-align: center; /* Center text */
  flex-direction: column;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  transition: all 0.3s ease;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; /* Center text */

  img{
    max-height: 8rem;
    max-width: 8rem;
  }
  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    outline: none;
    font-size: 1rem;
    background-color: ${({ $correct, $userClicked }) => {
      if ($correct === undefined) {
        return 'gray'; // Default background color
      } else if ($correct) {
        return 'rgba(86, 255, 164, 0.3)'; // Light green for correct answers
      } else if ($userClicked) {
        return 'rgba(255, 86, 86, 0.3)'; // Light red for incorrect answers
      } else {
        return 'gray'; // Default background color if not clicked
      }
    }};

    &:focus {
      border-color: #0085a3;
    }
  }
  
  button {
    margin-top: 10px;
    width: 100%;
    padding: 15px;
    font-size: 1rem;
    border-radius: 10px;
    border: 3px solid #ffffff;
    background: linear-gradient(90deg, #56ccff, #6eafb4);
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;

    &:disabled {
      background: #d3d3d3;
      cursor: not-allowed;
    }
    
  }
`;