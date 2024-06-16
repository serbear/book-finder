import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ErrorAlert from "./error-alert.jsx";

// eslint-disable-next-line react/prop-types
const SearchBox = ({onSearch}) => {
    const [query, setQuery] = useState('');
    const {t} = useTranslation();
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (query) {
            if (onSearch) onSearch(query);
        } else {
            // noinspection JSCheckFunctionSignatures
            setError(t('errorEmptyQuery'));
        }
    };

    // noinspection JSCheckFunctionSignatures
    return (
        <>
            <div className="input-group">
                <input type="text"
                       className="form-control"
                       placeholder={t('searchPlaceholder')}
                       aria-label={t('searchPlaceholder')}
                       aria-describedby="button-addon2"
                       onChange={handleInputChange}/>
                <button className="btn btn-primary"
                        type="button"
                        id="button-addon2"
                        onClick={handleSearch}>
                    {t('searchButtonLabel')}
                </button>
            </div>
            <div className="visible">
                <ErrorAlert message={error} isVisible={!!error}/>
            </div>
        </>
    );
};

export default SearchBox;