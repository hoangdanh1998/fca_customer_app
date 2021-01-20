import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer MGebb--PRo-Wk-ITaCphY_KZ_1-YMZMeeIrp9ymZRPE9B80Ex6KjF2mMDkLGWsojHwUHhf8zsDYBkRWJCrS5a_6YOumEULM9KBBHtiFyDvGwf_jSkWZXwr-EE1nrX3Yx'
    }
});