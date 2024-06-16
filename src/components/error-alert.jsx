// eslint-disable-next-line react/prop-types
const ErrorAlert = ({message, isVisible}) => {
    return (
        <>
            <div className={`alert alert-danger d-flex align-items-center mt-3
                 ${isVisible ? " visible" : ` invisible`}`}
                 role="alert">
                <div>
                    <span className="bi bi-bug-fill pe-2"></span>
                    {message}
                </div>
            </div>
        </>
    );
};

export default ErrorAlert;