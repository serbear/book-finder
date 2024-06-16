import getYearRanges from "../../services/year-ranges.js";
import replaceTextWithFlag from "../../services/flag-changer.js";
import DataItem from "./data-item.jsx";
import Covers from "./covers.jsx";
import {useState} from "react";
import ReactPaginate from "react-paginate";
import {useTranslation} from 'react-i18next';

// eslint-disable-next-line react/prop-types
const ResultList = ({items, itemsPerPage}) => {
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line react/prop-types
    const [isVisible] = useState(items.length > 0);
    const {t} = useTranslation();

    const offset = currentPage * itemsPerPage;
    // eslint-disable-next-line react/prop-types
    const currentItems = items.slice(offset, offset + itemsPerPage);

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    const getFirstName = (value) => {
        if (value) return value[0];
    }

    const getLanguageCount = (value) => {
        return value ? value.length : 0;
    }

    // noinspection JSUnresolvedReference,JSCheckFunctionSignatures
    return (
        <>
            {isVisible ?
                <div>
                    {/* eslint-disable-next-line react/prop-types */}
                    <p className="pt-3 text-end">Works found: {items.length}</p>
                    <div className="accordion" id="accordionExample">
                        {currentItems.map((item) => (
                            <div className="accordion-item" key={item.key}>
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={'#' + item.key}
                                        aria-expanded="false"
                                        aria-controls={item.key}
                                    >
                                        <span className="fw-bold">
                                            {item.title}
                                        </span>
                                        <span className="fw-light ps-3">
                                            {getFirstName(item.author_name)}
                                        </span>
                                    </button>
                                </h2>
                                <div
                                    id={item.key}
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body text-start">
                                        <DataItem
                                            label={`${t('resultDataItemFirstSentence')}:`}
                                            value={item.first_sentence}/>
                                        <DataItem
                                            label={`${t('resultDataItemPublishYears')}:`}
                                            value={getYearRanges(item.publish_year)}/>
                                        <DataItem
                                            label={`${t('resultDataItemPagesNumber')}:`}
                                            value={item.number_of_pages_median}/>
                                        <DataItem
                                            label={`${t('resultDataItemLanguages')} (${getLanguageCount(item.language)}):`}
                                            value={replaceTextWithFlag(item.language)}/>
                                        <Covers isbnCollection={item.isbn}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <ReactPaginate
                            previousLabel={t('paginationPrevLabel')}
                            nextLabel={t('paginationNextLabel')}
                            breakLabel={"..."}
                            pageCount={Math.ceil(items.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
                :
                null
            }
        </>
    );
};

export default ResultList;