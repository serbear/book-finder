import {useEffect, useState} from 'react';
import {searchBooks} from "../../services/openLibraryService.js";
import Spinner from "../spinner.jsx";
import ErrorAlert from "../error-alert.jsx";
import ResultList from "./result-list.jsx";
import {useTranslation} from 'react-i18next';

// eslint-disable-next-line react/prop-types
const ResultsBox = ({query}) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [currentQuery, setCurrentQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        // Call the API if there is a new valid query.
        if (query !== null && query !== "" && currentQuery !== query) {
            setCurrentQuery(query);
            handleApiCall().then();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, currentQuery]);

    const handleApiCall = async () => {
        setLoading(true);

        try {
            setError('');
            const data = await searchBooks(query);
            setResults(data.docs);
        } catch (err) {
            // noinspection JSCheckFunctionSignatures
            setError(t('errorFetchData'));
        } finally {
            setLoading(false);
        }
    };

    // Show spinner during data loading.
    if (loading) return <Spinner/>;

    // Show error if occurred.
    if (error) return <ErrorAlert message={error} isVisible={!!error}/>

    // Show fetched data.
    if (results) return <ResultList items={results} itemsPerPage={4}/>
};

export default ResultsBox;