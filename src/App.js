import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textResult, setTextResult] = useState("");
    // Tesseract.recognize(
    //     selectedImage,
    //     'ara+eng',
    //     { logger: m => console.log(m) }
    // ).then(({ data: { text } }) => {
    //     setTextResult(text);
    // })

    const worker = createWorker();

    const convertImageToText = useCallback(async () => {
        if(!selectedImage) return;
        await worker.load();
        await worker.loadLanguage("eng+ara");
        await worker.initialize("eng+ara");
        const { data } = await worker.recognize(selectedImage);
        setTextResult(data.text);
    }, [worker, selectedImage]);

    useEffect(() => {
        convertImageToText();
    }, [selectedImage, convertImageToText])

    const handleChangeImage = e => {
        if(e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        } else {
            setSelectedImage(null);
            setTextResult("")
        }
    }

    return (
        <div className="App">
            <h1>TesseractJs Test</h1>
            <p>Words in image!</p>
            <div className="input-wrapper">
                <label htmlFor="upload">Upload Image</label>
                <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
            </div>

            <div className="result">
                {selectedImage && (
                    <div className="box-image">
                        <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
                    </div>
                )}
                {textResult && (
                    <div className="box-p">
                        <p>{textResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
