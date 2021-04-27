import { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";


var answers = {};

function Quiz() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  var tempCount = 0;
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { id, difficulty } = useParams();


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}`
      );
      setQuestions(result.data.results);
      console.log("result", result);
    }
    fetchData();
    
  }, []);
  

  function questionsChoise(e, index) {
    answers[index] = e.target.value; //ვიმახსოვრებ არჩეულ პასუხებს ინდექსის მიხედვით
  }

  const submit = () => {
    setShow(true);
    console.log("questions", questions, "answers ", answers);
    var correctAnswers = questions.map((question) => question.correct_answer);
    console.log("c raa", correctAnswers);
    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] == answers[i]) {
        tempCount++;
      }
    }
    setCount(tempCount);
  };

  function goToWelcome(){
    history.push("/welcome");
  }

  return (
    <div className="App">
      <br />
      {questions.map((dd, index) => (
        <div>
          <p>{dd.question}</p>
          <Form.Control as="select" onChange={(e) => questionsChoise(e, index)}>
            <option hidden>select</option>
            {/* <option>{dd.incorrect_answers}</option> */}
            <option>{dd.correct_answer}</option>
            {dd.incorrect_answers.map((quest) => (
              <>
                <option>{quest}</option>
              </>
            ))}
          </Form.Control>
          <br />
          <br />
        </div>
      ))}

      <div>
        {questions.length == 0? <p>Loading ...</p>: ''}
        <Button variant="primary" onClick={() => submit()}>
          submit
        </Button>
      </div>
      {/* <Button variant="primary" onClick={() => setCount(count + 1)}>
        Launch demo modal {count}
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your score</Modal.Title>
        </Modal.Header>
        <Modal.Body>{count}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={goToWelcome}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );  
}

export default Quiz;
