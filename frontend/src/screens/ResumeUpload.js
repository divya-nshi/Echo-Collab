import React, { useState } from "react";
import axios from "axios";
import supabase from "../utils/supabase";
const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [inputText, setInputText] = useState("");
  const [promptResponse, setPromptResponse] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(file);
    const { data, error } = await supabase.storage
      .from("resume")
      .upload(Date.now() + "-" + file.name, file);
    if (error) {
      alert(error.message);
      return;
    }
    const publicURL = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

    console.log({ publicURL });

    try {
      const response = await axios.get(
        `https://api.apilayer.com/resume_parser/url?url=${publicURL}`,
        {
          headers: {
            apikey: "sahSfG4GIDBMWZBR3NowD8DUxDYKY7tM",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/generate", {
        prompt: inputText,
      });

      console.log(response);
      setPromptResponse(response.data.result.replace(/"/g, ""));
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <>
      {/* <div className="my-5">
        <h1>Resume Upload</h1>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <button type="submit">Upload</button>
        </form>
        {JSON.stringify(response, null, 2)}
      </div> */}
      <div>
        <h1>Ask me!!!!!</h1>
        <form onSubmit={handleSubmit} className="my-5">
          <label htmlFor="input-text">Enter Text:</label>
          <br />
          <input
            className="mr-5 text-black p-2 w-3/6 text-wrap"
            type="text"
            id="input-text"
            value={inputText}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {JSON.stringify(promptResponse, null, 2)}
      </div>
    </>
  );
};

export default ResumeUpload;