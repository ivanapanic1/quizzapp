import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1100px;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;

  p {
    font-size: 1rem;
  }
`;

type ButtonWrapperProps = {
    $correct: boolean;
    $userClicked: boolean;
    $timedout:boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;  
    margin: 5px 0;
    padding: 15px; // Increased padding to make the button larger



    background: ${({ $correct, $userClicked, $timedout }) =>
      $timedout && $correct
              ? 'linear-gradient(90deg, #56FFA4, #59BC86)' // Green for correct answers when timed out
              : $correct
                      ? 'linear-gradient(90deg, #56FFA4, #59BC86)' // Green for correct answers
                      : $userClicked && !$correct
                                   ? 'linear-gradient(90deg, #FF5656, #C16868)' // Red for wrong answers selected by the user
                                  : $userClicked && $correct
                                            ? 'linear-gradient(90deg, #56FFA4, #59BC86)' // Green for correct answers selected by the user
                                            : 'linear-gradient(90deg, #56ccff, #6eafb4)'}; // Default color

    border: 3px solid #ffffff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; // Ensure the image and text are vertically aligned
  }
  
  
`;