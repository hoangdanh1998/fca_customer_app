import {useEffect, useState} from 'react';
import yelp from '../service/yelp-api/yelp';

export default () => {
    
    const [results, setResults] = useState([]);
    const [errorMessage, seterrorMessage] = useState('');

    const searchApi = async searchTerm => {
        
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term:searchTerm,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses);
            
        } catch (error) {
            seterrorMessage("Something went wrong");
        }
        
    };

    useEffect(() => {
        searchApi('pasta'); 
    }, []);

    return [errorMessage, results, searchApi]
};