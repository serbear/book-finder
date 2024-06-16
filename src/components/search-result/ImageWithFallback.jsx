import {useState, useEffect, useRef} from 'react';

// eslint-disable-next-line react/prop-types
const ImageWithFallback = ({src, fallbackSrc, alt}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const imgRef = useRef();

    useEffect(() => {
        const LOAD_EVENT = 'load';
        const imgElement = imgRef.current;
        const handleLoad = () => {
            // noinspection JSUnresolvedReference
            if (imgElement.height === 1) {
                setImgSrc(fallbackSrc);
            }
        };

        // noinspection JSUnresolvedReference
        if (imgElement.complete) {
            handleLoad();
        } else {
            // noinspection JSUnresolvedReference
            imgElement.addEventListener(LOAD_EVENT, handleLoad);
        }

        return () => {
            // noinspection JSUnresolvedReference
            imgElement.removeEventListener(LOAD_EVENT, handleLoad);
        };
    }, [src, fallbackSrc]);

    // noinspection JSValidateTypes
    return (
        <>
            <img ref={imgRef} src={imgSrc} alt={alt} className="p-1"/>
        </>
    )
};

export default ImageWithFallback;
