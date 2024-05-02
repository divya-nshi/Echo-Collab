import React, { useState } from 'react';
import axios from 'axios';
import supabase from '../utils/supabase'
const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null)

//   const onSubmit = async (event) => {
//     event.preventDefault();
// console.log(file)
//     const { data, error } = await supabase.storage
//   .from('resume')
//   .upload(Date.now() + '-' + file.name, file)
//     if (error) {
//       alert(error.message);
//       return;
//     }
//   const publicURL = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`

//   console.log({publicURL})

//     try {
//       const response = await axios.get(`https://api.apilayer.com/resume_parser/url?url=${publicURL}`, {
//         headers: {
//           'apikey': 'sahSfG4GIDBMWZBR3NowD8DUxDYKY7tM',
//         },
//       });

//       console.log(response.data);
//       setResponse(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
const prompt = {
  prompt: 'List the achievements of Umm E Kulsum'
};
  const onSubmit = async (event) => {
    event.preventDefault();
console.log(file)
    const { data, error } = await supabase.storage
  .from('resume')
  .upload(Date.now() + '-' + file.name, file)
    if (error) {
      alert(error.message);
      return;
    } 
  const publicURL = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`

  // console.log({publicURL})

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/generate", {
        prompt
      });

      console.log(response.result);
      setResponse(response.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Resume Upload</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={(event) => setFile(event.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {JSON.stringify(response, null, 2)}
    </div>
  );
};

export default ResumeUpload;