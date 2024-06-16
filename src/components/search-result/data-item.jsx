// eslint-disable-next-line react/prop-types
const DataItem = ({label, value}) => {
    return (
        <>
            <p>
                <span className="fw-light">{label}</span>
                <span className="px-2">{value}</span>
            </p>
        </>
    );
};

export default DataItem;