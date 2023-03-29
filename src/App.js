import { useState, useEffect } from 'react';
import './index.scss';
import Collection from './components/Collection';

const categories = [
    { name: 'All' },
    { name: 'Sea' },
    { name: 'Mountains' },
    { name: 'Architecture' },
    { name: 'Cities' },
];

const App = () => {
    const MOCKAPI_URL =
        'https://642367f0001cb9fc203e9adf.mockapi.io/photo_collection';

    const [categoryId, setCategoryId] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}` : '';

        fetch(`${MOCKAPI_URL}?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json) => setCollections(json))
            .catch((err) => {
                console.warn(err);
                alert('Error when receiving data');
            })
            .finally(() => setIsLoading(false));
    }, [categoryId, page]);

    return (
        <div className='App'>
            <h1>My collection of photos</h1>
            <div className='top'>
                <ul className='tags'>
                    {categories.map((obj, index) => (
                        <li
                            onClick={() => setCategoryId(index)}
                            className={categoryId === index ? 'active' : ''}
                            key={index}>
                            {obj.name}
                        </li>
                    ))}
                </ul>
                <input
                    value={searchValue}
                    onChange={(el) => setSearchValue(el.target.value)}
                    className='search-input'
                    placeholder='Search by title'
                />
            </div>
            <div className='content'>
                {isLoading ? (
                    <h2>Loading in progress...</h2>
                ) : (
                    collections
                        .filter((obj) =>
                            obj.name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        )
                        .map((obj, index) => (
                            <Collection
                                key={index}
                                name={obj.name}
                                images={obj.photos}
                            />
                        ))
                )}
            </div>
            <ul className='pagination'>
                {[...Array(5)].map((el, index) => (
                    <li
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={page === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
