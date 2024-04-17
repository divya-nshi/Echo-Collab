import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { uploadProfileImage } from '../actions/user-action';
import { useHttpClient } from "../hooks/http-hook";
import Swal from "sweetalert2";
// import M from "materialize-css";

const UploadImage = ({ uploadProfileImage, profileImageUrl }) => {
    const history = useHistory();
    const { sendRequest } = useHttpClient();
    const [ fileInputState, setFileInputState ] = useState('');//Image url temporary(for input tag)
    const [ previewSource, setPreviewSource ] = useState('');//converted normal image to base64EncodedImage format
    const [ selectedFile, setSelectedFile ] = useState();//for check is any file selected or not before submitting
    const [ loading, setLoading ] = useState(false);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]; //File data with file
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
        reader.onerror = () => {
            //TODO: HAVE TO FIX
            // M.toast({html: 'Image upload failed, Please try again', classes: 'red'});
            Swal.fire({
                title: 'Error!',
                text: 'Image upload failed',
                icon: 'error',
            });
        };
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        await uploadImage(previewSource)
    };

    const uploadImage = async (base64EncodedImage) => {
        setLoading(true);
        await uploadProfileImage(base64EncodedImage, sendRequest);
        setLoading(false);
        await history.push('/profile/');
    };

    return (
        <>
            {/* Profile Image */}
            {!previewSource && (
                <div className="w-60 mb-10">
                    <img
                        src={profileImageUrl}
                        alt="Add Profile Image"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            )}

            {/* ProfileScreen Image */}
            {previewSource && (
                <img
                    className="previewImage"
                    src={previewSource}
                    alt="chosen"
                />
            )}

            <form onSubmit={handleSubmitFile} className="form">
                <div className="image-selection">
                    <input
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                        className="form-input mt-2 p-2 rounded-lg"
                    />
                </div>
                <button className="btn mt-4">
                    {loading && <i className="fas fa-spinner fa-pulse mr-2" />}
                    {loading ? 'Uploading Image' : 'Upload ProfileScreen Image'}
                </button>
            </form>
        </>
    );
};

export default connect(null, { uploadProfileImage } )(UploadImage);
