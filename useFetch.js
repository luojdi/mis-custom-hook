import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {
    
    //const ref = useRef(initialValue)
    const isMounted = useRef(true); //para evitar el warning
    const [state, setstate] = useState({ data: null, loading: true, error: null});

    useEffect(() => {      
        return () => {
            isMounted.current = false ;
        }     
    }, [])

    useEffect(() => {
        
        setstate({ data: null, loading: true, error: null }); //para que se vea el Loading al cargar

        fetch ( url )
            .then( resp => resp.json() )
            .then( data => {

                //setTimeout( () => {

                    if ( isMounted.current ) {
                        setstate({
                            loading: false,
                            error: null,
                            data
                        });
                    } 
                    
                //}, [4000]);
            
            })
            .catch( () => {
                setstate({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })
       
    }, [url]); //cuando el url cambie

    return state;
    
} 
