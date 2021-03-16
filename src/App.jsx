import React, { useState } from "react";
import { connect } from "react-redux";
import { addItem, deleteItem } from "./redux/actions";
import styled from "styled-components";

export const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  height: 540px;
  width: 400px;
  background-color: #ffcccc;
  border-radius: 10px;
  box-shadow: 0 0 14px 0 black;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 30px;
    font-size: 22px;
  }
`;

export const WishContainer = styled.div`
  height: 260px;
  width: 280px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin-top: 10px;
  p {
    cursor: pointer;
    padding: 10px 15px 0px 15px;
    margin: 0;
  }
`;

export const WishInput = styled.input`
  height: 28px;
  width: 250px;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 15px;
  padding: 5px 15px;
  &:focus {
    outline: none;
    border: 1px solid #7bbee3;
  }
`;

export const CustomButton = styled.button`
  height: 40px;
  width: ${({ wide }) => (wide ? "290px" : "120px")};
  background-color: #99ff99;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
  box-shadow: 0 0 3px 0 black;
`;

const App = ({ wishList, addItem, deleteItem }) => {
  const [wishItemInput, setWishItemInput] = useState("");

  const handleAddItem = () => {
    // check for empty string or duplicates
    if (wishItemInput && !wishList.includes(wishItemInput)) {
      addItem(wishItemInput);
      setWishItemInput("");
    } else {
      alert("Invalid wish!  Please try again.");
    }
  };

  const handleSubmit = () => {
    if (wishList.length) {
      alert("Wishlist submitted to Santa!");
      wishList.forEach((item) => deleteItem(item));
    } else {
      alert("Wishlist is empty!  Please fill it in.");
    }
  };

  return (
    <Screen>
      <Container>
        <h1>MY WISHLIST</h1>
        <WishContainer>
          {wishList.map((item) => (
            <p key={item} onClick={() => deleteItem(item)}>
              {item}
            </p>
          ))}
        </WishContainer>
        <WishInput
          autoFocus={true}
          value={wishItemInput}
          onChange={(e) => setWishItemInput(e.target.value)}
        />
        <CustomButton onClick={() => handleAddItem()}>Add</CustomButton>
        <CustomButton wide onClick={() => handleSubmit()}>
          Submit
        </CustomButton>
      </Container>
    </Screen>
  );
};

const mapStateToProps = ({ wishList }) => ({
  wishList,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  deleteItem: (item) => dispatch(deleteItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
