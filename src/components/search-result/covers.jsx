import {getBookCoverByISBN} from "../../services/openLibraryService.js";
import ImageWithFallback from "./ImageWithFallback.jsx";
import {useTranslation} from 'react-i18next';


// eslint-disable-next-line react/prop-types
const Covers = ({isbnCollection}) => {
    const {t} = useTranslation();

    if (!isbnCollection) return (<></>)

    // noinspection JSCheckFunctionSignatures
    return (
        <>
            <p>
                <span className="fw-light">{`${t('resultDataItemEditions')}:`}
                </span>
            </p>
            {/* eslint-disable-next-line react/prop-types */}
            {isbnCollection.map((code) => (
                <ImageWithFallback
                    src={getBookCoverByISBN(code)}
                    fallbackSrc="../../public/dummy_58x58.jpg"
                    alt={code}
                    key={code}
                />
            ))}
        </>
    );

};

export default Covers;