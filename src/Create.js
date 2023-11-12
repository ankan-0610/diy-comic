import { useState } from "react";
import './Create.css'; // CSS file for Create component

async function query(data) {
    const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
            headers: {
                "Accept": "image/png",
                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

const Create = ({ onImagesGenerated }) => {
    const [panelText, setPanelText] = useState(Array(10).fill(""));
    const [comicImages, setComicImages] = useState(Array(10).fill(null));
    const [error, setError] = useState(Array(10).fill(null));
    const [loadingStates, setLoadingStates] = useState(Array(10).fill(false));

    const generateImage = async (index) => {
        try {
            setLoadingStates((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;
            });
            // const data = { inputs: panelText.slice(0, index + 1).join(' ') }; 
            const response = await query({ inputs: panelText[index] });
            const image = URL.createObjectURL(response);
            setComicImages((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[index] = image;
                return updatedImages;
            });

            setLoadingStates((prevState) => {
                const newState = [...prevState];
                newState[index] = false;
                return newState;
            });
        } catch (err) {
            setError((prevErrors) => {
                const updatedErrors = [...prevErrors];
                updatedErrors[index] = `Failed to generate comic for chapter ${
                    index + 1
                }. Please try again.`;
                return updatedErrors;
            });
            setLoadingStates((prevState) => {
                const newState = [...prevState];
                newState[index] = false;
                return newState;
            });
        }
    };

    // const scrollLeft = () => {
    //     const element = document.querySelector('.chapter-input-wrapper');
    //     element.scrollLeft -= 100; // You can adjust the scroll amount
    // };

    // const scrollRight = () => {
    //     const element = document.querySelector('.chapter-input-wrapper');
    //     element.scrollLeft += 100; // You can adjust the scroll amount
    // };

    const downloadImage = (image, index) => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `Comic_Panel_${index + 1}.png`; // Providing a unique name for each panel
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // const getShareableLink = async (index) => {
    //     try {
    //         const response = await fetch(
    //         `https://diycomicbook.000webhostapp.com/api/comics/${index}/share`
    //         );
    //         const data = await response.json();
    //         if (data.shareableLink) {
    //         alert(`Shareable link: ${data.shareableLink}`);
    //         } else {
    //         alert("Failed to generate shareable link");
    //         }
    //     } catch (err) {
    //         alert("Error generating shareable link");
    //     }
    //     const link =
    //       `https://diycomicbook.000webhostapp.com/api/comics/${index}/share`; // Your shareable link generated from your data
    //     setShareableLink(link);
    //     setShowShareModal(true);
    // };

    return (
        <div className="create">
            <h2>Feel free to let out your imagination ...</h2>
            {panelText.map((text, index) => (
                <div key={index} className="chapter-input">
                    <h3>Chapter {index + 1}</h3>
                    <textarea
                        value={panelText[index]}
                        onChange={(e) => {
                            const newText = e.target.value;
                            setPanelText((prevText) => {
                                const updatedText = [...prevText];
                                updatedText[index] = newText;
                                return updatedText;
                            });
                        }}
                        required
                        placeholder="Add a new chapter idea ..."
                    />
                    <button onClick={() => generateImage(index)}>
                        {loadingStates[index] ? <div className="loading-spinner" /> : 'Generate page'}
                    </button>
                    {comicImages[index] && (
                        <>
                            <img src={comicImages[index]} alt={`Comic Panel ${index + 1}`} />
                            <button onClick={() => downloadImage(comicImages[index], index)}>
                                Download Chapter
                            </button>
                            {/* <button onClick={() => getShareableLink(index)}>
                            Share
                            </button> */}
                        </>
                    )}
                    {error[index] && <p>{error[index]}</p>}

                    {/* Share Modal */}
                    {/* {showShareModal && (
                        <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowShareModal(false)}>
                            &times;
                            </span>
                            <p>Shareable Link:</p>
                            <input type="text" value={shareableLink} readOnly />
                        </div>
                        </div>
                    )} */}
                </div>
            ))}
                
        </div>
    );
}

export default Create;