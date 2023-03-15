import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
// import { stringify } from "csv-stringify/.";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();
  const [transformedText, setTransformedText] = useState([]);
  const [languageInput, setLanguageInput] = useState("Hungarian");
  const [levelInput, setLevelInput] = useState("A1");

  // async function onSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("/api/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ text: textInput, language: languageInput }),
  //     });
      
  //     const data = await response.json();
  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }
  //     console.log(data)
  //     setResult(data.result);
  //     setTextInput("");
  //   } catch(error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

  function SpanElement({ word }) {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  
    return (
      <span
        onClick={handleClick}
        className={isClicked ? styles.wordClicked : styles.wordNotClicked}
      >
        {word}{' '}
      </span>
    );
  }


  const handleSelectLanguageChange = (event) => {
      setLanguageInput(event.target.value)
  }

  const handleSelectLevelChange = (event) => {
    setLevelInput(event.target.value)
}

const handleSubmit = (event) => {
  event.preventDefault();
  const content = textInput;
  const words = content.split(' ').filter(word => word.replace(/[^a-ząćęłńóśźżáéíóöőúüű]/g, '')!='').filter(word =>word.length>1);
  const transformedText = words.map((word, index) => (
    <SpanElement key={index} word={word.toLowerCase().replace(/[^a-ząćęłńóśźżáéíóöőúüű]/g, '')} />
  ));
  setTransformedText(transformedText);
  setTextInput('');
};


  return (
    <div>
      <Head>
      </Head>

      <main className={styles.main}>
        <h3>Generate flashcards!</h3>
        {/* <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="hungarianText"
            placeholder="Enter some text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className={styles.textarea}
            maxLength="2000"
          />
          <select 
            className={styles.select}
            name="language"
            onChange={handleSelectLanguageChange}
            value={languageInput}
          >
            <option value="Hungarian">Hungarian</option>
            <option value="Polish">Polish</option>
            <option value="French">French</option>
          </select>
          <select 
            className={styles.select}
            name="level"
            onChange={handleSelectLevelChange}
            value={levelInput}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
          <input type="submit"
           value="Generate flashcards" disabled />
        </form> */}
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="hungarianText"
            placeholder="Enter some text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className={styles.textarea}
            maxLength="2000"
          />
          <select 
            className={styles.select}
            name="language"
            onChange={handleSelectLanguageChange}
            value={languageInput}
          >
            <option value="Hungarian">Hungarian</option>
            <option value="Polish">Polish</option>
            <option value="French">French</option>
          </select>
          <select 
            className={styles.select}
            name="level"
            onChange={handleSelectLevelChange}
            value={levelInput}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
          <input type="submit"
           value="Transform text!"/>
        </form>
        {/* <div className={styles.result}>{result}</div> */}
        <div className={styles.grid}>
          {transformedText}
        </div>
      </main>
    </div>
  );
}
