import React, { useState } from "react";
import { addCardToDeck } from "../utils/api";
import { useDispatch } from "react-redux";
import { addCard } from "../actions";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";

const Container = styled.View`
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
  width: 95%;
`;

const NewCard = ({ route, navigation }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const title = route.params.title;

  console.log(title);
  const onSubmit = () => {
    addCardToDeck(title, {
      question,
      answer,
    }).then(() => {
      dispatch(addCard(title, { question, answer }));
    });
    setQuestion("");
    setAnswer("");
    navigation.navigate("Individual Card");
  };

  return (
    <Container>
      <TextInput
        mode="outlined"
        placeholder="What is your question?"
        onChangeText={(que) => setQuestion(que)}
        value={question}
      />
      <TextInput
        mode="outlined"
        placeholder="What is the answer"
        onChangeText={(ans) => setAnswer(ans)}
        value={answer}
      />
      <Button
        disabled={question === "" || answer === ""}
        onPress={onSubmit}
        style={{ marginTop: 10 }}
        mode="contained"
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewCard;
