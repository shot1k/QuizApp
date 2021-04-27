import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Welcome() {
  const [category, setCategory] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const [categoryList, setCategoryList] = useState([
    // { id: 9, name: "General Knowledge" },
  ]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios("https://opentdb.com/api_category.php");
      setCategoryList(result.data.trivia_categories);
    }
    fetchData();
  }, []);
  

  const handleCategoryTypeChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleDifficultyTypeChange = (e) => {
    setDifficulty(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form.Group>
          <Form.Label>Select Category:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => handleCategoryTypeChange(e)}
          >
            {categoryList.map((obj) => (
              
                <option key={obj.id} value={obj.id}>{obj.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Difficulty:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => handleDifficultyTypeChange(e)}
          >
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </Form.Control>
        </Form.Group>
        <Button variant="link">
          <Link to={`/quiz/${category}/${difficulty}`}>Start Quiz</Link>
        </Button>
      </header>
    </div>
  );
}

export default Welcome;
